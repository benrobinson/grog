import TextDialogDrawing from '../../engine/TextDialogDrawing';
import ImageAsset from '../../engine/ImageAsset';
import TileSheet from '../../engine/TileSheetAsset';
import ImageAssetLoader from '../../engine/ImageAssetLoader';

import font from '../assets/font-white.png';

export default function drawDialog(engine, text) {

  new ImageAssetLoader()
    .addAsset(new ImageAsset()
      .setName('font')
      .setWidth(45)
      .setHeight(25)
      .setSource(font)
      .buildResource())
    .onSuccess(doDraw)
    .load();

  function doDraw(imageAssetManager) {

    const fontTileSheet = TileSheet(imageAssetManager.getAsset('font'), 5, 5);

    const t = new TextDialogDrawing()
      .setTileSheet(fontTileSheet)
      .setLetterSpacing(1)
      .setPosition(8, 64)
      .setDimensions(112, 24)
      .setBackgroundColor(0, 0, 0)
      .setShowShadow(true)
      .setText(text);

    engine.camera.drawingLayers.getLayer('interface').addDrawable(t);

    engine.events.subscribe(TextDialogDrawing.events.LAST_PAGE, () => {
      engine.camera.drawingLayers.getLayer('interface').removeDrawable(t);
    });

    window.addEventListener('keyup', () => {
      engine.events.publish(t.nextPage());
    })
  }
}