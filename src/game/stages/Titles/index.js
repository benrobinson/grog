import Events from '../../../engine/Events';

import drawBackground from '../../../shared/lib/drawBackground';
import drawText from '../../../shared/lib/drawText';
import fadeIn from '../../../shared/lib/fadeIn';
import fadeOut from '../../../shared/lib/fadeOut';

import drawTitle from './lib/drawTitle';

import Menu from '../Menu';

export default function Titles(engine) {

  engine
    .withDefaultDimensions()
    .withDefaultDrawingLayers();

  fadeIn(engine);
  drawBackground(engine, '#ffcbdd');
  drawTitle(engine);

  engine.events
    .subscribe(Events.common.STAGE_END, () => {
      window.removeEventListener('keyup', goToMenu);
      fadeOut(engine);
    })
    .subscribe(Events.common.STAGE_STARTED, () => {
      window.addEventListener('keyup', goToMenu);
      drawText(engine, "press enter", 32, 80);
    });

  function goToMenu() {
    engine.changeStage(Menu)
  }
}