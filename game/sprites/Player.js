import Phaser from "phaser";
export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.controls,
      config.life,
      config.name
    );
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
    this.controls = config.controls;
    this.key = config.key;
    this.life = config.life;
    this.name = config.name;
  }

  update(keys, time, delta) {
    this.run(0);
    if (this.controls.left.isDown) {
      this.isFacing.left = true;
      this.isFacing.right = false;
      this.run(-this.velocity.x);
      this.anims.play(this.animations.left, true);
    } else if (this.controls.right.isDown) {
      this.isFacing.right = true;
      this.isFacing.left = false;
      this.run(this.velocity.x);
      this.anims.play(this.animations.right, true);
    } else {
      this.anims.play(this.animations.turn, true);
    }
    if (this.controls.up.isDown && this.body.touching.down) {
      this.jump(this.velocity.y);
    }
    if (this.controls.shoot.isDown && !this.isShooting) {
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
  getHit(sprite, player, ball) {
    sprite.anims.play(this.animations.hit, true);
    sprite.on("animationcomplete-" + "hit", () => {
      sprite.destroy();
    });
    player.life -= 1;
    player.scoreText.setText(`${player.name}: ${player.life}`);
    ball.disableBody(true, true);
  }
  // preUpdate(time, delta) {}
}
