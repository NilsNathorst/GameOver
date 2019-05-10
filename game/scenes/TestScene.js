import map from "../../assets/tilemaps/map.json";
import tiles from "../../assets/tiles/ground-plates.png";

var config = {
  key: "TestScene"
  // active: false,
  // visible: true,
  // pack: false,
  // cameras: null,
  // map: {},
  // physics: {},
  // loader: {},
  // plugins: false,
  // input: {}
};

class TestScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    console.log(map);
    this.load.image("ground-plates", tiles);
    this.load.tilemapTiledJSON("map", map);
  }
  create() {
    this.map = this.make.tilemap({
      key: "map"
    });

    this.groundtiles = this.map.addTilesetImage("ground-plates");

    this.groundlayer = this.map.createDynamicLayer(
      "test",
      this.groundtiles,
      0,
      0
    );
  }
}
export default TestScene;
