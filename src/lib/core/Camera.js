export default class Camera {

  constructor() {
    this.empty()
  }

  empty() {
    this._levelSize = {
      w: 640,
      h: 480
    };
    this._viewPort = {
      w: 320,
      h: 240
    };
    this.focalPoint = {
      x: 0,
      y: 0
    };
    this.offset = {
      x: 0,
      y: 0
    };
  }

  _focusAxis(axis, v) {
    if (this._levelSize.w <= this._viewPort.w) {
      this.offset[axis] = 0;
    } else {
      const edgeBuffer = this._viewPort.w / 2;

      // Camera can't go beyond the left edge.
      if (v <= edgeBuffer) {
        this.offset[axis] = 0;
        return;
      }

      // Camera can't go beyond the right edge.
      if (v >= this._levelSize.w || (this._levelSize.w - v) <= edgeBuffer) {
        this.offset[axis] = this._levelSize.w - this._viewPort.w;
        return;
      }

      this.offset[axis] = v - edgeBuffer;
    }
  }

  refocus() {
    this.focus(this.focalPoint.x, this.focalPoint.y);
  }

  setFocalPoint(x, y) {
    this.focalPoint = { x, y };
  }

  focus(x, y) {
    this._focusAxis('x', x);
    this._focusAxis('y', y);
  }

  setLevelSize(w, h) {
    this._levelSize = { w, h };
    return this;
  }

  setViewPort(w, h) {
    this._viewPort = { w, h };
    return this;
  }

}