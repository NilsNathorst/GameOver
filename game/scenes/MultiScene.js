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

// få bollen att väga mer och slår iväg spelare
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

    this.Adam = new Player({
      scene: this,
      x: 320,
      y: 0,
      key: "adamSprite",
      name: "Adam",
      controls: playerOne,
      life: 5
    });

    this.Eve = new Player({
      scene: this,
      x: 220,
      y: 0,
      key: "eveSprite",
      name: "Eve",
      controls: playerTwo,
      life: 5
    });

    this.players.add(this.Adam);
    this.players.add(this.Eve);
    this.Eve.setScale(1.5);
    this.Adam.setScale(1.5);
    this.Eve.scoreText = this.add.text(
      16,
      16,
      `${this.Eve.name}: ${this.Eve.life}`,
      {
        fontSize: "32px",
        fill: "green"
      }
    );
    this.Adam.scoreText = this.add.text(
      16,
      40,
      `${this.Adam.name}: ${this.Adam.life}`,
      {
        fontSize: "32px",
        fill: "green"
      }
    );

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
    this.players.children.entries.map(player => {
      this.vel = 0;
      player.update(this.keys, time, delta);
      if (player.isShooting && !this.hasShot) {
        this.hasShot = true;
        this.ShootCd = time + 400;
        this.playerhasBenHit = time + 400;
        this.ball = this.physics.add.sprite(player.x, player.y, "ball");
        if (player.isFacing.left) {
          this.vel = -400;
        } else if (player.isFacing.right) {
          this.vel = 400;
        }

        this.ball.setVelocity(this.vel, -200);
        this.physics.add.collider(this.players, this.ball, function(player, b) {
          let blood = scene.add.sprite(player.x, player.y, "bloodSprite");
          if (!this.playerhasBeenHit) {
            this.playerhasBeenHit = true;
            player.getHit(blood, player, b);
          }
        });
        this.physics.add.collider(platform, this.ball);
      }

      if (player.life <= 0) {
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
