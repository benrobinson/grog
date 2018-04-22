import {application} from './lib/core';
import ImageAsset from './lib/core/ImageAsset';
import ImageAssetLoader from './lib/core/ImageAssetLoader';

import characterSheetImage from './assets/character.png';
import tileSheetImage from './assets/tileset.png';
import overlayImage from './assets/overset.png';
import chickenImage from './assets/chicken.png';
import pomImage from './assets/pom.png';

import LevelDrawing from './lib/core/LevelDrawing';
import TileSheet from './lib/core/TileSheetAsset';
import Key from './lib/core/Key';
import Entity from './lib/core/Entity';
import Animation from './lib/core/Animation';
import Sprite from './lib/core/Sprite';
import SpriteGroup from './lib/core/SpriteGroup';
import {Radians} from './lib/util/Math';

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
    .addAsset(new ImageAsset()
      .setName('overset')
      .setWidth(64)
      .setHeight(64)
      .setSource(overlayImage)
      .buildResource())
    .addAsset(new ImageAsset()
      .setName('chicken')
      .setWidth(64)
      .setHeight(64)
      .setSource(chickenImage)
      .buildResource())
    .addAsset(new ImageAsset()
      .setName('pom')
      .setWidth(64)
      .setHeight(64)
      .setSource(pomImage)
      .buildResource())
    .onSuccess(setupApplication)
    .load();
});

function setupApplication(imageAssetManager) {

  application.camera.canvas.height = 48;
  application.camera.canvas.width = 64;

  application.changeStage(stage);

  function stage() {
    const tileSetAsset = imageAssetManager.getAsset('tileset');
    const overlayAsset = imageAssetManager.getAsset('overset');

    application.level.canvas.height = 96;
    application.level.canvas.width = 64;

    const levelDrawing = new LevelDrawing()
      .setTileSheet(new TileSheet(tileSetAsset, 8, 8))
      .setTiles([
        [[0, 1], [1, 1], [1, 0], [0, 1], [0, 1], [1, 1], [1, 0], [0, 1]],
        [[1, 0], [1, 0], [1, 0], [2, 0], [0, 0], [1, 0], [1, 0], [2, 0]],
        [[2, 0], [1, 0], [2, 0], [2, 0], [3, 0], [3, 0], [1, 0], [2, 0]],
        [[2, 0], [1, 0], [2, 0], [2, 0], [3, 0], [3, 0], [1, 0], [2, 0]],
        [[3, 0], [1, 0], [2, 0], [2, 0], [3, 0], [1, 0], [1, 0], [2, 0]],
        [[3, 0], [1, 0], [1, 0], [2, 0], [2, 1], [4, 1], [4, 1], [4, 1]],
        [[0, 0], [1, 0], [5, 2], [2, 0], [6, 1], [1, 1], [1, 1], [1, 1]],
        [[0, 0], [1, 0], [1, 0], [2, 0], [6, 1], [1, 0], [1, 0], [2, 0]],
        [[0, 0], [1, 0], [1, 0], [2, 0], [6, 1], [1, 0], [1, 0], [2, 0]],
        [[0, 0], [1, 0], [1, 0], [2, 0], [6, 1], [1, 0], [1, 0], [2, 0]],
        [[0, 0], [1, 0], [1, 0], [2, 0], [6, 1], [1, 0], [1, 0], [2, 0]],
        [[0, 0], [1, 0], [1, 0], [2, 0], [6, 1], [1, 0], [1, 0], [2, 0]]
      ])
      .makeDrawable();

    const overlay = new LevelDrawing()
      .setTileSheet(new TileSheet(overlayAsset, 8, 8))
      .setTiles([
        [[0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [2, 0], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [2, 1], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [2, 2], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [2, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]],
        [[0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3], [0, 3]]
      ])
      .makeDrawable();

    application.level.mapLayer.setTiles([
      ['WALL',  'WALL',  'FLOOR', 'WALL',  'WALL',  'WALL', 'FLOOR',  'WALL'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'WALL',  'WALL',  'WALL',  'WALL'],
      ['FLOOR', 'FLOOR', 'WALL', 'FLOOR', 'WALL',  'WALL',  'WALL',  'WALL'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'WALL',  'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'WALL',  'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'WALL',  'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'WALL',  'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'WALL',  'FLOOR', 'FLOOR', 'FLOOR']
    ]);

    application.camera.camera.setViewPort(64, 48).setLevelSize(64, 96);

    application.level.drawingLayers.addLayer('background');
    application.level.drawingLayers.getLayer('background').addDrawable(levelDrawing);

    const characterAsset = imageAssetManager.getAsset('character');
    const characterTileSheet = TileSheet(characterAsset, 8, 8);

    const entity = new Entity();
    entity.x = 20;
    entity.y = 20;

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
      .playAnimation('stand');

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

    application.level.drawingLayers.addLayer('entities');

    application.level.drawingLayers.addLayer('foreground');
    application.level.drawingLayers.getLayer('foreground').addDrawable(overlay);

    application.eventManager.subscribe('keydown', function(event) { Key.onDown(event); });
    application.eventManager.subscribe('keyup', function(event) { Key.onUp(event); });

    window.addEventListener('keyup', function(event) { application.eventManager.publish('keyup', event); }, false);
    window.addEventListener('keydown', function(event) { application.eventManager.publish('keydown', event); }, false);


    // Chicken
    const chickenAsset = imageAssetManager.getAsset('chicken');
    const chickenTileSheet = TileSheet(chickenAsset, 8, 8);
    const chicken = new Entity();
    chicken.x = 40;
    chicken.y = 30;

    const chickenFrontAnim = new Animation(chickenTileSheet, {isLoop: true, framesPerSecond: 1})
      .addFrame(0, 0, 0, 0)
      .addFrame(0, 0, 0, -1)
      .addFrame(0, 0, 0, 0)
      .addFrame(1, 0, 0, 0)
      .addFrame(1, 0, 0, -1)
      .addFrame(1, 0, 0, 0);
    const chickenBackAnim = new Animation(chickenTileSheet, {isLoop: false, framesPerSecond: 1}).addFrame(1, 0);
    const chickenFeetAnim = new Animation(chickenTileSheet, {isLoop: true, framesPerSecond: 5}).addFrame(2, 0);

    const chickenBody = new Sprite()
      .addAnimation('front', chickenFrontAnim)
      .addAnimation('back', chickenBackAnim)
      .playAnimation('front');

    const chickenFeet = new Sprite()
      .addAnimation('sit', chickenFeetAnim)
      .setPosition(0, 4)
      .playAnimation('sit');

    const chickenSpriteGroup = new SpriteGroup()
      .addSprite('feet', chickenFeet)
      .addSprite('body', chickenBody)
      .setPosition(chicken.x, chicken.y);

    // POM

    const pomAsset = imageAssetManager.getAsset('pom');
    const pomTS = TileSheet(pomAsset, 8, 8);
    const pom = new Entity();
    pom.x = 25;
    pom.y = 86;

    const pomSpriteGroup = new SpriteGroup()
      .setPosition(pom.x, pom.y)
      .addSprite('feet', new Sprite()
        .setPosition(0, 4)
        .addAnimation('doot', new Animation(pomTS, {isLoop: true, framesPerSecond: 3})
          .addFrame(2, 0)
          .addFrame(3, 0)
          .addFrame(2, 0)
          .addFrame(4, 0))
        .playAnimation('doot'))
      .addSprite('body', new Sprite()
        .addAnimation('front', new Animation(pomTS, {isLoop: true, framesPerSecond: 2})
          .addFrame(0, 0, 0, 0)
          .addFrame(0, 0, 0, 1))
        .addAnimation('back', new Animation(pomTS, {isLoop: false, framesPerSecond: 1})
          .addFrame(2, 0))
        .playAnimation('front'));

    application.level.drawingLayers.getLayer('entities').addDrawable(chickenSpriteGroup);
    application.level.drawingLayers.getLayer('entities').addDrawable(pomSpriteGroup);
    application.level.drawingLayers.getLayer('entities').addDrawable(spriteGroup);

    application.entities.addEntity(entity);
    application.entities.addEntity(chicken);
    application.entities.addEntity(pom);

    // TODO move this into a utility
    application.eventManager.subscribe('entities:collision', es => {
      const newVX = (Math.abs(es.entityA.vx) + Math.abs(es.entityB.vx)) / 2;
      const newVY = (Math.abs(es.entityA.vy) + Math.abs(es.entityB.vy)) / 2;

      const vxA = es.entityA.vx > 0 ? -newVX - es.entityA.vx : newVX + es.entityA.vx;
      const vyA = es.entityA.vy > 0 ? -newVY - es.entityA.vy : newVY + es.entityA.vy;
      const vxB = -vxA;
      const vyB = -vyA;

      es.entityA.vx = vxA;
      es.entityA.vy = vyA;
      es.entityB.vx = vxB;
      es.entityB.vy = vyB;

      es.entityA.x += es.entityA.vx * 3 * es.dt;
      es.entityA.y += es.entityA.vy * 3 * es.dt;
      es.entityB.x += es.entityB.vx * 3 * es.dt;
      es.entityB.y += es.entityB.vy * 3 * es.dt;
    });

    application.eventManager.subscribe('application:updates', (dt) => {
      if (Key.isDown(Key.LEFT)) {
        spriteGroup.sprites.head.isFlipped = true;
        entity.decX(dt);
      }

      if (Key.isDown(Key.RIGHT)) {
        spriteGroup.sprites.head.isFlipped = false;
        entity.accX(dt);
      }

      if (Key.isDown(Key.UP)) {
        spriteGroup.sprites.head.playAnimation('back');
        entity.decY(dt);
      }

      if (Key.isDown(Key.DOWN)) {
        spriteGroup.sprites.head.playAnimation('front');
        entity.accY(dt);
      }

      if (Math.abs(entity.vx) === 0 && Math.abs(entity.vy) === 0) {
        spriteGroup.sprites.feet.playAnimation('stand');
      } else {
        spriteGroup.sprites.feet.playAnimation('walk');
      }

      const maybeRadians = ((entity.vx * dt) / (entity.vy * dt));
      const radians = Math.abs(maybeRadians) === Infinity ? 1.57 : maybeRadians;
      const rotation = Radians.toDegrees(-radians);
      spriteGroup.sprites.feet.setRotation(rotation);

      spriteGroup.setPosition(entity.x, entity.y);
      chickenSpriteGroup.setPosition(chicken.x, chicken.y);
      pomSpriteGroup.setPosition(pom.x, pom.y);

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