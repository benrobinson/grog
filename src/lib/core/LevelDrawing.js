export default class LevelDrawing {

  constructor() {
    this.empty();
  }

  empty() {
    this.tileSheet = null;
    this.tiles = null;
  }

  setTileSheet(tileSheet) {
    this.tileSheet = tileSheet;
    return this;
  }

  setTiles(tiles) {
    this.tiles = tiles;
    return this;
  }

  makeDrawable(width, height) {

    if (!this.tileSheet || !this.tiles) return (canvasContext) => {};

    const cachedCanvas = window.document.createElement('canvas');
    const cachedCanvasContext = cachedCanvas.getContext('2d');

    cachedCanvas.width = width;
    cachedCanvas.height = height;

    const destTileWidth = width / this.tiles[0].length;
    const destTileHeight = height / this.tiles.length;

    let t;

    this.tiles.forEach((row, ri) => {
      row.forEach((tile, ti) => {

        t = this.tileSheet.getTile(tile[0], tile[1]);

        console.log(t);

        cachedCanvasContext.drawImage(
          this.tileSheet.imageAsset.resource,
          t[0],
          t[1],
          t[2],
          t[3],
          ti * destTileWidth,
          ri * destTileHeight,
          destTileWidth,
          destTileHeight);
      });
    });

    return {
      draw: (canvasContext) => {
        canvasContext.drawImage(cachedCanvas, 0, 0)
      }
    }
  }
}