export default class EventEntityEntityCollision {

  static key = 'ENTITY_ENTITY_COLLISION';

  constructor(dt, entityA, entityB) {
    this.dt = dt;
    this.entityA = entityA;
    this.entityB = entityB;
  }

}