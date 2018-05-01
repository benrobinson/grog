import Animation from '../../../engine/Animation';
import EffectFadeDrawing from '../../../engine/EffectFadeDrawing';
import Events from '../../../engine/Events';
import ImageAsset from '../../../engine/ImageAsset';
import ImageAssetLoader from '../../../engine/ImageAssetLoader';
import Sprite from '../../../engine/Sprite';

import title from './assets/pom-title.png';
import TileSheet from '../../../engine/TileSheetAsset';

import Character from '../Character';

export default function Titles(engine) {

  new ImageAssetLoader()
    .addAsset(new ImageAsset()
      .setName('title')
      .setWidth(48)
      .setHeight(48)
      .setSource(title)
      .buildResource())
    .onSuccess(start)
    .load();

  function start(imageAssetManager) {

    engine
      .setLevelDimensions(64, 48)
      .withDefaultCameraDimensions()
      .withDefaultDrawingLayers();

    const titleTileSheet = TileSheet(imageAssetManager.getAsset('title'), 48, 24);

    _fadeIn(engine);
    _drawBackground(engine);
    _drawTitle(engine, titleTileSheet);

    engine.events
      .subscribe(Events.common.STAGE_END, () => _fadeOut(engine))
      .subscribe(Events.common.STAGE_STARTED, () => _showButtons(engine));

    window.addEventListener('keydown', () => engine.changeStage(Character));
  }
}

function _showButtons(engine) {
  console.log('DONE');
}

function _drawBackground(engine) {
  engine.stage.drawingLayers
    .getLayer('floor')
    .addDrawable({
      draw: (canvasContext) => {
        canvasContext.fillStyle = '#afffaf';
        canvasContext.fillRect(0, 0, engine.stage.canvas.width, engine.stage.canvas.height);
      }
    });
}

function _fadeIn(engine) {
  const fader = new EffectFadeDrawing()
    .setArea(engine.camera.canvas.width, engine.camera.canvas.height)
    .setColor(0, 0, 0)
    .setDuration(5)
    .setDirection(EffectFadeDrawing.directions.IN)
    .onComplete(() => engine.events.publish(Events.common.STAGE_STARTED));

  engine.camera.drawingLayers
    .getLayer('effects')
    .addDrawable(fader);

  engine.events
    .subscribe(Events.common.ENGINE_ANIMATION, dt => fader.tick(dt));
}

function _fadeOut(engine) {
  const fader = new EffectFadeDrawing()
    .setArea(engine.camera.canvas.width, engine.camera.canvas.height)
    .setColor(0, 0, 0)
    .setDuration(5)
    .setDirection(EffectFadeDrawing.directions.OUT)
    .onComplete(() => engine.events.publish(Events.common.STAGE_ENDED));

  engine.camera.drawingLayers
    .getLayer('effects')
    .addDrawable(fader);

  engine.events
    .subscribe(Events.common.ENGINE_ANIMATION, dt => fader.tick(dt));
}

function _drawTitle(engine, tileSheet) {
  engine.camera.drawingLayers
    .getLayer('interface')
    .addDrawable(new Sprite()
      .setPosition(32, 26)
      .addAnimation('shadow',
        new Animation(engine, tileSheet)
          .addFrame(0, 1))
      .playAnimation('shadow'))
    .addDrawable(new Sprite()
      .setPosition(32, 24)
      .addAnimation('title',
        new Animation(engine, tileSheet)
          .setIsLoop(true)
          .setFramesPerSecond(5)
          .addFrame(0, 0, 0, 0)
          .addFrame(0, 0, 0, -1)
          .addFrame(0, 0, 0, -2)
          .addFrame(0, 0, 0, -3)
          .addFrame(0, 0, 0, -2)
          .addFrame(0, 0, 0, -1))
      .playAnimation('title'));
}