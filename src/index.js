import application from './lib/application';
import ImageAsset from './lib/output/ImageAsset';
import ImageAssetLoader from './lib/output/ImageAssetLoader';

import characterSheetImage from './assets/character.png';
import tileSheetImage from './assets/tileset.png';
import overlayImage from './assets/overset.png';
import chickenImage from './assets/chicken.png';
import pomImage from './assets/pom.png';

import LevelDrawing from './lib/output/LevelDrawing';
import TileSheet from './lib/output/TileSheetAsset';
import Key from './lib/input/Key';
import Entity from './lib/output/Entity';
import Animation from './lib/output/Animation';
import Sprite from './lib/output/Sprite';
import SpriteGroup from './lib/output/SpriteGroup';
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

  application.changeStage(stage);

  function addPom(app, x, y) {
    const pomAsset = imageAssetManager.getAsset('pom');
    const pomTS = TileSheet(pomAsset, 8, 8);
    const pom = new Entity(app);
    pom.x = x;
    pom.y = y;

    const pomSpriteGroup = new SpriteGroup()
      .setPosition(pom.x, pom.y)
      .addSprite('feet', new Sprite()
        .setPosition(0, 4)
        .addAnimation('doot', new Animation(app, pomTS)
          .setIsLoop(true)
          .setFramesPerSecond(5)
          .addFrame(2, 0)
          .addFrame(3, 0)
          .addFrame(2, 0)
          .addFrame(4, 0))
        .playAnimation('doot'))
      .addSprite('body', new Sprite()
        .addAnimation('front', new Animation(app, pomTS)
          .setIsLoop(true)
          .setFramesPerSecond(5)
          .addFrame(0, 0, 0, 0)
          .addFrame(0, 0, 0, 1))
        .addAnimation('back', new Animation(app, pomTS)
          .addFrame(2, 0))
        .playAnimation('front'));

    app.level.drawingLayers.getLayer('entities').addDrawable(pomSpriteGroup);

    app.events.subscribe('application:updates', (dt) => {
      pomSpriteGroup.setPosition(pom.x, pom.y);
    });

    app.entities.addEntity(pom);

    return pom;
  }

  function stage(app) {
    const tileSetAsset = imageAssetManager.getAsset('tileset');
    const overlayAsset = imageAssetManager.getAsset('overset');

    app.setLevelDimensions(64, 96);

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

    app.level.collisions.setTiles([
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

    app.setCameraDimensions(64, 48);
    const cameraDiv = window.document.getElementById('camera');
    cameraDiv.appendChild(app.camera.canvas);

    app.level.drawingLayers.addLayer('background');
    app.level.drawingLayers.getLayer('background').addDrawable(levelDrawing);

    const characterAsset = imageAssetManager.getAsset('character');
    const characterTileSheet = TileSheet(characterAsset, 8, 8);

    const entity = new Entity(app);
    entity.speed = 30;
    entity.acc = 100;
    entity.x = 20;
    entity.y = 20;

    const walk = new Animation(app, characterTileSheet)
      .setFramesPerSecond(20)
      .setIsLoop(true)
      .addFrame(2, 0)
      .addFrame(3, 0)
      .addFrame(4, 0)
      .addFrame(3, 0)
      .addFrame(2, 0)
      .addFrame(5, 0)
      .addFrame(6, 0)
      .addFrame(5, 0);
    const stand = new Animation(app, characterTileSheet).addFrame(2, 0);
    const bodyIdle = new Animation(app, characterTileSheet).addFrame(1, 1);
    const handsIdle = new Animation(app, characterTileSheet).addFrame(0, 1);

    const headFront = new Animation(app, characterTileSheet).addFrame(0, 0);
    const headBack = new Animation(app, characterTileSheet).addFrame(1, 0);

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
      .addSprite('head', head)
      .setPosition(20, 20);

    app.level.drawingLayers.addLayer('entities');

    app.level.drawingLayers.addLayer('foreground');
    app.level.drawingLayers.getLayer('foreground').addDrawable(overlay);

    app.events.subscribe('keydown', function(event) { Key.onDown(event); });
    app.events.subscribe('keyup', function(event) { Key.onUp(event); });

    window.addEventListener('keyup', function(event) { app.events.publish('keyup', event); }, false);
    window.addEventListener('keydown', function(event) { app.events.publish('keydown', event); }, false);

    window.spriteGroup = spriteGroup;

    // Chicken
    const chickenAsset = imageAssetManager.getAsset('chicken');
    const chickenTileSheet = TileSheet(chickenAsset, 8, 8);
    const chicken = new Entity(app);
    chicken.x = 40;
    chicken.y = 30;

    const chickenFrontAnim = new Animation(app, chickenTileSheet)
      .setFramesPerSecond(10)
      .setIsLoop(true)
      .addFrame(0, 0, 0, 0)
      .addFrame(0, 0, 0, -1)
      .addFrame(0, 0, 0, 0)
      .addFrame(1, 0, 0, 0)
      .addFrame(1, 0, 0, -1)
      .addFrame(1, 0, 0, 0);
    const chickenBackAnim = new Animation(app, chickenTileSheet).setFramesPerSecond(1).addFrame(1, 0);
    const chickenFeetAnim = new Animation(app, chickenTileSheet).setFramesPerSecond(1).addFrame(2, 0);

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

    application.level.drawingLayers.getLayer('entities').addDrawable(chickenSpriteGroup);
    app.level.drawingLayers.getLayer('entities').addDrawable(spriteGroup);

    app.entities.addEntity(entity);
    application.entities.addEntity(chicken);

    // TODO move this into a utility
    app.events.subscribe('entities:collision', es => {
      const newVX = (Math.abs(es.entityA.vx) + Math.abs(es.entityB.vx)) / 2;
      const newVY = (Math.abs(es.entityA.vy) + Math.abs(es.entityB.vy)) / 2;

      const vxA = es.entityA.vx > 0 ? -newVX - es.entityA.vx : newVX + es.entityA.vx;
      const vyA = es.entityA.vy > 0 ? -newVY - es.entityA.vy : newVY + es.entityA.vy;
      const vxB = -vxA;
      const vyB = -vyA;

      es.entityA.vx = vxA / 2;
      es.entityA.vy = vyA / 2;
      es.entityB.vx = vxB / 2;
      es.entityB.vy = vyB / 2;

      es.entityA.x += es.entityA.vx * 3 * es.dt;
      es.entityA.y += es.entityA.vy * 3 * es.dt;
      es.entityB.x += es.entityB.vx * 3 * es.dt;
      es.entityB.y += es.entityB.vy * 3 * es.dt;
    });

    app.events.subscribe('application:updates', (dt) => {
      if (Key.isDown(Key.LEFT)) {
        spriteGroup.sprites.head.isFlipped = true;
        entity.decX(dt);
        // entity.vx = -entity.speed;
      }

      if (Key.isDown(Key.RIGHT)) {
        spriteGroup.sprites.head.isFlipped = false;
        entity.accX(dt);
        // entity.vx = entity.speed;
      }

      if (Key.isDown(Key.UP)) {
        spriteGroup.sprites.head.playAnimation('back');
        entity.decY(dt);
        // entity.vy = -entity.speed;
      }

      if (Key.isDown(Key.DOWN)) {
        spriteGroup.sprites.head.playAnimation('front');
        entity.accY(dt);
        // entity.vy = entity.speed;
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

      // console.log(entity.vx, entity.vy);

      app.camera.setFocalPoint(entity.x, entity.y - 4);
      app.camera.refocus();
    });

    const pom1 = addPom(app, 40, 20);
    const pom2 = addPom(app, 50, 30);
    const pom3 = addPom(app, 30, 30);

    app.camera.canvas.style.width = '320px';

    app.start();

    window.app = app;
  }
}