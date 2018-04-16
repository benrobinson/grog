/**
 * Class EventManager
 *
 * A pub-sub implementation with a simple event pool.
 */
export default class EventManager {

  /**
   * Initialize empty listeners and event pool.
   */
  constructor() {
    this.listeners = {};
    this.pool = {};
  }

  /**
   * Publish an event
   *
   * @param {string} eventKey
   * @param {*} data
   */
  publish(eventKey, data = null) {
    if (eventKey in this.listeners) {
      if (eventKey in this.pool) {
        this.pool[eventKey].push(data);
      } else {
        this.pool[eventKey] = [data];
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
  subscribe(eventKey, callback) {
    if (eventKey in this.listeners) {
      this.listeners[eventKey].push(callback);
    } else {
      this.listeners[eventKey] = [callback];
    }
    return this;
  }

  /**
   * Just an alias of subscribe.
   *
   * @param {string} eventKey
   * @param {function} callback
   */
  on(eventKey, callback) {
    this.subscribe(eventKey, callback);
    return this;
  }

  /**
   * Call listener for all pooled events under the specified key.
   *
   * @param {string} eventKey
   */
  propagate(eventKey) {
    if (eventKey in this.pool && eventKey in this.listeners) {
      this.pool[eventKey].forEach(event => {
        this.listeners[eventKey].forEach(callback => {
          callback(event);
        });
      });
      delete this.pool[eventKey];
    }
    return this;
  }

  /**
   * Propagate all pooled events.
   */
  propagateAll() {
    for (let eventKey in this.pool) {
      this.propagate(eventKey);
    }
    return this;
  }
}