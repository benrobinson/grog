import drawBackground from '../../../shared/lib/drawBackground';
import fadeIn from '../../../shared/lib/fadeIn';
import fadeOut from '../../../shared/lib/fadeOut';

import Events from '../../../engine/Events';

import drawMenu from './lib/drawMenu';

export default function Menu(engine) {

  engine
    .withDefaultDimensions()
    .withDefaultDrawingLayers();

  fadeIn(engine);
  drawBackground(engine, '#EEEEEE');
  drawMenu(engine);

  engine.events
    .subscribe(Events.common.STAGE_END, () => fadeOut(engine));
}