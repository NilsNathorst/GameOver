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
    this.add.text(70, 80, "GAME OVER", {
      fill: "#841D11",
      fontFamily: "Impact",
      fontSize: "250px"
    });

    // text.on("pointerdown", (pointer, targets) => {
    //   this.scene.start("StartScene");
    // });
  }
}
export default GameOverScene;
