let platform;
let gameOver = false;
let bg;
let blood;
let lava;
let scene;
let isDead = false;
let lavaTiles = [];
let offset = 0;
let boot = true;
import Player from "../sprites/Player";
class TestScene extends Phaser.Scene {
  constructor(config) {
    super({
      key: "TestScene"
    });
  }
  preload() {
    scene = this;
  }
  create() {
    // bg
    bg = this.add.sprite(800, 500, "bg").setScale(1.7);
    bg.frame.cutHeight = 645;

    platform = this.physics.add.staticGroup();
    lava = this.physics.add.staticGroup();
    this.players = this.add.group();

    this.explosion = this.add.sprite(-1000, -1000, "explosionSprite");
    blood = this.add.sprite(-1000, -1000, "bloodSprite");
    platform.create(320, 320, "platformImage");
    platform.create(640, 640, "platformImage");
    platform.create(960, 320, "platformImage");

    this.TestGuy = new Player({
      scene: this,
      x: 220,
      y: 0,
      key: "playerSprite"
    });
    this.Enemy = new Player({
      scene: this,
      x: 320,
      y: 0,
      key: "enemySprite"
    });

    this.players.add(this.TestGuy);
    this.players.add(this.Enemy);
    for (let i = 0; i < 6; i++) {
      let lavaTile = lava
        .create(offset, 940, "lavaSprite")
        .setSize(0, 320)
        .setOffset(40, 40);
      lavaTiles.push(lavaTile);
      offset += 320;
    }
    // colliders
    this.physics.add.collider(this.players, platform);

    this.physics.add.collider(this.players, lava, function(player, b) {
      if (!isDead) {
        let bomb = scene.add.sprite(player.x, player.y, "explosionSprite");
        isDead = true;
        player.explode(bomb);
      }
    });
  }

  update(time, delta) {
    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP).isDown,
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        .isDown,
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        .isDown,
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        .isDown
    };

    this.players.children.entries.map(player => {
      this.vel = 0;
      player.update(this.keys, time, delta);
      if (player.isShooting && !this.hasShot) {
        this.hasShot = true;
        this.ShootCd = time + 400;
        this.ball = this.physics.add.sprite(player.x, player.y, "ball");
        if (player.isFacing.left) {
          this.vel = -400;
        } else if (player.isFacing.right) {
          this.vel = 400;
        }

        this.ball.setVelocity(this.vel, -200);
        this.physics.add.collider(this.players, this.ball, function(player, b) {
          let blood = scene.add.sprite(player.x, player.y, "bloodSprite");
          player.getHit(blood);
        });
        this.physics.add.collider(platform, this.ball);
      }
    });

    if (time > this.ShootCd) {
      this.hasShot = false;
    }
    if (gameOver) {
      console.log("game over");
      return;
    }
    if (boot) {
      lavaTiles.map(child => {
        child.anims.play("lavaAnim");
      });
      boot = false;
    }
  }
}
export default TestScene;
