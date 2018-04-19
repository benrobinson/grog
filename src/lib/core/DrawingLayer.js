export default class DrawingLayer {

  constructor() {
    this._drawables = [];
  }

  addDrawable(drawable) {
    this._drawables.push(drawable);
    return this;
  }

  removeDrawable(drawable) {
    this._drawables = this._drawables.filter(d => d !== drawable);
  }

  draw(canvasContext) {
    this._drawables.forEach(drawable => {
      drawable.draw(canvasContext);
    });
  }

}