import DrawingLayer from './DrawingLayer';

export default class DrawingLayers {

  /**
   * DrawingLayers constructor
   */
  constructor() {
    this.empty();
  }

  /**
   * Add a drawing layer.
   *
   * @param name
   * @returns {DrawingLayers}
   */
  addLayer(name) {
    this._layerOrder.push(name);
    this._layers[name] = new DrawingLayer();
    return this;
  }

  /**
   * Call a function on each of the layers.
   *
   * @param fn
   */
  forEach(fn) {
    this._layerOrder.forEach(name => fn(this._layers[name]));
  }

  /**
   * @param name
   * @returns {DrawingLayer} layer
   */
  getLayer(name) {
    return this._layers[name];
  }

  /**
   * Reset to default.
   *
   * @returns {DrawingLayers}
   */
  empty() {
    this._layerOrder = [];
    this._layers = {};
    return this;
  }

}