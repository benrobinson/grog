export default class DrawingLayers {

  constructor() {
    this.empty();
  }

  addLayer(name, layer) {
    this._layerOrder.push(name);
    this._layers[name] = layer;
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