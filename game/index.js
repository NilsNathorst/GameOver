import Phaser from 'phaser';
import TestScene from './scenes/TestScene.js';
import BackgrondScene from './scenes/BackgroundScene.js';
const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1000
      },
      debug: false
    }
  },
  scene: [BackgrondScene]
};
const createGame = () => {
  game = new Phaser.Game(config);
};
let game;
module.exports = createGame();
