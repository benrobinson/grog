import Events from '../../../engine/Events';
import EffectFadeDrawing from '../../../engine/EffectFadeDrawing';

export default function Character(engine) {

  engine
    .setLevelDimensions(64, 48)
    .withDefaultCameraDimensions()
    .withDefaultDrawingLayers();

  _fadeIn(engine);
  _drawBackground(engine)

}

function _drawBackground(engine) {
  console.log('drawing the background')

  engine.stage.drawingLayers
    .getLayer('floor')
    .addDrawable({
      draw: (canvasContext) => {
        canvasContext.fillStyle = '#ffafaf';
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