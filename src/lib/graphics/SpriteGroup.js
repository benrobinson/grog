import {application} from '../core/index';

export default class SpriteGroup {
  constructor() {
    this._layers = [];
    this.sprites = {};
    this.x = 0;
    this.y = 0;
  }

  addSprite = (name, sprite) => {
    sprite.setGroup(this);
    this._layers.push(name);
    this.sprites[name] = sprite;
    return this;
  };

  draw(canvasContext) {
    for (let layer = 0; layer < this._layers.length; layer++) {
      this.sprites[this._layers[layer]].draw(canvasContext);
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
}