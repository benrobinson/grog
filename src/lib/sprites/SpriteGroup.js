import {application} from '../core';

export default class SpriteGroup {
  constructor() {
    this._layers = [];
    this.sprites = {};
    this.x = 0;
    this.y = 0;
    application.drawingLayers.entities.addDrawable(this);
  }

  addSprite = (name, sprite) => {
    sprite.setGroup(this);
    this._layers.push(name);
    this.sprites[name] = sprite;
    return this;
  };

  destroy() {
    application.drawingLayers.entities.removeDrawable(this);
    delete this;
  }

  draw() {
    for (let layer = 0; layer < this._layers.length; layer++) {
      this.sprites[this._layers[layer]].draw();
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
}