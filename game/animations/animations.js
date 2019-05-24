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
    key: "adamSprite-left",
    frames: scene.anims.generateFrameNumbers("adamSprite", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "adamSprite-turn",
    frames: [{ key: "adamSprite", frame: 4 }],
    frameRate: 20
  });

  scene.anims.create({
    key: "adamSprite-right",
    frames: scene.anims.generateFrameNumbers("adamSprite", {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: 1
  });
  scene.anims.create({
    key: "eveSprite-left",
    frames: scene.anims.generateFrameNumbers("eveSprite", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "eveSprite-turn",
    frames: [{ key: "eveSprite", frame: 4 }],
    frameRate: 20
  });

  scene.anims.create({
    key: "eveSprite-right",
    frames: scene.anims.generateFrameNumbers("eveSprite", {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: 1
  });
}
