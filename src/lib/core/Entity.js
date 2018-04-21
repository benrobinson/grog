import {application} from './index';

export default class Entity {

  constructor() {
    this.empty();
  }

  _applyFriction(dt, x, y) {
    const current = application.mapLayer.getTypeFromPixels(x, y);

    let friction;

    // TODO probably move this elsewhere
    switch(current) {
      default:
      case LevelMap.tileTypes.FLOOR:
        friction = 1;
        break;
      case LevelMap.tileTypes.LIQUID:
        friction = 2;
        break;
      case LevelMap.tileTypes.SLIP:
        friction = 0.3;
        break;
      case LevelMap.tileTypes.ROUGH:
        friction = 1.3;
        break;
    }

    const nextVx = Math.abs(this.vx) - friction;
    const nextVy = Math.abs(this.vy) - friction;

    if (nextVx <= 0) {
      this.vx = 0;
    } else {
      this.vx = this.vx > 0 ? nextVx : -nextVx;
    }

    if (nextVy <= 0) {
      this.vy = 0;
    } else {
      this.vy = this.vy > 0 ? nextVy : -nextVy;
    }

    return this;
  }

  _init() {
    application.eventManager.subscribe('application:updates', (dt) => {
      this._applyFriction(dt, this.x + (this.collisionBox.width / 2), this.y + (this.collisionBox.height / 2));
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
      width: 8,
      height: 8,
      offset: {
        x: 0,
        y: 0
      }
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

  getBox(x, y) {
    return {
      left: x + this.collisionBox.offset.x,
      right: x + this.collisionBox.offset.x + this.collisionBox.width,
      top: y + this.collisionBox.offset.y,
      bottom: y + this.collisionBox.offset.y + this.collisionBox.height
    }
  }

  maybeMoveTo(x, y) {
    const mapLayer = application.level.mapLayer;
    const nextBox = this.getBox(x, y);
    const currBox = this.getBox(this.x, this.y);

    if (this.vx > 0 && mapLayer.getTypeFromPixels(nextBox.right, currBox.top) === LevelMap.tileTypes.WALL ||
        this.vx > 0 && mapLayer.getTypeFromPixels(nextBox.right, currBox.bottom) === LevelMap.tileTypes.WALL ||
        this.vx < 0 && mapLayer.getTypeFromPixels(nextBox.left, currBox.top) === LevelMap.tileTypes.WALL ||
        this.vx < 0 && mapLayer.getTypeFromPixels(nextBox.left, currBox.bottom) === LevelMap.tileTypes.WALL) {
      this.vx = this._isBounce ? this.bounce('x') : this.stop('x');
    } else {
      this.x = x;
    }

    if (this.vy > 0 && mapLayer.getTypeFromPixels(nextBox.left, currBox.bottom) === LevelMap.tileTypes.WALL ||
        this.vy > 0 && mapLayer.getTypeFromPixels(nextBox.right, currBox.bottom) === LevelMap.tileTypes.WALL ||
        this.vy < 0 && mapLayer.getTypeFromPixels(nextBox.left, currBox.top) === LevelMap.tileTypes.WALL ||
        this.vy < 0 && mapLayer.getTypeFromPixels(nextBox.right, currBox.top) === LevelMap.tileTypes.WALL) {
      this.vy = this._isBounce ? this.bounce('y') : this.stop('y');
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