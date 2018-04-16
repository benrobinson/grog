import Ticker from './Ticker';
import EventManager from './EventManager';
import DrawingLayers from './DrawingLayers';
import DrawingLayer from './DrawingLayer';

export default class Application {
  constructor() {
    this.canvas = window.document.getElementById('game');
    this.canvasContext = this.canvas.getContext('2d');
    this.eventManager = new EventManager();
    this.drawingLayers = {
      background: new DrawingLayer(),
      entities: new DrawingLayer(),
      foreground: new DrawingLayer(),
      atmosphere: new DrawingLayer(),
      interface: new DrawingLayer()
    };
    this.drawingLayerOrder = [
      'background',
      'entities',
      'foreground',
      'atmosphere',
      'interface'
    ];
    this.ticker = new Ticker();
    this._time = new Date().getTime();
    this._states = {
      RUNNING: 'RUNNING',
      STOPPED: 'STOPPED'
    };
    this._state = this._states.STOPPED;
    this._init();
  }

  _init() {
    this.ticker.addListener(() => {
      this.eventManager.propagateAll();
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawingLayerOrder.forEach(drawingLayer => this.drawingLayers[drawingLayer].draw());
    }, null);
  }

  _update() {
    if (this._state !== this._states.RUNNING) return;

    setTimeout(() => {
      const time = new Date().getTime();
      const dt = (time - this._time) / 1000;

      this.ticker.tick(dt);

      this._time = time;
      window.requestAnimationFrame(this._update.bind(this))
    }, 1000 / 60);
  }

  run() {
    if (this._state === this._states.RUNNING) return;

    this._state = this._states.RUNNING;
    this._time = new Date().getTime();
    this._update();
  }

  stop() {
    this._state = this._states.STOPPED;
  }
}