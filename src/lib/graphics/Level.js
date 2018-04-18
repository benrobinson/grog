import {application} from '../core';
import TileSheet from './TileSheetAsset';

class Level {

  constructor() {
    this.empty();
  }

  destTileSize(w, h) {
    this._destTileSize = { w, h };
    return this;
  }

  empty() {
    this._cachedCanvas = window.document.createElement('canvas');
    this._levelData = [];
    this._destTileSize = {
      width: 0,
      height: 0
    };
    this._tileSheet = new TileSheet();
  }

  levelData(levelData) {
    this._levelData = levelData;
    return this;
  }

  makeCachedCanvas() {
    const ctx = this._cachedCanvas.getContext('2d');

    this._levelData.forEach((row, ri) => {
      row.forEach((tile, ti) => {
        ctx.drawImage(
          this._tileSheet.imageAsset,
          tile.x,
          tile.y,
          this._tileSheet.width,
          this._tileSheet.height,
          ti * this._destTileSize.width,
          ri * this._destTileSize.height,
          this._destTileSize.width,
          this._destTileSize.height);
      });
    });

    return this._cachedCanvas;
  }

  tileSheet(tileSheet) {
    this._tileSheet = tileSheet;
    return this;
  }

}