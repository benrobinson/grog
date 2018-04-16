import {application} from './lib/core';
import Sprite from './lib/sprites/Sprite';
import SpriteGroup from './lib/sprites/SpriteGroup';
import Animation from './lib/sprites/Animation';
import ImageAsset from './lib/resources/ImageAsset';
import ImageAssetLoader from './lib/resources/ImageAssetLoader';
import TileSheet from './lib/resources/TileSheet';

import characterSheetImage from './assets/character.png';

window.addEventListener('load', function() {
  new ImageAssetLoader()
    .addAsset(new ImageAsset()
      .setName('character')
      .setWidth(64)
      .setHeight(64)
      .setSource(characterSheetImage)
      .buildResource())
    .onSuccess(setupApplication)
    .load();
});

function setupApplication(imageAssetManager) {
  const config = {
    canvas: {
      width: 320,
      height: 240
    }
  };

  application.canvas.height = config.canvas.height;
  application.canvas.width = config.canvas.width;
  application.canvas.style.width = '100%';

  const characterAsset = imageAssetManager.getAsset('character');
  const characterTileSheet = TileSheet(characterAsset, 8, 8);

  const walk = new Animation(characterTileSheet, {framesPerSecond: 10, isLoop: true})
    .addFrame(2, 0)
    .addFrame(3, 0)
    .addFrame(4, 0)
    .addFrame(3, 0)
    .addFrame(2, 0)
    .addFrame(5, 0)
    .addFrame(6, 0)
    .addFrame(5, 0);

  const stand = new Animation(characterTileSheet, {framesPerSecond: 10, isLoop: false}).addFrame(2, 0);

  const bodyIdle = new Animation(characterTileSheet, {framesPerSecond: 1, isLoop: false}).addFrame(1, 1);
  const handsIdle = new Animation(characterTileSheet, {framesPerSecond: 1, isLoop: false}).addFrame(0, 1);
  const headFront = new Animation(characterTileSheet, {framesPerSecond: 1, isLoop: false}).addFrame(0, 0);
  const headBack = new Animation(characterTileSheet, {framesPerSecond: 1, isLoop: false}).addFrame(1, 0);

  const feet = new Sprite()
    .addAnimation('walk', walk)
    .addAnimation('stand', stand)
    .playAnimation('walk');

  const body = new Sprite()
    .addAnimation('bodyIdle', bodyIdle)
    .playAnimation('bodyIdle');

  const hands = new Sprite()
    .addAnimation('handsIdle', handsIdle)
    .setPosition(0, -4)
    .playAnimation('handsIdle');

  const head = new Sprite()
    .addAnimation('front', headFront)
    .addAnimation('back', headBack)
    .setPosition(0, -8)
    .playAnimation('front');

  const spriteGroup = new SpriteGroup()
    .addSprite('feet', feet)
    .addSprite('body', body)
    .addSprite('hands', hands)
    .addSprite('head', head)
    .setPosition(50, 50);

  application.canvas.style.imageRendering = 'pixelated';
  application.canvasContext.mozImageSmoothingEnabled = false;
  application.canvasContext.webkitImageSmoothingEnabled = false;
  application.canvasContext.msImageSmoothingEnabled = false;
  application.canvasContext.imageSmoothingEnabled = false;

  application.drawingLayers.entities.addDrawable(spriteGroup);

  application.run();

  window.spriteGroup = spriteGroup;
  window.application = application;
}