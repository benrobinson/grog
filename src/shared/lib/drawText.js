import ImageAsset from '../../engine/ImageAsset';
import TileSheet from '../../engine/TileSheetAsset';
import TextDrawing from '../../engine/TextDrawing';
import ImageAssetLoader from '../../engine/ImageAssetLoader';

import font from '../assets/font-white.png';

export default function drawText(engine, text, x, y) {

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
    const t = new TextDrawing()
      .setTileSheet(fontTileSheet)
      .setLetterSpacing(1)
      .setPosition(x, y)
      .setText(text);

    engine.camera.drawingLayers.getLayer('interface').addDrawable(t);
  }
}