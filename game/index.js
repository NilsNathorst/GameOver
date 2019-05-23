import Phaser from "phaser";
import TestScene from "./scenes/TestScene.js";
import BootScene from "./scenes/BootScene.js";
import StartScene from "./scenes/StartScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1680,
  height: 1240,
  backgroundColor: "rgb(75,21,12)",
  physics: {
    default: "arcade",

    arcade: {
      gravity: {
        y: 1000
      },
      debug: false
    }
  },

  scene: [StartScene, BootScene, TestScene]
};
const createGame = () => {
  game = new Phaser.Game(config);
};
let game;
module.exports = createGame();
