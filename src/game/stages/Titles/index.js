import Events from '../../../engine/Events';

import drawText from '../../../shared/lib/drawText';
import fadeIn from '../../../shared/lib/fadeIn';
import fadeOut from '../../../shared/lib/fadeOut';

import drawTitle from './lib/drawTitle';

import Menu from '../Menu';
import Sprite from '../../../engine/Sprite';
import Animation from '../../../engine/Animation';
import ImageAsset from '../../../engine/ImageAsset';
import ImageAssetLoader from '../../../engine/ImageAssetLoader';
import TileSheet from '../../../engine/TileSheetAsset';

import titleBackground from '../../../shared/assets/titles-background.png';

export default function Titles(engine) {

  engine
    .withDefaultDimensions()
    .withDefaultDrawingLayers();

  fadeIn(engine);
  _drawTitleBackground(engine);
  drawTitle(engine);

  engine.events
    .subscribe(Events.common.STAGE_END, () => {
      window.removeEventListener('keyup', goToMenu);
      fadeOut(engine);
    })
    .subscribe(Events.common.STAGE_STARTED, () => {
      window.addEventListener('keyup', goToMenu);
      drawText(engine, "press enter", 32, 86);
    });

  function goToMenu() {
    engine.changeStage(Menu)
  }
}

function _drawTitleBackground(engine) {

  new ImageAssetLoader()
    .addAsset(new ImageAsset()
      .setName('title')
      .setWidth(128)
      .setHeight(96)
      .setSource(titleBackground)
      .buildResource())
    .onSuccess(doDraw)
    .load();

  function doDraw(tileSheetManager) {
    const titleBackgroundTileSheet = TileSheet(tileSheetManager.getAsset('title'), 128, 96);

    engine.stage.drawingLayers.getLayer('floor').addDrawable(
      new Sprite()
        .setPosition(64, 48)
        .addAnimation('background', new Animation(engine, titleBackgroundTileSheet)
          .addFrame(0, 0))
        .playAnimation('background'));
  }

}