/**
 * Class EventManager
 *
 * A pub-sub implementation with a simple event _pool.
 */
export default class EventManager {

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
   */
  subscribe(eventKey, callback, count = 0) {
    // TODO make events only work until count is used up.
    
    if (eventKey in this._listeners) {
      this._listeners[eventKey].push(callback);
    } else {
      this._listeners[eventKey] = [callback];
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
        this._listeners[eventKey].forEach(callback => {
          callback(event);
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