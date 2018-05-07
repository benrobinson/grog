import EffectFadeDrawing from '../../engine/EffectFadeDrawing';
import Events from '../../engine/Events';

export default function fadeIn(engine) {
  const fader = new EffectFadeDrawing()
    .setArea(engine.camera.canvas.width, engine.camera.canvas.height)
    .setColor(0, 0, 0)
    .setDuration(1)
    .setDirection(EffectFadeDrawing.directions.IN)
    .onComplete(() => engine.events.publish(Events.common.STAGE_STARTED));

  engine.camera.drawingLayers
    .getLayer('effects')
    .addDrawable(fader);

  engine.events
    .subscribe(Events.common.ENGINE_ANIMATION, dt => fader.tick(dt));
}