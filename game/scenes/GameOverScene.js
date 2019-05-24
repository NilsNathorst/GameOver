let text;
class GameOverScene extends Phaser.Scene {
  constructor(config) {
    super(
      {
        key: "GameOverScene"
      },
      config
    );
  }

  preload() {
    this.load.crossOrigin = true;
  }

  create() {
    this.add.text(420, 80, "GAME OVER", {
      fill: "#841D11",
      fontFamily: "Impact",
      fontSize: "80px"
    });

    setTimeout(() => {
      this.scene.stop("GameOverScene");
      this.scene.start("StartScene", {
        startData: "1"
      });
    }, 3000);
  }
}
export default GameOverScene;
