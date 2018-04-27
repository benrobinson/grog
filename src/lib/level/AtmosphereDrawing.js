export class AtmosphereDrawing {

  constructor(app) {
    this.app = app;
    this.empty();
  }

  empty() {
    this._levelDimensions = {
      width: 64,
      height: 64
    };
    this._tileDimensions = {
      width: 8,
      height: 8
    };
    this._fillAnimation = { draw: (canvasContext) => {} };
  }

  setFillAnimation(animation) {
    this._fillAnimation = animation;
    return this;
  }

  setLevelDimensions(levelDimensions) {
    this._levelDimensions = levelDimensions;
    return this;
  }

  setTileDimensions(tileDimensions) {
    this._tileDimensions = tileDimensions;
    return this;
  }

  addAnimations(canvasContext) {
    const down = Math.ceil(this._levelDimensions.height / this._tileDimensions.height);
    const across = Math.ceil(this._levelDimensions.width / this._tileDimensions.width);

    for (let d = 0; d < down; d++) {
      for (let a = 0; a < across; a++) {

        // TODO add sprite here.

      }
    }
  }
}