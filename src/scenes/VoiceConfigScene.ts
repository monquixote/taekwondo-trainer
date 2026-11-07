import Phaser from 'phaser';
import { speechManager, AvailableVoice } from '../utils/pronunciation';
import { soundFx } from '../utils/soundEffects';

type FilterType = 'all' | 'korean' | 'english';

export class VoiceConfigScene extends Phaser.Scene {
  private returnTo: string = 'MenuScene';
  private currentFilter: FilterType = 'all';
  private currentPage: number = 0;
  private readonly itemsPerPage: number = 4;
  private listContainer!: Phaser.GameObjects.Container;
  private pageText!: Phaser.GameObjects.Text;
  private prevButton!: Phaser.GameObjects.Text;
  private nextButton!: Phaser.GameObjects.Text;
  private activeVoiceText!: Phaser.GameObjects.Text;
  private filterButtons: Record<FilterType, { bg: Phaser.GameObjects.Graphics; text: Phaser.GameObjects.Text; w: number }> = {} as any;

  constructor() {
    super('VoiceConfigScene');
  }

  init(data?: { returnTo?: string }): void {
    if (data?.returnTo) {
      this.returnTo = data.returnTo;
    }
    this.currentPage = 0;
  }

  create(): void {
    const { width, height } = this.scale;

    // 1. Background
    const bg = this.add.image(width / 2, height / 2, 'dojang_bg');
    bg.setDisplaySize(width, height);
    bg.setAlpha(0.35);

    const overlay = this.add.graphics();
    overlay.fillStyle(0x0a0c16, 0.88);
    overlay.fillRect(0, 0, width, height);

    // 2. Title & Active Voice display
    this.add.text(width / 2, 17, '◆ VOICE CONFIGURATION ◆', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '11px',
      color: '#ffe135',
      stroke: '#b83000',
      strokeThickness: 3
    }).setOrigin(0.5);

    this.activeVoiceText = this.add.text(width / 2, 33, `ACTIVE: ${speechManager.getActiveVoiceLabel()}`, {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '6.5px',
      color: '#00ffaa'
    }).setOrigin(0.5);

    // 3. Sound Toggle (Top Right)
    const soundToggle = this.add.text(width - 15, 12, soundFx.isEnabled() ? '🔊' : '🔇', {
      fontSize: '12px'
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true });

    soundToggle.on('pointerdown', () => {
      const enabled = soundFx.toggleSound();
      soundToggle.setText(enabled ? '🔊' : '🔇');
    });

    // 4. Filter Tabs (All / Korean / English)
    const filterY = 54;
    const filters: { id: FilterType; label: string; x: number; w: number }[] = [
      { id: 'all', label: 'ALL', x: width / 2 - 120, w: 70 },
      { id: 'korean', label: 'KOREAN', x: width / 2, w: 110 },
      { id: 'english', label: 'ENGLISH', x: width / 2 + 120, w: 110 }
    ];

    filters.forEach(f => {
      const g = this.add.graphics();
      const txt = this.add.text(f.x, filterY, f.label, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '6.5px',
        color: '#ffffff'
      }).setOrigin(0.5);

      const zone = this.add.zone(f.x, filterY, f.w, 18).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => {
        soundFx.playSelect();
        this.setFilter(f.id);
      });

      this.filterButtons[f.id] = { bg: g, text: txt, w: f.w };
    });

    // 5. Container for voice cards
    this.listContainer = this.add.container(0, 0);

    // 6. Pagination Controls
    const pageY = 222;
    this.prevButton = this.add.text(width / 2 - 130, pageY, '◀ PREV', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffe135'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.pageText = this.add.text(width / 2, pageY, 'PAGE 1 / 1', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.nextButton = this.add.text(width / 2 + 130, pageY, 'NEXT ▶', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '7px',
      color: '#ffe135'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.prevButton.on('pointerdown', () => {
      soundFx.playSelect();
      this.changePage(-1);
    });

    this.nextButton.on('pointerdown', () => {
      soundFx.playSelect();
      this.changePage(1);
    });

    // 7. Bottom Action Bar: [ BACK TO MENU ] and [ PITCH: ... ]
    const btnY = 250;
    const btnH = 22;

    // Back Button (Left side)
    const backBtnX = width / 2 - 85;
    const backBtnW = 140;

    const backBg = this.add.graphics();
    backBg.fillStyle(0x282848, 1);
    backBg.fillRect(backBtnX - backBtnW / 2, btnY - btnH / 2, backBtnW, btnH);
    backBg.lineStyle(1.5, 0x7777aa, 1);
    backBg.strokeRect(backBtnX - backBtnW / 2, btnY - btnH / 2, backBtnW, btnH);

    this.add.text(backBtnX, btnY, '◀ BACK TO MENU', {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '6.5px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const backZone = this.add.zone(backBtnX, btnY, backBtnW, btnH).setInteractive({ useHandCursor: true });
    backZone.on('pointerdown', () => this.goBack());
    backZone.on('pointerover', () => {
      backBg.clear();
      backBg.fillStyle(0x3d3d6e, 1);
      backBg.fillRect(backBtnX - backBtnW / 2, btnY - btnH / 2, backBtnW, btnH);
      backBg.lineStyle(1.5, 0xaaaae0, 1);
      backBg.strokeRect(backBtnX - backBtnW / 2, btnY - btnH / 2, backBtnW, btnH);
    });
    backZone.on('pointerout', () => {
      backBg.clear();
      backBg.fillStyle(0x282848, 1);
      backBg.fillRect(backBtnX - backBtnW / 2, btnY - btnH / 2, backBtnW, btnH);
      backBg.lineStyle(1.5, 0x7777aa, 1);
      backBg.strokeRect(backBtnX - backBtnW / 2, btnY - btnH / 2, backBtnW, btnH);
    });

    // Pitch Button (Right side)
    const pitchBtnX = width / 2 + 85;
    const pitchBtnW = 150;

    const pitchBg = this.add.graphics();
    const updatePitchBg = (hover: boolean = false) => {
      pitchBg.clear();
      pitchBg.fillStyle(hover ? 0x2e3860 : 0x1e2444, 1);
      pitchBg.fillRect(pitchBtnX - pitchBtnW / 2, btnY - btnH / 2, pitchBtnW, btnH);
      pitchBg.lineStyle(1.5, hover ? 0x88aaff : 0x4466aa, 1);
      pitchBg.strokeRect(pitchBtnX - pitchBtnW / 2, btnY - btnH / 2, pitchBtnW, btnH);
    };
    updatePitchBg(false);

    const pitchSteps: (number | null)[] = [null, 0.75, 0.60, 1.0];
    const pitchLabel = () => {
      const p = speechManager.getUserPitch();
      if (p === null) return 'PITCH: AUTO (DEEP)';
      if (p === 0.75) return 'PITCH: 0.75 (MALE)';
      if (p === 0.60) return 'PITCH: 0.60 (DEEP)';
      return 'PITCH: 1.00 (ORIG)';
    };

    const pitchText = this.add.text(pitchBtnX, btnY, pitchLabel(), {
      fontFamily: "'Press Start 2P', monospace",
      fontSize: '6.5px',
      color: '#ffe135'
    }).setOrigin(0.5);

    const pitchZone = this.add.zone(pitchBtnX, btnY, pitchBtnW, btnH).setInteractive({ useHandCursor: true });
    pitchZone.on('pointerdown', () => {
      soundFx.playSelect();
      const cur = speechManager.getUserPitch();
      const idx = pitchSteps.findIndex(s => s === cur);
      const next = pitchSteps[(idx + 1) % pitchSteps.length];
      speechManager.setUserPitch(next);
      pitchText.setText(pitchLabel());
      speechManager.testVoice();
      this.tweens.add({
        targets: pitchText,
        scale: 1.15,
        duration: 90,
        yoyo: true,
        ease: 'Quad.easeOut'
      });
    });
    pitchZone.on('pointerover', () => updatePitchBg(true));
    pitchZone.on('pointerout', () => updatePitchBg(false));

    // 8. Keyboard Shortcuts
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-ESC', () => this.goBack());
      this.input.keyboard.on('keydown-LEFT', () => this.changePage(-1));
      this.input.keyboard.on('keydown-RIGHT', () => this.changePage(1));
      this.input.keyboard.on('keydown-K', () => this.setFilter('korean'));
      this.input.keyboard.on('keydown-E', () => this.setFilter('english'));
      this.input.keyboard.on('keydown-A', () => this.setFilter('all'));
      this.input.keyboard.on('keydown-T', () => speechManager.testVoice());
    }

    // Dynamic voice reload if voices load asynchronously
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.updateFilterButtons();
        this.renderVoiceList();
      };
    }

    this.updateFilterButtons();
    this.renderVoiceList();
  }

  private setFilter(filter: FilterType): void {
    if (this.currentFilter === filter) return;
    this.currentFilter = filter;
    this.currentPage = 0;
    this.updateFilterButtons();
    this.renderVoiceList();
  }

  private updateFilterButtons(): void {
    const rawVoices = speechManager.getAvailableVoices();
    const koCount = rawVoices.filter(v => v.isKorean).length;
    const enCount = rawVoices.filter(v => v.isEnglish).length;
    const allCount = rawVoices.length;

    const filterLabels: Record<FilterType, string> = {
      all: `ALL (${allCount})`,
      korean: `KOREAN (${koCount})`,
      english: `ENGLISH (${enCount})`
    };

    (['all', 'korean', 'english'] as FilterType[]).forEach(id => {
      const btn = this.filterButtons[id];
      if (!btn) return;
      const isActive = this.currentFilter === id;
      btn.text.setText(filterLabels[id]);

      btn.bg.clear();
      if (isActive) {
        btn.bg.fillStyle(0x187a42, 1);
        btn.bg.lineStyle(1.5, 0x00ff88, 1);
        btn.text.setColor('#ffffff');
      } else {
        btn.bg.fillStyle(0x1a1a2e, 1);
        btn.bg.lineStyle(1.5, 0x444466, 1);
        btn.text.setColor('#8888aa');
      }

      const x = btn.text.x;
      const y = btn.text.y;
      btn.bg.fillRect(x - btn.w / 2, y - 9, btn.w, 18);
      btn.bg.strokeRect(x - btn.w / 2, y - 9, btn.w, 18);
    });
  }

  private getFilteredVoices(): (AvailableVoice | { isAuto: true })[] {
    const rawVoices = speechManager.getAvailableVoices();
    let filtered: AvailableVoice[] = [];

    if (this.currentFilter === 'all') {
      filtered = rawVoices;
    } else if (this.currentFilter === 'korean') {
      filtered = rawVoices.filter(v => v.isKorean);
    } else if (this.currentFilter === 'english') {
      filtered = rawVoices.filter(v => v.isEnglish);
    }

    // Prepend Auto-detect option when in All or Korean filter
    if (this.currentFilter === 'all' || this.currentFilter === 'korean') {
      return [{ isAuto: true }, ...filtered];
    }

    return filtered;
  }

  private renderVoiceList(): void {
    this.listContainer.removeAll(true);
    const { width } = this.scale;
    const items = this.getFilteredVoices();
    const totalPages = Math.max(1, Math.ceil(items.length / this.itemsPerPage));

    if (this.currentPage >= totalPages) {
      this.currentPage = totalPages - 1;
    }

    this.pageText.setText(`PAGE ${this.currentPage + 1} / ${totalPages} (${items.length} VOICES)`);
    this.prevButton.setAlpha(this.currentPage > 0 ? 1 : 0.35);
    this.nextButton.setAlpha(this.currentPage < totalPages - 1 ? 1 : 0.35);

    if (this.activeVoiceText) {
      this.activeVoiceText.setText(`ACTIVE: ${speechManager.getActiveVoiceLabel()}`);
    }

    const startIndex = this.currentPage * this.itemsPerPage;
    const pageItems = items.slice(startIndex, startIndex + this.itemsPerPage);

    const startY = 82;
    const cardH = 31;
    const cardSpacing = 34;
    const cardW = 440;
    const selectedURI = speechManager.getSelectedVoiceURI();

    pageItems.forEach((item, index) => {
      const cardY = startY + index * cardSpacing;
      const isAuto = 'isAuto' in item;
      const voiceURI = isAuto ? null : item.voiceURI;
      const isSelected = isAuto ? (!selectedURI || selectedURI === 'auto') : (selectedURI === voiceURI);

      const card = this.add.container(width / 2, cardY);
      const bg = this.add.graphics();

      // Card Background styling
      if (isSelected) {
        bg.fillStyle(0x0e3820, 0.95);
        bg.fillRect(-cardW / 2, -cardH / 2, cardW, cardH);
        bg.lineStyle(1.5, 0x00ff88, 1);
        bg.strokeRect(-cardW / 2, -cardH / 2, cardW, cardH);
      } else {
        bg.fillStyle(0x121424, 0.95);
        bg.fillRect(-cardW / 2, -cardH / 2, cardW, cardH);
        bg.lineStyle(1.5, 0x2e3250, 1);
        bg.strokeRect(-cardW / 2, -cardH / 2, cardW, cardH);
      }

      // Radio indicator
      const radioSymbol = isSelected ? '●' : '○';
      const radioColor = isSelected ? '#00ff88' : '#666688';
      const radioText = this.add.text(-cardW / 2 + 14, 0, radioSymbol, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '9px',
        color: radioColor
      }).setOrigin(0.5);

      // Title & description
      let title = '';
      let desc = '';
      if (isAuto) {
        title = 'AUTO-DETECT (RECOMMENDED)';
        desc = 'Optimal Korean Male voice for your device';
      } else {
        let genderBadge = '';
        if (item.gender === 'male') {
          genderBadge = ' [MALE]';
        } else if (item.gender === 'female') {
          genderBadge = ' [FEMALE]';
        }
        title = `${item.friendlyName.substring(0, 26)}${genderBadge}`;
        desc = `${item.lang} | ${item.name.substring(0, 34)}`;
      }

      const titleText = this.add.text(-cardW / 2 + 30, -5, title, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '6.5px',
        color: isSelected ? '#00ffaa' : '#ffffff'
      }).setOrigin(0, 0.5);

      const descText = this.add.text(-cardW / 2 + 30, 6, desc, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '5.5px',
        color: isSelected ? '#88ffcc' : '#8888aa'
      }).setOrigin(0, 0.5);

      // Test Button on the right
      const testBtnW = 56;
      const testBtnH = 20;
      const testBtnX = cardW / 2 - 34;

      const testBg = this.add.graphics();
      testBg.fillStyle(0x283058, 1);
      testBg.fillRect(testBtnX - testBtnW / 2, -testBtnH / 2, testBtnW, testBtnH);
      testBg.lineStyle(1, 0x5566aa, 1);
      testBg.strokeRect(testBtnX - testBtnW / 2, -testBtnH / 2, testBtnW, testBtnH);

      const testText = this.add.text(testBtnX, 0, 'TEST 🔊', {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '6px',
        color: '#ffe135'
      }).setOrigin(0.5);

      const testZone = this.add.zone(testBtnX, 0, testBtnW, testBtnH).setInteractive({ useHandCursor: true });
      testZone.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        // Stop event from propagating to card click
        pointer.event.stopPropagation();
        speechManager.testVoice(voiceURI || undefined);
        this.tweens.add({
          targets: testText,
          scale: 1.25,
          duration: 90,
          yoyo: true,
          ease: 'Quad.easeOut'
        });
      });

      // Card selection zone
      const cardZone = this.add.zone(-testBtnW / 2, 0, cardW - testBtnW - 10, cardH).setInteractive({ useHandCursor: true });
      cardZone.on('pointerdown', () => {
        soundFx.playSelect();
        if (isAuto) {
          speechManager.setSelectedVoiceURI(null);
        } else {
          speechManager.setSelectedVoiceURI(item.voiceURI);
        }
        speechManager.testVoice(voiceURI || undefined);
        this.renderVoiceList();
      });

      card.add([bg, radioText, titleText, descText, testBg, testText, testZone, cardZone]);
      this.listContainer.add(card);
    });
  }

  private changePage(delta: number): void {
    const items = this.getFilteredVoices();
    const totalPages = Math.max(1, Math.ceil(items.length / this.itemsPerPage));
    const newPage = Phaser.Math.Clamp(this.currentPage + delta, 0, totalPages - 1);
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.renderVoiceList();
    }
  }

  private goBack(): void {
    soundFx.playSelect();
    this.scene.start(this.returnTo);
  }
}
