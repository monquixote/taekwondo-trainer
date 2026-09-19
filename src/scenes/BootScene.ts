import Phaser from 'phaser';
import { createPixelArtTextures } from '../utils/pixelTextures';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create(): void {
    // Generate all authentic 8-bit textures procedurally
    createPixelArtTextures(this);

    // Transition to Menu Scene
    this.scene.start('MenuScene');
  }
}
