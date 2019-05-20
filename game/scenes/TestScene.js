import playerSprite from "../../assets/sprites/playerSprite.png";
import bloodSprite from "../../assets/sprites/blood.png";
import enemySprite from "../../assets/sprites/enemySprite.png";
import ground from "../../assets/images/platform.png";
import lavaSprite from "../../assets/images/lava.png";
import explosionSprite from "../../assets/images/explosion.png";
import background from "../../assets/bg.png";
import redBall from "../../assets/Ellipse.png";
import cloud from "../../assets/images/cloud.png";
let ballForce = 0;
let player;
let opponent;
let platform;
let cursors;
let gameOver = false;
let bg;
let ball;
let blood;
let isDead = false;
let explosion;
let lava;
let lavaTiles = [];
let offset = 0;
let boot = true;
let clouds;

class TestScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    this.load.image("bg", background);
    this.load.image("ground", ground);
    this.load.image("ball", redBall);
    this.load.image("cloud", cloud);

    this.load.spritesheet("explosionSprite", explosionSprite, {
      frameWidth: 105,
      frameHeight: 104
    });
    this.load.spritesheet("lavaSprite", lavaSprite, {
      frameWidth: 330,
      frameHeight: 120
    });

    this.load.spritesheet("bloodSprite", bloodSprite, {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("playerSprite", playerSprite, {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("enemySprite", enemySprite, {
      frameWidth: 32,
      frameHeight: 48
    });
  }
  create() {
    // background
    bg = this.add.sprite(400, 250, "bg");
    bg.frame.cutHeight = 645;

    // clouds
    clouds = this.physics.add.staticGroup();
    clouds.create(100, 100, "cloud");
    clouds.create(30, 200, "cloud");
    clouds.create(500, 160, "cloud");
    clouds.create(400, 50, "cloud");
    clouds.create(600, 100, "cloud");
    clouds.create(800, 120, "cloud");
    clouds.create(850, 200, "cloud");
    clouds.create(1050, 50, "cloud");
    this.map = this.make.tilemap({
      key: "map"
    });
    platform = this.physics.add.staticGroup();

    platform.create(320, 320, "ground");
    player = this.physics.add.sprite(220, 0, "playerSprite");
    opponent = this.physics.add.sprite(420, 0, "enemySprite");
    lava = this.physics.add.staticGroup();
    blood = this.add.sprite(-1000, -1000, "bloodSprite");
    explosion = this.add.sprite(-1000, -1000, "explosionSprite");

    for (let i = 0; i < 3; i++) {
      let lavaTile = lava
        .create(offset, 580, "lavaSprite")
        .setSize(0, 320)
        .setOffset(40, 40);
      lavaTiles.push(lavaTile);

      offset += 320;
    }
    player.setBounce(0.45);
    player.setCollideWorldBounds(true);
    opponent.setBounce(0.45);
    opponent.setDrag(50, 50);
    opponent.setCollideWorldBounds(true);

    this.anims.create({
      key: "hit",
      frames: this.anims.generateFrameNumbers("bloodSprite", {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "burn",
      frames: this.anims.generateFrameNumbers("explosionSprite", {
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "lavaAnim",
      frames: this.anims.generateFrameNumbers("lavaSprite", {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "playerSprite", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("playerSprite", {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: 1
    });

    cursors = this.input.keyboard.createCursorKeys();
    cursors.a = "a";

    // colliders
    this.physics.add.collider(player, platform);
    this.physics.add.collider(opponent, platform);
    this.physics.add.collider(opponent, lava);
    this.physics.add.collider(player, lava);
  }

  update(time) {
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

    if (cursors.space.isDown && !this.shoot) {
      this.shoot = true;
      ball = this.physics.add.sprite(player.x, player.y, "ball");
      // setting how many shoots you can do
      this.shootCoolDownTime = time + 600;
      ball.setVelocityX(ballForce);

      ball.setDrag(50, 50);
      ball.setBounce(0.7);

      bg.x -= 0.5;
      this.physics.add.collider(ball, platform);
      this.physics.add.collider(ball, player);
      this.physics.add.collider(ball, opponent);
    }

    if (cursors.left.isDown) {
      ballForce = -400;

      player.setVelocityX(-160);
      bg.x += 0.5;
      clouds.children.entries.map(cloud => (cloud.x += 0.7));
      if (bg.x > 510) {
        bg.x -= 0.5;
        clouds.children.entries.map(cloud => (cloud.x -= 0.7));
      }

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      ballForce = 400;
      player.setVelocityX(160);
      bg.x -= 0.5;
      clouds.children.entries.map(cloud => (cloud.x -= 0.9));
      clouds.children.entries[2].x -= 0.2;

      if (bg.x < 130) {
        bg.x += 0.5;
        clouds.children.entries.map(cloud => (cloud.x += 0.9));
      }

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (time > this.shootCoolDownTime) {
      this.shoot = false;
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }

    if (
      opponent.body.touching.left ||
      opponent.body.touching.right ||
      opponent.body.touching.up
    ) {
      blood = this.add.sprite(opponent.x, opponent.y, "bloodSprite");
      blood.anims.remove("hit");
      blood.anims.play("hit");
      blood.on("animationcomplete-" + "hit", () => {
        blood.destroy();
      });
    }

    lavaTiles.map(child => {
      if (child.body.touching.up) {
        if (!isDead) {
          isDead = true;
          explosion = this.add.sprite(
            opponent.x,
            opponent.y,
            "explosionSprite"
          );
          explosion.anims.play("burn");
          explosion.on("animationcomplete-" + "burn", () => {
            explosion.destroy();
          });
        }
      }
    });
  }
}

export default TestScene;
