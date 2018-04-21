export default class LevelMap {

  static tileTypes = {
    FLOOR: 'FLOOR',
    LIQUID: 'LIQUID',
    ROUGH: 'ROUGH',
    SLIP: 'SLIP',
    WALL: 'WALL'
  };

  constructor() {
    this.empty();
  }

  empty() {
    this._mapLayer = [[]];
    this._tileSize = {
      width: 8,
      height: 8
    };
  }

  setTiles(mapLayer) {
    this._mapLayer = mapLayer;
    return this;
  }

  getCoordsFromPixels(x, y) {
    return {
      x: Math.floor(x / this._tileSize.width),
      y: Math.floor(y / this._tileSize.height)
    };
  }

  getType(x, y) {
    if (typeof this._mapLayer[y] !== 'undefined') {
      if(typeof this._mapLayer[y][x] !== 'undefined') {
        return this._mapLayer[y][x];
      }
    }
    return LevelMap.tileTypes.WALL;
  }

  getTypeFromPixels(x, y) {
    const coords = this.getCoordsFromPixels(x, y);
    return this.getType(coords.x, coords.y);
  }

  getSurrounding(x, y) {
    return {
      topLeft: this.getType(x - 1, y - 1),
      top: this.getType(x, y - 1),
      topRight: this.getType(x + 1, y - 1),
      left: this.getType(x - 1, y),
      center: this.getType(x, y),
      right: this.getType(x + 1, y),
      bottomLeft: this.getType(x - 1, y + 1),
      bottom: this.getType(x, y + 1),
      bottomRight: this.getType(x + 1, y + 1)
    };
  }

  getSurroundingFromPixels(x, y) {
    const coords = this.getCoordsFromPixels(x, y);
    return this.getSurrounding(coords.x, coords.y);
  }

}