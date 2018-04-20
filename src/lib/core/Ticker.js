export default class Ticker {

  constructor() {
    this._listeners = [];
  }

  addListener(fn, context) {
    this._listeners.push({fn, context});
    return this;
  }

  tick(dt) {
    this._listeners.map((listener) => listener.fn.apply(listener.context, [dt]));
  }

}