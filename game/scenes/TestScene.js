import playerSprite from "../../assets/sprites/playerSprite.png";
import bloodSprite from "../../assets/sprites/blood.png";
import enemySprite from "../../assets/sprites/enemySprite.png";
import ground from "../../assets/images/platform.png";
import background from "../../assets/bg.png";
import redBall from "../../assets/Ellipse.png";
<<<<<<< HEAD
let ballForce = 0;
=======
let ballForceX = -200;
let ballForceY = 0;
>>>>>>> 4ee5a7db93878bb41760c0b0063a76cf9f6fe3be
let player;
let opponent;
let platform;
let cursors;
let gameOver = false;
let bg;
let ball;
<<<<<<< HEAD
let blood;
=======

>>>>>>> 4ee5a7db93878bb41760c0b0063a76cf9f6fe3be
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
    opponent.setDrag(50, 50);
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
<<<<<<< HEAD
=======
    console.log(cursors);
>>>>>>> 4ee5a7db93878bb41760c0b0063a76cf9f6fe3be

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
<<<<<<< HEAD
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
=======
      // setting how many shoots you can do
      this.shootCoolDownTime = time + 500;
      ball = this.physics.add.sprite(player.x, player.y, "ball");
      ball.setVelocityX(ballForceX);
      ball.setVelocityY(ballForceY);

      ball.setDrag(50, 50);
      ball.setMass(10);
      ball.setBounce(0.7);
      this.physics.add.collider(ball, platform);
      this.physics.add.collider(ball, player);
      this.physics.add.collider(ball, opponent);
      bg.x -= 0.5;
>>>>>>> 4ee5a7db93878bb41760c0b0063a76cf9f6fe3be
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
<<<<<<< HEAD
      ballForce = -400;
=======
      ballForceX = -400;
>>>>>>> 4ee5a7db93878bb41760c0b0063a76cf9f6fe3be
      bg.x += 0.5;

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
<<<<<<< HEAD
      ballForce = 400;

=======
      ballForceX = 400;
>>>>>>> 4ee5a7db93878bb41760c0b0063a76cf9f6fe3be
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
