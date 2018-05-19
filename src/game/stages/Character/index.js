import drawBackground from '../../../shared/lib/drawBackground';
import fadeIn from '../../../shared/lib/fadeIn';
import drawText from '../../../shared/lib/drawText';

export default function Character(engine) {

  engine
    .withDefaultDimensions()
    .withDefaultDrawingLayers();

  fadeIn(engine);
  drawBackground(engine, '#EEEEEE');
  _drawCharacterBox(engine);
  drawText(engine, 'Character', 5, 5, {r: 0, g: 0, b: 0});

}

function _drawCharacterBox(engine) {
  engine.stage.drawingLayers.getLayer('floor').addDrawable({
    draw: (canvasContext) => {
      canvasContext.fillStyle = 'rgba(0, 0, 0, 0.1)';
      canvasContext.fillRect(100, 33, 24, 32);
      canvasContext.fillStyle = '#80D4D2';
      canvasContext.fillRect(99, 32, 24, 32);
      canvasContext.fillStyle = '#17A76B';
      canvasContext.fillRect(99, 48, 24, 16);
    }
  })
}