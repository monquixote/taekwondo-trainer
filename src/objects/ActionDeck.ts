import Phaser from 'phaser';

export interface ActionDeckOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export class ActionDeck extends Phaser.GameObjects.Container {
  private buttons: Phaser.GameObjects.Container[] = [];
  private onSelectCallback: ((option: ActionDeckOption, buttonIndex: number) => void) | null = null;
  private isLocked: boolean = false;
  private keyListeners: Phaser.Input.Keyboard.Key[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
    this.setupKeyboard();
  }

  private setupKeyboard(): void {
    if (!this.scene.input.keyboard) return;

    const keys = [
      Phaser.Input.Keyboard.KeyCodes.ONE,
      Phaser.Input.Keyboard.KeyCodes.TWO,
      Phaser.Input.Keyboard.KeyCodes.THREE,
      Phaser.Input.Keyboard.KeyCodes.FOUR
    ];

    keys.forEach((keyCode, index) => {
      const key = this.scene.input.keyboard!.addKey(keyCode);
      key.on('down', () => {
        if (!this.isLocked && this.buttons[index] && this.buttons[index].visible) {
          this.triggerOption(index);
        }
      });
      this.keyListeners.push(key);
    });
  }

  public setOptions(
    options: ActionDeckOption[],
    onSelect: (option: ActionDeckOption, buttonIndex: number) => void
  ): void {
    this.clearButtons();
    this.onSelectCallback = onSelect;
    this.isLocked = false;

    // 2x2 Layout or 4 rows depending on layout
    const btnWidth = 224;
    const btnHeight = 44;
    const gapX = 14;
    const gapY = 8;

    options.forEach((opt, idx) => {
      // 2 columns, 2 rows
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const bx = (col === 0 ? -btnWidth / 2 - gapX / 2 : btnWidth / 2 + gapX / 2);
      const by = (row === 0 ? -btnHeight / 2 - gapY / 2 : btnHeight / 2 + gapY / 2);

      const btnContainer = this.scene.add.container(bx, by);

      // Button background box with retro bevel
      const bg = this.scene.add.graphics();
      this.drawButtonBg(bg, btnWidth, btnHeight, 0x181828, 0x5a5a8a, 0x22223a);

      // Hotkey badge [1], [2], etc.
      const hotkeyBadge = this.scene.add.graphics();
      hotkeyBadge.fillStyle(0xf8d820, 1);
      hotkeyBadge.fillRoundedRect(-btnWidth / 2 + 6, -btnHeight / 2 + 8, 26, 26, 3);

      const hotkeyText = this.scene.add.text(-btnWidth / 2 + 19, -btnHeight / 2 + 21, `${idx + 1}`, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '11px',
        color: '#111'
      }).setOrigin(0.5);

      // Korean Move Text (wrap if needed)
      // Auto-scale font size if text is long
      const fontSize = opt.label.length > 25 ? '8px' : (opt.label.length > 18 ? '9px' : '10px');
      const labelText = this.scene.add.text(-btnWidth / 2 + 38, 0, opt.label, {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: fontSize,
        color: '#ffffff',
        wordWrap: { width: btnWidth - 46, useAdvancedWrap: true }
      }).setOrigin(0, 0.5);

      const hitZone = this.scene.add.zone(0, 0, btnWidth, btnHeight).setInteractive({ useHandCursor: true });
      btnContainer.add([bg, hotkeyBadge, hotkeyText, labelText, hitZone]);

      // Hover / Touch effects
      hitZone.on('pointerover', () => {
        if (!this.isLocked) {
          this.drawButtonBg(bg, btnWidth, btnHeight, 0x2a2a48, 0xffd700, 0x3d3d68);
        }
      });

      hitZone.on('pointerout', () => {
        if (!this.isLocked) {
          this.drawButtonBg(bg, btnWidth, btnHeight, 0x181828, 0x5a5a8a, 0x22223a);
        }
      });

      hitZone.on('pointerdown', () => {
        if (!this.isLocked) {
          this.triggerOption(idx);
        }
      });

      this.add(btnContainer);
      this.buttons.push(btnContainer);
      (btnContainer as unknown as { _optionData: ActionDeckOption })._optionData = opt;
      (btnContainer as unknown as { _bg: Phaser.GameObjects.Graphics })._bg = bg;
      (btnContainer as unknown as { _width: number; _height: number })._width = btnWidth;
      (btnContainer as unknown as { _height: number })._height = btnHeight;
    });

    // Enter animation: fade in and slide up
    this.setAlpha(0);
    this.y += 15;
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      y: this.y - 15,
      duration: 180,
      ease: 'Quad.easeOut'
    });
  }

  private triggerOption(index: number): void {
    if (this.isLocked) return;
    this.isLocked = true;

    const btn = this.buttons[index];
    const data = (btn as unknown as { _optionData: ActionDeckOption })._optionData;
    const bg = (btn as unknown as { _bg: Phaser.GameObjects.Graphics })._bg;
    const width = (btn as unknown as { _width: number })._width;
    const height = (btn as unknown as { _height: number })._height;

    if (data.isCorrect) {
      // Glow green
      this.drawButtonBg(bg, width, height, 0x0e5e2e, 0x00ff66, 0x148c44);
    } else {
      // Flash red & shake
      this.drawButtonBg(bg, width, height, 0x6e1414, 0xff3333, 0x992222);
      this.scene.tweens.add({
        targets: btn,
        x: btn.x + 6,
        duration: 50,
        yoyo: true,
        repeat: 3
      });

      // Highlight the correct one
      this.buttons.forEach((b) => {
        const bData = (b as unknown as { _optionData: ActionDeckOption })._optionData;
        const bBg = (b as unknown as { _bg: Phaser.GameObjects.Graphics })._bg;
        const bW = (b as unknown as { _width: number })._width;
        const bH = (b as unknown as { _height: number })._height;
        if (bData.isCorrect) {
          this.drawButtonBg(bBg, bW, bH, 0x0e5e2e, 0x00ff66, 0x148c44);
        }
      });
    }

    if (this.onSelectCallback) {
      this.onSelectCallback(data, index);
    }
  }

  private drawButtonBg(
    graphics: Phaser.GameObjects.Graphics,
    w: number,
    h: number,
    fill: number,
    border: number,
    innerBorder: number
  ): void {
    graphics.clear();
    // Shadow
    graphics.fillStyle(0x000000, 0.6);
    graphics.fillRect(-w / 2 + 2, -h / 2 + 2, w, h);

    // Main fill
    graphics.fillStyle(fill, 1);
    graphics.fillRect(-w / 2, -h / 2, w, h);

    // Outer border
    graphics.lineStyle(2, border, 1);
    graphics.strokeRect(-w / 2, -h / 2, w, h);

    // Inner subtle highlight
    graphics.lineStyle(1, innerBorder, 1);
    graphics.strokeRect(-w / 2 + 2, -h / 2 + 2, w - 4, h - 4);
  }

  public clearButtons(): void {
    this.buttons.forEach(b => b.destroy());
    this.buttons = [];
    this.isLocked = false;
  }

  public destroy(fromScene?: boolean): void {
    this.keyListeners.forEach(k => k.destroy());
    this.keyListeners = [];
    super.destroy(fromScene);
  }
}
