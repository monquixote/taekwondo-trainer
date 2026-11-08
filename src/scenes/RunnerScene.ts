import Phaser from 'phaser';
import { KupGrade, TermItem, TheoryQuestion, PlayerStats } from '../data/types';
import { loadPlayerStats, recordAnswerAttempt, savePlayerProgress } from '../data/progress';
import { soundFx } from '../utils/soundEffects';
import { buildEncounterDeck, EncounterCard } from '../utils/deckBuilder';
import { speechManager } from '../utils/pronunciation';
import { RoundMistake } from './PlayScene';

interface RunnerSceneInitData {
  grade: KupGrade;
  isHardMode?: boolean;
  isCumulativeExam?: boolean;
  retryMistakes?: RoundMistake[];
}

interface BoardTarget {
  lane: number; // 0 = Left, 1 = Center, 2 = Right
  text: string;
  isCorrect: boolean;
  broken: boolean;
  highlightedWrong?: boolean;
  highlightedCorrect?: boolean;
  labelObj: Phaser.GameObjects.Text;
  badgeObj: Phaser.GameObjects.Text;
}

interface WoodSplinter {
  worldX: number;
  worldY: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  sizeW: number;
  sizeH: number;
  color: number;
  alpha: number;
}

const LANE_WORLD_X = [-130, 0, 130];
const FOCAL_LENGTH = 260;
const HORIZON_Y = 86;
const GROUND_NEAR_Y = 242;
const SPAWN_Z = 960;
const STRIKE_Z = 24;

export class RunnerScene extends Phaser.Scene {
  private grade!: KupGrade;
  private stats!: PlayerStats;
  private isHardMode: boolean = false;
  private isCumulativeExam: boolean = false;
  private isReviewMode: boolean = false;

  // Encounter Deck & State
  private encounterDeck: EncounterCard[] = [];
  private allCandidateTerms: TermItem[] = [];
  private currentTerm: TermItem | null = null;
  private currentTheory: TheoryQuestion | null = null;
  private isTheoryEncounter: boolean = false;
  private questionIndex: number = 0;
  private totalEncounters: number = 10;
  private roundMistakes: RoundMistake[] = [];
  private currentSpokenKorean: string | null = null;

  // 2.5D Runner World State
  private currentLane: number = 1; // 0 = Left, 1 = Center, 2 = Right
  private playerWorldX: number = 0;
  private playerWorldY: number = 0;
  private scrollZ: number = 0;
  private waveZ: number = SPAWN_Z;
  private baseSpeed: number = 340; // Z units per second
  private isDashing: boolean = false;
  private isProcessingImpact: boolean = false;
  private isTransitioning: boolean = false;
  private runAnimTimer: number = 0;
  private runFrame: number = 1;
  private playerPose: 'run' | 'kick' | 'hit' = 'run';

  // Scene Objects
  private corridorGraphics!: Phaser.GameObjects.Graphics;
  private boardsGraphics!: Phaser.GameObjects.Graphics;
  private particlesGraphics!: Phaser.GameObjects.Graphics;
  private playerSprite!: Phaser.GameObjects.Image;
  private boardTargets: BoardTarget[] = [];
  private splinters: WoodSplinter[] = [];
  private pillarZPositions: number[] = [];

  // HUD
  private hearts: Phaser.GameObjects.Image[] = [];
  private scoreText!: Phaser.GameObjects.Text;
  private streakText!: Phaser.GameObjects.Text;
  private progressText!: Phaser.GameObjects.Text;
  private promptBanner!: Phaser.GameObjects.Container;
  private promptText!: Phaser.GameObjects.Text;
  private categoryBadgeText!: Phaser.GameObjects.Text;
  private promptAudioBtn!: Phaser.GameObjects.Text;
  private feedbackText!: Phaser.GameObjects.Text;

  // Touch swipe tracking
  private pointerDownX: number = 0;
  private pointerDownY: number = 0;

  constructor() {
    super('RunnerScene');
  }

  init(data: RunnerSceneInitData): void {
    this.grade = data.grade;
    if (this.grade?.id) {
      localStorage.setItem('tagb_selected_grade', this.grade.id);
    }
    this.isHardMode = data.isHardMode !== undefined
      ? data.isHardMode
      : localStorage.getItem('tagb_hard_mode') === 'true';
    this.isCumulativeExam = data.isCumulativeExam !== undefined
      ? data.isCumulativeExam
      : localStorage.getItem('tagb_cumulative_exam') === 'true';

    this.stats = loadPlayerStats();
    this.stats.health = this.stats.maxHealth;
    this.questionIndex = 0;
    this.currentLane = 1;
    this.playerWorldX = 0;
    this.playerWorldY = 0;
    this.scrollZ = 0;
    this.waveZ = SPAWN_Z;
    this.isDashing = false;
    this.isProcessingImpact = false;
    this.isTransitioning = false;
    this.playerPose = 'run';
    this.hearts = [];
    this.boardTargets = [];
    this.splinters = [];
    this.roundMistakes = [];
    this.currentSpokenKorean = null;

    // Initialize evenly-spaced 3D corridor pillars
    this.pillarZPositions = [120, 300, 480, 660, 840, 1020];

    this.isReviewMode = Boolean(data.retryMistakes && data.retryMistakes.length > 0);
    if (this.isReviewMode && data.retryMistakes) {
      this.totalEncounters = data.retryMistakes.length;
      this.encounterDeck = data.retryMistakes.map(m => ({
        type: m.type,
        term: m.term,
        theory: m.theory,
        gradeTitle: this.grade.title,
        isCurrentGrade: true
      }));
      const { allCandidateTerms } = buildEncounterDeck({
        grade: this.grade,
        isCumulativeExam: this.isCumulativeExam,
        totalEncounters: 10,
        stats: this.stats
      });
      this.allCandidateTerms = allCandidateTerms;
    } else {
      this.totalEncounters = 10;
      const { deck, allCandidateTerms } = buildEncounterDeck({
        grade: this.grade,
        isCumulativeExam: this.isCumulativeExam,
        totalEncounters: this.totalEncounters,
        stats: this.stats
      });
      this.encounterDeck = deck;
      this.allCandidateTerms = allCandidateTerms;
    }
  }

  create(): void {
    const { width, height } = this.scale;

    // 1. Graphics Layers (ordered back-to-front by depth)
    this.corridorGraphics = this.add.graphics().setDepth(1);
    this.boardsGraphics = this.add.graphics().setDepth(5);
    this.particlesGraphics = this.add.graphics().setDepth(12);

    // 2. Player Back-Facing Runner Sprite
    this.playerSprite = this.add.image(width / 2, GROUND_NEAR_Y, `runner_run1_${this.grade.id}`);
    this.playerSprite.setOrigin(0.5, 1);
    this.playerSprite.setScale(1.25);
    this.playerSprite.setDepth(10);

    // 3. Top HUD & Question Banner
    this.createHUD();

    // 4. Floating Feedback Text
    this.feedbackText = this.add.text(width / 2, 132, '', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '9px',
      color: '#00ff88',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center',
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5).setDepth(25).setAlpha(0);

    // 5. Bottom Controls Hint Bar
    const hintBg = this.add.graphics().setDepth(20);
    hintBg.fillStyle(0x060810, 0.82);
    hintBg.fillRect(0, height - 16, width, 16);

    this.add.text(
      width / 2,
      height - 8,
      '◀/▶ OR TAP LANE: MOVE   |   ▲/SPACE OR DOUBLE-TAP: FLYING KICK DASH!',
      {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '6px',
        color: '#ffdd66'
      }
    ).setOrigin(0.5).setDepth(21);

    // 6. Keyboard & Touch Controls
    this.setupControls();

    // 7. Spawn First Wave
    this.spawnNextWave();
  }

  private createHUD(): void {
    const { width } = this.scale;

    // Top bar dark backing
    const topBar = this.add.graphics().setDepth(20);
    topBar.fillStyle(0x090a12, 0.92);
    topBar.fillRect(0, 0, width, 24);
    topBar.lineStyle(1, this.isHardMode ? 0xff3333 : 0x334477, 1);
    topBar.lineBetween(0, 24, width, 24);

    // Hearts (Health)
    for (let i = 0; i < this.stats.maxHealth; i++) {
      const heart = this.add.image(14 + i * 18, 12, 'heart_full').setDepth(21);
      this.hearts.push(heart);
    }

    // Score, Streak, Progress
    this.scoreText = this.add.text(105, 8, `SCORE:${this.stats.score}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffffff'
    }).setDepth(21);

    this.streakText = this.add.text(200, 8, `STREAK:${this.stats.currentStreak}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffe135'
    }).setDepth(21);

    this.progressText = this.add.text(295, 8, `WAVE:1/${this.totalEncounters}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#00ffaa'
    }).setDepth(21);

    // Sound & Menu exit buttons
    const soundBtn = this.add.text(width - 72, 6, soundFx.isEnabled() ? '🔊' : '🔇', {
      fontSize: '10px'
    }).setDepth(21).setInteractive({ useHandCursor: true });

    soundBtn.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      const enabled = soundFx.toggleSound();
      soundBtn.setText(enabled ? '🔊' : '🔇');
    });

    const menuBtn = this.add.text(width - 10, 8, '✕ MENU', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ff7777'
    }).setOrigin(1, 0).setDepth(21).setInteractive({ useHandCursor: true });

    menuBtn.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      speechManager.stop();
      soundFx.playSelect();
      this.scene.start('MenuScene', { gradeId: this.grade.id });
    });

    // Question Prompt Banner at top of horizon (Y = 26..80)
    this.promptBanner = this.add.container(width / 2, 53).setDepth(20);
    const bannerW = 456;
    const bannerH = 50;

    const bannerBg = this.add.graphics();
    bannerBg.fillStyle(0x0b0e1d, 0.94);
    bannerBg.fillRoundedRect(-bannerW / 2, -bannerH / 2, bannerW, bannerH, 4);
    bannerBg.lineStyle(1.5, this.isHardMode ? 0xff4444 : 0xffe135, 1);
    bannerBg.strokeRoundedRect(-bannerW / 2, -bannerH / 2, bannerW, bannerH, 4);

    this.categoryBadgeText = this.add.text(0, -15, 'KYOKPA 3D RUNNER', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '6px',
      color: '#ffe135'
    }).setOrigin(0.5);

    this.promptText = this.add.text(0, 5, '', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '8px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: bannerW - 50 }
    }).setOrigin(0.5);

    this.promptAudioBtn = this.add.text(bannerW / 2 - 18, 0, '🔊', {
      fontSize: '13px'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.promptAudioBtn.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      if (this.currentSpokenKorean) {
        speechManager.speakKorean(this.currentSpokenKorean);
      }
    });

    this.promptBanner.add([bannerBg, this.categoryBadgeText, this.promptText, this.promptAudioBtn]);
  }

  private setupControls(): void {
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-LEFT', () => this.shiftLane(-1));
      this.input.keyboard.on('keydown-A', () => this.shiftLane(-1));
      this.input.keyboard.on('keydown-RIGHT', () => this.shiftLane(1));
      this.input.keyboard.on('keydown-D', () => this.shiftLane(1));

      this.input.keyboard.on('keydown-ONE', () => this.selectOrDashLane(0));
      this.input.keyboard.on('keydown-TWO', () => this.selectOrDashLane(1));
      this.input.keyboard.on('keydown-THREE', () => this.selectOrDashLane(2));

      this.input.keyboard.on('keydown-UP', () => this.triggerDashKick());
      this.input.keyboard.on('keydown-W', () => this.triggerDashKick());
      this.input.keyboard.on('keydown-SPACE', () => this.triggerDashKick());
      this.input.keyboard.on('keydown-ENTER', () => this.triggerDashKick());
    }

    // Pointer / Touch support: swipe left/right OR tap directly on left/center/right lane
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.y < 80) return; // Ignore HUD clicks
      this.pointerDownX = pointer.x;
      this.pointerDownY = pointer.y;
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.y < 80 || this.isProcessingImpact || this.isTransitioning) return;

      const dx = pointer.x - this.pointerDownX;
      const dy = pointer.y - this.pointerDownY;

      if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        this.shiftLane(dx > 0 ? 1 : -1);
        return;
      }
      if (dy < -28 && Math.abs(dy) > Math.abs(dx)) {
        // Upward swipe -> Flying kick dash!
        this.triggerDashKick();
        return;
      }

      // Direct tap on screen: determine which of the 3 perspective lanes was tapped
      const { width } = this.scale;
      let tappedLane = 1;
      if (pointer.x < width * 0.36) {
        tappedLane = 0;
      } else if (pointer.x > width * 0.64) {
        tappedLane = 2;
      } else {
        tappedLane = 1;
      }

      this.selectOrDashLane(tappedLane);
    });
  }

  private shiftLane(delta: number): void {
    if (this.isProcessingImpact || this.isTransitioning) return;
    const nextLane = Phaser.Math.Clamp(this.currentLane + delta, 0, 2);
    if (nextLane !== this.currentLane) {
      this.currentLane = nextLane;
      soundFx.playSelect();
    }
  }

  private selectOrDashLane(lane: number): void {
    if (this.isProcessingImpact || this.isTransitioning) return;
    if (this.currentLane === lane) {
      // Already in this lane -> trigger Flying Kick Dash!
      this.triggerDashKick();
    } else {
      this.currentLane = lane;
      soundFx.playSelect();
    }
  }

  private triggerDashKick(): void {
    if (this.isProcessingImpact || this.isTransitioning || this.isDashing) return;
    this.isDashing = true;
    this.playerPose = 'kick';
    this.playerSprite.setTexture(`runner_kick_${this.grade.id}`);
    soundFx.playKick();
  }

  private spawnNextWave(): void {
    // Clean up previous wave labels
    for (const b of this.boardTargets) {
      b.labelObj.destroy();
      b.badgeObj.destroy();
    }
    this.boardTargets = [];

    if (this.questionIndex >= this.totalEncounters) {
      this.endSession(true);
      return;
    }

    this.isProcessingImpact = false;
    this.isDashing = false;
    this.playerPose = 'run';
    this.playerWorldY = 0;
    this.waveZ = SPAWN_Z;

    this.progressText.setText(`WAVE:${this.questionIndex + 1}/${this.totalEncounters}`);

    // Pull next card from spaced-repetition deck
    const card = this.encounterDeck[this.questionIndex] || this.encounterDeck[0];
    this.isTheoryEncounter = card.type === 'theory';

    let promptStr = '';
    let badgeStr = '';
    let correctStr = '';
    let distractors: string[] = [];

    if (this.isTheoryEncounter && card.theory) {
      const th = card.theory;
      this.currentTheory = th;
      this.currentTerm = null;
      this.currentSpokenKorean = null;
      this.promptAudioBtn.setVisible(false);

      badgeStr = `📜 THEORY CHALLENGE • ${card.gradeTitle.toUpperCase()}`;
      promptStr = th.prompt;
      correctStr = th.correctAnswer;
      distractors = Phaser.Utils.Array.Shuffle([...th.distractors]).slice(0, 2);
    } else {
      const term = card.term || this.grade.terms[0];
      this.currentTerm = term;
      this.currentTheory = null;
      this.currentSpokenKorean = term.korean;
      this.promptAudioBtn.setVisible(true);

      // Randomly alternate between English -> Korean and Korean -> English
      const askForKorean = Math.random() < 0.65;
      if (askForKorean) {
        badgeStr = `🥋 BREAK THE KOREAN BOARD • ${term.category.toUpperCase()}`;
        promptStr = `"${term.english.toUpperCase()}"`;
        correctStr = term.korean;

        const pool = this.allCandidateTerms
          .filter(t => t.korean.toLowerCase() !== term.korean.toLowerCase())
          .map(t => t.korean);
        distractors = Phaser.Utils.Array.Shuffle(Array.from(new Set(pool))).slice(0, 2);
      } else {
        badgeStr = `🥋 TRANSLATE COMMAND • ${term.category.toUpperCase()}`;
        promptStr = `"${term.korean.toUpperCase()}"`;
        correctStr = term.english;

        const pool = this.allCandidateTerms
          .filter(t => t.english.toLowerCase() !== term.english.toLowerCase())
          .map(t => t.english);
        distractors = Phaser.Utils.Array.Shuffle(Array.from(new Set(pool))).slice(0, 2);

        // Speak Korean command aloud when asking to translate Korean!
        this.time.delayedCall(120, () => {
          if (this.scene.isActive() && this.currentSpokenKorean) {
            speechManager.speakKorean(this.currentSpokenKorean);
          }
        });
      }
    }

    // Ensure we always have 2 distractors
    const fallbackDistractors = ['Gunnun Sogi', 'Hechyo Makgi', 'Apcha Busigi'];
    for (const fb of fallbackDistractors) {
      if (distractors.length >= 2) break;
      if (fb !== correctStr && !distractors.includes(fb)) {
        distractors.push(fb);
      }
    }

    this.categoryBadgeText.setText(badgeStr);
    this.promptText.setText(promptStr);
    this.promptText.setFontSize(promptStr.length > 58 ? '7px' : '8px');

    // Assign the 3 options across Lanes 0, 1, 2
    const laneOptions = Phaser.Utils.Array.Shuffle([
      { text: correctStr, isCorrect: true },
      { text: distractors[0], isCorrect: false },
      { text: distractors[1], isCorrect: false }
    ]);

    for (let lane = 0; lane < 3; lane++) {
      const opt = laneOptions[lane];

      const badgeObj = this.add.text(0, 0, `[${lane + 1}]`, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px',
        color: '#ffe135',
        stroke: '#000000',
        strokeThickness: 2
      }).setOrigin(0.5).setDepth(7);

      const labelObj = this.add.text(0, 0, opt.text, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px',
        color: '#1a0d00',
        align: 'center',
        wordWrap: { width: 112 }
      }).setOrigin(0.5).setDepth(7);

      this.boardTargets.push({
        lane,
        text: opt.text,
        isCorrect: opt.isCorrect,
        broken: false,
        labelObj,
        badgeObj
      });
    }
  }

  /**
   * Projects 3D world coordinates (worldX, worldY, z) onto the 2D screen canvas.
   */
  private project3D(worldX: number, worldY: number, z: number): {
    screenX: number;
    screenY: number;
    scale: number;
  } {
    const { width } = this.scale;
    // Subtle camera parallax shift opposite to player X
    const vanishingX = width / 2 - this.playerWorldX * 0.12;
    const clampedZ = Math.max(-180, z);
    const scale = FOCAL_LENGTH / (FOCAL_LENGTH + clampedZ);
    const screenX = vanishingX + (worldX - this.playerWorldX * 0.18) * scale;
    const screenY = HORIZON_Y + (GROUND_NEAR_Y - HORIZON_Y) * scale - worldY * scale;
    return { screenX, screenY, scale };
  }

  update(_time: number, delta: number): void {
    if (this.isTransitioning) return;
    const dt = Math.min(delta / 1000, 0.05);

    // 1. Smoothly interpolate player X toward target lane X
    const targetX = LANE_WORLD_X[this.currentLane];
    this.playerWorldX = Phaser.Math.Linear(this.playerWorldX, targetX, Math.min(1, dt * 14));

    // 2. Determine forward running speed
    const streakBonus = Math.min(this.stats.currentStreak * 15, 120);
    let currentSpeed = this.baseSpeed + streakBonus;

    if (this.isHardMode) {
      currentSpeed *= 1.35;
    }

    if (this.isDashing) {
      // Flying kick rocket dash!
      currentSpeed = 1250;
      this.playerWorldY = Phaser.Math.Linear(this.playerWorldY, 18, Math.min(1, dt * 15));
    } else if (!this.isHardMode && !this.isProcessingImpact && this.waveZ < 340 && this.waveZ > STRIKE_Z) {
      // Focus Zone in Normal Mode: gently slow down near the player so longer text is easy to read
      const focusFactor = Phaser.Math.Clamp((this.waveZ - STRIKE_Z) / 316, 0.28, 1);
      currentSpeed *= focusFactor;
    }

    // 3. Advance environment scroll & wave Z
    if (!this.isProcessingImpact) {
      this.scrollZ = (this.scrollZ + currentSpeed * dt) % 160;
      this.waveZ -= currentSpeed * dt;

      // Update pillars scrolling past on left and right walls
      for (let i = 0; i < this.pillarZPositions.length; i++) {
        this.pillarZPositions[i] -= currentSpeed * dt;
        if (this.pillarZPositions[i] < -60) {
          this.pillarZPositions[i] += 1080;
        }
      }

      // Check if wave reached the player strike plane!
      if (this.waveZ <= STRIKE_Z) {
        this.waveZ = STRIKE_Z;
        this.handleWaveImpact();
      }
    }

    // 4. Animate player running stride
    if (this.playerPose === 'run') {
      this.runAnimTimer += dt * (this.isDashing ? 18 : 9);
      if (this.runAnimTimer >= 1) {
        this.runAnimTimer = 0;
        this.runFrame = this.runFrame === 1 ? 2 : 1;
        this.playerSprite.setTexture(`runner_run${this.runFrame}_${this.grade.id}`);
      }
    }

    // Position player sprite on screen
    const playerProj = this.project3D(this.playerWorldX, this.playerWorldY, 0);
    const bobOffset = this.playerPose === 'run' ? Math.abs(Math.sin(this.runAnimTimer * Math.PI)) * 3 : 0;
    this.playerSprite.setPosition(playerProj.screenX, playerProj.screenY - bobOffset);

    // 5. Render 2.5D Corridor, Approaching Boards, and 3D Splinter Particles
    this.renderCorridor();
    this.renderBoards();
    this.updateAndRenderParticles(dt);
  }

  private handleWaveImpact(): void {
    this.isProcessingImpact = true;
    const wasDashing = this.isDashing;
    this.isDashing = false;

    const chosenBoard = this.boardTargets[this.currentLane];
    const isCorrect = Boolean(chosenBoard && chosenBoard.isCorrect);

    // Record spaced-repetition accuracy
    const itemId = this.isTheoryEncounter ? this.currentTheory?.id : this.currentTerm?.id;
    if (itemId) {
      recordAnswerAttempt(this.stats, itemId, isCorrect);
    }

    if (isCorrect && chosenBoard) {
      // SUCCESS: Smash the wooden pine board!
      chosenBoard.broken = true;
      chosenBoard.labelObj.setVisible(false);
      chosenBoard.badgeObj.setVisible(false);

      this.playerPose = 'kick';
      this.playerSprite.setTexture(`runner_kick_${this.grade.id}`);

      soundFx.playKick();
      soundFx.playEnemyKnockout();

      // Speak the Korean term on impact to reinforce auditory memory
      if (this.currentTerm) {
        speechManager.speakKorean(this.currentTerm.korean);
      }

      // Spawn 3D wood splinter explosion at the broken board's lane
      this.spawnBoardSplinters(LANE_WORLD_X[this.currentLane], this.waveZ);

      // Score & Streak calculation
      this.stats.currentStreak += 1;
      if (this.stats.currentStreak > this.stats.bestStreak) {
        this.stats.bestStreak = this.stats.currentStreak;
      }
      this.stats.totalEnemiesDefeated += 1;
      savePlayerProgress(this.stats);
      const dashBonus = wasDashing ? 50 : 0;
      const points = 100 + this.stats.currentStreak * 25 + dashBonus;
      this.stats.score += points;

      this.scoreText.setText(`SCORE:${this.stats.score}`);
      this.streakText.setText(`STREAK:${this.stats.currentStreak}`);

      this.showFeedback(
        wasDashing ? `⚡ FLYING KICK SMASH! +${points}` : `🥋 KYOKPA BREAK! +${points}`,
        '#00ff88'
      );

      this.questionIndex += 1;
      this.time.delayedCall(750, () => {
        if (!this.scene.isActive()) return;
        this.spawnNextWave();
      });
    } else {
      // WRONG LANE: Player bounces off the unyielding board
      this.playerPose = 'hit';
      this.playerSprite.setTexture(`runner_hit_${this.grade.id}`);
      this.playerWorldY = 0;

      soundFx.playPlayerHurt();
      this.cameras.main.shake(180, 0.012);

      if (chosenBoard) {
        chosenBoard.highlightedWrong = true;
      }
      const rightBoard = this.boardTargets.find(b => b.isCorrect);
      if (rightBoard) {
        rightBoard.highlightedCorrect = true;
      }

      // Log mistake for ResultScene review & Retry Missed mode
      const correctAns = rightBoard ? rightBoard.text : '';
      this.roundMistakes.push({
        type: this.isTheoryEncounter ? 'theory' : 'technique',
        term: this.currentTerm || undefined,
        theory: this.currentTheory || undefined,
        prompt: this.promptText.text,
        correctAnswer: correctAns
      });

      this.stats.currentStreak = 0;
      this.stats.health = Math.max(0, this.stats.health - 1);
      this.streakText.setText('STREAK:0');
      this.updateHeartsHUD();

      this.showFeedback(`✗ BLOCKED! ANS: ${correctAns}`, '#ff4444');

      this.questionIndex += 1;
      this.time.delayedCall(1550, () => {
        if (!this.scene.isActive()) return;
        if (this.stats.health <= 0) {
          this.endSession(false);
        } else {
          this.spawnNextWave();
        }
      });
    }
  }

  private spawnBoardSplinters(worldX: number, z: number): void {
    const woodColors = [0xdeb887, 0xf5deb3, 0xc8965a, 0x8b5a2b, 0xffe135];
    for (let i = 0; i < 22; i++) {
      this.splinters.push({
        worldX: worldX + Phaser.Math.Between(-35, 35),
        worldY: Phaser.Math.Between(12, 65),
        z: z + Phaser.Math.Between(-10, 20),
        vx: Phaser.Math.Between(-190, 190),
        vy: Phaser.Math.Between(60, 240),
        vz: Phaser.Math.Between(80, 320),
        sizeW: Phaser.Math.Between(6, 16),
        sizeH: Phaser.Math.Between(3, 7),
        color: woodColors[i % woodColors.length],
        alpha: 1
      });
    }
  }

  private updateAndRenderParticles(dt: number): void {
    this.particlesGraphics.clear();
    for (let i = this.splinters.length - 1; i >= 0; i--) {
      const s = this.splinters[i];
      s.worldX += s.vx * dt;
      s.worldY += s.vy * dt;
      s.z += s.vz * dt;
      s.vy -= 480 * dt; // Gravity
      s.alpha -= dt * 1.35;

      if (s.alpha <= 0 || s.worldY < 0) {
        this.splinters.splice(i, 1);
        continue;
      }

      const proj = this.project3D(s.worldX, s.worldY, s.z);
      const w = Math.max(2, s.sizeW * proj.scale);
      const h = Math.max(2, s.sizeH * proj.scale);

      this.particlesGraphics.fillStyle(s.color, s.alpha);
      this.particlesGraphics.fillRect(proj.screenX - w / 2, proj.screenY - h / 2, w, h);
    }
  }

  private renderCorridor(): void {
    const { width, height } = this.scale;
    const g = this.corridorGraphics;
    g.clear();

    // 1. Horizon Backdrop (Dojang wall & night ceiling above HORIZON_Y)
    g.fillStyle(this.isHardMode ? 0x1a060a : 0x0b1022, 1);
    g.fillRect(0, 0, width, HORIZON_Y);

    // Subtle horizon glow
    g.fillStyle(this.isHardMode ? 0x440a14 : 0x1a264d, 0.8);
    g.fillRect(0, HORIZON_Y - 10, width, 10);

    // 2. Floor Base Trapezoid
    const floorBaseColor = this.isHardMode ? 0x261015 : 0x2c1b10;
    g.fillStyle(floorBaseColor, 1);
    g.fillRect(0, HORIZON_Y, width, height - HORIZON_Y);

    // 3. Alternating Perspective Depth Strips (Sega OutRun / Space Harrier effect)
    const stripSpacing = 80;
    for (let z = 0; z < 1040; z += stripSpacing) {
      const zNear = z - (this.scrollZ % stripSpacing);
      const zFar = zNear + stripSpacing * 0.5;
      if (zFar <= -120) continue;

      const pNearLeft = this.project3D(-220, 0, Math.max(-120, zNear));
      const pNearRight = this.project3D(220, 0, Math.max(-120, zNear));
      const pFarLeft = this.project3D(-220, 0, zFar);
      const pFarRight = this.project3D(220, 0, zFar);

      const stripColor = this.isHardMode ? 0x35141c : 0x3a2416;
      g.fillStyle(stripColor, 1);
      g.beginPath();
      g.moveTo(pFarLeft.screenX, pFarLeft.screenY);
      g.lineTo(pFarRight.screenX, pFarRight.screenY);
      g.lineTo(pNearRight.screenX, pNearRight.screenY);
      g.lineTo(pNearLeft.screenX, pNearLeft.screenY);
      g.closePath();
      g.fillPath();
    }

    // 4. Highlight Active Player Lane
    const activeLeftX = LANE_WORLD_X[this.currentLane] - 62;
    const activeRightX = LANE_WORLD_X[this.currentLane] + 62;
    const laneFarL = this.project3D(activeLeftX, 0, 960);
    const laneFarR = this.project3D(activeRightX, 0, 960);
    const laneNearL = this.project3D(activeLeftX, 0, -40);
    const laneNearR = this.project3D(activeRightX, 0, -40);

    g.fillStyle(this.isHardMode ? 0xff4444 : 0xffe135, 0.14);
    g.beginPath();
    g.moveTo(laneFarL.screenX, laneFarL.screenY);
    g.lineTo(laneFarR.screenX, laneFarR.screenY);
    g.lineTo(laneNearR.screenX, laneNearR.screenY);
    g.lineTo(laneNearL.screenX, laneNearL.screenY);
    g.closePath();
    g.fillPath();

    // 5. Perspective Lane Divider Lines
    const boundaryXs = [-195, -65, 65, 195];
    for (let i = 0; i < boundaryXs.length; i++) {
      const bx = boundaryXs[i];
      const pFar = this.project3D(bx, 0, 1000);
      const pNear = this.project3D(bx, 0, -60);
      const isOuter = i === 0 || i === boundaryXs.length - 1;
      g.lineStyle(isOuter ? 2 : 1, isOuter ? 0xffe135 : 0x8b6946, isOuter ? 0.85 : 0.55);
      g.lineBetween(pFar.screenX, pFar.screenY, pNear.screenX, pNear.screenY);
    }

    // 6. Scrolling 3D Wooden Dojang Pillars along Left & Right Edges
    const sortedPillars = [...this.pillarZPositions].sort((a, b) => b - a);
    for (const pz of sortedPillars) {
      if (pz < -40 || pz > 1020) continue;
      for (const side of [-1, 1]) {
        const baseProj = this.project3D(side * 215, 0, pz);
        const topProj = this.project3D(side * 215, 115, pz);
        const pillarW = Math.max(2, 16 * baseProj.scale);
        const pillarH = Math.max(4, baseProj.screenY - topProj.screenY);

        // Wooden column
        g.fillStyle(0x4a2511, 0.9);
        g.fillRect(baseProj.screenX - pillarW / 2, topProj.screenY, pillarW, pillarH);

        // Golden lantern / band near top of pillar
        const lanternH = Math.max(2, 10 * baseProj.scale);
        g.fillStyle(this.isHardMode ? 0xff3333 : 0xffaa22, 0.85);
        g.fillRect(baseProj.screenX - pillarW * 0.6, topProj.screenY + pillarH * 0.18, pillarW * 1.2, lanternH);
      }
    }
  }

  private renderBoards(): void {
    const g = this.boardsGraphics;
    g.clear();

    if (this.boardTargets.length === 0) return;

    const boardWorldW = 114;
    const boardWorldH = 68;

    for (const board of this.boardTargets) {
      if (board.broken) continue;

      const laneCenterX = LANE_WORLD_X[board.lane];
      const baseProj = this.project3D(laneCenterX, 0, this.waveZ);
      const topProj = this.project3D(laneCenterX, boardWorldH, this.waveZ);

      const screenW = boardWorldW * baseProj.scale;
      const screenH = Math.max(12, baseProj.screenY - topProj.screenY);
      const leftX = baseProj.screenX - screenW / 2;
      const topY = topProj.screenY;

      // 1. Ground Shadow under board
      g.fillStyle(0x000000, 0.45);
      g.fillRect(leftX + 2, baseProj.screenY - 2, screenW, Math.max(2, 6 * baseProj.scale));

      // 2. Cinder-block Holder Posts at Left/Right bottom corners
      const postW = Math.max(2, 10 * baseProj.scale);
      const postH = Math.max(3, 14 * baseProj.scale);
      g.fillStyle(0x555566, 1);
      g.fillRect(leftX, baseProj.screenY - postH, postW, postH);
      g.fillRect(leftX + screenW - postW, baseProj.screenY - postH, postW, postH);

      // 3. 3D Extruded Side & Top Bevel (Pine Wood Thickness)
      const depthExtrude = Math.max(2, 6 * baseProj.scale);
      g.fillStyle(0x8b5a2b, 1);
      // Top bevel
      g.fillRect(leftX + depthExtrude * 0.5, topY - depthExtrude, screenW, depthExtrude);
      // Right 3D side bevel
      g.fillRect(leftX + screenW, topY - depthExtrude, depthExtrude, screenH);

      // 4. Main Pine Board Face
      let faceColor = 0xe6c288; // Natural pine board
      let borderColor = 0x704214;

      if (board.highlightedCorrect) {
        faceColor = 0x66ffaa;
        borderColor = 0x00ff66;
      } else if (board.highlightedWrong) {
        faceColor = 0xff7777;
        borderColor = 0xff0000;
      } else if (board.lane === this.currentLane) {
        // Subtle warm highlight on the board in the player's targeted lane
        faceColor = 0xf7dca8;
        borderColor = 0xffe135;
      }

      g.fillStyle(faceColor, 1);
      g.fillRect(leftX, topY, screenW, screenH - postH * 0.4);

      g.lineStyle(Math.max(1, 2 * baseProj.scale), borderColor, 1);
      g.strokeRect(leftX, topY, screenW, screenH - postH * 0.4);

      // Subtle horizontal wood grain line
      g.lineStyle(1, 0xc89d66, 0.45);
      g.lineBetween(leftX + 3, topY + screenH * 0.42, leftX + screenW - 3, topY + screenH * 0.42);

      // 5. Update Badge [1]/[2]/[3] and Text Label
      const textScale = Phaser.Math.Clamp(baseProj.scale * 1.18, 0.35, 1.08);
      board.badgeObj.setPosition(baseProj.screenX, topY - Math.max(6, 9 * baseProj.scale));
      board.badgeObj.setScale(textScale);
      board.badgeObj.setColor(board.lane === this.currentLane ? '#00ff88' : '#ffe135');

      board.labelObj.setPosition(baseProj.screenX, topY + (screenH - postH * 0.4) * 0.5);
      board.labelObj.setScale(textScale);
    }
  }

  private showFeedback(msg: string, color: string): void {
    this.feedbackText.setText(msg);
    this.feedbackText.setColor(color);
    this.feedbackText.setAlpha(1);
    this.feedbackText.setY(134);

    this.tweens.killTweensOf(this.feedbackText);
    this.tweens.add({
      targets: this.feedbackText,
      y: 118,
      alpha: 0,
      duration: 1150,
      ease: 'Cubic.easeOut'
    });
  }

  private updateHeartsHUD(): void {
    for (let i = 0; i < this.hearts.length; i++) {
      this.hearts[i].setTexture(i < this.stats.health ? 'heart_full' : 'heart_empty');
    }
  }

  private endSession(passed: boolean): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    speechManager.stop();

    if (passed) {
      soundFx.playFanfare();
    } else {
      soundFx.playPlayerHurt();
    }

    this.time.delayedCall(450, () => {
      this.scene.start('ResultScene', {
        grade: this.grade,
        stats: this.stats,
        passed,
        isCumulativeExam: this.isCumulativeExam,
        roundMistakes: this.roundMistakes,
        returnScene: 'RunnerScene'
      });
    });
  }
}
