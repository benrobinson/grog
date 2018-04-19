export default class LevelMap {

  constructor() {
    this.empty();
  }

  empty() {
    this._tiles = [[]];
    this._tileSheet = null;
  }

  setTiles(tiles) {
    this._tiles = tiles;
    return this;
  }

  setTileSheet(tileSheet) {
    this._tileSheet = tileSheet;
    return this;
  }

  build() {
    return {
      tiles: this._tiles,
      tileSheet: this._tileSheet
    }
  }

}