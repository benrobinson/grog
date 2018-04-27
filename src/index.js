import application from './lib/application';
import ImageAsset from './lib/asset-management/ImageAsset';
import ImageAssetLoader from './lib/asset-management/ImageAssetLoader';

import characterSheetImage from './assets/character.png';
import tileSheetImage from './assets/tileset.png';
import overlayImage from './assets/overset.png';
import chickenImage from './assets/chicken.png';
import pomImage from './assets/pom.png';

import LevelDrawing from './lib/level/LevelDrawing';
import TileSheet from './lib/asset-management/TileSheetAsset';
import Key from './lib/input/Key';
import Entity from './lib/entities/Entity';
import Animation from './lib/entities/Animation';
import Sprite from './lib/entities/Sprite';
import SpriteGroup from './lib/entities/SpriteGroup';
import * as Degrees from './lib/util/Degrees';
import LevelCollisions from './lib/level/LevelCollisions';
import Events from './lib/events/Events';

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

  function addPom(app, x, y, player) {
    const pomAsset = imageAssetManager.getAsset('pom');
    const pomTS = TileSheet(pomAsset, 8, 8);

    const pomSpriteGroup = new SpriteGroup()
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

    const pom = new Entity(app)
      .setPosition(x, y)
      .setSpriteGroup(pomSpriteGroup);

    app.entities.addEntity(pom, app.level.drawingLayers.getLayer('entities'));

    app.events.subscribe(Events.common.APPLICATION_UPDATES, (dt) => {
      const pomMove = app.level.collisions.getNextPath(pom.x, pom.y, player.x, player.y);
      switch(pomMove.x) {
        case 'INC':
          pom.accX(dt);
          break;
        case 'DEC':
          pom.decX(dt);
          break;
        default:
          break;
      }

      switch(pomMove.y) {
        case 'INC':
          pom.accY(dt);
          break;
        case 'DEC':
          pom.decY(dt);
          break;
        default:
          break;
      }
    });

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
      ['SOLID', 'SOLID', 'FLOOR', 'SOLID', 'SOLID', 'SOLID', 'FLOOR', 'SOLID'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'SOLID', 'SOLID', 'SOLID', 'SOLID'],
      ['FLOOR', 'FLOOR', 'SOLID', 'FLOOR', 'SOLID', 'SOLID', 'SOLID', 'SOLID'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'SOLID', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'SOLID', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'SOLID', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'SOLID', 'FLOOR', 'FLOOR', 'FLOOR'],
      ['FLOOR', 'FLOOR', 'FLOOR', 'FLOOR', 'SOLID', 'FLOOR', 'FLOOR', 'FLOOR']
    ]);

    app.setCameraDimensions(64, 48);
    const cameraDiv = window.document.getElementById('camera');
    cameraDiv.appendChild(app.camera.canvas);

    app.level.drawingLayers.addLayer('background');
    app.level.drawingLayers.getLayer('background').addDrawable(levelDrawing);

    const characterAsset = imageAssetManager.getAsset('character');
    const characterTileSheet = TileSheet(characterAsset, 8, 8);

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

    const entity = new Entity()
      .setSpeed(30)
      .setAcc(100)
      .setPosition(20, 20)
      .setOffset(-2, -4)
      .setSpriteGroup(spriteGroup);

    // Chicken
    const chickenAsset = imageAssetManager.getAsset('chicken');
    const chickenTileSheet = TileSheet(chickenAsset, 8, 8);

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
      .addSprite('body', chickenBody);

    const chicken = new Entity()
      .setPosition(30, 40)
      .setOffset(0, -2)
      .setSpriteGroup(chickenSpriteGroup);

    app.entities.addEntity(entity, app.level.drawingLayers.getLayer('entities'));
    app.entities.addEntity(chicken, app.level.drawingLayers.getLayer('entities'));

    // TODO move this into a utility
    app.events.subscribe(Events.common.ENTITY_ENTITY_COLLISION, es => {
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

    collisionFunctions(app);

    // Make the chicken follow the player
    app.events.subscribe(Events.common.APPLICATION_UPDATES, (dt) => {
      const chickenMove = app.level.collisions.getNextPath(chicken.x, chicken.y, entity.x, entity.y);
      switch(chickenMove.x) {
        case 'INC':
          chicken.accX(dt);
          break;
        case 'DEC':
          chicken.decX(dt);
          break;
        default:
          break;
      }

      switch(chickenMove.y) {
        case 'INC':
          chicken.accY(dt);
          break;
        case 'DEC':
          chicken.decY(dt);
          break;
        default:
          break;
      }
    });

    app.events.subscribe(Events.common.APPLICATION_INPUT, (dt) => {
      if (Key.isDown(Key.LEFT)) {
        spriteGroup.sprites.head.isFlipped = true;
        entity.vx -= entity.acc * dt;
      }

      if (Key.isDown(Key.RIGHT)) {
        spriteGroup.sprites.head.isFlipped = false;
        entity.vx += entity.acc * dt;
      }

      if (Key.isDown(Key.UP)) {
        spriteGroup.sprites.head.playAnimation('back');
        entity.vy -= entity.acc * dt;
      }

      if (Key.isDown(Key.DOWN)) {
        spriteGroup.sprites.head.playAnimation('front');
        entity.vy += entity.acc * dt;
      }

      if (Math.abs(entity.vx) === 0 && Math.abs(entity.vy) === 0) {
        spriteGroup.sprites.feet.playAnimation('stand');
      } else {
        spriteGroup.sprites.feet.playAnimation('walk');
      }

      // const maybeRadians = ((entity.vx * dt) / (entity.vy * dt));
      // const radians = Math.abs(maybeRadians) === Infinity ? 1.57 : maybeRadians;
      // const rotation = Degrees.fromRadians(-radians);
      const rotation = Degrees.fromVelocity(entity.vx, entity.vy);
      spriteGroup.sprites.feet.setRotation(rotation);

      spriteGroup.setPosition(entity.x, entity.y);
      chickenSpriteGroup.setPosition(chicken.x, chicken.y);

      app.camera.setFocalPoint(entity.x, entity.y - 4);
      app.camera.refocus();
    });

    const pom1 = addPom(app, 40, 20, entity);
    const pom2 = addPom(app, 50, 30, entity);
    const pom3 = addPom(app, 30, 30, entity);

    app.camera.canvas.style.width = '320px';

    app.start();

    window.app = app;
  }
}

function collisionFunctions(app) {

  function bounce(entity, axis) {
    entity[`v${axis}`] = (-entity[`v${axis}`]) / 2;
  }

  function applyFriction(data) {
    const x = data.entity.x + (data.entity.width / 2);
    const y = data.entity.y + (data.entity.height / 2);
    const current = app.level.collisions.getTypeFromPixels(x, y);

    let friction;

    switch (current) {
      default:
      case LevelCollisions.tileTypes.NONE:
      case LevelCollisions.tileTypes.FLOOR:
        friction = 20;
        break;
      case LevelCollisions.tileTypes.LIQUID:
        friction = 25;
        break;
      case LevelCollisions.tileTypes.SLIP:
        friction = 10;
        break;
      case LevelCollisions.tileTypes.ROUGH:
        friction = 23;
        break;
    }

    const nextVx = Math.abs(data.entity.vx) - friction * data.dt;
    const nextVy = Math.abs(data.entity.vy) - friction * data.dt;

    if (nextVx <= 0) {
      data.entity.vx = 0;
    } else {
      data.entity.vx = data.entity.vx > 0 ? nextVx : -nextVx;
    }

    if (nextVy <= 0) {
      data.entity.vy = 0;
    } else {
      data.entity.vy = data.entity.vy > 0 ? nextVy : -nextVy;
    }
  }

  function handleLevelCollision(data) {
    bounce(data.entity, data.dimension);
  }

  app.events.subscribe(Events.common.ENTITY_LEVEL_COLLISION, handleLevelCollision);
  app.events.subscribe(Events.common.ENTITY_MOVEMENT, applyFriction);
}