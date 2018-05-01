export default class DrawingLayer {

  /**
   * DrawingLayer constructor
   */
  constructor() {
    this.empty();
  }

  /**
   * Reset to default state.
   *
   * @return DrawingLayer
   */
  empty() {
    this._drawables = [];
    return this;
  }

  /**
   * @param drawable
   */
  addDrawable(drawable) {
    this._drawables.push(drawable);
    return this;
  }

  /**
   * @param drawable
   */
  removeDrawable(drawable) {
    this._drawables = this._drawables.filter(d => d !== drawable);
    return this;
  }

  /**
   * @param canvasContext
   */
  draw(canvasContext) {
    this._drawables.forEach(drawable => {
      drawable.draw(canvasContext);
    });
    return this;
  }

}