export default class LevelCollisions {

  constructor() {
    this.empty();
  }

  empty() {
    this._collisionListeners = [[]];
  }

  hasListener(x, y) {
    return Array.isArray(this._collisionListeners[x][y]) && this._collisionListeners[x][y].length > 0;
  }

  addListener(x, y, listenerFn) {
    if (Array.isArray(this._collisionListeners[x][y])) {
      this._collisionListeners[x][y].push(listenerFn);
    } else {
      this._collisionListeners[x][y] = [listenerFn];
    }
  }

  removeListeners(x, y) {
    this._collisionListeners[x][y] = null;
  }

  removeListener(x, y, listenerFn) {
    if (Array.isArray(this._collisionListeners[x][y])) {
      this._collisionListeners[x][y] = this._collisionListeners[x][y].filter(l => l !== listenerFn);
    }
  }

  collideWith(x, y, entity) {
    if (Array.isArray(this._collisionListeners[x][y])) {
      this._collisionListeners[x][y].forEach(listenerFn => listenerFn(entity));
    }
  }

}