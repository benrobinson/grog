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

  getLayer(name) {
    return this._layers[name];
  }

  empty() {
    this._layerOrder = [];
    this._layers = {};
    return this;
  }

}