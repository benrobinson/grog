import {application} from './lib/core';
import ImageAsset from './lib/core/ImageAsset';
import ImageAssetLoader from './lib/core/ImageAssetLoader';

import characterSheetImage from './assets/character.png';
import tileSheetImage from './assets/tileset.png';
import LevelDrawing from './lib/core/LevelDrawing';
import TileSheet from './lib/core/TileSheetAsset';
import Key from './lib/core/Key';
import Entity from './lib/core/Entity';
import Animation from './lib/core/Animation';
import Sprite from './lib/core/Sprite';
import SpriteGroup from './lib/core/SpriteGroup';

window.addEventListener('load', function() {
  new ImageAssetLoader()
    .addAsset(new ImageAsset()
      .setName('character')
      .setWidth(64)
      .setHeight(64)
      .setSource(characterSheetImage)
      .buildResource())
    .addAsset(new ImageAsset()
      .setName('tileset')
      .setWidth(64)
      .setHeight(64)
      .setSource(tileSheetImage)
      .buildResource())
    .onSuccess(setupApplication)
    .load();
});

function setupApplication(imageAssetManager) {

  application.camera.canvas.height = 32;
  application.camera.canvas.width = 32;

  application.changeStage(stage);

  function stage() {
    const tileSetAsset = imageAssetManager.getAsset('tileset');

    application.level.canvas.height = 64;
    application.level.canvas.width = 64;

    const levelDrawing = new LevelDrawing()
      .setTileSheet(new TileSheet(tileSetAsset, 8, 8))
      .setTiles([
        [[0, 1], [1, 1], [1, 0], [0, 1], [1, 1], [1, 1], [1, 0], [0, 1]],
        [[1, 0], [1, 0], [1, 0], [2, 0], [0, 0], [1, 0], [1, 0], [2, 0]],
        [[2, 0], [1, 0], [2, 0], [2, 0], [3, 0], [3, 0], [1, 0], [2, 0]],
        [[2, 0], [1, 0], [2, 0], [2, 0], [3, 0], [3, 0], [1, 0], [2, 0]],
        [[3, 0], [1, 0], [2, 0], [2, 0], [3, 0], [1, 0], [1, 0], [2, 0]],
        [[3, 0], [1, 0], [1, 0], [2, 0], [2, 1], [4, 1], [4, 1], [4, 1]],
        [[0, 0], [1, 0], [1, 0], [2, 0], [6, 1], [1, 1], [1, 1], [1, 1]],
        [[0, 0], [1, 0], [1, 0], [2, 0], [6, 1], [1, 0], [1, 0], [2, 0]]
      ])
      .makeDrawable(64, 64);

    application.level.mapLayer.setTiles([
      ['WALL',  'WALL',  'FLOOR', 'WALL',  'WALL',  'WALL', 'FLOOR',  'WALL'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'WALL',  'WALL',  'WALL',  'WALL'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'WALL',  'WALL',  'WALL',  'WALL'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'WALL',  'FLOOR', 'FLOOR', 'FLOOR']
    ]);

    application.camera.camera.setViewPort(32, 32).setLevelSize(64, 64);

    application.level.drawingLayers.addLayer('background');
    application.level.drawingLayers.getLayer('background').addDrawable(levelDrawing);

    const characterAsset = imageAssetManager.getAsset('character');
    const characterTileSheet = TileSheet(characterAsset, 8, 8);

    const entity = new Entity();

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
      .addSprite('head', head);

    entity.x = 20;
    entity.y = 20;

    application.level.drawingLayers.addLayer('entities');
    application.level.drawingLayers.getLayer('entities').addDrawable(spriteGroup);

    application.eventManager.subscribe('keydown', function(event) { Key.onDown(event); });
    application.eventManager.subscribe('keyup', function(event) { Key.onUp(event); });

    window.addEventListener('keyup', function(event) { application.eventManager.publish('keyup', event); }, false);
    window.addEventListener('keydown', function(event) { application.eventManager.publish('keydown', event); }, false);

    application.eventManager.subscribe('application:updates', (dt) => {
      if (Key.isDown(Key.LEFT)) {
        entity.decX(dt);
      }
      if (Key.isDown(Key.RIGHT)) {
        entity.accX(dt);
      }
      if (Key.isDown(Key.UP)) {
        entity.decY(dt);
      }
      if (Key.isDown(Key.DOWN)) {
        entity.accY(dt);
      }

      spriteGroup.setPosition(entity.x, entity.y);
      application.camera.camera.setFocalPoint(entity.x, entity.y - 4);
      application.camera.camera.refocus();
    });

    application.camera.canvas.style.imageRendering = 'pixelated';
    application.camera.canvasContext.mozImageSmoothingEnabled = false;
    application.camera.canvasContext.webkitImageSmoothingEnabled = false;
    application.camera.canvasContext.msImageSmoothingEnabled = false;
    application.camera.canvasContext.imageSmoothingEnabled = false;

    application.level.canvas.style.imageRendering = 'pixelated';
    application.level.canvasContext.mozImageSmoothingEnabled = false;
    application.level.canvasContext.webkitImageSmoothingEnabled = false;
    application.level.canvasContext.msImageSmoothingEnabled = false;
    application.level.canvasContext.imageSmoothingEnabled = false;

    application.camera.canvas.style.width = '320px';

    application.run();

    window.application = application;
  }
}