import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { PlayScene } from './scenes/PlayScene';
import { ResultScene } from './scenes/ResultScene';
import { StatsScene } from './scenes/StatsScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 480,
  height: 270,
  pixelArt: true,
  roundPixels: true,
  backgroundColor: '#0b0b0f',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 480,
    height: 270
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: [BootScene, MenuScene, PlayScene, ResultScene, StatsScene]
};

// Initialize game
export const game = new Phaser.Game(config);

// Bulletproof resize handler for mobile browser URL bars and orientation changes
function resizeApp() {
  const container = document.getElementById('game-container');
  if (container) {
    container.style.width = window.innerWidth + 'px';
    container.style.height = window.innerHeight + 'px';
  }
  if (game && game.scale) {
    game.scale.refresh();
  }
}

window.addEventListener('resize', resizeApp);
window.addEventListener('orientationchange', () => {
  setTimeout(resizeApp, 100);
  setTimeout(resizeApp, 300); // Safari sometimes takes a moment to update window.innerHeight
});

// Initial resize
resizeApp();
