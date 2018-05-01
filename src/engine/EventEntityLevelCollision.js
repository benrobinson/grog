export default class EventEntityLevelCollision {

  static key = 'ENTITY_LEVEL_COLLISION';

  constructor(dt, entity, dimension) {
    this.dt = dt;
    this.entity = entity;
    this.dimension = dimension;
  }

}