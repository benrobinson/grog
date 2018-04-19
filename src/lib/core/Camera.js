class Camera {

  constructor() {
    this.empty()
  }

  empty() {
    this._focalPoint = {
      x: 0,
      y: 0
    };
    this._offset = {
      x: 0,
      y: 0
    };
    this._levelSize = {
      w: 640,
      h: 480
    };
    this._viewPort = {
      w: 320,
      h: 240
    };
  }

  _focusAxis(axis, v) {
    if (this._levelSize.w <= this._viewPort.w) {
      this._offset[axis] = 0;
      return;
    } else {
      const edgeBuffer = this._viewPort.w / 2;

      // Camera can't go beyond the left edge.
      if (v <= edgeBuffer) {
        this._offset[axis] = 0;
        return;
      }

      // Camera can't go beyond the right edge.
      if (v >= this._levelSize.w || (this._levelSize.w - v) <= edgeBuffer) {
        this._offset[axis] = this._levelSize.w - this._viewPort.w;
        return;
      }

      this._offset[axis] = v - edgeBuffer;
    }
  }

  refocus() {
    this.focus(this._focalPoint.x, this._focalPoint.y);
  }

  focus(x, y) {
    this._focusAxis('x', x);
    this._focusAxis('y', y);
  }

  setFocalPoint(x, y) {
    this._focalPoint = { x, y };
  }

  setLevelSize(w, h) {
    this._levelSize = { w, h };
  }

  setOffset(x, y) {
    this._offset = { x, y };
  }

  setViewPort(w, h) {
    this._viewPort = { w, h };
  }

}