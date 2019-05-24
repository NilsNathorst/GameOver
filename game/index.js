import Phaser from "phaser";
import TestScene from "./scenes/TestScene.js";
import BootScene from "./scenes/BootScene.js";
import StartScene from "./scenes/StartScene.js";
import MultiScene from "./scenes/MultiScene.js";
import GameOverScene from "./scenes/GameOverScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1680,
  height: 1240,
  backgroundColor: "aqua",
  physics: {
    default: "arcade",

    arcade: {
      gravity: {
        y: 1000
      },
      debug: false
    }
  },

  scene: [StartScene, BootScene, MultiScene, GameOverScene]
};
const createGame = () => {
  game = new Phaser.Game(config);
};
let game;
module.exports = createGame();
