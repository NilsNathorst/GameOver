import connect from "../../app/socket.js";
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
    this.add.text(420, 80, "GAME OVER", {
      fill: "#841D11",
      fontFamily: "Impact",
      fontSize: "80px"
    });
    this.add.text(330, 200, "waiting on your opponent...", {
      fill: "#F89F05",
      fontSize: "40px"
    });

    const self = this;
    this.socket = connect();

    this.socket.on("user connected", data => {
      this.socket.userCount = data.userCount;
      if (this.socket.userCount === 2) {
        text = this.add.text(310, 500, "Get redy to FIGHT!", {
          fill: "#fff",
          fontSize: "40px"
        });

        setTimeout(() => {
          this.scene.stop("StartScene");
          this.scene.start("BootScene", {
            startData: "2"
          });
        }, 3000);
      }
    });
    this.socket.on("player disconnect", userCount => {
      this.socket.userCount = userCount.userCount;
      if (text !== undefined) {
        text.destroy();
      }
    });
  }
}

export default StartScene;
