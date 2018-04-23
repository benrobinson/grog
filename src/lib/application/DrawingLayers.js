import DrawingLayer from './DrawingLayer';

export default class DrawingLayers {

  constructor() {
    this.empty();
  }

  addLayer(name) {
    this._layerOrder.push(name);
    this._layers[name] = new DrawingLayer();
    return this;
  }

  forEach(fn) {
    this._layerOrder.forEach(name => fn(this._layers[name]));
  }

  getLayer(name) {
    return this._layers[name];
  }

  empty() {
    this._layerOrder = [];
    this._layers = {};
    return this;
  }

}