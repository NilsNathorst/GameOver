import connect from "../../app/socket.js";
import playerSprite from "../../assets/sprites/playerSprite.png";
import bloodSprite from "../../assets/sprites/blood.png";
import enemySprite from "../../assets/sprites/enemySprite.png";
import ground from "../../assets/images/platform.png";
import lavaSprite from "../../assets/sprites/lava.png";
import explosionSprite from "../../assets/sprites/explosion.png";
import background from "../../assets/images/background.png";
import redBall from "../../assets/Ellipse.png";
import io from "socket.io-client";
let ballForce = 0;
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
class GameScene extends Phaser.Scene {
  constructor(config) {
    super({ key: "GameScene" }, config);
  }

  preload() {
    this.load.image("bg", background);
    this.load.image("ground", ground);
    this.load.image("ball", redBall);

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
    const self = this;
    // run the socket
    // socket = connect()
    this.socket = connect();
    console.log(this.socket);
    // this.socket.on("currentPlayers", (players, data) => {
    //   console.log(data);
    //   Object.keys(players).forEach(id => {
    //     if (players[id].playerId === this.socket.id) {
    //       self.addPlayer(self, players[id]);
    //     }
    //   });
    // });

    this.otherPlayers = this.physics.add.group();

    this.socket.on("currentPlayers", players => {
      Object.keys(players).forEach(id => {
        if (players[id].playerId === this.socket.id) {
          self.addPlayer(self, players[id]);
        } else {
          self.addOtherPlayer(self, players[id]);
        }
      });
    });

    this.socket.on("newPlayer", playerInfo => {
      self.addOtherPlayer(self, playerInfo);
    });
    // socket.on("user connected", () => {
    //   self.addPlayer(self, socket);
    // });

    this.socket.on("player disconnect", playerId => {
      self.otherPlayers.getChildren().forEach(otherPlayer => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    this.socket.on("playerMoved", function(playerInfo) {
      self.otherPlayers.getChildren().forEach(function(otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });

    this.socket.on("disconnect", function(playerId) {
      self.otherPlayers.getChildren().forEach(function(otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    // socket.on("ballMoved", playerInfo => {
    //   console.log(playerInfo);
    //   //   console.log(ball);
    //   ball.setPosition(playerInfo.ballX, playerInfo.ballY);
    //   //   self.otherPlayers.getChildren().forEach(otherPlayer => {
    //   //     if (playerInfo.playerId === otherPlayer.playerId) {
    //   //     }
    //   // });
    // });

    // make the ball update in both screens
    // socket.on("ballLocation", ballLocation => {
    //   console.log(ballLocation);
    //   if (self.ball) self.ball.destroy();
    //   self.ball = self.physics.add.image(
    //     ballLocation.x,
    //     ballLocation.y,
    //     "ball"
    //   );
    // });

    // background
    bg = this.add.sprite(800, 500, "bg").setScale(1.7);
    bg.frame.cutHeight = 645;
    platform = this.physics.add.staticGroup();

    platform.create(320, 320, "ground");
    lava = this.physics.add.staticGroup();
    blood = this.add.sprite(-1000, -1000, "bloodSprite");
    explosion = this.add.sprite(-1000, -1000, "explosionSprite");

    for (let i = 0; i < 6; i++) {
      let lavaTile = lava
        .create(offset, 940, "lavaSprite")
        .setSize(0, 320)
        .setOffset(40, 40);
      lavaTiles.push(lavaTile);

      offset += 320;
    }

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

    // colliders
    // this.physics.add.collider(this.player, platform);
    // this.physics.add.collider(player, lava);
    // this.physics.add.collider(this.otherPlayer, platform);
    // this.physics.add.collider(this.otherPlayer, lava);
  }

  update(time) {
    if (this.player) {
      if (cursors.space.isDown && !this.shoot) {
        this.shoot = true;
        ball = this.physics.add.sprite(this.player.x, this.player.y, "ball");
        // setting how many shoots you can do
        this.shootCoolDownTime = time + 600;
        ball.setVelocityX(ballForce);
        this.physics.add.collider(ball, platform);
        this.physics.add.collider(ball, this.player);
        this.physics.add.collider(ball, this.otherPlayers);
      }

      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play("left", true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play("right", true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play("turn");
      }

      if (this.cursors.up.isDown) {
        this.physics.velocityFromRotation(
          this.player.rotation + 1.5,
          100,
          this.player.body.acceleration
        );
      } else {
        this.player.setAcceleration(0);
      }

      this.physics.world.wrap(this.player, 5);

      // emit player movement
      let x = this.player.x;
      let y = this.player.y;
      if (
        this.player.oldPosition &&
        (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)
      ) {
        this.socket.emit("playerMovement", {
          x: this.player.x,
          y: this.player.y
        });
      }

      // save old position data
      this.player.oldPosition = {
        x: this.player.x,
        y: this.player.y
      };

      if (time > this.shootCoolDownTime) {
        this.shoot = false;
      }

      if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
    }
  }

  addPlayer(self, playerInfo) {
    console.log(playerInfo);
    self.player = self.physics.add
      .sprite(playerInfo.x, playerInfo.y, "playerSprite")
      .setBounce(0.45)
      .setCollideWorldBounds(true);
    self.physics.add.collider(self.player, platform);
    self.physics.add.collider(self.player, lava);
    // self.physics.add.collider(self.player, otherPlayer);
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

    // cursors = this.input.keyboard.createCursorKeys();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  addOtherPlayer(self, playerInfo) {
    self.opponent = self.physics.add
      .sprite(playerInfo.x, playerInfo.y, "enemySprite")
      .setBounce(0.45)
      .setCollideWorldBounds(true);
    self.physics.add.collider(self.opponent, platform);
    self.physics.add.collider(self.opponent, lava);
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("enemySprite", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "enemySprite", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("enemySprite", {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: 1
    });
    self.opponent.playerId = playerInfo.playerId;
    // console.log(otherPlayers);
    // self.otherPlayers.add(otherPlayer);
  }
}

export default GameScene;
