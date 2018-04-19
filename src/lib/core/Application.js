import Ticker from './Ticker';
import EventManager from './EventManager';
import DrawingLayers from './DrawingLayer';

export default class Application {
  constructor() {
    this.levelCanvas = window.document.createElement('canvas');
    this.levelCanvasContext = this.canvas.getContext('2d');
    this.levelLayers = new DrawingLayers();

    this.cameraCanvas = window.document.getElementById('window');
    this.cameraCanvasContext = this.canvas.getContext('2d');
    this.cameraLayers = new DrawingLayers();

    this.eventManager = new EventManager();
    this.ticker = new Ticker();
    this._time = new Date().getTime();
    this._states = {
      RUNNING: 'RUNNING',
      STOPPED: 'STOPPED'
    };
    this._state = this._states.STOPPED;
    this._init();
  }

  _reset() {
    this.eventManager.empty();
    this.drawingLayers.empty();
  }

  _init() {
    this.eventManager.on('application:drawing', dt => {
      this.levelCanvasContext.clearRect(0, 0, this.levelCanvas.width, this.levelCanvas.height);
      this.cameraCanvasContext.clearRect(0, 0, this.cameraCanvas.width, this.cameraCanvas.height);
      this.levelLayers.forEach(ll => this.levelLayers[ll].draw(this.levelCanvasContext));
      this.cameraLayers.forEach(ll => this.cameraLayers[ll].draw(this.cameraCanvasContext));
    });

    this.ticker.addListener((dt) => {
      this.eventManager
        .publish('application:updates', dt)
        .publish('application:animation', dt)
        .publish('application:drawing', dt);

      this.eventManager
        .propagate('application:updates')
        .propagate('application:animation')
        .propagate('application:drawing')
        .propagateAll();
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

  changeStage(stageFn) {
    this._reset();
    this._init();
    stageFn();
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

  useDefaultLayers() {

  }

}