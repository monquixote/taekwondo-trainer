import Phaser from 'phaser';

export type EnemyType = 'enemy_purple' | 'enemy_blue' | 'master_sifu';

export class Enemy extends Phaser.GameObjects.Sprite {
  public enemyType: EnemyType;
  public targetX: number;
  public isDefeated: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, enemyType: EnemyType = 'enemy_purple') {
    super(scene, x, y, enemyType);
    this.enemyType = enemyType;
    this.targetX = x;
    this.setOrigin(0.5, 1);
    this.setScale(1.25);
    scene.add.existing(this);
  }

  public walkTo(targetX: number, duration: number = 800, onReached?: () => void): void {
    this.targetX = targetX;
    // Step bounce
    const steps = Math.max(1, Math.floor(duration / 150));
    this.scene.tweens.add({
      targets: this,
      y: this.y - 6,
      duration: 75,
      yoyo: true,
      repeat: steps
    });

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      duration: duration,
      ease: 'Linear',
      onComplete: () => {
        if (onReached) onReached();
      }
    });
  }

  public playAttack(onComplete?: () => void): void {
    this.scene.tweens.add({
      targets: this,
      x: this.x - 30,
      duration: 100,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  }

  public playKnockout(onComplete?: () => void): void {
    this.isDefeated = true;
    // Create impact sparks
    const spark = this.scene.add.image(this.x - 10, this.y - 30, 'hit_spark');
    spark.setScale(2.5);
    this.scene.tweens.add({
      targets: spark,
      scale: 4,
      alpha: 0,
      duration: 200,
      onComplete: () => spark.destroy()
    });

    // Knockback arc flying out to the right off-screen
    this.scene.tweens.add({
      targets: this,
      x: this.x + 280,
      y: this.y - 120,
      angle: 180,
      duration: 450,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        this.destroy();
        if (onComplete) onComplete();
      }
    });
  }
}
