export default function makeAnimations(scene) {
  scene.anims.create({
    key: "hit",
    frames: scene.anims.generateFrameNumbers("bloodSprite", {
      start: 0,
      end: 6
    }),
    frameRate: 20,
    repeat: 0
  });

  scene.anims.create({
    key: "explode",
    frames: scene.anims.generateFrameNumbers("explosionSprite", {
      start: 0,
      end: 9
    }),
    frameRate: 20,
    repeat: 0
  });

  scene.anims.create({
    key: "lavaAnim",
    frames: scene.anims.generateFrameNumbers("lavaSprite", {
      start: 0,
      end: 7
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "playerSprite-left",
    frames: scene.anims.generateFrameNumbers("playerSprite", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "playerSprite-turn",
    frames: [{ key: "playerSprite", frame: 4 }],
    frameRate: 20
  });

  scene.anims.create({
    key: "playerSprite-right",
    frames: scene.anims.generateFrameNumbers("playerSprite", {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: 1
  });
  scene.anims.create({
    key: "enemySprite-left",
    frames: scene.anims.generateFrameNumbers("enemySprite", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "enemySprite-turn",
    frames: [{ key: "enemySprite", frame: 4 }],
    frameRate: 20
  });

  scene.anims.create({
    key: "enemySprite-right",
    frames: scene.anims.generateFrameNumbers("enemySprite", {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: 1
  });
}
