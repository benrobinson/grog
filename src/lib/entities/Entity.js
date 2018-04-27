import LevelCollisions from '../level/LevelCollisions';

export default class Entity {

  constructor() {
    this.empty();
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
    this.spriteGroup = null;
    return this;
  }

  accX(dt) {
    this.vx += this.acc * dt;
    if (this.vx >= this.speed) this.vx = this.speed;
    return this;
  }

  decX(dt) {
    this.vx -= this.acc * dt;
    if (this.vx <= -this.speed) this.vx = -this.speed;
    return this;
  }

  accY(dt) {
    this.vy += this.acc * dt;
    if (this.vy >= this.speed) this.vy = this.speed;
    return this;
  }

  decY(dt) {
    this.vy -= this.acc * dt;
    if (this.vy <= -this.speed) this.vy = -this.speed;
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

  setSpriteGroup(spriteGroup) {
    this.spriteGroup = spriteGroup;
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

  draw(canvasContext) {
    if (!!this.spriteGroup) {
      this.spriteGroup.draw(canvasContext);
    }
  }
}