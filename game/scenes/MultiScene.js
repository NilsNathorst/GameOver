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
class MultiScene extends Phaser.Scene {
  constructor(config) {
    super({
      key: "MultiScene"
    });
  }
  preload() {
    scene = this;
  }
  create() {
    // bg
    bg = this.add.sprite(800, 500, "bg").setScale(1);

    platform = this.physics.add.staticGroup();
    this.bouncyPlatform = this.physics.add.staticGroup();
    this.birds = this.physics.add.staticGroup();
    lava = this.physics.add.staticGroup();
    this.players = this.add.group();

    this.explosion = this.add.sprite(-1000, -1000, "splashSprite");
    blood = this.add.sprite(-1000, -1000, "bloodSprite");
    this.bouncyPlatform.create(600, 400, "bouncyPlatformImage");
    this.bouncyPlatform.create(500, 400, "bouncyPlatformImage");
    this.birds.create(500, 400, "birdSprite");
    this.birds.children.entries.map(bird => {
      bird.anims.play("birdAnim", true);
    });
    this.bouncyPlatform.children.entries.map(bouncy => {
      bouncy.visible = false;
    });
    platform
      .create(320, 320, "platformImage")
      .setSize(180, 20)
      .setOffset(12, 6);
    platform
      .create(820, 320, "platformImage")
      .setSize(180, 20)
      .setOffset(12, 6);
    platform
      .create(1220, 320, "platformImage")
      .setSize(180, 20)
      .setOffset(12, 6);
    platform
      .create(520, 520, "platformImage")
      .setSize(180, 20)
      .setOffset(12, 6);
    let playerOne = scene.input.keyboard.addKeys({
      up: "up",
      down: "down",
      left: "left",
      right: "right",
      shoot: "space"
    });
    let playerTwo = scene.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
      shoot: "shift"
    });
    this.adamHearts = this.physics.add.staticGroup();
    this.eveHearts = this.physics.add.staticGroup();

    this.Adam = new Player({
      scene: this,
      x: 820,
      y: 0,
      key: "adamSprite",
      name: "Adam",
      controls: playerOne,
      lifes: [1, 2, 3, 4, 5]
    });

    this.Eve = new Player({
      scene: this,
      x: 220,
      y: 0,
      key: "eveSprite",
      name: "Eve",
      controls: playerTwo,
      lifes: [1, 2, 3, 4, 5]
    });

    this.players.add(this.Adam);
    this.players.add(this.Eve);
    this.Eve.setScale(1.5);
    this.Adam.setScale(1.5);
    console.log(this.Adam.body);
    this.Adam.hearts = this.adamHearts;
    this.adamHearts.create(1050, 50, "heart"),
      this.adamHearts.create(1100, 50, "heart"),
      this.adamHearts.create(1150, 50, "heart"),
      this.adamHearts.create(1200, 50, "heart"),
      this.adamHearts.create(1250, 50, "heart");

    this.Eve.hearts = this.eveHearts;
    this.eveHearts.create(250, 50, "heart");
    this.eveHearts.create(200, 50, "heart");
    this.eveHearts.create(150, 50, "heart");
    this.eveHearts.create(100, 50, "heart");
    this.eveHearts.create(50, 50, "heart");

    for (let i = 0; i < 6; i++) {
      let lavaTile = lava
        .create(offset, 940, "lavaSprite")
        .setSize(0, 320)
        .setOffset(40, 40)
        .setScale(1.5);
      lavaTiles.push(lavaTile);
      offset += 478;
    }
    // colliders
    this.physics.add.collider(this.players, platform);
    this.physics.add.collider(this.players, this.bouncyPlatform, function(
      player,
      platform
    ) {
      player.body.setVelocityY(-730);
    });

    this.physics.add.collider(this.players, lava, function(player, b) {
      if (!isDead) {
        let bomb = scene.add.sprite(player.x, player.y + 11, "splashSprite");
        isDead = true;
        player.isDead = true;
        player.explode(bomb);
      }
    });
  }

  update(time, delta) {
    this.players.children.entries.map(player => {
      this.vel = 0;
      player.update(this.keys, time, delta);
      if (player.isShooting && !this.hasShot) {
        this.hasShot = true;
        this.ShootCd = time + 400;
        this.playerhasBenHit = time + 400;
        this.ball = this.physics.add.sprite(player.x, player.y, "ball");
        this.ball.body
          .setBounce(0.45)
          .setDrag(50, 20)
          .setMass(8);

        if (player.isFacing.left) {
          this.vel = -400;
        } else if (player.isFacing.right) {
          this.vel = 400;
        }
        this.ball.setVelocity(this.vel, -200);
        this.physics.add.collider(this.players, this.ball, function(
          player,
          ball
        ) {
          if (!this.playerhasBeenHit) {
            this.playerhasBeenHit = true;
            let blood = scene.add.sprite(player.x, player.y, "bloodSprite");
            player.getHit(blood, player);
            player.hearts.remove(player.hearts.children.entries[0], true);
          }
        });
        this.physics.add.collider(platform, this.ball);
        this.physics.add.collider(this.bouncyPlatform, this.ball, function(
          ball,
          platform
        ) {
          ball.setVelocityY(-600);
        });
      }
      if (this.Adam.isDead || this.Eve.isDead) {
        this.scene.stop("MultiScene");
        this.scene.start("GameOverScene", {
          startData: "4"
        });
        return;
      }

      if (player.lifes <= 0) {
        this.scene.stop("MultiScene");
        this.scene.start("GameOverScene", {
          startData: "4"
        });
      }
    });

    if (time > this.ShootCd) {
      this.hasShot = false;
    }
    if (time > this.playerhasBeenHit) {
      this.playerhasBeenHit = false;
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
export default MultiScene;
