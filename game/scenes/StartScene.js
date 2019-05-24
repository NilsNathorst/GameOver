let text;
class StartScene extends Phaser.Scene {
  constructor(config) {
    super(
      {
        key: "StartScene"
      },
      config
    );
  }

  preload() {
    this.load.crossOrigin = true;
  }

  create() {
    this.add.text(370, 200, "Trouble in paradise ", {
      fill: "#841D11",
      fontFamily: "Impact",
      fontSize: "80px"
    });

    this.add.text(470, 400, "Get redy to FIGHT!", {
      fill: "#fff",
      fontSize: "40px"
    });

    setTimeout(() => {
      this.scene.stop("StartScene");
      this.scene.start("BootScene", {
        startData: "2"
      });
    }, 300);
  }
}
export default StartScene;
