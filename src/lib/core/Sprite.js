import {application} from './index';
import {Degrees} from '../util/Math';

export default class Sprite {
  constructor() {
    this._animations = {};
    this._animation = null;
    this._group = {
      x: 0,
      y: 0
    };
    this._rotation = {
      degrees: 0,
      radians: 0
    };
    this._scale = 1;
    this.x = 0;
    this.y = 0;
    this.draw = (canvasContext) => {}
  }

  _draw() {
    this._animations[this._animation].onFrame(frame => {
      this.draw = (canvasContext) => {
        const dWidth = frame.tile[2] * this._scale;
        const dHeight = frame.tile[3] * this._scale;
        canvasContext.save();
        canvasContext.translate(this.x + this._group.x + frame.move.x, this.y + this._group.y + frame.move.y);
        canvasContext.rotate(this._rotation.radians + frame.rotation);
        canvasContext.drawImage(
          this._animations[this._animation].tileSheet.imageAsset.resource,
          frame.tile[0],
          frame.tile[1],
          frame.tile[2],
          frame.tile[3],
          -(dWidth / 2),
          -(dHeight / 2),
          dWidth,
          dHeight);
        canvasContext.restore();
      };
    });
    return this;
  }

  _useAnimation(name) {
    this._animation = name || this._animation;
  }

  addAnimation(name, animation) {
    this._animations[name] = animation;

    // Set the current animation to this if there's only one added so far.
    if (Object.keys(this._animations).length === 1) {
      this._useAnimation(Object.keys(this._animations)[0]);
      this._draw();
    }
    return this;
  }

  setGroup(spriteGroup) {
    this._group = spriteGroup;
  }

  setRotation(deg) {
    this._rotation.degrees = deg;
    this._rotation.radians = Degrees.toRadians(deg);
    return this;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  playAnimation(name, frame = 0) {
    this.stopAnimation(this._animation);
    this._useAnimation(name);
    this._animations[this._animation].play(frame);
    return this;
  }

  stopAnimation(name, frame = 0) {
    this._useAnimation(name);
    this._animations[this._animation].stop(frame);
    return this;
  }

  showAnimationFrame(name, frame = 0) {
    this._useAnimation(name);
    this._animations[this._animation].show(frame);
    return this;
  }
}