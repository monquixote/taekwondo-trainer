import Phaser from 'phaser';
import { ALL_GRADES, getDefaultGrade } from '../data/grades';
import { KupGrade } from '../data/types';
import { loadPlayerStats } from '../data/progress';
import { soundFx } from '../utils/soundEffects';

export class MenuScene extends Phaser.Scene {
  private selectedGradeIndex: number = 1; // Default to 8th Kup (index 1 in ALL_GRADES [kup9, kup8])
  private gradeText!: Phaser.GameObjects.Text;
  private beltIconGraphics!: Phaser.GameObjects.Graphics;
  private playerPreview!: Phaser.GameObjects.Image;

  constructor() {
    super('MenuScene');
  }

  init(data?: { gradeId?: string }): void {
    if (data?.gradeId) {
      const idx = ALL_GRADES.findIndex(g => g.id === data.gradeId);
      if (idx !== -1) {
        this.selectedGradeIndex = idx;
        return;
      }
    }
    const defaultGrade = getDefaultGrade();
    const foundIdx = ALL_GRADES.findIndex(g => g.id === defaultGrade.id);
    if (foundIdx !== -1) {
      this.selectedGradeIndex = foundIdx;
    }
  }

  create(): void {
    const { width, height } = this.scale;
    const stats = loadPlayerStats();

    // 1. Background (Dojang screen)
    const bg = this.add.image(width / 2, height / 2 - 20, 'dojang_bg');
    bg.setDisplaySize(width, height);
    bg.setAlpha(0.65);

    // Dark overlay for readability
    const overlay = this.add.graphics();
    overlay.fillStyle(0x0a0a14, 0.7);
    overlay.fillRect(0, 0, width, height);

    // 2. Title Banner (Unobstructed at top center)
    this.add.text(width / 2, 38, 'TAE KWON-DO TRAINER', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '19px',
      color: '#ffe135',
      stroke: '#b83000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // 3. Characters Flanking (Player on far left, Enemy on far right - completely clear of title!)
    const groundY = 158;
    const initialGrade = ALL_GRADES[this.selectedGradeIndex] || ALL_GRADES[0];
    this.playerPreview = this.add.image(54, groundY, `player_idle_${initialGrade.id}`);
    this.playerPreview.setOrigin(0.5, 1);
    this.playerPreview.setScale(1.35);

    this.add.text(54, groundY + 10, 'PLAYER', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffe135',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5, 0.5);

    const enemyPreview = this.add.image(width - 54, groundY, 'enemy_purple');
    enemyPreview.setOrigin(0.5, 1);
    enemyPreview.setScale(1.35);

    this.add.text(width - 54, groundY + 10, 'OPPONENT', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ff4444',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5, 0.5);

    // 4. Grade Selector in a Dedicated Center Arcade Box
    const boxY = 126;
    const boxW = 280;
    const boxH = 58;

    const selectorBox = this.add.graphics();
    selectorBox.fillStyle(0x0a0c18, 0.95);
    selectorBox.fillRoundedRect(width / 2 - boxW / 2, boxY - boxH / 2, boxW, boxH, 4);
    selectorBox.lineStyle(1.5, 0xffe135, 1);
    selectorBox.strokeRoundedRect(width / 2 - boxW / 2, boxY - boxH / 2, boxW, boxH, 4);

    this.add.text(width / 2, boxY - 17, '◆ SELECT GRADE ◆', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffe135'
    }).setOrigin(0.5);

    this.gradeText = this.add.text(width / 2, boxY, '', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '8px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 220 }
    }).setOrigin(0.5);

    // Left/Right Arrow buttons for selecting grade
    const leftArrow = this.add.text(width / 2 - boxW / 2 + 16, boxY, '◀', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '13px',
      color: '#ffe135'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const rightArrow = this.add.text(width / 2 + boxW / 2 - 16, boxY, '▶', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '13px',
      color: '#ffe135'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    leftArrow.on('pointerdown', () => this.changeGrade(-1));
    rightArrow.on('pointerdown', () => this.changeGrade(1));

    this.beltIconGraphics = this.add.graphics();
    this.updateGradeDisplay();

    // 5. High Scores / Stats Summary
    this.add.text(width / 2, 180, `BEST STREAK: ${stats.bestStreak}  |  DEFEATED: ${stats.totalEnemiesDefeated}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#00ff88'
    }).setOrigin(0.5);

    // 6. Action Buttons
    let isTransitioning = false;

    // Start Button Container
    const startContainer = this.add.container(width / 2 - 80, 222);
    
    const startBg = this.add.graphics();
    startBg.fillStyle(0x0e7e3e, 1);
    startBg.fillRect(-70, -16, 140, 32);
    startBg.lineStyle(2, 0x00ff66, 1);
    startBg.strokeRect(-70, -16, 140, 32);

    const startText = this.add.text(0, 0, 'START GAME', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '8px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const startZone = this.add.zone(0, 0, 140, 32).setInteractive({ useHandCursor: true });
    startContainer.add([startBg, startText, startZone]);

    // Blink tween for Start Game
    this.tweens.add({
      targets: startText,
      alpha: 0.3,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    const startGame = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      soundFx.playSelect();
      
      this.time.delayedCall(50, () => {
        const currentGrade = ALL_GRADES[this.selectedGradeIndex];
        this.scene.start('PlayScene', { grade: currentGrade });
      });
    };

    startZone.on('pointerdown', startGame);
    startZone.on('pointerover', () => {
      startBg.clear();
      startBg.fillStyle(0x189e52, 1);
      startBg.fillRect(-70, -16, 140, 32);
      startBg.lineStyle(2, 0x55ff99, 1);
      startBg.strokeRect(-70, -16, 140, 32);
    });
    startZone.on('pointerout', () => {
      startBg.clear();
      startBg.fillStyle(0x0e7e3e, 1);
      startBg.fillRect(-70, -16, 140, 32);
      startBg.lineStyle(2, 0x00ff66, 1);
      startBg.strokeRect(-70, -16, 140, 32);
    });

    // Stats Button Container
    const statsContainer = this.add.container(width / 2 + 80, 222);
    
    const statsBg = this.add.graphics();
    statsBg.fillStyle(0x282848, 1);
    statsBg.fillRect(-70, -16, 140, 32);
    statsBg.lineStyle(2, 0x7777aa, 1);
    statsBg.strokeRect(-70, -16, 140, 32);

    const statsText = this.add.text(0, 0, 'VIEW STATS', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '8px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const statsZone = this.add.zone(0, 0, 140, 32).setInteractive({ useHandCursor: true });
    statsContainer.add([statsBg, statsText, statsZone]);

    const viewStats = () => {
      if (isTransitioning) return;
      isTransitioning = true;
      soundFx.playSelect();
      this.time.delayedCall(50, () => {
        this.scene.start('StatsScene');
      });
    };

    statsZone.on('pointerdown', viewStats);
    statsZone.on('pointerover', () => {
      statsBg.clear();
      statsBg.fillStyle(0x3d3d6e, 1);
      statsBg.fillRect(-70, -16, 140, 32);
      statsBg.lineStyle(2, 0xaaaae0, 1);
      statsBg.strokeRect(-70, -16, 140, 32);
    });
    statsZone.on('pointerout', () => {
      statsBg.clear();
      statsBg.fillStyle(0x282848, 1);
      statsBg.fillRect(-70, -16, 140, 32);
      statsBg.lineStyle(2, 0x7777aa, 1);
      statsBg.strokeRect(-70, -16, 140, 32);
    });

    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-SPACE', startGame);
      this.input.keyboard.on('keydown-ENTER', startGame);
      this.input.keyboard.on('keydown-S', viewStats);
      this.input.keyboard.on('keydown-LEFT', () => this.changeGrade(-1));
      this.input.keyboard.on('keydown-RIGHT', () => this.changeGrade(1));
    }



    // 7. Sound Toggle button in top right
    const soundToggle = this.add.text(width - 15, 12, soundFx.isEnabled() ? '🔊' : '🔇', {
      fontSize: '12px'
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true });

    soundToggle.on('pointerdown', () => {
      const enabled = soundFx.toggleSound();
      soundToggle.setText(enabled ? '🔊' : '🔇');
    });
  }

  private changeGrade(direction: number): void {
    soundFx.playSelect();
    this.selectedGradeIndex = (this.selectedGradeIndex + direction + ALL_GRADES.length) % ALL_GRADES.length;
    this.updateGradeDisplay();
  }

  private updateGradeDisplay(): void {
    const grade: KupGrade = ALL_GRADES[this.selectedGradeIndex];
    this.gradeText.setText(grade.title);

    // Update Player character's belt on title screen
    if (this.playerPreview) {
      this.playerPreview.setTexture(`player_idle_${grade.id}`);
    }

    // Draw little belt preview inside the selector box
    this.beltIconGraphics.clear();
    const bx = this.scale.width / 2 - 35;
    const by = 138;

    // Belt color
    const colorInt = parseInt(grade.beltColor.replace('#', '0x'), 16);
    this.beltIconGraphics.fillStyle(colorInt, 1);
    this.beltIconGraphics.fillRect(bx, by, 70, 6);
    this.beltIconGraphics.lineStyle(1, 0x222222, 1);
    this.beltIconGraphics.strokeRect(bx, by, 70, 6);

    // Stripe
    if (grade.stripeColor) {
      const stripeInt = parseInt(grade.stripeColor.replace('#', '0x'), 16);
      this.beltIconGraphics.fillStyle(stripeInt, 1);
      this.beltIconGraphics.fillRect(bx + 48, by, 8, 6);
    }
  }
}
