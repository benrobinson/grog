import drawBackground from '../../../shared/lib/drawBackground';
import fadeIn from '../../../shared/lib/fadeIn';

export default function Character(engine) {

  engine
    .withDefaultDimensions()
    .withDefaultDrawingLayers();

  fadeIn(engine);
  drawBackground(engine, '#66afff');

}