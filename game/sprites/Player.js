import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.scene.add.existing(this);
    this.velocity = {
      x: 160,
      y: -430
    };
    this.isShooting = false;
    this.animations = {
      left: `${config.key}-left`,
      right: `${config.key}-right`,
      turn: `${config.key}-turn`,
      hit: "hit",
      explode: "explode"
    };
    this.isFacing = {
      left: false,
      right: false
    };
  }

  update(keys, time, delta) {
    this.run(0);
    if (keys.left) {
      this.isFacing.left = true;
      this.isFacing.right = false;
      this.run(-this.velocity.x);
      this.anims.play(this.animations.left, true);
    } else if (keys.right) {
      this.isFacing.right = true;
      this.isFacing.left = false;
      this.run(this.velocity.x);
      this.anims.play(this.animations.right, true);
    } else {
      this.anims.play(this.animations.turn, true);
    }
    if (keys.up && this.body.touching.down) {
      this.jump(this.velocity.y);
    }
    if (keys.space && !this.isShooting) {
      this.isShooting = true;
      this.ShootCd = time + 400;
    }
    if (time > this.ShootCd) {
      this.isShooting = false;
    }
  }
  run(vel) {
    this.body.setVelocityX(vel);
  }
  jump(vel) {
    this.body.setVelocityY(vel);
  }
  explode(sprite) {
    sprite.anims.play(this.animations.explode, true);
    sprite.on("animationcomplete-" + "explode", () => {
      sprite.destroy();
    });
  }
  getHit(sprite) {
    sprite.anims.play(this.animations.hit, true);
    sprite.on("animationcomplete-" + "hit", () => {
      sprite.destroy();
    });
  }
  // preUpdate(time, delta) {}
}
