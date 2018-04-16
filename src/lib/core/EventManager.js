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
   *
   * @return void
   */
  publish(eventKey, data) {
    if (eventKey in this.listeners) {
      if (eventKey in this.pool) {
        this.pool[eventKey].push(data);
      } else {
        this.pool[eventKey] = [data];
      }
    }
  }

  /**
   * Add a listener for an event key.
   *
   * @param {string} eventKey
   * @param {function} callback
   *
   * @return void
   */
  subscribe(eventKey, callback) {
    if (eventKey in this.listeners) {
      this.listeners[eventKey].push(callback);
    } else {
      this.listeners[eventKey] = [callback];
    }
  }

  /**
   * Just an alias of subscribe.
   *
   * @param {string} eventKey
   * @param {function} callback
   */
  on(eventKey, callback) {
    this.subscribe(eventKey, callback);
  }

  /**
   * Call listener for all pooled events under the specified key.
   *
   * @param {string} eventKey
   *
   * @return void
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
  }

  /**
   * Propagate all pooled events.
   *
   * @return void
   */
  propagateAll() {
    for (let eventKey in this.pool) {
      this.propagate(eventKey);
    }
  }
}