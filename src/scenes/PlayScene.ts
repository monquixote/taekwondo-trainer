import Phaser from 'phaser';
import { KupGrade, TermItem, TheoryQuestion, PlayerStats } from '../data/types';
import { loadPlayerStats, recordAnswerAttempt } from '../data/progress';
import { Player } from '../objects/Player';
import { Enemy, EnemyType } from '../objects/Enemy';
import { ActionDeck, ActionDeckOption } from '../objects/ActionDeck';
import { soundFx } from '../utils/soundEffects';
import { KOREAN_DICTIONARY } from '../data/dictionary';

interface PlaySceneInitData {
  grade: KupGrade;
  isHardMode?: boolean;
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

  // State
  private questionIndex: number = 0;
  private totalEncounters: number = 10;
  private isTheoryEncounter: boolean = false;
  private currentTerm: TermItem | null = null;
  private currentTheory: TheoryQuestion | null = null;
  private customCorrectionText: string | null = null;
  private isProcessingResult: boolean = false;
  private isTransitioning: boolean = false;

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
    this.isHardMode = data.isHardMode !== undefined ? data.isHardMode : localStorage.getItem('tagb_hard_mode') === 'true';
    this.stats = loadPlayerStats();
    // Start with max health for new session
    this.stats.health = this.stats.maxHealth;
    this.questionIndex = 0;
    this.isProcessingResult = false;
    this.isTransitioning = false;

    // Reset ALL stale references from previous game session.
    // Phaser reuses the same class instance on scene.start(),
    // so property initializers (e.g. hearts = []) do NOT re-run.
    this.hearts = [];
    this.currentEnemy = null;
    this.currentTerm = null;
    this.currentTheory = null;
    this.customCorrectionText = null;
    this.isTheoryEncounter = false;
  }

  create(): void {
    const { width, height } = this.scale;

    // 1. Scrolling Parallax Dojang Background
    this.bgTile = this.add.tileSprite(width / 2, height / 2 - 35, width, height - 70, 'dojang_bg');
    this.bgTile.setDisplaySize(width, height - 70);

    // Bottom arcade panel background for ActionDeck
    const deckBg = this.add.graphics();
    deckBg.fillStyle(0x0c0d18, 1);
    deckBg.fillRect(0, height - 100, width, 100);
    deckBg.lineStyle(2, 0x4a4a70, 1);
    deckBg.lineBetween(0, height - 100, width, height - 100);

    // 2. Player with grade-specific belt
    const groundY = height - 108;
    this.player = new Player(this, 90, groundY, this.grade.id);

    // 3. Action Deck (Choices UI)
    this.actionDeck = new ActionDeck(this, width / 2, height - 52);

    // 4. HUD Header
    this.createHUD(width);

    // 5. Prompt Banner (Displays English move requirement)
    this.createPromptBanner(width);

    // 6. Keyboard shortcuts (ESC to quit back to menu)
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-ESC', () => {
        this.quitToMenu();
      });
    }

    // 7. Start the first encounter with on-rails jog
    this.startNextEncounter();
  }

  private createHUD(width: number): void {
    // Top HUD bar background
    const hudBar = this.add.graphics();
    hudBar.fillStyle(0x000000, 0.75);
    hudBar.fillRect(0, 0, width, 20);
    hudBar.setDepth(60);

    // Health Hearts
    for (let i = 0; i < this.stats.maxHealth; i++) {
      const heart = this.add.image(14 + i * 14, 10, 'heart');
      heart.setScale(0.9);
      heart.setDepth(61);
      this.hearts.push(heart);
    }
    this.updateHearts();

    // Score & Streak in center
    this.scoreText = this.add.text(width / 2 - 55, 10, `SCORE: ${this.stats.score}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5).setDepth(61);

    this.streakText = this.add.text(width / 2 + 55, 10, 'STREAK: 0', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffe135'
    }).setOrigin(0.5, 0.5).setDepth(61);

    // Progress counter (positioned with spacing before action buttons)
    this.progressText = this.add.text(width - 52, 10, `TEST: 1/${this.totalEncounters}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#00ffaa'
    }).setOrigin(1, 0.5).setDepth(61);

    // Quit to menu button (next to audio mute button)
    const quitBtn = this.add.text(width - 32, 10, '🚪', {
      fontSize: '11px'
    }).setOrigin(0.5, 0.5).setDepth(61).setInteractive({ useHandCursor: true });
    quitBtn.on('pointerdown', () => {
      this.quitToMenu();
    });
    quitBtn.on('pointerover', () => quitBtn.setScale(1.2));
    quitBtn.on('pointerout', () => quitBtn.setScale(1.0));

    // Sound toggle
    const soundBtn = this.add.text(width - 12, 10, soundFx.isEnabled() ? '🔊' : '🔇', {
      fontSize: '11px'
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
    // Positioned at Y = 38 (leaves clear gap above player/enemy heads at Y ≈ 98)
    this.promptBanner = this.add.container(width / 2, 38);
    this.promptBanner.setDepth(50);

    const bannerW = 464;
    const bannerH = 34;

    const bannerBg = this.add.graphics();
    bannerBg.fillStyle(0x000000, 0.92);
    bannerBg.fillRoundedRect(-bannerW / 2, -bannerH / 2, bannerW, bannerH, 4);
    bannerBg.lineStyle(1.5, 0xffe135, 1);
    bannerBg.strokeRoundedRect(-bannerW / 2, -bannerH / 2, bannerW, bannerH, 4);

    // Row 1: Dedicated centered category badge
    this.categoryBadgeText = this.add.text(0, -8, '', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffe135'
    }).setOrigin(0.5, 0.5);

    // Row 2: Dedicated centered question text
    this.promptText = this.add.text(0, 7, '', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '8px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 440 }
    }).setOrigin(0.5, 0.5);

    this.promptBanner.add([bannerBg, this.categoryBadgeText, this.promptText]);
    this.promptBanner.setVisible(false);
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
    this.progressText.setText(`TEST: ${this.questionIndex}/${this.totalEncounters}`);
    this.promptBanner.setVisible(false);
    this.actionDeck.clearButtons();

    // Decide if this is a Theory encounter (every 4th question or final boss)
    this.isTheoryEncounter = (this.questionIndex % 4 === 0 || this.questionIndex === this.totalEncounters) && this.grade.theory.length > 0;

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
    const groundY = height - 108;

    let enemyType: EnemyType = 'enemy_purple';
    if (this.isTheoryEncounter) {
      enemyType = 'master_sifu';
    } else {
      enemyType = this.questionIndex % 2 === 0 ? 'enemy_blue' : 'enemy_purple';
    }

    if (this.currentEnemy) {
      this.currentEnemy.destroy();
    }

    this.currentEnemy = new Enemy(this, width + 30, groundY, enemyType);

    // Enemy approaches and halts at striking distance
    const stopDistance = this.isTheoryEncounter ? this.player.x + 110 : this.player.x + 80;
    this.currentEnemy.walkTo(stopDistance, 600, () => {
      this.presentQuestion();
    });
  }

  private presentQuestion(): void {
    let options: ActionDeckOption[] = [];

    if (this.isTheoryEncounter) {
      // Theory Question with Sifu
      const theoryIndex = Math.floor(Math.random() * this.grade.theory.length);
      this.currentTheory = this.grade.theory[theoryIndex];
      this.currentTerm = null;

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
      // Technique Question
      const termPool = this.grade.terms;
      const term = termPool[Math.floor(Math.random() * termPool.length)];
      this.currentTerm = term;
      this.currentTheory = null;

      // 40% chance to be Reverse (Korean -> English) - disabled in Hard Mode to focus on word building
      const isReverse = !this.isHardMode && Math.random() < 0.4;

      if (isReverse) {
        // Reverse: Korean -> English
        const categoryLabel = `◆ TRANSLATE ◆`;
        this.categoryBadgeText.setText(categoryLabel);
        this.categoryBadgeText.setColor('#ff99ff');
        this.promptText.setText(term.korean);
        this.promptBanner.setVisible(true);

        const distractors = termPool
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
          const categoryLabel = `◆ EXECUTE ◆`;
          this.categoryBadgeText.setText(categoryLabel);
          this.categoryBadgeText.setColor('#ffe135');
          this.promptText.setText(term.english);
          this.promptBanner.setVisible(true);

          // Collect 3 distractors from terms
          const distractors = termPool
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

    const termPool = this.grade.terms;
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

    this.promptText.setText(`${this.currentTerm.english}\n\n${sentenceDisplay}`);
    this.promptBanner.setVisible(true);

    // Collect distractors: grab all words from all terms, filter out the target word
    const allWords = new Set<string>();
    termPool.forEach(t => t.korean.replace(/[()]/g, '').trim().split(/\s+/).forEach(w => allWords.add(w)));
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
    const floater = this.add.text(this.player.x + 50, this.player.y - 70, text, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '10px',
      color: '#00ff66',
      stroke: '#000',
      strokeThickness: 3
    }).setOrigin(0.5);

    this.tweens.add({
      targets: floater,
      y: floater.y - 30,
      alpha: 0,
      duration: 600,
      onComplete: () => floater.destroy()
    });
  }

  private quitToMenu(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    soundFx.playSelect();
    this.time.delayedCall(50, () => {
      this.scene.start('MenuScene', { gradeId: this.grade.id });
    });
  }

  private endGame(passed: boolean): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    if (passed) {
      soundFx.playFanfare();
    }
    this.time.delayedCall(50, () => {
      this.scene.start('ResultScene', {
        grade: this.grade,
        stats: this.stats,
        passed: passed
      });
    });
  }
}
