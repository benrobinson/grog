import DrawingLayers from './DrawingLayers';

export default class Camera {

  /**
   * Camera constructor
   */
  constructor() {
    this.canvas = window.document.createElement('canvas');
    this.canvasContext = this.canvas.getContext('2d');
    this.empty()
  }

  /**
   * Empty and reset values.
   *
   * @return void;
   */
  empty() {
    this._focalPoint = {
      x: 0,
      y: 0
    };
    this.offset = {
      x: 0,
      y: 0
    };
    this.drawingLayers = new DrawingLayers();
    this.setCameraDimensions(64, 48);
    this.setLevelDimensions(128, 96);
  }

  /**
   * Center the camera over the specified point, or get as close as possible
   * without going beyond the edge of the level.
   *
   * @param axis
   * @param v
   * @private
   */
  _focusAxis(axis, v) {
    const dimension = axis === 'x' ? 'width' : 'height';

    if (this._levelDimensions[dimension] <= this._cameraDimensions[dimension]) {
      this.offset[axis] = 0;
    } else {
      const edgeBuffer = this._cameraDimensions[dimension] / 2;

      // Camera can't go beyond the min edge.
      if (v <= edgeBuffer) {
        this.offset[axis] = 0;
        return;
      }

      // Camera can't go beyond the max edge.
      if (v >= this._levelDimensions[dimension] || (this._levelDimensions[dimension] - v) <= edgeBuffer) {
        this.offset[axis] = this._levelDimensions[dimension] - this._cameraDimensions[dimension];
        return;
      }

      this.offset[axis] = v - edgeBuffer;
    }
  }

  /**
   * Re-focus on the current focal point.
   *
   * @returns {Camera}
   */
  refocus() {
    this.focus(this._focalPoint.x, this._focalPoint.y);
    return this;
  }

  /**
   * Set the focal point.
   *
   * @param x
   * @param y
   * @returns {Camera}
   */
  setFocalPoint(x, y) {
    this._focalPoint = { x, y };
    return this;
  }

  /**
   * Manually focus on a specific point (without setting as the focal point)
   *
   * @param x
   * @param y
   * @returns {Camera}
   */
  focus(x, y) {
    this._focusAxis('x', x);
    this._focusAxis('y', y);
    return this;
  }

  /**
   * Define the boundaries of the level.
   *
   * @param width
   * @param height
   * @returns {Camera}
   */
  setLevelDimensions(width, height) {
    this._levelDimensions = { width, height };
    return this;
  }

  /**
   * Set the camera viewport size (relative to the level -- can layer be blown up with CSS)
   *
   * @param width
   * @param height
   * @returns {Camera}
   */
  setCameraDimensions(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this._cameraDimensions = { width, height };
    return this;
  }
}