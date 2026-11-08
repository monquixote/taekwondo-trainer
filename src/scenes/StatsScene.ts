import Phaser from 'phaser';
import { loadPlayerStats, clearPlayerStats } from '../data/progress';
import { ALL_GRADES } from '../data/grades';
import { soundFx } from '../utils/soundEffects';

export class StatsScene extends Phaser.Scene {
  private isTransitioning: boolean = false;

  constructor() {
    super('StatsScene');
  }

  init(): void {
    this.isTransitioning = false;
  }

  create(): void {
    const { width, height } = this.scale;
    const stats = loadPlayerStats();

    // 1. Background
    const bg = this.add.image(width / 2, height / 2, 'dojang_bg');
    bg.setDisplaySize(width, height);
    bg.setAlpha(0.3);

    const overlay = this.add.graphics();
    overlay.fillStyle(0x0a0a14, 0.88);
    overlay.fillRect(0, 0, width, height);

    // 2. Title
    this.add.text(width / 2, 45, 'PERFORMANCE STATS', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '24px',
      color: '#ffe135',
      stroke: '#b83000',
      strokeThickness: 5
    }).setOrigin(0.5);

    // Overall Stats
    this.add.text(width / 2, 92, `BEST STREAK: ${stats.bestStreak}   TOTAL DEFEATED: ${stats.totalEnemiesDefeated}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '13px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // 3. Process Term Accuracy
    interface TermStat {
      id: string;
      text: string;
      correct: number;
      incorrect: number;
      total: number;
      ratio: number;
    }

    const termStats: TermStat[] = [];

    // Helper to find text
    const getTermText = (id: string): string => {
      for (const grade of ALL_GRADES) {
        for (const term of grade.terms) {
          if (term.id === id) return term.english;
        }
        for (const theory of grade.theory) {
          if (theory.id === id) return theory.prompt;
        }
      }
      return id;
    };

    for (const [id, record] of Object.entries(stats.termAccuracy)) {
      const total = record.correct + record.incorrect;
      if (total > 0) {
        let activeRatio = record.correct / total;
        let displayCorrect = record.correct;
        let displayTotal = total;
        
        // If we have history, use the rolling average
        if (record.history && record.history.length > 0) {
          displayCorrect = record.history.filter(h => h).length;
          displayTotal = record.history.length;
          activeRatio = displayCorrect / displayTotal;
        }

        termStats.push({
          id,
          text: getTermText(id),
          correct: displayCorrect,
          incorrect: displayTotal - displayCorrect,
          total: displayTotal,
          ratio: activeRatio
        });
      }
    }

    // Needs Practice (ratio < 0.6 or incorrect >= correct, sorted by worst ratio, then most total)
    const needsPractice = termStats
      .filter(t => t.ratio < 0.8)
      .sort((a, b) => a.ratio - b.ratio || b.total - a.total)
      .slice(0, 5);

    // Mastered (ratio >= 0.8, sorted by best ratio, then most total)
    const mastered = termStats
      .filter(t => t.ratio >= 0.8)
      .sort((a, b) => b.ratio - a.ratio || b.total - a.total)
      .slice(0, 5);

    // Column Setup
    const col1X = width * 0.25;
    const col2X = width * 0.75;
    const startY = 170;
    const lineH = 46;

    // Needs Practice Column
    this.add.text(col1X, 136, 'NEEDS PRACTICE', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '15px',
      color: '#ff4444'
    }).setOrigin(0.5);

    if (needsPractice.length === 0) {
      this.add.text(col1X, startY + 36, 'No weak areas yet!', {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '18px',
        color: '#aaaaaa'
      }).setOrigin(0.5);
    } else {
      needsPractice.forEach((t, i) => {
        const pct = Math.round(t.ratio * 100);
        const truncated = t.text.length > 34 ? t.text.substring(0, 32) + '..' : t.text;
        this.add.text(col1X, startY + (i * lineH), `${truncated}\n${pct}% (${t.correct}/${t.total})`, {
          fontFamily: "'Fredoka', 'Press Start 2P', sans-serif",
          fontSize: '15px',
          fontStyle: 'bold',
          color: '#ffaaaa',
          align: 'center',
          lineSpacing: 4
        }).setOrigin(0.5, 0);
      });
    }

    // Mastered Column
    this.add.text(col2X, 136, 'MASTERED', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '15px',
      color: '#00ff66'
    }).setOrigin(0.5);

    if (mastered.length === 0) {
      this.add.text(col2X, startY + 36, 'Keep training!', {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '18px',
        color: '#aaaaaa'
      }).setOrigin(0.5);
    } else {
      mastered.forEach((t, i) => {
        const pct = Math.round(t.ratio * 100);
        const truncated = t.text.length > 34 ? t.text.substring(0, 32) + '..' : t.text;
        this.add.text(col2X, startY + (i * lineH), `${truncated}\n${pct}% (${t.correct}/${t.total})`, {
          fontFamily: "'Fredoka', 'Press Start 2P', sans-serif",
          fontSize: '15px',
          fontStyle: 'bold',
          color: '#aaffaa',
          align: 'center',
          lineSpacing: 4
        }).setOrigin(0.5, 0);
      });
    }

    // 4. Action Buttons
    const btnW = 280;
    const btnH = 54;
    const btnY = height - 52;

    // Clear Stats Button
    const clearContainer = this.add.container(width / 2 - 160, btnY);

    const clearBg = this.add.graphics();
    clearBg.fillStyle(0x4a1818, 1);
    clearBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
    clearBg.lineStyle(3, 0xaa4444, 1);
    clearBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);

    const clearText = this.add.text(0, 0, 'CLEAR STATS', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '13px',
      color: '#ffaaaa'
    }).setOrigin(0.5);

    const clearZone = this.add.zone(0, 0, btnW, btnH).setInteractive({ useHandCursor: true });
    clearContainer.add([clearBg, clearText, clearZone]);

    const doClear = () => {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      soundFx.playSelect();
      clearPlayerStats();
      this.time.delayedCall(50, () => {
        this.scene.restart(); // Refresh the current scene to show empty stats
      });
    };

    clearZone.on('pointerdown', doClear);
    clearZone.on('pointerover', () => {
      clearBg.clear();
      clearBg.fillStyle(0x6e2828, 1);
      clearBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      clearBg.lineStyle(3, 0xff6666, 1);
      clearBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
    });
    clearZone.on('pointerout', () => {
      clearBg.clear();
      clearBg.fillStyle(0x4a1818, 1);
      clearBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      clearBg.lineStyle(3, 0xaa4444, 1);
      clearBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
    });

    // Back Button (Main Menu)
    const backContainer = this.add.container(width / 2 + 160, btnY);

    const backBg = this.add.graphics();
    backBg.fillStyle(0x282848, 1);
    backBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
    backBg.lineStyle(3, 0x7777aa, 1);
    backBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);

    const backText = this.add.text(0, 0, 'MAIN MENU', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '13px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const backZone = this.add.zone(0, 0, btnW, btnH).setInteractive({ useHandCursor: true });
    backContainer.add([backBg, backText, backZone]);

    const goBack = () => {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      soundFx.playSelect();
      this.time.delayedCall(50, () => {
        this.scene.start('MenuScene');
      });
    };

    backZone.on('pointerdown', goBack);
    backZone.on('pointerover', () => {
      backBg.clear();
      backBg.fillStyle(0x3d3d6e, 1);
      backBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      backBg.lineStyle(3, 0xaaaae0, 1);
      backBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
    });
    backZone.on('pointerout', () => {
      backBg.clear();
      backBg.fillStyle(0x282848, 1);
      backBg.fillRect(-btnW / 2, -btnH / 2, btnW, btnH);
      backBg.lineStyle(3, 0x7777aa, 1);
      backBg.strokeRect(-btnW / 2, -btnH / 2, btnW, btnH);
    });

    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-ESC', goBack);
      this.input.keyboard.on('keydown-SPACE', goBack);
      this.input.keyboard.on('keydown-ENTER', goBack);
    }
  }
}
