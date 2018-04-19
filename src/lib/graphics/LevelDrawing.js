import LevelMap from './LevelMap';

export default class LevelDrawing {

  constructor() {
    this.empty();
  }

  _cache() {
    const ctx = this._cachedCanvas.getContext('2d');

    this._levelMap.tiles.forEach((row, ri) => {
      row.forEach((tile, ti) => {
        ctx.drawImage(
          this._levelMap.tileSheet.imageAsset,
          tile.x,
          tile.y,
          this._levelMap.tileSheet.width,
          this._levelMap.tileSheet.height,
          ti * this._destTileSize.width,
          ri * this._destTileSize.height,
          this._destTileSize.width,
          this._destTileSize.height);
      });
    });
  }

  empty() {
    this._cachedCanvas = window.document.createElement('canvas');
    this._levelMap = new LevelMap().build();
    this._destTileSize = {
      width: 0,
      height: 0
    };
  }

  fromLevelMap(levelMap) {
    this._levelMap = levelMap;
    this._cache();
    return this;
  }

  setDestTileSize(w, h) {
    this._destTileSize = {
      width: w,
      height: h
    };
  }

  draw(canvasContext) {
    canvasContext.drawImage(this._cachedCanvas, 0, 0);
  }

}