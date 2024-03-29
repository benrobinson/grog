import StageCollisions from './StageCollisions';

export default class Entities {

  constructor() {
    this.empty();
  }

  empty() {
    this._entities = [];
    return this;
  }

  addEntity(entity, drawingLayer) {
    this._entities.push(entity);
    drawingLayer.addDrawable(entity);
    return this;
  }

  doUpdateSpriteGroup(dt) {
    this._entities.forEach(entity => {
      if (!!entity.spriteGroup) {
        entity.spriteGroup.setPosition(entity.x, entity.y);
      }
    });
  }

  onEntityCollisions(callback) {
    let entitiesB = this._entities.slice();

    this._entities.forEach(entityA => {
      entitiesB.filter(e => e !== entityA).forEach(entityB => {
        const boxA = entityA.getBox(entityA.x, entityA.y);
        const boxB = entityB.getBox(entityB.x, entityB.y);

        if ((boxA.bottom > boxB.top && boxA.bottom < boxB.bottom && boxA.right > boxB.left && boxA.right < boxB.right) ||
            (boxA.bottom > boxB.top && boxA.bottom < boxB.bottom && boxA.left > boxB.left && boxA.left < boxB.right) ||
            (boxA.top > boxB.bottom && boxA.top < boxB.top && boxA.right > boxB.left && boxA.right < boxB.right) ||
            (boxA.top > boxB.bottom && boxA.top < boxB.top && boxA.left > boxB.left && boxA.left < boxB.right)) {
          callback(entityA, entityB);
        }
      });
    });
    return this;
  }

  onLevelCollisions(levelCollisions, dt, callback) {
    this._entities.forEach(entity => {

      const nextX = entity.x + (dt * entity.vx);
      const nextY = entity.y + (dt * entity.vy);

      const nextBox = entity.getBox(nextX, nextY);
      const currBox = entity.getBox(entity.x, entity.y);

      // TODO: Maybe later make 'solid' an attribute rather than the full 'type', like hasAttr('solid')
      if (entity.vx > 0 && levelCollisions.getTypeFromPixels(nextBox.right, currBox.top) === StageCollisions.tileTypes.SOLID ||
          entity.vx > 0 && levelCollisions.getTypeFromPixels(nextBox.right, currBox.bottom) === StageCollisions.tileTypes.SOLID ||
          entity.vx < 0 && levelCollisions.getTypeFromPixels(nextBox.left, currBox.top) === StageCollisions.tileTypes.SOLID ||
          entity.vx < 0 && levelCollisions.getTypeFromPixels(nextBox.left, currBox.bottom) === StageCollisions.tileTypes.SOLID) {
        callback(entity, 'x');
      } else {
        entity.x = nextX;
      }

      if (entity.vy > 0 && levelCollisions.getTypeFromPixels(currBox.left, nextBox.bottom) === StageCollisions.tileTypes.SOLID ||
          entity.vy > 0 && levelCollisions.getTypeFromPixels(currBox.right, nextBox.bottom) === StageCollisions.tileTypes.SOLID ||
          entity.vy < 0 && levelCollisions.getTypeFromPixels(currBox.left, nextBox.top) === StageCollisions.tileTypes.SOLID ||
          entity.vy < 0 && levelCollisions.getTypeFromPixels(currBox.right, nextBox.top) === StageCollisions.tileTypes.SOLID) {
        callback(entity, 'y');
      } else {
        entity.y = nextY;
      }

    });
    return this;
  }

  onMovement(callback) {
    this._entities.forEach(entity => callback(entity));
    return this;
  }
}