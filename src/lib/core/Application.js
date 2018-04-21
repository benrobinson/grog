import Ticker from './Ticker';
import EventManager from './EventManager';
import DrawingLayers from './DrawingLayers';
import LevelMap from './LevelMap';
import LevelTriggers from './LevelTriggers';
import Camera from './Camera';

export default class Application {

  constructor() {
    this.level = {
      canvas: window.document.createElement('canvas'),
      drawingLayers: new DrawingLayers(),
      mapLayer: new LevelMap(),
      triggers: new LevelTriggers()
    };
    this.level.canvasContext = this.level.canvas.getContext('2d');

    this.camera = {
      canvas: window.document.getElementById('camera'),
      drawingLayers: new DrawingLayers(),
      camera: new Camera()
    };
    this.camera.canvasContext = this.camera.canvas.getContext('2d');

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
    console.log(this);
    this.eventManager.empty();
    this.level.drawingLayers.empty();
    this.level.mapLayer.empty();
    this.camera.drawingLayers.empty();
  }

  _init() {
    this.eventManager.subscribe('application:drawing', () => {
      this.level.canvasContext.clearRect(0, 0, this.level.canvas.width, this.level.canvas.height);
      this.level.drawingLayers.forEach(ll => ll.draw(this.level.canvasContext));

      this.camera.canvasContext.clearRect(0, 0, this.camera.canvas.width, this.camera.canvas.height);
      this.camera.canvasContext.drawImage(this.level.canvas, -this.camera.camera.offset.x, -this.camera.camera.offset.y);
      this.camera.drawingLayers.forEach(ll => ll.draw(this.camera.canvasContext));
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
    this.level.drawingLayers
      .addLayer('floor')
      .addLayer('entities')
      .addLayer('overlay');

    this.camera.drawingLayers
      .addLayer('atmosphere')
      .addLayer('interface')
      .addLayer('effects');
  }

}