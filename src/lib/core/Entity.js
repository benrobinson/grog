import {application} from './index';

export default class Entity {

  constructor() {
    this.empty();
  }

  _applyFriction(x, y) {
    const current = application.mapLayer.getTypeFromPixels(x, y);

    let friction;

    // TODO move this elsewhere
    switch(current) {
      default:
      case 'FLOOR':
        friction = 1;
        break;
      case 'LIQUID':
        friction = 2;
        break;
      case 'SLIP':
        friction = 0.3;
        break;
      case 'ROUGH':
        friction = 1.3;
        break;
    }

    this.vx = this.vx - friction > 0 ? this.vx - friction : 0;
    this.vy = this.vy - friction > 0 ? this.vy - friction : 0;
    return this;
  }

  _init() {
    application.eventManager.subscribe('application:updates', () => {
      this._applyFriction(this.x, this.y);
      const nextX = this.x + (dt * this.vx);
      const nextY = this.y + (dt * this.vy);
      this.maybeMoveTo(nextX, nextY);
    });
  }

  empty() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.collisionBox = {
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0
    };
    this._isBounce = false;
    return this;
  }

  bounce(axis) {
    this[`v${axis}`] = -this[`v${axis}`];
  }

  isBounce() {
    this._isBounce = true;
    return this;
  }

  maybeMoveTo(x, y) {
    const mapLayer = application.level.mapLayer;

    if (mapLayer.getTypeFromPixels(x, this.y) === 'WALL') {
      this._isBounce ? this.bounce('x') : this.stop('x');
    } else {
      this.x = x;
    }

    if (mapLayer.getTypeFromPixels(this.x, y) === 'WALL') {
      this._isBounce ? this.bounce('y') : this.stop('y');
    } else {
      this.y = y;
    }

    return this;
  }

  stop(axis) {
    this[`v${axis}`] = 0;
    return this;
  }

  stopBoth() {
    this.stop('x');
    this.stop('y');
    return this;
  }
}