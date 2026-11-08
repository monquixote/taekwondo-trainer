import Phaser from 'phaser';
import { KupGrade, TermItem, TheoryQuestion, PlayerStats } from '../data/types';
import { loadPlayerStats, recordAnswerAttempt } from '../data/progress';
import { Player } from '../objects/Player';
import { Enemy, EnemyType } from '../objects/Enemy';
import { ActionDeck, ActionDeckOption } from '../objects/ActionDeck';
import { soundFx } from '../utils/soundEffects';
import { KOREAN_DICTIONARY } from '../data/dictionary';
import { buildEncounterDeck, EncounterCard } from '../utils/deckBuilder';
import { speechManager } from '../utils/pronunciation';

export interface RoundMistake {
  type: 'technique' | 'theory';
  term?: TermItem;
  theory?: TheoryQuestion;
  prompt: string;
  correctAnswer: string;
}

interface PlaySceneInitData {
  grade: KupGrade;
  isHardMode?: boolean;
  isCumulativeExam?: boolean;
  retryMistakes?: RoundMistake[];
}

export class PlayScene extends Phaser.Scene {
  private grade!: KupGrade;
  private stats!: PlayerStats;

  // Visuals
  private bgTile!: Phaser.GameObjects.TileSprite;
  private player!: Player;
  private currentEnemy: Enemy | null = null;
  private actionDeck!: ActionDeck;

  // HUD
  private hearts: Phaser.GameObjects.Image[] = [];
  private scoreText!: Phaser.GameObjects.Text;
  private streakText!: Phaser.GameObjects.Text;
  private progressText!: Phaser.GameObjects.Text;
  private promptBanner!: Phaser.GameObjects.Container;
  private promptText!: Phaser.GameObjects.Text;
  private categoryBadgeText!: Phaser.GameObjects.Text;
  private promptAudioBtn!: Phaser.GameObjects.Text;
  private currentSpokenKorean: string | null = null;

  // State
  private questionIndex: number = 0;
  private totalEncounters: number = 10;
  private isTheoryEncounter: boolean = false;
  private currentTerm: TermItem | null = null;
  private currentTheory: TheoryQuestion | null = null;
  private customCorrectionText: string | null = null;
  private isProcessingResult: boolean = false;
  private isTransitioning: boolean = false;

  // Spaced-Repetition Deck & Cumulative Exam State
  private isCumulativeExam: boolean = false;
  private encounterDeck: EncounterCard[] = [];
  private allCandidateTerms: TermItem[] = [];
  private currentEncounterCard: EncounterCard | null = null;
  private roundMistakes: RoundMistake[] = [];
  private isReviewMode: boolean = false;

  // Hard Mode State
  private isHardMode: boolean = false;
  private isBuildingSentence: boolean = false;
  private targetWords: string[] = [];
  private currentWordIndex: number = 0;
  private builtSentence: string[] = [];

  constructor() {
    super('PlayScene');
  }

  init(data: PlaySceneInitData): void {
    this.grade = data.grade;
    if (this.grade?.id) {
      localStorage.setItem('tagb_selected_grade', this.grade.id);
    }
    this.isHardMode = data.isHardMode !== undefined ? data.isHardMode : localStorage.getItem('tagb_hard_mode') === 'true';
    this.isCumulativeExam = data.isCumulativeExam !== undefined ? data.isCumulativeExam : localStorage.getItem('tagb_cumulative_exam') === 'true';
    this.stats = loadPlayerStats();
    // Start with max health for new session
    this.stats.health = this.stats.maxHealth;
    this.questionIndex = 0;
    this.isProcessingResult = false;
    this.isTransitioning = false;

    // Reset ALL stale references from previous game session.
    this.hearts = [];
    this.currentEnemy = null;
    this.currentTerm = null;
    this.currentTheory = null;
    this.customCorrectionText = null;
    this.isTheoryEncounter = false;
    this.currentEncounterCard = null;
    this.currentSpokenKorean = null;
    this.roundMistakes = [];
    this.isReviewMode = Boolean(data.retryMistakes && data.retryMistakes.length > 0);

    if (this.isReviewMode && data.retryMistakes) {
      // Focused Review Mode: drill only the missed items from the previous round
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
      // Standard Round: Smart spaced-repetition deck (weighted against weaknesses, zero duplicates)
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

    // 1. Scrolling Parallax Dojang Background
    const bgKey = this.isHardMode ? 'dojang_bg_hard' : 'dojang_bg';
    this.bgTile = this.add.tileSprite(width / 2, (height - 165) / 2, width, height - 165, bgKey);
    this.bgTile.setDisplaySize(width, height - 165);

    // Bottom arcade panel background for ActionDeck
    const deckBg = this.add.graphics();
    deckBg.fillStyle(0x0c0d18, 1);
    deckBg.fillRect(0, height - 165, width, 165);
    deckBg.lineStyle(3, 0x4a4a70, 1);
    deckBg.lineBetween(0, height - 165, width, height - 165);

    // 2. Player with grade-specific belt
    const groundY = height - 176;
    this.player = new Player(this, 180, groundY, this.grade.id);

    // 3. Action Deck (Choices UI)
    this.actionDeck = new ActionDeck(this, width / 2, height - 82);

    // 4. HUD Header
    this.createHUD(width);

    // 5. Prompt Banner (Displays English move requirement)
    this.createPromptBanner(width);

    // 6. Keyboard shortcuts (ESC to quit back to menu)
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-ESC', () => {
        this.quitToMenu();
      });
      this.input.keyboard.on('keydown-V', () => {
        this.speakCurrentPrompt();
      });
      this.input.keyboard.on('keydown-P', () => {
        this.speakCurrentPrompt();
      });
    }

    // 7. Start the first encounter with on-rails jog
    this.startNextEncounter();
  }

  private createHUD(width: number): void {
    // Top HUD bar background
    const hudBar = this.add.graphics();
    hudBar.fillStyle(0x000000, 0.75);
    hudBar.fillRect(0, 0, width, 36);
    hudBar.setDepth(60);

    // Health Hearts
    for (let i = 0; i < this.stats.maxHealth; i++) {
      const heart = this.add.image(32 + i * 40, 18, 'heart');
      heart.setScale(0.85);
      heart.setDepth(61);
      this.hearts.push(heart);
    }
    this.updateHearts();

    // Score & Streak in center
    this.scoreText = this.add.text(width / 2 - 110, 18, `SCORE: ${this.stats.score}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '13px',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5).setDepth(61);

    this.streakText = this.add.text(width / 2 + 110, 18, 'STREAK: 0', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '13px',
      color: '#ffe135'
    }).setOrigin(0.5, 0.5).setDepth(61);

    // Progress counter (positioned with spacing before action buttons)
    this.progressText = this.add.text(width - 110, 18, `TEST: 1/${this.totalEncounters}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '13px',
      color: '#00ffaa'
    }).setOrigin(1, 0.5).setDepth(61);

    // Quit to menu button (next to audio mute button)
    const quitBtn = this.add.text(width - 64, 18, '🚪', {
      fontSize: '22px'
    }).setOrigin(0.5, 0.5).setDepth(61).setInteractive({ useHandCursor: true });
    quitBtn.on('pointerdown', () => {
      this.quitToMenu();
    });
    quitBtn.on('pointerover', () => quitBtn.setScale(1.2));
    quitBtn.on('pointerout', () => quitBtn.setScale(1.0));

    // Sound toggle
    const soundBtn = this.add.text(width - 24, 18, soundFx.isEnabled() ? '🔊' : '🔇', {
      fontSize: '22px'
    }).setOrigin(0.5, 0.5).setDepth(61).setInteractive({ useHandCursor: true });
    soundBtn.on('pointerdown', () => {
      const enabled = soundFx.toggleSound();
      soundBtn.setText(enabled ? '🔊' : '🔇');
    });
    soundBtn.on('pointerover', () => soundBtn.setScale(1.2));
    soundBtn.on('pointerout', () => soundBtn.setScale(1.0));
  }

  private updateHearts(): void {
    this.hearts.forEach((heart, idx) => {
      if (idx < this.stats.health) {
        heart.setTexture('heart');
      } else {
        heart.setTexture('heart_empty');
      }
    });
  }

  private createPromptBanner(width: number): void {
    // Positioned at Y = 85 (leaves clear gap above player/enemy heads)
    this.promptBanner = this.add.container(width / 2, 85);
    this.promptBanner.setDepth(50);

    const bannerW = 860;
    const bannerH = 76;

    const bannerBg = this.add.graphics();
    bannerBg.fillStyle(0x000000, 0.92);
    bannerBg.fillRoundedRect(-bannerW / 2, -bannerH / 2, bannerW, bannerH, 8);
    bannerBg.lineStyle(2, 0xffe135, 1);
    bannerBg.strokeRoundedRect(-bannerW / 2, -bannerH / 2, bannerW, bannerH, 8);

    // Row 1: Dedicated centered category badge
    this.categoryBadgeText = this.add.text(0, -18, '', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '12px',
      color: '#ffe135'
    }).setOrigin(0.5, 0.5);

    // Row 2: Dedicated centered question text
    this.promptText = this.add.text(0, 14, '', {
      fontFamily: "'Fredoka', 'Press Start 2P', sans-serif",
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 800 }
    }).setOrigin(0.5, 0.5);

    // Audio button in the prompt banner (visible when prompt contains Korean to speak)
    this.promptAudioBtn = this.add.text(bannerW / 2 - 36, 0, '🔊', {
      fontSize: '24px'
    }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
    this.promptAudioBtn.on('pointerup', () => this.speakCurrentPrompt());
    this.promptAudioBtn.on('pointerover', () => this.promptAudioBtn.setScale(1.2));
    this.promptAudioBtn.on('pointerout', () => this.promptAudioBtn.setScale(1.0));
    this.promptAudioBtn.setVisible(false);

    this.promptBanner.add([bannerBg, this.categoryBadgeText, this.promptText, this.promptAudioBtn]);
    this.promptBanner.setVisible(false);
  }

  private speakCurrentPrompt(): void {
    if (this.currentSpokenKorean) {
      speechManager.speakKorean(this.currentSpokenKorean);
      if (this.promptAudioBtn) {
        this.tweens.add({
          targets: this.promptAudioBtn,
          scale: 1.35,
          duration: 100,
          yoyo: true,
          ease: 'Quad.easeOut'
        });
      }
    }
  }

  private startNextEncounter(): void {
    if (this.stats.health <= 0) {
      this.endGame(false);
      return;
    }

    if (this.questionIndex >= this.totalEncounters) {
      this.endGame(true);
      return;
    }

    this.questionIndex++;
    let testPrefix = 'TEST';
    if (this.isReviewMode) {
      testPrefix = 'REVIEW';
    } else if (this.isCumulativeExam) {
      testPrefix = 'EXAM';
    }
    this.progressText.setText(`${testPrefix}: ${this.questionIndex}/${this.totalEncounters}`);
    this.promptBanner.setVisible(false);
    this.actionDeck.clearButtons();

    // Pull current card from smart encounter deck
    this.currentEncounterCard = this.encounterDeck[this.questionIndex - 1] || null;
    this.isTheoryEncounter = this.currentEncounterCard?.type === 'theory';

    // Jog forward on rails (Background scrolls, player runs)
    const runDuration = 800;
    this.player.runForward(runDuration);

    this.tweens.add({
      targets: this.bgTile,
      tilePositionX: this.bgTile.tilePositionX + 120,
      duration: runDuration,
      ease: 'Linear'
    });

    this.time.delayedCall(runDuration, () => {
      this.spawnEnemy();
    });
  }

  private spawnEnemy(): void {
    const { width, height } = this.scale;
    const groundY = height - 176;

    let enemyType: EnemyType = 'enemy_purple';
    if (this.isTheoryEncounter) {
      enemyType = 'master_sifu';
    } else {
      enemyType = this.questionIndex % 2 === 0 ? 'enemy_blue' : 'enemy_purple';
    }

    if (this.currentEnemy) {
      this.currentEnemy.destroy();
    }

    this.currentEnemy = new Enemy(this, width + 50, groundY, enemyType);
    if (this.isHardMode) {
      this.currentEnemy.setTint(0xff6666);
    }

    // Enemy approaches and halts at striking distance
    const stopDistance = this.isTheoryEncounter ? this.player.x + 220 : this.player.x + 160;
    const walkDuration = this.isHardMode ? 400 : 600;
    this.currentEnemy.walkTo(stopDistance, walkDuration, () => {
      this.presentQuestion();
    });
  }

  private presentQuestion(): void {
    let options: ActionDeckOption[] = [];

    if (this.isTheoryEncounter) {
      // Theory Question with Sifu (from smart spaced-repetition deck)
      this.currentTheory = this.currentEncounterCard?.theory || this.grade.theory[0];
      this.currentTerm = null;
      this.currentSpokenKorean = null;
      this.promptAudioBtn.setVisible(false);

      this.categoryBadgeText.setText('◆ SIFU THEORY QUESTION ◆');
      this.categoryBadgeText.setColor('#00ffaa');
      this.promptText.setText(this.currentTheory.prompt);
      this.promptBanner.setVisible(true);

      const allChoices = [
        { label: this.currentTheory.correctAnswer, isCorrect: true },
        ...this.currentTheory.distractors.slice(0, 3).map(d => ({ label: d, isCorrect: false }))
      ];

      // Shuffle choices
      Phaser.Utils.Array.Shuffle(allChoices);

      options = allChoices.map((c, idx) => ({
        id: `theory_${idx}`,
        label: c.label,
        isCorrect: c.isCorrect
      }));

    } else {
      // Technique Question (from smart spaced-repetition deck)
      const term = this.currentEncounterCard?.term || this.grade.terms[0];
      this.currentTerm = term;
      this.currentTheory = null;

      // 40% chance to be Reverse (Korean -> English) - disabled in Hard Mode to focus on word building
      const isReverse = !this.isHardMode && Math.random() < 0.4;

      if (isReverse) {
        // Reverse: Korean -> English
        this.currentSpokenKorean = term.korean;
        this.promptAudioBtn.setVisible(true);
        speechManager.speakKorean(term.korean);

        const categoryLabel = `◆ TRANSLATE ◆`;
        this.categoryBadgeText.setText(categoryLabel);
        this.categoryBadgeText.setColor('#ff99ff');
        this.promptText.setText(term.korean);
        this.promptBanner.setVisible(true);

        const distractors = this.allCandidateTerms
          .filter(t => t.id !== term.id)
          .map(t => t.english);
        Phaser.Utils.Array.Shuffle(distractors);

        const allChoices = [
          { label: term.english, isCorrect: true },
          ...distractors.slice(0, 3).map(d => ({ label: d, isCorrect: false }))
        ];

        Phaser.Utils.Array.Shuffle(allChoices);

        options = allChoices.map((c, idx) => ({
          id: `move_${idx}`,
          label: c.label,
          isCorrect: c.isCorrect
        }));
      } else if (this.isHardMode) {
        // Hard Mode: Build sentence word by word (English -> Korean)
        this.currentSpokenKorean = null;
        this.promptAudioBtn.setVisible(false);
        this.isBuildingSentence = true;
        this.targetWords = term.korean.replace(/[()]/g, '').trim().split(/\s+/);
        this.currentWordIndex = 0;
        this.builtSentence = [];
        this.presentNextWord();
        return; // Early return, presentNextWord handles UI and action deck
      } else {
        // Normal: English -> Korean OR Vocab
        const termWords = term.korean.replace(/[()]/g, '').trim().split(/\s+/);
        const vocabWords = termWords.filter(w => KOREAN_DICTIONARY[w]);

        // 50% chance for a vocab question (if vocab words are available)
        const isVocab = vocabWords.length > 0 && Math.random() < 0.5;

        if (isVocab) {
          const targetKorean = Phaser.Utils.Array.GetRandom(vocabWords);
          const targetEnglish = KOREAN_DICTIONARY[targetKorean];
          this.customCorrectionText = targetEnglish;
          this.currentSpokenKorean = targetKorean;
          this.promptAudioBtn.setVisible(true);
          speechManager.speakKorean(targetKorean);

          const categoryLabel = `◆ VOCABULARY ◆`;
          this.categoryBadgeText.setText(categoryLabel);
          this.categoryBadgeText.setColor('#44ccff');
          this.promptText.setText(targetKorean);
          this.promptBanner.setVisible(true);

          const allEnglishValues = Array.from(new Set(Object.values(KOREAN_DICTIONARY)));
          const validDistractors = allEnglishValues.filter(val => val !== targetEnglish);
          Phaser.Utils.Array.Shuffle(validDistractors);

          const allChoices = [
            { label: targetEnglish, isCorrect: true },
            ...validDistractors.slice(0, 3).map(d => ({ label: d, isCorrect: false }))
          ];

          Phaser.Utils.Array.Shuffle(allChoices);

          options = allChoices.map((c, idx) => ({
            id: `vocab_${idx}`,
            label: c.label,
            isCorrect: c.isCorrect
          }));
        } else {
          // Full phrase execution
          this.currentSpokenKorean = null;
          this.promptAudioBtn.setVisible(false);
          const categoryLabel = `◆ EXECUTE ◆`;
          this.categoryBadgeText.setText(categoryLabel);
          this.categoryBadgeText.setColor('#ffe135');
          this.promptText.setText(term.english);
          this.promptBanner.setVisible(true);

          // Collect 3 distractors from candidate terms
          const distractors = this.allCandidateTerms
            .filter(t => t.id !== term.id)
            .map(t => t.korean);
          Phaser.Utils.Array.Shuffle(distractors);

          const allChoices = [
            { label: term.korean, isCorrect: true },
            ...distractors.slice(0, 3).map(d => ({ label: d, isCorrect: false }))
          ];

          Phaser.Utils.Array.Shuffle(allChoices);

          options = allChoices.map((c, idx) => ({
            id: `move_${idx}`,
            label: c.label,
            isCorrect: c.isCorrect
          }));
        }
      }
    }

    // Bounce prompt banner in
    this.promptBanner.setScale(0.9);
    this.tweens.add({
      targets: this.promptBanner,
      scale: 1,
      duration: 150,
      ease: 'Back.easeOut'
    });

    // Populate the Action Deck
    this.actionDeck.setOptions(options, (selectedOption) => {
      this.handlePlayerChoice(selectedOption);
    });
  }

  private presentNextWord(): void {
    if (!this.currentTerm) return;

    const targetWord = this.targetWords[this.currentWordIndex];

    const categoryLabel = `◆ BUILD ◆`;
    this.categoryBadgeText.setText(categoryLabel);
    this.categoryBadgeText.setColor('#ff4444');
    
    // Create the blank sentence representation
    const sentenceDisplay = this.targetWords.map((_w, i) => {
      if (i < this.currentWordIndex) return this.builtSentence[i];
      if (i === this.currentWordIndex) return '[___]';
      return '___';
    }).join(' ');

    this.promptText.setText(`${this.currentTerm.english}\n${sentenceDisplay}`);
    this.promptBanner.setVisible(true);

    // Collect distractors: grab all words from candidate terms, filter out the target word
    const allWords = new Set<string>();
    this.allCandidateTerms.forEach(t => t.korean.replace(/[()]/g, '').trim().split(/\s+/).forEach(w => allWords.add(w)));
    allWords.delete(targetWord);
    
    const distractorWords = Array.from(allWords);
    Phaser.Utils.Array.Shuffle(distractorWords);

    const allChoices = [
      { label: targetWord, isCorrect: true },
      ...distractorWords.slice(0, 3).map(w => ({ label: w, isCorrect: false }))
    ];

    Phaser.Utils.Array.Shuffle(allChoices);

    const options = allChoices.map((c, idx) => ({
      id: `word_${idx}`,
      label: c.label,
      isCorrect: c.isCorrect
    }));

    // Bounce prompt banner if it's the first word
    if (this.currentWordIndex === 0) {
      this.promptBanner.setScale(0.9);
      this.tweens.add({
        targets: this.promptBanner,
        scale: 1,
        duration: 150,
        ease: 'Back.easeOut'
      });
    }

    this.actionDeck.setOptions(options, (selectedOption) => {
      this.handlePlayerChoice(selectedOption);
    });
  }

  private handlePlayerChoice(option: ActionDeckOption): void {
    if (this.isProcessingResult) return;
    this.isProcessingResult = true;

    const termId = this.currentTerm ? this.currentTerm.id : (this.currentTheory?.id || 'theory');

    if (option.isCorrect) {
      if (this.isBuildingSentence) {
        this.builtSentence.push(option.label);
        this.currentWordIndex++;
        
        if (this.currentWordIndex < this.targetWords.length) {
          // Play a small sound for placing a word
          soundFx.playSelect();
          this.isProcessingResult = false;
          this.presentNextWord();
          return; // Wait for next word
        } else {
          // Completed sentence! Proceed with normal success
          this.isBuildingSentence = false;
          
          // Revert prompt text to normal for the success read time
          this.promptText.setText(this.currentTerm?.english || '');
        }
      }

      // Success!
      recordAnswerAttempt(this.stats, termId, true);
      this.updateHUD();

      // Speak the Korean technique name upon successful strike
      if (this.currentTerm?.korean) {
        speechManager.speakKorean(this.currentTerm.korean);
      }

      // Sound effect
      if (this.currentTerm?.category === 'kick') {
        soundFx.playKick();
      } else {
        soundFx.playPunch();
      }

      // Attack animation
      const attackType = this.currentTerm?.category === 'kick' ? 'kick' : 'punch';
      this.player.playAttack(attackType, () => {
        if (this.currentEnemy) {
          soundFx.playEnemyKnockout();
          this.currentEnemy.playKnockout(() => {
            this.currentEnemy = null;
            this.time.delayedCall(300, () => {
              this.isProcessingResult = false;
              this.startNextEncounter();
            });
          });
        }
      });

      // Score floater popup
      this.showScoreFloater(`+${100 + this.stats.currentStreak * 10}`);

    } else {
      if (this.isBuildingSentence) {
        this.isBuildingSentence = false;
      }
      
      // Incorrect!
      recordAnswerAttempt(this.stats, termId, false);
      this.updateHUD();
      this.updateHearts();
      soundFx.playPlayerHurt();

      // In-session Spaced Repetition Reinforcement:
      // If the player misses an item and still has health remaining,
      // schedule it to reappear later in the session before the final boss
      if (this.stats.health > 0 && this.currentEncounterCard && this.questionIndex < this.totalEncounters - 1) {
        const repeatCard = { ...this.currentEncounterCard };
        const targetSlot = Math.min(this.totalEncounters - 2, this.questionIndex + 2);
        if (targetSlot > this.questionIndex - 1 && this.encounterDeck[targetSlot]?.type === repeatCard.type) {
          this.encounterDeck[targetSlot] = repeatCard;
        }
      }

      // Enemy attacks
      if (this.currentEnemy) {
        this.currentEnemy.playAttack(() => {
          this.player.playHurt();
        });
      } else {
        this.player.playHurt();
      }

      // Educational prompt correction
      let correctText = this.currentTerm ? this.currentTerm.korean : (this.currentTheory?.correctAnswer || '');
      if (this.customCorrectionText) {
        correctText = this.customCorrectionText;
      }
      this.categoryBadgeText.setText('◆ CORRECT ANSWER ◆');
      this.categoryBadgeText.setColor('#ff4444');
      this.promptText.setText(correctText);
      this.promptText.setColor('#ffffff');

      // Speak the Korean correction if applicable
      if (this.currentTerm?.korean && !this.customCorrectionText) {
        speechManager.speakKorean(this.currentTerm.korean);
      }

      // Record mistake for End-of-Round Review
      const promptStr = this.isTheoryEncounter
        ? (this.currentTheory?.prompt || 'Theory Question')
        : (this.currentTerm?.english || this.currentTerm?.korean || 'Technique');

      const alreadyLogged = this.roundMistakes.some(m =>
        (this.currentTerm && m.term?.id === this.currentTerm.id) ||
        (this.currentTheory && m.theory?.id === this.currentTheory.id)
      );

      if (!alreadyLogged) {
        this.roundMistakes.push({
          type: this.isTheoryEncounter ? 'theory' : 'technique',
          term: this.currentTerm || undefined,
          theory: this.currentTheory || undefined,
          prompt: promptStr,
          correctAnswer: correctText
        });
      }

      // Give 1.5s to read before moving to next question or ending game
      this.time.delayedCall(1600, () => {
        this.isProcessingResult = false;
        if (this.stats.health <= 0) {
          this.endGame(false);
        } else {
          // Remove current enemy and move to next
          if (this.currentEnemy) {
            this.tweens.add({
              targets: this.currentEnemy,
              alpha: 0,
              duration: 250,
              onComplete: () => {
                this.currentEnemy?.destroy();
                this.currentEnemy = null;
                this.startNextEncounter();
              }
            });
          } else {
            this.startNextEncounter();
          }
        }
      });
    }
  }

  private updateHUD(): void {
    this.scoreText.setText(`SCORE: ${this.stats.score}`);
    this.streakText.setText(`STREAK: ${this.stats.currentStreak}`);
    if (this.stats.currentStreak >= 3) {
      this.streakText.setColor('#00ff66');
    } else {
      this.streakText.setColor('#ffe135');
    }
  }

  private showScoreFloater(text: string): void {
    const floater = this.add.text(this.player.x + 80, this.player.y - 120, text, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '15px',
      color: '#00ff66',
      stroke: '#000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.tweens.add({
      targets: floater,
      y: floater.y - 50,
      alpha: 0,
      duration: 600,
      onComplete: () => floater.destroy()
    });
  }

  private quitToMenu(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    speechManager.stop();
    soundFx.playSelect();
    this.time.delayedCall(50, () => {
      this.scene.start('MenuScene', { gradeId: this.grade.id });
    });
  }

  private endGame(passed: boolean): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    speechManager.stop();
    if (passed) {
      soundFx.playFanfare();
    }
    this.time.delayedCall(50, () => {
      this.scene.start('ResultScene', {
        grade: this.grade,
        stats: this.stats,
        passed: passed,
        isCumulativeExam: this.isCumulativeExam,
        roundMistakes: this.roundMistakes
      });
    });
  }
}
