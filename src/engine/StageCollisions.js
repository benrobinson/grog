export default class StageCollisions {

  static tileTypes = {
    SOLID: 'SOLID',
    NONE: 'NONE',
    FLOOR: 'FLOOR',
    SLIP: 'SLIP',
    ROUGH: 'ROUGH',
    LIQUID: 'LIQUID'
  };

  constructor() {
    this.empty();
  }

  empty() {
    this._mapLayer = [[]];
    this._tileSize = {
      width: 8,
      height: 8
    };
  }

  setTiles(mapLayer) {
    this._mapLayer = mapLayer;
    return this;
  }

  getCoordsFromPixels(x, y) {
    return {
      x: Math.floor(x / this._tileSize.width),
      y: Math.floor(y / this._tileSize.height)
    };
  }

  getType(x, y) {
    if (typeof this._mapLayer[y] !== 'undefined') {
      if(typeof this._mapLayer[y][x] !== 'undefined') {
        return this._mapLayer[y][x];
      }
    }
    return StageCollisions.tileTypes.SOLID;
  }

  getTypeFromPixels(x, y) {
    const coords = this.getCoordsFromPixels(x, y);
    return this.getType(coords.x, coords.y);
  }

  getSurrounding(x, y) {
    return {
      topLeft: this.getType(x - 1, y - 1),
      top: this.getType(x, y - 1),
      topRight: this.getType(x + 1, y - 1),
      left: this.getType(x - 1, y),
      center: this.getType(x, y),
      right: this.getType(x + 1, y),
      bottomLeft: this.getType(x - 1, y + 1),
      bottom: this.getType(x, y + 1),
      bottomRight: this.getType(x + 1, y + 1)
    };
  }

  getSurroundingFromPixels(x, y) {
    const coords = this.getCoordsFromPixels(x, y);
    return this.getSurrounding(coords.x, coords.y);
  }

  getNextPath(sx, sy, dx, dy) {
    const source = this.getCoordsFromPixels(sx, sy);
    const destination = this.getCoordsFromPixels(dx, dy);
    const surrounding = this.getSurrounding(source.x, source.y);

    let x = 'NONE';
    let y = 'NONE';

    if (dx > sx) {
      if (surrounding.right !== StageCollisions.tileTypes.SOLID ||
          surrounding.topRight !== StageCollisions.tileTypes.SOLID ||
          surrounding.bottomRight !== StageCollisions.tileTypes.SOLID ||
          source.x === destination.x) {
        x = 'INC';
      }
    } else if (dx < sx) {
      if (surrounding.left !== StageCollisions.tileTypes.SOLID ||
          surrounding.topLeft !== StageCollisions.tileTypes.SOLID ||
          surrounding.bottomLeft !== StageCollisions.tileTypes.SOLID ||
          source.x === destination.x) {
        x = 'DEC';
      }
    }

    if (dy > sy) {
      if (surrounding.bottom !== StageCollisions.tileTypes.SOLID ||
          surrounding.bottomRight !== StageCollisions.tileTypes.SOLID ||
          surrounding.bottomLeft !== StageCollisions.tileTypes.SOLID ||
          source.y === destination.y) {
        y = 'INC';
      }
    } else if (dy < sy) {
      if (surrounding.top !== StageCollisions.tileTypes.SOLID ||
          surrounding.topRight !== StageCollisions.tileTypes.SOLID ||
          surrounding.topLeft !== StageCollisions.tileTypes.SOLID ||
          source.y === destination.y) {
        y = 'DEC';
      }
    }

    return { x, y };
  }

}