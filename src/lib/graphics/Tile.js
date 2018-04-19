class Tile {

  static effects = {
    NONE: 'NONE',
    GRASS: 'GRASS',
    LIQUID: 'LIQUID'
  }

  constructor() {
    this.empty();
  }

  empty() {
    this.description = '';
    this.effect = Tile.effects.NONE;
    this.isBarrier = false;
  }

  fromObj(obj) {
    this.description = obj.description || '';
    this.effect = (obj.effect in Tile.effects) ? obj.effect : Tile.effects.NONE;
    this.isBarrier = obj.isBarrier || false;
  }

}