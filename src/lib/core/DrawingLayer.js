export default class DrawingLayer {

  constructor() {
    this._drawables = [];
  }

  addDrawable(drawable) {
    this._drawables.push(drawable);
    return this;
  }

  draw() {
    this._drawables.forEach(drawable => {
      drawable.draw();
    });
  }

}