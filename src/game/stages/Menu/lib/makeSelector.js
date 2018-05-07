import ImageAsset from '../../../../engine/ImageAsset';
import TileSheet from '../../../../engine/TileSheetAsset';
import Animation from '../../../../engine/Animation';
import ImageAssetLoader from '../../../../engine/ImageAssetLoader';
import Sprite from '../../../../engine/Sprite';
import SpriteGroup from '../../../../engine/SpriteGroup';

import pomImage from '../../../../shared/assets/pom.png';

export default function makeSelector(engine) {

  new ImageAssetLoader()
    .addAsset(new ImageAsset()
      .setName('pom')
      .setWidth(64)
      .setHeight(64)
      .setSource(pomImage)
      .buildResource())
    .onSuccess(doDraw)
    .load();

  let sprite = new SpriteGroup();

  function doDraw(imageAssetManager) {
    const pomAsset = imageAssetManager.getAsset('pom');
    const pomTS = TileSheet(pomAsset, 8, 8);

    sprite
      .addSprite('feet', new Sprite()
        .setPosition(0, 4)
        .addAnimation('dance', new Animation(engine, pomTS)
          .setIsLoop(true)
          .setFramesPerSecond(1)
          .addFrame(2, 0))
        .playAnimation('dance'))
      .addSprite('body', new Sprite()
        .addAnimation('front', new Animation(engine, pomTS)
          .setIsLoop(true)
          .setFramesPerSecond(5)
          .addFrame(0, 0, 0, 0)
          .addFrame(0, 0, 0, 1))
        .playAnimation('front'));
  }

  return sprite;
}