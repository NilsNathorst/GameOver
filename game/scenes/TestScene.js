import playerSprite from "../../assets/sprites/playerSprite.png";
import bloodSprite from "../../assets/sprites/blood.png";
import enemySprite from "../../assets/sprites/enemySprite.png";
import ground from "../../assets/images/platform.png";
import background from "../../assets/bg.png";
import redBall from "../../assets/Ellipse.png";
let ballForce = 0;
let player;
let opponent;
let platform;
let cursors;
let gameOver = false;
let bg;
let ball;
let blood;
class TestScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    this.load.image("bg", background);
    this.load.image("ground", ground);
    this.load.image("ball", redBall);

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

    this.map = this.make.tilemap({
      key: "map"
    });
    platform = this.physics.add.staticGroup();

    platform.create(320, 320, "ground");
    player = this.physics.add.sprite(220, 0, "playerSprite");
    blood = this.add.sprite(-1000, -1220, "bloodSprite");
    opponent = this.physics.add.sprite(420, 0, "enemySprite");
    player.setBounce(0.45);
    player.setCollideWorldBounds(true);
    opponent.setBounce(0.45);
    opponent.setCollideWorldBounds(true);

    this.anims.create({
      key: "hit",
      frames: this.anims.generateFrameNumbers("bloodSprite", {
        start: 0,
        end: 6
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
    this.physics.add.collider(player, opponent);
  }

  update(time) {
    if (gameOver) {
      return;
    }

    if (cursors.space.isDown && !this.shoot) {
      this.shoot = true;
      ball = this.physics.add.sprite(player.x, player.y, "ball");
      // setting how many shoots you can do
      this.shootCoolDownTime = time + 500;
      ball.setVelocityX(ballForce);

      ball.setDrag(50, 50);
      ball.setBounce(0.7);

      bg.x -= 0.5;
      this.physics.add.collider(ball, platform);
      this.physics.add.collider(ball, player);
      this.physics.add.collider(ball, opponent);
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      ballForce = -400;
      bg.x += 0.5;

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      ballForce = 400;

      bg.x -= 0.5;
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
      console.log("ouch");
      blood.anims.play("hit");
    }
    if (blood.anims && blood.anims.currentFrame != null) {
      if (blood.anims.currentFrame.index == 6) {
        blood.anims.stop("hit");
        blood.anims.remove("hit");
        blood.destroy();
      }
    }
  }
}

export default TestScene;
