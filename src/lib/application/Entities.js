import LevelCollisions from './LevelCollisions';

export default class Entities {

  constructor() {
    this.empty();
  }

  empty() {
    this._entities = [];
    return this;
  }

  addEntity(entity) {
    this._entities.push(entity);
    return this;
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
      if (entity.vx > 0 && levelCollisions.getTypeFromPixels(nextBox.right, currBox.top) === LevelCollisions.tileTypes.SOLID ||
          entity.vx > 0 && levelCollisions.getTypeFromPixels(nextBox.right, currBox.bottom) === LevelCollisions.tileTypes.SOLID ||
          entity.vx < 0 && levelCollisions.getTypeFromPixels(nextBox.left, currBox.top) === LevelCollisions.tileTypes.SOLID ||
          entity.vx < 0 && levelCollisions.getTypeFromPixels(nextBox.left, currBox.bottom) === LevelCollisions.tileTypes.SOLID) {
        callback(entity, 'x');
      } else {
        entity.x = nextX;
      }

      if (entity.vy > 0 && levelCollisions.getTypeFromPixels(nextBox.left, currBox.bottom) === LevelCollisions.tileTypes.SOLID ||
          entity.vy > 0 && levelCollisions.getTypeFromPixels(nextBox.right, currBox.bottom) === LevelCollisions.tileTypes.SOLID ||
          entity.vy < 0 && levelCollisions.getTypeFromPixels(nextBox.left, currBox.top) === LevelCollisions.tileTypes.SOLID ||
          entity.vy < 0 && levelCollisions.getTypeFromPixels(nextBox.right, currBox.top) === LevelCollisions.tileTypes.SOLID) {
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