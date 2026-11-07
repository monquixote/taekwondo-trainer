import Phaser from 'phaser';
import { KupGrade, PlayerStats } from '../data/types';
import { soundFx } from '../utils/soundEffects';
import { RoundMistake } from './PlayScene';

interface ResultSceneInitData {
  grade: KupGrade;
  stats: PlayerStats;
  passed: boolean;
  isCumulativeExam?: boolean;
  roundMistakes?: RoundMistake[];
}

export class ResultScene extends Phaser.Scene {
  private grade!: KupGrade;
  private stats!: PlayerStats;
  private passed!: boolean;
  private isCumulativeExam: boolean = false;
  private roundMistakes: RoundMistake[] = [];

  constructor() {
    super('ResultScene');
  }

  init(data: ResultSceneInitData): void {
    this.grade = data.grade;
    this.stats = data.stats;
    this.passed = data.passed;
    this.isCumulativeExam = data.isCumulativeExam !== undefined
      ? data.isCumulativeExam
      : localStorage.getItem('tagb_cumulative_exam') === 'true';
    this.roundMistakes = data.roundMistakes || [];
  }

  create(): void {
    const { width, height } = this.scale;

    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x0a0a14, 0.95);
    bg.fillRect(0, 0, width, height);

    // Decorative border
    bg.lineStyle(2, this.passed ? 0x00ff66 : 0xff3333, 1);
    bg.strokeRect(8, 8, width - 16, height - 16);

    // Header Title
    let titleText = 'KEEP PRACTICING!';
    let titleColor = '#ff4444';
    if (this.roundMistakes.length === 0) {
      titleText = 'FLAWLESS PASS!';
      titleColor = '#ffe135';
    } else if (this.passed) {
      titleText = 'GRADING PASSED!';
      titleColor = '#00ff66';
    }

    this.add.text(width / 2, 26, titleText, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '13px',
      color: titleColor
    }).setOrigin(0.5);

    // Grade Title Subtitle
    const gradeTitleText = this.isCumulativeExam
      ? `${this.grade.title} (CUMULATIVE EXAM)`
      : this.grade.title;

    this.add.text(width / 2, 44, gradeTitleText, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffe135'
    }).setOrigin(0.5);

    // Stats Bar
    this.add.text(width / 2, 62, `SCORE: ${this.stats.score}   |   STREAK: ${this.stats.bestStreak}   |   DEFEATED: ${this.stats.totalEnemiesDefeated}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#cccccc'
    }).setOrigin(0.5);

    // Review Box Container
    const boxX = 16;
    const boxY = 76;
    const boxW = width - 32;
    const boxH = 138;

    const reviewBg = this.add.graphics();
    reviewBg.fillStyle(0x101222, 0.92);
    reviewBg.fillRoundedRect(boxX, boxY, boxW, boxH, 4);
    reviewBg.lineStyle(1.5, this.roundMistakes.length > 0 ? 0xff4444 : 0x00ff88, 1);
    reviewBg.strokeRoundedRect(boxX, boxY, boxW, boxH, 4);

    if (this.roundMistakes.length === 0) {
      // 0 Mistakes: Flawless performance!
      this.add.text(width / 2, boxY + 36, '★ PERFECT FORM! ZERO MISTAKES! ★', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '9px',
        color: '#ffe135'
      }).setOrigin(0.5);

      this.add.text(width / 2, boxY + 68, 'All technique strikes, blocks, and theory questions', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px',
        color: '#ffffff'
      }).setOrigin(0.5);

      this.add.text(width / 2, boxY + 90, 'were executed with complete martial accuracy.', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px',
        color: '#00ff88'
      }).setOrigin(0.5);

    } else {
      // Mistakes happened: End-of-Round Mistake Review
      this.add.text(boxX + 16, boxY + 16, `MISTAKE REVIEW (${this.roundMistakes.length} MISSED THIS ROUND):`, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '8px',
        color: '#ff6666'
      }).setOrigin(0, 0.5);

      const maxToDisplay = 4;
      const displayCount = Math.min(this.roundMistakes.length, maxToDisplay);
      const hasOverflow = this.roundMistakes.length > maxToDisplay;

      for (let i = 0; i < (hasOverflow ? maxToDisplay - 1 : displayCount); i++) {
        const m = this.roundMistakes[i];
        const rowY = boxY + 38 + i * 22;

        // Truncate prompt if long
        const promptRaw = m.prompt;
        const promptDisplay = promptRaw.length > 22 ? promptRaw.substring(0, 20) + '..' : promptRaw;

        // Truncate answer if long
        const answerRaw = m.correctAnswer;
        const answerDisplay = answerRaw.length > 25 ? answerRaw.substring(0, 23) + '..' : answerRaw;

        // Question Prompt (Left)
        this.add.text(boxX + 16, rowY, `✗ ${promptDisplay}`, {
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '7px',
          color: '#ffffff'
        }).setOrigin(0, 0.5);

        // Correct Answer (Right)
        this.add.text(boxX + 215, rowY, `➔ ${answerDisplay}`, {
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '7px',
          color: '#00ff88'
        }).setOrigin(0, 0.5);
      }

      if (hasOverflow) {
        const remaining = this.roundMistakes.length - (maxToDisplay - 1);
        this.add.text(boxX + 16, boxY + 38 + (maxToDisplay - 1) * 22, `... and ${remaining} more missed item(s).`, {
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '7px',
          color: '#aaaaaa'
        }).setOrigin(0, 0.5);
      }

      // Review tip at bottom of box
      this.add.text(width / 2, boxY + boxH - 12, '💡 Tip: Click RETRY MISSED to immediately drill these mistakes!', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '6px',
        color: '#ffbb44'
      }).setOrigin(0.5);
    }

    // Action Buttons
    let isTransitioning = false;
    const btnY = height - 28;
    const btnH = 28;

    const handleFullRetry = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      soundFx.playSelect();
      this.time.delayedCall(50, () => {
        this.scene.start('PlayScene', {
          grade: this.grade,
          isCumulativeExam: this.isCumulativeExam
        });
      });
    };

    const handleRetryMissed = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      soundFx.playSelect();
      this.time.delayedCall(50, () => {
        this.scene.start('PlayScene', {
          grade: this.grade,
          isCumulativeExam: this.isCumulativeExam,
          retryMistakes: this.roundMistakes
        });
      });
    };

    const handleMenu = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      soundFx.playSelect();
      this.time.delayedCall(50, () => {
        this.scene.start('MenuScene', { gradeId: this.grade.id });
      });
    };

    if (this.roundMistakes.length > 0) {
      // 3 Buttons Layout: [RETRY MISSED] [FULL ROUND] [MAIN MENU]
      const btnW = 136;

      // 1. Retry Missed (Priority CTA)
      const btn1X = width / 2 - 145;
      const btn1Container = this.add.container(btn1X, btnY);
      const btn1Bg = this.add.graphics();
      btn1Bg.fillStyle(0x7a3a00, 1);
      btn1Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      btn1Bg.lineStyle(1.5, 0xff9900, 1);
      btn1Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);

      const btn1Text = this.add.text(0, 0, `RETRY MISSED (${this.roundMistakes.length})`, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px',
        color: '#ffffff'
      }).setOrigin(0.5);

      const btn1Zone = this.add.zone(0, 0, btnW, btnH).setInteractive({ useHandCursor: true });
      btn1Container.add([btn1Bg, btn1Text, btn1Zone]);
      btn1Zone.on('pointerdown', handleRetryMissed);
      btn1Zone.on('pointerover', () => {
        btn1Bg.clear();
        btn1Bg.fillStyle(0xa65000, 1);
        btn1Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn1Bg.lineStyle(1.5, 0xffbb33, 1);
        btn1Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });
      btn1Zone.on('pointerout', () => {
        btn1Bg.clear();
        btn1Bg.fillStyle(0x7a3a00, 1);
        btn1Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn1Bg.lineStyle(1.5, 0xff9900, 1);
        btn1Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });

      // 2. Full Round
      const btn2X = width / 2;
      const btn2Container = this.add.container(btn2X, btnY);
      const btn2Bg = this.add.graphics();
      btn2Bg.fillStyle(0x0e7e3e, 1);
      btn2Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      btn2Bg.lineStyle(1.5, 0x00ff66, 1);
      btn2Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);

      const btn2Text = this.add.text(0, 0, 'FULL ROUND', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px',
        color: '#ffffff'
      }).setOrigin(0.5);

      const btn2Zone = this.add.zone(0, 0, btnW, btnH).setInteractive({ useHandCursor: true });
      btn2Container.add([btn2Bg, btn2Text, btn2Zone]);
      btn2Zone.on('pointerdown', handleFullRetry);
      btn2Zone.on('pointerover', () => {
        btn2Bg.clear();
        btn2Bg.fillStyle(0x189e52, 1);
        btn2Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn2Bg.lineStyle(1.5, 0x55ff99, 1);
        btn2Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });
      btn2Zone.on('pointerout', () => {
        btn2Bg.clear();
        btn2Bg.fillStyle(0x0e7e3e, 1);
        btn2Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn2Bg.lineStyle(1.5, 0x00ff66, 1);
        btn2Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });

      // 3. Main Menu
      const btn3X = width / 2 + 145;
      const btn3Container = this.add.container(btn3X, btnY);
      const btn3Bg = this.add.graphics();
      btn3Bg.fillStyle(0x282848, 1);
      btn3Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      btn3Bg.lineStyle(1.5, 0x7777aa, 1);
      btn3Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);

      const btn3Text = this.add.text(0, 0, 'MAIN MENU', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '7px',
        color: '#ffffff'
      }).setOrigin(0.5);

      const btn3Zone = this.add.zone(0, 0, btnW, btnH).setInteractive({ useHandCursor: true });
      btn3Container.add([btn3Bg, btn3Text, btn3Zone]);
      btn3Zone.on('pointerdown', handleMenu);
      btn3Zone.on('pointerover', () => {
        btn3Bg.clear();
        btn3Bg.fillStyle(0x3d3d6e, 1);
        btn3Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn3Bg.lineStyle(1.5, 0xaaaae0, 1);
        btn3Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });
      btn3Zone.on('pointerout', () => {
        btn3Bg.clear();
        btn3Bg.fillStyle(0x282848, 1);
        btn3Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn3Bg.lineStyle(1.5, 0x7777aa, 1);
        btn3Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });

    } else {
      // 2 Buttons Layout: [PLAY AGAIN] [MAIN MENU]
      const btnW = 160;

      // 1. Play Again
      const btn1X = width / 2 - 95;
      const btn1Container = this.add.container(btn1X, btnY);
      const btn1Bg = this.add.graphics();
      btn1Bg.fillStyle(0x0e7e3e, 1);
      btn1Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      btn1Bg.lineStyle(2, 0x00ff66, 1);
      btn1Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);

      const btn1Text = this.add.text(0, 0, 'PLAY AGAIN', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '8px',
        color: '#ffffff'
      }).setOrigin(0.5);

      const btn1Zone = this.add.zone(0, 0, btnW, btnH).setInteractive({ useHandCursor: true });
      btn1Container.add([btn1Bg, btn1Text, btn1Zone]);
      btn1Zone.on('pointerdown', handleFullRetry);
      btn1Zone.on('pointerover', () => {
        btn1Bg.clear();
        btn1Bg.fillStyle(0x189e52, 1);
        btn1Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn1Bg.lineStyle(2, 0x55ff99, 1);
        btn1Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });
      btn1Zone.on('pointerout', () => {
        btn1Bg.clear();
        btn1Bg.fillStyle(0x0e7e3e, 1);
        btn1Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn1Bg.lineStyle(2, 0x00ff66, 1);
        btn1Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });

      // 2. Main Menu
      const btn2X = width / 2 + 95;
      const btn2Container = this.add.container(btn2X, btnY);
      const btn2Bg = this.add.graphics();
      btn2Bg.fillStyle(0x282848, 1);
      btn2Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      btn2Bg.lineStyle(2, 0x7777aa, 1);
      btn2Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);

      const btn2Text = this.add.text(0, 0, 'MAIN MENU', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '8px',
        color: '#ffffff'
      }).setOrigin(0.5);

      const btn2Zone = this.add.zone(0, 0, btnW, btnH).setInteractive({ useHandCursor: true });
      btn2Container.add([btn2Bg, btn2Text, btn2Zone]);
      btn2Zone.on('pointerdown', handleMenu);
      btn2Zone.on('pointerover', () => {
        btn2Bg.clear();
        btn2Bg.fillStyle(0x3d3d6e, 1);
        btn2Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn2Bg.lineStyle(2, 0xaaaae0, 1);
        btn2Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });
      btn2Zone.on('pointerout', () => {
        btn2Bg.clear();
        btn2Bg.fillStyle(0x282848, 1);
        btn2Bg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
        btn2Bg.lineStyle(2, 0x7777aa, 1);
        btn2Bg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
      });
    }

    if (this.input.keyboard) {
      if (this.roundMistakes.length > 0) {
        this.input.keyboard.on('keydown-R', handleRetryMissed);
        this.input.keyboard.on('keydown-SPACE', handleRetryMissed);
        this.input.keyboard.on('keydown-ENTER', handleRetryMissed);
        this.input.keyboard.on('keydown-F', handleFullRetry);
      } else {
        this.input.keyboard.on('keydown-SPACE', handleFullRetry);
        this.input.keyboard.on('keydown-ENTER', handleFullRetry);
      }
      this.input.keyboard.on('keydown-ESC', handleMenu);
      this.input.keyboard.on('keydown-M', handleMenu);
    }
  }
}
