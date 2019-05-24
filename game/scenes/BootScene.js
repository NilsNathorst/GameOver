import Phaser from "phaser";
import adamSprite from "../../assets/sprites/adamSprite.png";
import bloodSprite from "../../assets/sprites/blood.png";
import eveSprite from "../../assets/sprites/eveSprite.png";
import platformImage from "../../assets/images/platform.png";
import bouncyPlatformImage from "../../assets/images/bouncyPlatform.png";
import lavaSprite from "../../assets/sprites/lava.png";
import explosionSprite from "../../assets/sprites/explosion.png";
import bgSprite from "../../assets/images/background.png";
import redBall from "../../assets/Ellipse.png";
import makeAnimations from "../animations/animations";
import apple from "../../assets/apple.png";

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload() {
    // Collection of loading to do.
    const progress = this.add.graphics();

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on("complete", () => {
      // prepare all animations, defined in a separate file
      makeAnimations(this);
      progress.destroy();
      // this.scene.start("TestScene");
      this.scene.start("MultiScene", {
        startData: "3"
      });
    });

    this.load.image("bg", bgSprite);
    this.load.image("platformImage", platformImage);
    this.load.image("bouncyPlatformImage", bouncyPlatformImage);
    this.load.image("ball", apple);

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
    this.load.spritesheet("adamSprite", adamSprite, {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("eveSprite", eveSprite, {
      frameWidth: 32,
      frameHeight: 48
    });
  }
}

export default BootScene;
