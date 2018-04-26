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
   * @return void
   */
  empty() {
    this._drawables = [];
  }

  /**
   * @param drawable
   */
  addDrawable(drawable) {
    this._drawables.push(drawable);
  }

  /**
   * @param drawable
   */
  removeDrawable(drawable) {
    this._drawables = this._drawables.filter(d => d !== drawable);
  }

  /**
   * @param canvasContext
   */
  draw(canvasContext) {
    this._drawables.forEach(drawable => {
      drawable.draw(canvasContext);
    });
  }

}