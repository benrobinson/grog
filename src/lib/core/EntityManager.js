import {application} from './index';

export default class EntityManager {

  constructor() {
    this.empty();
  }

  empty() {
    this._entities = [];
  }

  addEntity(entity) {
    this._entities.push(entity);
  }

  checkCollisions(dt) {
    let entitiesB = this._entities.slice();

    this._entities.forEach(entityA => {
      entitiesB.filter(e => e !== entityA).forEach(entityB => {
        const boxA = entityA.getBox(entityA.x, entityA.y);
        const boxB = entityB.getBox(entityB.x, entityB.y);

        if ((boxA.bottom > boxB.top && boxA.bottom < boxB.bottom && boxA.right > boxB.left && boxA.right < boxB.right) ||
            (boxA.bottom > boxB.top && boxA.bottom < boxB.bottom && boxA.left > boxB.left && boxA.left < boxB.right) ||
            (boxA.top > boxB.bottom && boxA.top < boxB.top && boxA.right > boxB.left && boxA.right < boxB.right) ||
            (boxA.top > boxB.bottom && boxA.top < boxB.top && boxA.left > boxB.left && boxA.left < boxB.right)) {
          application.eventManager.publish('entities:collision', { dt, entityA, entityB });
        }
      });
    });
  }
}