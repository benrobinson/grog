import Events from '../events/Events';
import EventEntityMovement from '../events/EventEntityMovement';
import EventEntityLevelCollision from '../events/EventEntityLevelCollision';
import EventEntityEntityCollision from '../events/EventEntityEntityCollision';

export default class Application {

  /**
   * Application constructor
   *
   * @param {Camera} camera
   * @param {Entities} entities
   * @param {Events} events
   * @param {Level} level
   * @param {Ticker} ticker
   */
  constructor(camera, entities, events, level, ticker) {
    this.camera = camera;
    this.entities = entities;
    this.events = events;
    this.level = level;
    this.ticker = ticker;
    this.empty();
  }

  /**
   * Change to a new stage.
   *
   * @param stageFn
   * @return void
   */
  changeStage(stageFn) {
    this.empty();
    stageFn(this);
  }

  /**
   * Empty and reset the values.
   *
   * @return void
   */
  empty() {
    this.camera.empty();
    this.entities.empty();
    this.events.empty();
    this.level.empty();
    this.ticker.empty();

    this.events.subscribe(Events.common.APPLICATION_UPDATES, (dt) => {
      this.level.canvas.style.imageRendering = 'pixelated';
      this.level.canvasContext.mozImageSmoothingEnabled = false;
      this.level.canvasContext.webkitImageSmoothingEnabled = false;
      this.level.canvasContext.msImageSmoothingEnabled = false;
      this.level.canvasContext.imageSmoothingEnabled = false;
      this.level.canvasContext.clearRect(0, 0, this.level.canvas.width, this.level.canvas.height);
      this.level.drawingLayers.forEach(levelDrawingLayer => levelDrawingLayer.draw(this.level.canvasContext));

      this.camera.canvas.style.imageRendering = 'pixelated';
      this.camera.canvasContext.mozImageSmoothingEnabled = false;
      this.camera.canvasContext.webkitImageSmoothingEnabled = false;
      this.camera.canvasContext.msImageSmoothingEnabled = false;
      this.camera.canvasContext.imageSmoothingEnabled = false;
      this.camera.canvasContext.clearRect(0, 0, this.camera.canvas.width, this.camera.canvas.height);
      this.camera.canvasContext.drawImage(this.level.canvas, -this.camera.offset.x, -this.camera.offset.y);
      this.camera.drawingLayers.forEach(cameraDrawingLayer => cameraDrawingLayer.draw(this.camera.canvasContext));

      this.entities
        .onEntityCollisions((entityA, entityB) =>
          this.events.publish(Events.common.ENTITY_ENTITY_COLLISION, new EventEntityEntityCollision(dt, entityA, entityB)))
        .onLevelCollisions(this.level.collisions, dt, (entity, dimension) =>
          this.events.publish(Events.common.ENTITY_LEVEL_COLLISION, new EventEntityLevelCollision(dt, entity, dimension)))
        .onMovement((entity) =>
          this.events.publish(Events.common.ENTITY_MOVEMENT, new EventEntityMovement(dt, entity)))
        .doUpdateSpriteGroup(dt);
    });

    this.ticker.addListener((dt) => {
      this.events
        .publish(Events.common.APPLICATION_ANIMATION, dt)
        .publish(Events.common.APPLICATION_DRAWING, dt)
        .publish(Events.common.APPLICATION_INPUT, dt)
        .publish(Events.common.APPLICATION_UPDATES, dt)
        .propagate(Events.common.APPLICATION_ANIMATION)
        .propagate(Events.common.APPLICATION_DRAWING)
        .propagate(Events.common.APPLICATION_INPUT)
        .propagate(Events.common.APPLICATION_UPDATES)
        .propagateAll();
    }, null);
  }

  /**
   * Start the application ticker.
   *
   * @return void
   */
  start() {
    this.ticker.start();
  }

  /**
   * Stop the application ticker.
   *
   * @return void
   */
  stop() {
    this.ticker.stop();
  }

  /**
   * Set the level dimensions for both the level and camera.
   *
   * @param width
   * @param height
   * @returns {Application}
   */
  setLevelDimensions(width, height) {
    this.level.setLevelDimensions(width, height);
    this.camera.setLevelDimensions(width, height);
    return this;
  }

  /**
   * Set the camera viewport dimensions
   *
   * @param width
   * @param height
   * @returns {Application}
   */
  setCameraDimensions(width, height) {
    this.camera.setCameraDimensions(width, height);
    return this;
  }

  /**
   * Set default drawing layers.
   *
   * @returns {Application}
   */
  withDefaultDrawingLayers() {
    this.level.drawingLayers
      .addLayer('floor')
      .addLayer('entities')
      .getLayer('lighting')
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
   * @returns {Application}
   */
  withDefaultCameraDimensions() {
    this.setCameraDimensions(64, 48);
    return this;
  }

  /**
   * Set default level dimensions.
   *
   * @returns {Application}
   */
  withDefaultLevelDimensions() {
    this.setLevelDimensions(128, 96);
    return this;
  }
}