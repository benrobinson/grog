export default class Application {

  constructor(camera, entities, events, level, ticker) {
    this.camera = camera;
    this.entities = entities;
    this.events = events;
    this.level = level;
    this.ticker = ticker;
    this.empty();
  }

  changeStage(stageFn) {
    this.empty();
    stageFn(this);
  }

  empty() {
    this.camera.empty();
    this.entities.empty();
    this.events.empty();
    this.level.empty();
    this.ticker.empty();

    this.events.subscribe('application:drawing', () => {

      // TODO: could be left to the config maybe
      this.camera.canvas.style.imageRendering = 'pixelated';
      this.camera.canvasContext.mozImageSmoothingEnabled = false;
      this.camera.canvasContext.webkitImageSmoothingEnabled = false;
      this.camera.canvasContext.msImageSmoothingEnabled = false;
      this.camera.canvasContext.imageSmoothingEnabled = false;

      this.level.canvas.style.imageRendering = 'pixelated';
      this.level.canvasContext.mozImageSmoothingEnabled = false;
      this.level.canvasContext.webkitImageSmoothingEnabled = false;
      this.level.canvasContext.msImageSmoothingEnabled = false;
      this.level.canvasContext.imageSmoothingEnabled = false;

      this.level.canvasContext.clearRect(0, 0, this.level.canvas.width, this.level.canvas.height);
      this.level.drawingLayers.forEach(levelDrawingLayer => levelDrawingLayer.draw(this.level.canvasContext));

      this.camera.canvasContext.clearRect(0, 0, this.camera.canvas.width, this.camera.canvas.height);
      this.camera.canvasContext.drawImage(this.level.canvas, -this.camera.offset.x, -this.camera.offset.y);
      this.camera.drawingLayers.forEach(cameraDrawingLayer => cameraDrawingLayer.draw(this.camera.canvasContext));
    });

    this.events.subscribe('application:updates', (dt) => {
      this.entities
        .onEntityCollisions((entityA, entityB) => {
          this.events.publish('entities:entity-collision', { dt, entityA, entityB });
        })
        .onLevelCollisions(this.level.collisions, dt, (entity, dimension) => {
          this.events.publish('entities:level-collision', { dt, entity, dimension })
        })
        .onMovement((entity) => {
          this.events.publish('entities:movement', {dt, entity});
        })
        .doUpdateSpriteGroup(dt);
    });

    this.ticker.addListener((dt) => {
      this.events
        .publish('application:animation', dt)
        .publish('application:drawing', dt)
        .publish('application:input', dt)
        .publish('application:updates', dt);

      this.events
        .propagate('application:animation')
        .propagate('application:drawing')
        .propagate('application:input')
        .propagate('application:updates')
        .propagateAll();
    }, null);
  }

  start() {
    this.ticker.start();
  }

  stop() {
    this.ticker.stop();
  }

  setLevelDimensions(width, height) {
    this.level.setLevelDimensions(width, height);
    this.camera.setLevelDimensions(width, height);
    return this;
  }

  setCameraDimensions(width, height) {
    this.camera.setCameraDimensions(width, height);
    return this;
  }

  withDefaultDrawingLayers() {
    this.level.drawingLayers
      .addLayer('floor')
      .addLayer('entities')
      .addLayer('overlay')
      .addLayer('atmosphere');
    this.camera.drawingLayers
      .addLayer('interface')
      .addLayer('effects');
    return this;
  }

  withDefaultCameraDimensions() {
    this.setCameraDimensions(64, 48);
    return this;
  }

  withDefaultLevelDimensions() {
    this.setLevelDimensions(128, 96);
    return this;
  }
}