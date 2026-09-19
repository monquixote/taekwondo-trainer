import Phaser from 'phaser';
import { KupGrade, PlayerStats } from '../data/types';
import { soundFx } from '../utils/soundEffects';

interface ResultSceneInitData {
  grade: KupGrade;
  stats: PlayerStats;
  passed: boolean;
}

export class ResultScene extends Phaser.Scene {
  private grade!: KupGrade;
  private stats!: PlayerStats;
  private passed!: boolean;

  constructor() {
    super('ResultScene');
  }

  init(data: ResultSceneInitData): void {
    this.grade = data.grade;
    this.stats = data.stats;
    this.passed = data.passed;
  }

  create(): void {
    const { width, height } = this.scale;

    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x0a0a14, 0.95);
    bg.fillRect(0, 0, width, height);

    // Decorative border
    bg.lineStyle(2, this.passed ? 0x00ff66 : 0xff3333, 1);
    bg.strokeRect(10, 10, width - 20, height - 20);

    // Header Title
    const titleText = this.passed ? 'GRADING PASSED!' : 'KEEP PRACTICING!';
    const titleColor = this.passed ? '#00ff66' : '#ff4444';

    this.add.text(width / 2, 34, titleText, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '15px',
      color: titleColor
    }).setOrigin(0.5);

    // Grade Title
    this.add.text(width / 2, 54, this.grade.title, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '8px',
      color: '#ffe135'
    }).setOrigin(0.5);

    // Stats Table
    const statsY = 82;
    this.add.text(width / 2, statsY, `FINAL SCORE: ${this.stats.score}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '10px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(width / 2, statsY + 18, `BEST STREAK: ${this.stats.bestStreak}  |  TOTAL BEATEN: ${this.stats.totalEnemiesDefeated}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '8px',
      color: '#aaaaaa'
    }).setOrigin(0.5);

    // Review of Missed Items (Spaced Repetition / Study Tip)
    const reviewBoxY = 120;
    const missedTerms = this.grade.terms.filter(t => {
      const rec = this.stats.termAccuracy[t.id];
      return rec && rec.incorrect > 0;
    });

    if (missedTerms.length > 0) {
      this.add.text(width / 2, reviewBoxY, 'FOCUS ON THESE TERMS:', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '8px',
        color: '#ff9900'
      }).setOrigin(0.5);

      missedTerms.slice(0, 3).forEach((term, idx) => {
        const line = `${term.english} -> ${term.korean}`;
        const truncated = line.length > 40 ? line.substring(0, 38) + '..' : line;
        this.add.text(width / 2, reviewBoxY + 16 + idx * 14, truncated, {
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '7px',
          color: '#ffffff'
        }).setOrigin(0.5);
      });
    } else {
      this.add.text(width / 2, reviewBoxY + 15, '★ PERFECT RECALL! EXCELLENT FORM! ★', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '8px',
        color: '#ffe135'
      }).setOrigin(0.5);
    }

    // Action Buttons: "PLAY AGAIN" & "MAIN MENU"
    const btnY = height - 38;
    const btnW = 160;
    const btnH = 36;

    // Retry Button Container
    const retryContainer = this.add.container(width / 2 - 95, btnY);
    
    const retryBg = this.add.graphics();
    retryBg.fillStyle(0x0e7e3e, 1);
    retryBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
    retryBg.lineStyle(2, 0x00ff66, 1);
    retryBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);

    const retryText = this.add.text(0, 0, 'PLAY AGAIN', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '9px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const retryZone = this.add.zone(0, 0, btnW, btnH).setInteractive({ useHandCursor: true });
    retryContainer.add([retryBg, retryText, retryZone]);

    let isTransitioning = false;
    
    const handleRetry = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      soundFx.playSelect();
      this.time.delayedCall(50, () => {
        this.scene.start('PlayScene', { grade: this.grade });
      });
    };

    retryZone.on('pointerdown', handleRetry);
    retryZone.on('pointerover', () => {
      retryBg.clear();
      retryBg.fillStyle(0x189e52, 1);
      retryBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      retryBg.lineStyle(2, 0x55ff99, 1);
      retryBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
    });
    retryZone.on('pointerout', () => {
      retryBg.clear();
      retryBg.fillStyle(0x0e7e3e, 1);
      retryBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      retryBg.lineStyle(2, 0x00ff66, 1);
      retryBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
    });

    // Menu Button Container
    const menuContainer = this.add.container(width / 2 + 95, btnY);
    
    const menuBg = this.add.graphics();
    menuBg.fillStyle(0x282848, 1);
    menuBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
    menuBg.lineStyle(2, 0x7777aa, 1);
    menuBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);

    const menuTextObj = this.add.text(0, 0, 'MAIN MENU', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '9px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const menuZone = this.add.zone(0, 0, btnW, btnH).setInteractive({ useHandCursor: true });
    menuContainer.add([menuBg, menuTextObj, menuZone]);

    const handleMenu = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      soundFx.playSelect();
      this.time.delayedCall(50, () => {
        this.scene.start('MenuScene', { gradeId: this.grade.id });
      });
    };

    menuZone.on('pointerdown', handleMenu);
    menuZone.on('pointerover', () => {
      menuBg.clear();
      menuBg.fillStyle(0x3d3d6e, 1);
      menuBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      menuBg.lineStyle(2, 0xaaaae0, 1);
      menuBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
    });
    menuZone.on('pointerout', () => {
      menuBg.clear();
      menuBg.fillStyle(0x282848, 1);
      menuBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      menuBg.lineStyle(2, 0x7777aa, 1);
      menuBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
    });

    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-SPACE', handleRetry);
      this.input.keyboard.on('keydown-ENTER', handleRetry);
      this.input.keyboard.on('keydown-ESC', handleMenu);
    }


  }
}
