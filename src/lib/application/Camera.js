import DrawingLayers from './DrawingLayers';

export default class Camera {

  constructor() {
    this.empty()
  }

  empty() {
    this._focalPoint = {
      x: 0,
      y: 0
    };
    this.offset = {
      x: 0,
      y: 0
    };
    this.canvas = window.document.createElement('canvas');
    this.canvasContext = this.canvas.getContext('2d');
    this.drawingLayers = new DrawingLayers();
    this.setCameraDimensions(64, 48);
    this.setLevelDimensions(128, 96);
  }

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

  refocus() {
    this.focus(this._focalPoint.x, this._focalPoint.y);
    return this;
  }

  setFocalPoint(x, y) {
    this._focalPoint = { x, y };
    return this;
  }

  focus(x, y) {
    this._focusAxis('x', x);
    this._focusAxis('y', y);
    return this;
  }

  setLevelDimensions(width, height) {
    this._levelDimensions = { width, height };
    return this;
  }

  setCameraDimensions(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this._cameraDimensions = { width, height };
    return this;
  }
}