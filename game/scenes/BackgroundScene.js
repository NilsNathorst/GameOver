import map from '../../assets/tilemaps/map.json';
import tiles from '../../assets/tiles/ground-plates.png';
import background from '../../assets/bg.png';
import TestScene from './TestScene';

var config = {
  key: 'BackgroundScene'
  // active: false,
  //   visible: true
  // pack: false,
  // cameras: null,
  // map: {},
  // physics: {},
  // loader: {},
  // plugins: false,
  // input: {}
};

class BackgroundScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    this.load.image('bg', background);
  }
  create() {
    // this.add.image(400, 300, 'bg');
    this.background = this.add.tileSprite(400, 300, 900, 700, 'bg');
  }
}
export default BackgroundScene;
