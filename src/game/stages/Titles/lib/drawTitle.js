import Animation from '../../../../engine/Animation';
import Sprite from '../../../../engine/Sprite';
import ImageAsset from '../../../../engine/ImageAsset';
import ImageAssetLoader from '../../../../engine/ImageAssetLoader';
import title from '../assets/pom-title.png';
import TileSheet from '../../../../engine/TileSheetAsset';

export default function drawTitle(engine) {

  new ImageAssetLoader()
    .addAsset(new ImageAsset()
      .setName('title')
      .setWidth(48)
      .setHeight(48)
      .setSource(title)
      .buildResource())
    .onSuccess(doDraw)
    .load();

  function doDraw(imageAssetManager) {
    const titleTileSheet = TileSheet(imageAssetManager.getAsset('title'), 48, 24);

    engine.camera.drawingLayers
      .getLayer('interface')
      .addDrawable(new Sprite()
        .setPosition(64, 48)
        .addAnimation('shadow',
          new Animation(engine, titleTileSheet)
            .addFrame(0, 1))
        .playAnimation('shadow'))
      .addDrawable(new Sprite()
        .setPosition(64, 48)
        .addAnimation('title',
          new Animation(engine, titleTileSheet)
            .setIsLoop(true)
            .setFramesPerSecond(5)
            .addFrame(0, 0, 0, 0)
            .addFrame(0, 0, 0, -1)
            .addFrame(0, 0, 0, -2)
            .addFrame(0, 0, 0, -3)
            .addFrame(0, 0, 0, -2)
            .addFrame(0, 0, 0, -1))
        .playAnimation('title'));
  }

}