import LevelCollisions from '../application/LevelCollisions';

export default class Entity {

  constructor(app) {
    this._application = app;
    this.empty();
    this._init();
  }

  _init() {

  }

  empty() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.acc = 30;
    this.speed = 30;
    this.width = 4;
    this.height = 4;
    this.offset = {
      x: 0,
      y: 0
    };
    return this;
  }

  setAcc(acc) {
    this.acc = acc;
    return this;
  }

  setDimensions(width, height) {
    this.width = width;
    this.height = height;
  }

  setOffset(x, y) {
    this.offset = { x, y };
    return this;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  setSpeed(speed) {
    this.speed = speed;
    return this;
  }

  setVx(vx) {
    this.vx = vx;
    return this;
  }

  setVy(vy) {
    this.vy = vy;
    return this;
  }

  getBox(x, y) {
    return {
      left: x + this.offset.x,
      right: x + this.offset.x + this.width,
      top: y + this.offset.y,
      bottom: y + this.offset.y + this.height
    }
  }
}