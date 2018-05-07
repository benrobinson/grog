import Events from './Events';
import EventEntityMovement from './EventEntityMovement';
import EventEntityLevelCollision from './EventEntityLevelCollision';
import EventEntityEntityCollision from './EventEntityEntityCollision';

export default class Engine {

  /**
   * Engine constructor
   *
   * @param {Camera} camera
   * @param {Entities} entities
   * @param {Events} events
   * @param {Stage} stage
   * @param {Ticker} ticker
   */
  constructor(camera, entities, events, stage, ticker) {
    this.camera = camera;
    this.entities = entities;
    this.events = events;
    this.stage = stage;
    this.ticker = ticker;
    this._backgroundColor = 'black';
    this.empty();
  }

  /**
   * Change to a new stage.
   *
   * @param stageFn
   * @return Engine
   */
  changeStage(stageFn) {
    this.endStage();
    this.events.subscribe(Events.common.STAGE_ENDED, () => {
      this.startStage(stageFn);
    });
    return this;
  }

  /**
   * Start a stage.
   *
   * @param stageFn
   * @return Engine
   */
  startStage(stageFn) {
    this.empty();
    stageFn(this);
    this.events.publish(Events.common.STAGE_START);
    return this;
  }

  /**
   * End the current stage.
   *
   * @return Engine
   */
  endStage() {
    this.events.publish(Events.common.STAGE_END);
    return this;
  }

  /**
   * Empty and reset the values.
   *
   * @return Engine
   */
  empty() {
    this.camera.empty();
    this.entities.empty();
    this.events.empty();
    this.stage.empty();
    this.ticker.empty();

    this.events.subscribe(Events.common.ENGINE_UPDATES, (dt) => {
      this.stage.canvas.style.imageRendering = 'pixelated';
      this.stage.canvasContext.mozImageSmoothingEnabled = false;
      this.stage.canvasContext.webkitImageSmoothingEnabled = false;
      this.stage.canvasContext.msImageSmoothingEnabled = false;
      this.stage.canvasContext.imageSmoothingEnabled = false;
      this.stage.canvasContext.clearRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
      this.stage.drawingLayers.forEach(levelDrawingLayer => levelDrawingLayer.draw(this.stage.canvasContext));

      this.camera.canvas.style.imageRendering = 'pixelated';
      this.camera.canvasContext.mozImageSmoothingEnabled = false;
      this.camera.canvasContext.webkitImageSmoothingEnabled = false;
      this.camera.canvasContext.msImageSmoothingEnabled = false;
      this.camera.canvasContext.imageSmoothingEnabled = false;
      this.camera.canvasContext.clearRect(0, 0, this.camera.canvas.width, this.camera.canvas.height);
      this.camera.canvasContext.drawImage(this.stage.canvas, -this.camera.offset.x, -this.camera.offset.y);
      this.camera.drawingLayers.forEach(cameraDrawingLayer => cameraDrawingLayer.draw(this.camera.canvasContext));

      this.entities
        .onEntityCollisions((entityA, entityB) =>
          this.events.publish(EventEntityEntityCollision.key, new EventEntityEntityCollision(dt, entityA, entityB)))
        .onLevelCollisions(this.stage.collisions, dt, (entity, dimension) =>
          this.events.publish(EventEntityLevelCollision.key, new EventEntityLevelCollision(dt, entity, dimension)))
        .onMovement((entity) =>
          this.events.publish(EventEntityMovement.key, new EventEntityMovement(dt, entity)))
        .doUpdateSpriteGroup(dt);
    });

    this.ticker.addListener((dt) => {
      this.events
        .publish(Events.common.ENGINE_ANIMATION, dt)
        .publish(Events.common.ENGINE_DRAWING, dt)
        .publish(Events.common.ENGINE_INPUT, dt)
        .publish(Events.common.ENGINE_UPDATES, dt)
        .propagate(Events.common.ENGINE_ANIMATION)
        .propagate(Events.common.ENGINE_DRAWING)
        .propagate(Events.common.ENGINE_INPUT)
        .propagate(Events.common.ENGINE_UPDATES)
        .propagateAll();
    }, null);

    return this;
  }

  /**
   * Start the application ticker.
   *
   * @return Engine
   */
  start() {
    this.ticker.start();
    return this;
  }

  /**
   * Stop the application ticker.
   *
   * @return Engine
   */
  stop() {
    this.ticker.stop();
    return this;
  }

  /**
   * Set the level dimensions for both the level and camera.
   *
   * @param width
   * @param height
   * @returns {Engine}
   */
  setLevelDimensions(width, height) {
    this.stage.setLevelDimensions(width, height);
    this.camera.setLevelDimensions(width, height);
    return this;
  }

  /**
   * Set the camera viewport dimensions
   *
   * @param width
   * @param height
   * @returns {Engine}
   */
  setCameraDimensions(width, height) {
    this.camera.setCameraDimensions(width, height);
    return this;
  }

  /**
   * Set default drawing layers.
   *
   * @returns {Engine}
   */
  withDefaultDrawingLayers() {
    this.stage.drawingLayers
      .addLayer('floor')
      .addLayer('entities')
      .addLayer('lighting')
      .addLayer('overlay')
      .addLayer('atmosphere');
    this.camera.drawingLayers
      .addLayer('interface')
      .addLayer('effects');
    return this;
  }

  /**
   * Set default camera dimensions.
   *
   * @returns {Engine}
   */
  withDefaultCameraDimensions() {
    this.setCameraDimensions(128, 96);
    return this;
  }

  /**
   * Set default level dimensions.
   *
   * @returns {Engine}
   */
  withDefaultLevelDimensions() {
    this.setLevelDimensions(128, 96);
    return this;
  }

  withDefaultDimensions() {
    this.withDefaultCameraDimensions();
    this.withDefaultLevelDimensions();
    return this;
  }

  withBackgroundColor(color) {
    this._backgroundColor = color;
    return this;
  }

  mountInto(Id) {
    const mount = window.document.getElementById(Id);
    mount.style.backgroundColor = this._backgroundColor;
    mount.appendChild(this.camera.canvas);
    return this;
  }
}