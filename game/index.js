import Phaser from "phaser";
import TestScene from "./scenes/TestScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1680,
  height: 1240,
  physics: {
    default: "arcade",

    arcade: {
      gravity: {
        y: 1000
      },
      debug: false
    }
  },

  scene: [TestScene]
};
const createGame = () => {
  game = new Phaser.Game(config);
};
let game;
module.exports = createGame();
