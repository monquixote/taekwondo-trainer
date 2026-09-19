import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
  private basePosition: { x: number; y: number };
  public isAttacking: boolean = false;
  public isHurt: boolean = false;
  private gradeId: string;

  constructor(scene: Phaser.Scene, x: number, y: number, gradeId: string = '8th-kup') {
    super(scene, x, y, `player_idle_${gradeId}`);
    this.gradeId = gradeId;
    this.basePosition = { x, y };
    this.setOrigin(0.5, 1);
    this.setScale(1.25);
    scene.add.existing(this);
  }

  public setGrade(gradeId: string): void {
    this.gradeId = gradeId;
    this.setTexture(`player_idle_${gradeId}`);
  }

  public playIdle(): void {
    if (this.isHurt) return;
    this.setTexture(`player_idle_${this.gradeId}`);
    this.setPosition(this.basePosition.x, this.basePosition.y);
    this.isAttacking = false;
  }

  public playAttack(type: 'punch' | 'kick' | 'thrust' | 'strike' | 'block', onComplete?: () => void): void {
    if (this.isHurt) return;
    this.isAttacking = true;

    const textureKey = (type === 'kick' || type === 'block') 
      ? `player_kick_${this.gradeId}` 
      : `player_punch_${this.gradeId}`;
    this.setTexture(textureKey);

    // Lunge forward slightly
    this.scene.tweens.add({
      targets: this,
      x: this.basePosition.x + 35,
      duration: 120,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: () => {
        this.playIdle();
        if (onComplete) onComplete();
      }
    });
  }

  public playHurt(onComplete?: () => void): void {
    this.isHurt = true;
    this.setTexture(`player_hurt_${this.gradeId}`);

    // Knockback shudder
    this.scene.tweens.add({
      targets: this,
      x: this.basePosition.x - 20,
      duration: 100,
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.isHurt = false;
        this.playIdle();
        if (onComplete) onComplete();
      }
    });

    // Retro red flash
    this.setTint(0xff5555);
    this.scene.time.delayedCall(300, () => {
      this.clearTint();
    });
  }

  public runForward(duration: number, onComplete?: () => void): void {
    // Subtle bounce to simulate running
    this.setTexture(`player_idle_${this.gradeId}`);
    this.scene.tweens.add({
      targets: this,
      y: this.basePosition.y - 8,
      duration: 100,
      yoyo: true,
      repeat: Math.floor(duration / 200),
      onComplete: () => {
        this.setPosition(this.basePosition.x, this.basePosition.y);
        if (onComplete) onComplete();
      }
    });
  }
}
