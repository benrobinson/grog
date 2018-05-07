import KeyBoard from '../../../../engine/KeyBoard';
import Events from '../../../../engine/Events';
import drawText from '../../../../shared/lib/drawText';
import makeSelector from './makeSelector';

export default function drawMenu(engine) {

  const menuItems = [
    "new game",
    "options"
  ];

  // TODO replace with loading function for saved game state.
  // if (!!window.data === true) {
  menuItems.unshift("continue");
  // }

  const menuWidth = 72;
  const menuHeight = (menuItems.length * 10) + 6;

  const menuLeft = (engine.camera.canvas.width / 2) - (menuWidth / 2);
  const menuTop = (engine.camera.canvas.height / 2) - (menuHeight / 2);

  engine.camera.drawingLayers
    .getLayer('interface')
    .addDrawable({
      draw: (canvasContext) => {
        canvasContext.fillStyle = 'rgba(0, 0, 0, 0.1)';
        canvasContext.fillRect(
          menuLeft + 1,
          menuTop + 1,
          menuWidth,
          menuHeight
        );

        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(
          menuLeft,
          menuTop,
          menuWidth,
          menuHeight
        );
      }
    });

  let top = 5;
  menuItems.forEach(menuItem => {
    drawText(engine, menuItem, menuLeft + 5, menuTop + top);
    top += 10;
  });

  const selector = makeSelector(engine);
  engine.camera.drawingLayers.getLayer('interface').addDrawable(selector);

  let selected = 0;
  engine.events.subscribe(KeyBoard.events.KEYUP, (event) => {
    if (event.keyCode === KeyBoard.keys.DOWN) {
      if ((selected + 1) > (menuItems.length - 1)) {
        selected = 0;
      } else {
        selected += 1;
      }
    }

    if (event.keyCode === KeyBoard.keys.UP) {
      if ((selected - 1) < 0) {
        selected = menuItems.length - 1;
      } else {
        selected -= 1;
      }
    }
  });
  new KeyBoard().withDefaultListeners(engine.events);

  engine.events.subscribe(Events.common.ENGINE_UPDATES, (dt) => {
    const selectedTop = (selected * 10) + menuTop + 5;
    selector.setPosition(menuLeft + menuWidth - 10, selectedTop);
  });
}