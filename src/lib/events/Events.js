/**
 * Class Events
 *
 * A pub-sub implementation with a simple event _pool.
 */
export default class Events {

  static common = {
    APPLICATION_ANIMATION: 'APPLICATION_ANIMATION',
    APPLICATION_DRAWING: 'APPLICATION_DRAWING',
    APPLICATION_UPDATES: 'APPLICATION_UPDATES',
    APPLICATION_INPUT: 'APPLICATION_INPUT',
    ENTITY_ENTITY_COLLISION: 'ENTITY_ENTITY_COLLISION',
    ENTITY_LEVEL_COLLISION: 'ENTITY_LEVEL_COLLISION',
    ENTITY_MOVEMENT: 'ENTITY_MOVEMENT',
    STAGE_LOADING: 'STAGE_LOADING',
    STAGE_START: 'STAGE_LOADING',
    STAGE_STARTED: 'STAGE_LOADING',
    STAGE_END: 'STAGE_LOADING',
    STAGE_ENDED: 'STAGE_LOADING'
  };

  /**
   * Initialize empty _listeners and event _pool.
   */
  constructor() {
    this.empty();
  }

  empty() {
    this._listeners = {};
    this._pool = {};
  }

  /**
   * Publish an event
   *
   * @param {string} eventKey
   * @param {*} data
   */
  publish(eventKey, data = null) {
    if (eventKey in this._listeners) {
      if (eventKey in this._pool) {
        this._pool[eventKey].push(data);
      } else {
        this._pool[eventKey] = [data];
      }
    }
    return this;
  }

  /**
   * Add a listener for an event key.
   *
   * @param {string} eventKey
   * @param {function} callback
   * @param {number} count
   */
  subscribe(eventKey, callback, count = 0) {
    if (eventKey in this._listeners) {
      this._listeners[eventKey].push({ callback, count, counter: 0 });
    } else {
      this._listeners[eventKey] = [{ callback, count, counter: 0 }];
    }
    return this;
  }

  /**
   * Call listener for all _pooled events under the specified key.
   *
   * @param {string} eventKey
   */
  propagate(eventKey) {
    if (eventKey in this._pool && eventKey in this._listeners) {
      this._pool[eventKey].forEach(event => {
        this._listeners[eventKey].forEach(listener => {
          if (listener.count <= 0 || listener.count > listener.counter) {
            listener.callback(event);
            listener.counter++;
          }
        });
      });
      delete this._pool[eventKey];
    }
    return this;
  }

  /**
   * Propagate all _pooled events.
   */
  propagateAll() {
    for (let eventKey in this._pool) {
      this.propagate(eventKey);
    }
    return this;
  }
}