export default class Ticker {

  static states = {
    TICKING: 'TICKING',
    STOPPED: 'STOPPED'
  };

  constructor() {
    this.empty();
  }

  _tick() {
    if (this._state !== Ticker.states.TICKING) return;

    const time = new Date().getTime();
    const dt = (time - this._time) / 1000;

    this._listeners.map((listener) => listener.fn.apply(listener.context, [dt]));
    this._time = time;

    window.requestAnimationFrame(this._tick.bind(this));
  }

  addListener(fn, context) {
    this._listeners.push({fn, context});
    return this;
  }

  empty() {
    this._listeners = [];
    this._state = Ticker.states.STOPPED;
    this._time = new Date().getTime();
  }

  start() {
    if (this._state === Ticker.states.TICKING) return;

    this._state = Ticker.states.TICKING;
    this._time = new Date().getTime();
    this._tick();
  }

  stop() {
    this._state = Ticker.states.STOPPED;
  }

}