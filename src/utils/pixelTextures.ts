import Phaser from 'phaser';
import { ALL_GRADES } from '../data/grades';

/**
 * Utility to generate pixel-perfect 8-bit NES Kung-Fu style textures
 * entirely procedurally using Canvas API.
 */
export function createPixelArtTextures(scene: Phaser.Scene): void {
  // Helper to create texture from 2D pixel array
  const createFromGrid = (
    key: string,
    width: number,
    height: number,
    scale: number,
    renderFn: (ctx: CanvasRenderingContext2D) => void
  ) => {
    if (scene.textures.exists(key)) return;

    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.scale(scale, scale);
    renderFn(ctx);

    scene.textures.addCanvas(key, canvas);
  };

  // Helper to render player sprites with customizable belt and stripe
  const createPlayerGradeTextures = (
    gradeId: string,
    beltColor: string,
    stripeColor?: string
  ) => {
    const drawBelt = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      knotX?: number,
      knotY?: number
    ) => {
      ctx.fillStyle = beltColor;
      ctx.fillRect(x, y, w, h);
      if (stripeColor) {
        ctx.fillStyle = stripeColor;
        ctx.fillRect(x, y + Math.floor(h / 3), w, Math.max(1, Math.floor(h / 3)));
      }
      if (knotX !== undefined && knotY !== undefined) {
        ctx.fillStyle = beltColor;
        ctx.fillRect(knotX, knotY, 2, 4);
        if (stripeColor) {
          ctx.fillStyle = stripeColor;
          ctx.fillRect(knotX, knotY + 2, 2, 2);
        }
      }
    };

    // 1. Player Idle
    createFromGrid(`player_idle_${gradeId}`, 24, 32, 2, (ctx) => {
      // Head & Hair
      ctx.fillStyle = '#111';
      ctx.fillRect(8, 2, 8, 4);
      ctx.fillRect(7, 4, 2, 3);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(9, 6, 7, 5);
      ctx.fillStyle = '#111';
      ctx.fillRect(13, 7, 2, 2);

      // White Dobok
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(7, 11, 10, 8);

      // Dynamic Belt
      drawBelt(ctx, 7, 18, 10, 3, 11, 21);

      // Legs / Pants (White)
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(7, 21, 4, 8);
      ctx.fillRect(13, 21, 4, 8);
      // Bare feet
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(7, 29, 5, 3);
      ctx.fillRect(13, 29, 5, 3);

      // Arms in ready guard
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(14, 11, 4, 4);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(17, 12, 3, 3);
    });

    // 2. Player Punch / Thrust
    createFromGrid(`player_punch_${gradeId}`, 32, 32, 2, (ctx) => {
      ctx.fillStyle = '#111';
      ctx.fillRect(6, 2, 8, 4);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(7, 6, 7, 5);
      ctx.fillStyle = '#111';
      ctx.fillRect(12, 7, 2, 2);

      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(6, 11, 10, 8);

      // Dynamic Belt
      drawBelt(ctx, 6, 18, 10, 3);

      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(3, 21, 5, 8);
      ctx.fillRect(14, 21, 5, 8);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(2, 29, 6, 3);
      ctx.fillRect(14, 29, 6, 3);

      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(15, 12, 8, 3);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(23, 11, 7, 4);
    });

    // 3. Player High Kick
    createFromGrid(`player_kick_${gradeId}`, 32, 32, 2, (ctx) => {
      ctx.fillStyle = '#111';
      ctx.fillRect(4, 4, 7, 4);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(5, 8, 7, 5);
      ctx.fillStyle = '#111';
      ctx.fillRect(9, 9, 2, 2);

      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(5, 13, 8, 7);

      // Dynamic Belt
      drawBelt(ctx, 5, 19, 8, 3);

      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(7, 22, 4, 8);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(6, 29, 6, 3);

      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(12, 10, 9, 5);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(21, 8, 8, 6);
    });

    // 4. Player Hurt
    createFromGrid(`player_hurt_${gradeId}`, 24, 32, 2, (ctx) => {
      ctx.fillStyle = '#111';
      ctx.fillRect(3, 4, 7, 4);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(3, 8, 7, 5);
      ctx.fillStyle = '#d00';
      ctx.fillRect(6, 9, 3, 2);

      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(4, 13, 8, 8);

      // Dynamic Belt
      drawBelt(ctx, 4, 20, 8, 3);

      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(3, 23, 4, 7);
      ctx.fillRect(9, 23, 5, 7);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(2, 29, 5, 3);
      ctx.fillRect(9, 29, 5, 3);
    });

    // 5. 2.5D Runner Back-View Run Frame 1 (Left stride)
    createFromGrid(`runner_run1_${gradeId}`, 24, 32, 2, (ctx) => {
      // Back of head / dark hair
      ctx.fillStyle = '#14141c';
      ctx.fillRect(8, 2, 8, 7);
      ctx.fillStyle = '#f8c090'; // ears
      ctx.fillRect(7, 5, 1, 2);
      ctx.fillRect(16, 5, 1, 2);

      // White Dobok Back & shoulders
      ctx.fillStyle = '#f4f4f8';
      ctx.fillRect(6, 9, 12, 10);
      // Dobok back seam & black collar trim
      ctx.fillStyle = '#222230';
      ctx.fillRect(8, 9, 8, 1);
      ctx.fillStyle = '#dcdce6';
      ctx.fillRect(11, 10, 2, 8);

      // Arms swinging (Left arm forward/up, Right arm back/down)
      ctx.fillStyle = '#e8e8f0';
      ctx.fillRect(3, 9, 3, 6);
      ctx.fillRect(18, 12, 3, 6);
      ctx.fillStyle = '#f8c090'; // fists
      ctx.fillRect(3, 7, 3, 2);
      ctx.fillRect(18, 18, 3, 2);

      // Dynamic Belt wrapped around waist + trailing tails
      drawBelt(ctx, 6, 18, 12, 3, 14, 20);

      // Pants & Legs running (Left leg extended down, Right leg lifted up)
      ctx.fillStyle = '#dcdce6';
      ctx.fillRect(7, 21, 4, 8); // left leg down
      ctx.fillRect(13, 21, 4, 5); // right leg bent up
      // Feet / soles
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(7, 29, 4, 3);
      ctx.fillStyle = '#d89868'; // raised sole of right foot
      ctx.fillRect(13, 25, 4, 3);
    });

    // 6. 2.5D Runner Back-View Run Frame 2 (Right stride)
    createFromGrid(`runner_run2_${gradeId}`, 24, 32, 2, (ctx) => {
      // Back of head / dark hair
      ctx.fillStyle = '#14141c';
      ctx.fillRect(8, 3, 8, 7);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(7, 6, 1, 2);
      ctx.fillRect(16, 6, 1, 2);

      // White Dobok Back
      ctx.fillStyle = '#f4f4f8';
      ctx.fillRect(6, 10, 12, 9);
      ctx.fillStyle = '#222230';
      ctx.fillRect(8, 10, 8, 1);
      ctx.fillStyle = '#dcdce6';
      ctx.fillRect(11, 11, 2, 7);

      // Arms swinging (Left arm back/down, Right arm forward/up)
      ctx.fillStyle = '#e8e8f0';
      ctx.fillRect(3, 12, 3, 6);
      ctx.fillRect(18, 9, 3, 6);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(3, 18, 3, 2);
      ctx.fillRect(18, 7, 3, 2);

      // Dynamic Belt
      drawBelt(ctx, 6, 18, 12, 3, 9, 20);

      // Pants & Legs running (Left leg lifted up, Right leg extended down)
      ctx.fillStyle = '#dcdce6';
      ctx.fillRect(7, 21, 4, 5); // left leg bent up
      ctx.fillRect(13, 21, 4, 8); // right leg down
      // Feet / soles
      ctx.fillStyle = '#d89868';
      ctx.fillRect(7, 25, 4, 3);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(13, 29, 4, 3);
    });

    // 7. 2.5D Runner Flying Kick (Twimyo Chagi / Breaking Strike)
    createFromGrid(`runner_kick_${gradeId}`, 28, 32, 2, (ctx) => {
      // Head tilted in airborne kick
      ctx.fillStyle = '#14141c';
      ctx.fillRect(8, 2, 8, 6);
      // Dynamic Torso
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(7, 8, 11, 9);
      ctx.fillStyle = '#222230';
      ctx.fillRect(9, 8, 7, 1);

      // Arms out for balance
      ctx.fillStyle = '#e8e8f0';
      ctx.fillRect(2, 9, 5, 4);
      ctx.fillRect(18, 7, 5, 4);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(1, 9, 2, 3);
      ctx.fillRect(23, 6, 2, 3);

      // Belt
      drawBelt(ctx, 7, 16, 11, 3, 5, 18);

      // Left leg tucked, Right leg thrusting forward/up into the board
      ctx.fillStyle = '#dcdce6';
      ctx.fillRect(6, 19, 4, 6);
      ctx.fillRect(13, 12, 6, 7);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(5, 25, 4, 3);
      // Thrusting foot sole (Footsword / Balkal)
      ctx.fillRect(18, 9, 5, 5);
    });

    // 8. 2.5D Runner Recoil / Stumble
    createFromGrid(`runner_hit_${gradeId}`, 24, 32, 2, (ctx) => {
      ctx.fillStyle = '#14141c';
      ctx.fillRect(8, 5, 8, 6);
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(5, 11, 14, 9);
      // Arms flung wide in knockback
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(1, 8, 4, 4);
      ctx.fillRect(19, 8, 4, 4);
      drawBelt(ctx, 6, 19, 12, 3);
      ctx.fillStyle = '#dcdce6';
      ctx.fillRect(5, 22, 5, 7);
      ctx.fillRect(14, 22, 5, 7);
      ctx.fillStyle = '#f8c090';
      ctx.fillRect(4, 29, 5, 3);
      ctx.fillRect(15, 29, 5, 3);
    });
  };

  // Generate textures for each grade
  ALL_GRADES.forEach(grade => {
    createPlayerGradeTextures(grade.id, grade.beltColor, grade.stripeColor);
  });

  // Also register legacy fallback keys to 8th Kup
  createPlayerGradeTextures('', '#ffe135', '#00a859');

  // 5. Enemy 1 (Purple Gi martial artist - classic Kung-Fu enemy)
  createFromGrid('enemy_purple', 24, 32, 2, (ctx) => {
    ctx.fillStyle = '#333'; // dark hair / bandana
    ctx.fillRect(8, 2, 8, 4);
    ctx.fillStyle = '#e8a070';
    ctx.fillRect(7, 6, 7, 5);
    ctx.fillStyle = '#222';
    ctx.fillRect(8, 7, 2, 2);

    // Purple Dobok
    ctx.fillStyle = '#7a3e9d';
    ctx.fillRect(7, 11, 10, 9);
    ctx.fillStyle = '#fff'; // white sash
    ctx.fillRect(7, 18, 10, 2);

    // Legs
    ctx.fillStyle = '#592c73';
    ctx.fillRect(7, 20, 4, 9);
    ctx.fillRect(13, 20, 4, 9);
    ctx.fillStyle = '#111'; // black slippers
    ctx.fillRect(6, 28, 5, 4);
    ctx.fillRect(13, 28, 5, 4);

    // Arms in menacing stance
    ctx.fillStyle = '#7a3e9d';
    ctx.fillRect(4, 12, 4, 4);
    ctx.fillStyle = '#e8a070';
    ctx.fillRect(2, 13, 3, 3);
  });

  // 6. Enemy 2 (Blue Gi striker)
  createFromGrid('enemy_blue', 24, 32, 2, (ctx) => {
    ctx.fillStyle = '#222';
    ctx.fillRect(8, 2, 8, 4);
    ctx.fillStyle = '#f8b888';
    ctx.fillRect(7, 6, 7, 5);
    ctx.fillStyle = '#222';
    ctx.fillRect(8, 7, 2, 2);

    // Blue Dobok
    ctx.fillStyle = '#1e5fad';
    ctx.fillRect(7, 11, 10, 9);
    ctx.fillStyle = '#e8c820'; // yellow sash
    ctx.fillRect(7, 18, 10, 2);

    ctx.fillStyle = '#133e72';
    ctx.fillRect(7, 20, 4, 9);
    ctx.fillRect(13, 20, 4, 9);
    ctx.fillStyle = '#111';
    ctx.fillRect(6, 28, 5, 4);
    ctx.fillRect(13, 28, 5, 4);

    ctx.fillStyle = '#1e5fad';
    ctx.fillRect(4, 12, 4, 4);
    ctx.fillStyle = '#f8b888';
    ctx.fillRect(2, 13, 3, 3);
  });

  // 7. Dojang Master / Sifu (for Theory Boss Rounds)
  createFromGrid('master_sifu', 28, 36, 2, (ctx) => {
    // White hair & long beard
    ctx.fillStyle = '#eee';
    ctx.fillRect(9, 2, 10, 4);
    ctx.fillStyle = '#f8c090';
    ctx.fillRect(9, 6, 9, 6);
    ctx.fillStyle = '#111';
    ctx.fillRect(10, 8, 2, 2);
    ctx.fillStyle = '#eee'; // beard
    ctx.fillRect(10, 11, 6, 6);
    ctx.fillRect(11, 17, 4, 3);

    // Black Master Dobok
    ctx.fillStyle = '#222';
    ctx.fillRect(7, 12, 14, 12);
    // Gold Trim
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(7, 12, 14, 1);
    ctx.fillRect(13, 13, 2, 9);

    // Black Belt
    ctx.fillStyle = '#000';
    ctx.fillRect(6, 20, 16, 3);
    ctx.fillStyle = '#ffd700'; // Dan stripes
    ctx.fillRect(7, 21, 2, 1);
    ctx.fillRect(10, 21, 2, 1);

    // Lower robes
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(8, 24, 12, 8);
    ctx.fillStyle = '#111';
    ctx.fillRect(8, 31, 5, 4);
    ctx.fillRect(15, 31, 5, 4);
  });

  // 8. Hit Spark / Impact Effect
  createFromGrid('hit_spark', 16, 16, 2, (ctx) => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(7, 1, 2, 14);
    ctx.fillRect(1, 7, 14, 2);
    ctx.fillStyle = '#ffe600';
    ctx.fillRect(5, 5, 6, 6);
    ctx.fillStyle = '#ff3300';
    ctx.fillRect(7, 7, 2, 2);
  });

  // 9. Retro Dojang Corridor Background (Floor & Pillars) - Scaled 4x for 960x540
  createFromGrid('dojang_bg', 240, 135, 4, (ctx) => {
    // Wall (Traditional Japanese/Korean wooden interior)
    ctx.fillStyle = '#5c3a21'; // Dark rich wood
    ctx.fillRect(0, 0, 240, 95);

    // Shoji Screen panels (cream paper)
    for (let x = 12; x < 230; x += 38) {
      ctx.fillStyle = '#eed6aa';
      ctx.fillRect(x, 15, 28, 48);

      // Shoji grid lines
      ctx.fillStyle = '#7a4e2d';
      ctx.fillRect(x + 9, 15, 1, 48);
      ctx.fillRect(x + 18, 15, 1, 48);
      ctx.fillRect(x, 31, 28, 1);
      ctx.fillRect(x, 47, 28, 1);
    }

    // Traditional Wooden Columns
    for (let x = 0; x < 240; x += 76) {
      ctx.fillStyle = '#3a2010';
      ctx.fillRect(x, 0, 10, 95);
      ctx.fillStyle = '#613b1f';
      ctx.fillRect(x + 2, 0, 6, 95);
    }

    // Top Beam with TAGB Korean Banner
    ctx.fillStyle = '#22140a';
    ctx.fillRect(0, 0, 240, 12);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(0, 11, 240, 1);

    // Dojang Floor (Polished wooden boards with perspective slats)
    ctx.fillStyle = '#8f572a';
    ctx.fillRect(0, 95, 240, 40);

    ctx.fillStyle = '#683b17';
    ctx.fillRect(0, 95, 240, 2);
    ctx.fillRect(0, 105, 240, 1);
    ctx.fillRect(0, 117, 240, 2);
    ctx.fillRect(0, 131, 240, 2);

    // Floor board vertical seams
    for (let x = 15; x < 240; x += 35) {
      ctx.fillStyle = '#593212';
      ctx.fillRect(x, 97, 1, 8);
      ctx.fillRect(x + 18, 106, 1, 11);
      ctx.fillRect(x - 5, 119, 1, 14);
    }
  });

  createFromGrid('dojang_bg_hard', 240, 135, 4, (ctx) => {
    // Wall (subtly tinted darker/redder wood)
    ctx.fillStyle = '#4c2a1a';
    ctx.fillRect(0, 0, 240, 95);

    // Shoji Screen panels (intense red windows)
    for (let x = 12; x < 230; x += 38) {
      ctx.fillStyle = '#b32222';
      ctx.fillRect(x, 15, 28, 48);

      // Shoji grid lines (dark red/wood)
      ctx.fillStyle = '#661515';
      ctx.fillRect(x + 9, 15, 1, 48);
      ctx.fillRect(x + 18, 15, 1, 48);
      ctx.fillRect(x, 31, 28, 1);
      ctx.fillRect(x, 47, 28, 1);
    }

    // Traditional Wooden Columns
    for (let x = 0; x < 240; x += 76) {
      ctx.fillStyle = '#2a110a';
      ctx.fillRect(x, 0, 10, 95);
      ctx.fillStyle = '#4a2115';
      ctx.fillRect(x + 2, 0, 6, 95);
    }

    // Top Beam
    ctx.fillStyle = '#1a0a05';
    ctx.fillRect(0, 0, 240, 12);
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(0, 11, 240, 1);

    // Dojang Floor (slightly redder boards)
    ctx.fillStyle = '#7a3b20';
    ctx.fillRect(0, 95, 240, 40);

    ctx.fillStyle = '#552212';
    ctx.fillRect(0, 95, 240, 2);
    ctx.fillRect(0, 105, 240, 1);
    ctx.fillRect(0, 117, 240, 2);
    ctx.fillRect(0, 131, 240, 2);

    // Floor board vertical seams
    for (let x = 15; x < 240; x += 35) {
      ctx.fillStyle = '#441a0d';
      ctx.fillRect(x, 97, 1, 8);
      ctx.fillRect(x + 18, 106, 1, 11);
      ctx.fillRect(x - 5, 119, 1, 14);
    }
  });

  // 10. Heart Icon for Player Health (Scaled 4x for 960x540)
  const renderHeartFull = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#ff2a2a';
    ctx.fillRect(2, 2, 3, 3);
    ctx.fillRect(7, 2, 3, 3);
    ctx.fillRect(1, 4, 10, 3);
    ctx.fillRect(2, 7, 8, 2);
    ctx.fillRect(3, 9, 6, 1);
    ctx.fillRect(4, 10, 4, 1);
    ctx.fillRect(5, 11, 2, 1);

    // White shine
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(2, 3, 1, 2);
  };
  createFromGrid('heart', 12, 12, 4, renderHeartFull);
  createFromGrid('heart_full', 12, 12, 4, renderHeartFull);

  // 11. Empty Heart Icon
  createFromGrid('heart_empty', 12, 12, 4, (ctx) => {
    ctx.fillStyle = '#555';
    ctx.fillRect(2, 2, 3, 1);
    ctx.fillRect(7, 2, 3, 1);
    ctx.fillRect(1, 3, 1, 4);
    ctx.fillRect(10, 3, 1, 4);
    ctx.fillRect(2, 7, 1, 2);
    ctx.fillRect(9, 7, 1, 2);
    ctx.fillRect(3, 9, 1, 1);
    ctx.fillRect(8, 9, 1, 1);
    ctx.fillRect(4, 10, 1, 1);
    ctx.fillRect(7, 10, 1, 1);
    ctx.fillRect(5, 11, 2, 1);
  });
}
