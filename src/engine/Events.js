/**
 * Class Events
 *
 * A pub-sub implementation with a simple event pool.
 */
export default class Events {

  static common = {
    ENGINE_ANIMATION: 'ENGINE_ANIMATION',
    ENGINE_DRAWING: 'ENGINE_DRAWING',
    ENGINE_UPDATES: 'ENGINE_UPDATES',
    ENGINE_INPUT: 'ENGINE_INPUT',
    STAGE_LOADING: 'STAGE_LOADING',
    STAGE_START: 'STAGE_START',
    STAGE_STARTED: 'STAGE_STARTED',
    STAGE_END: 'STAGE_END',
    STAGE_ENDED: 'STAGE_ENDED'
  };

  /**
   * Initialize empty listeners and event pool.
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
    const event = { callback, count, counter: 0 };
    if (eventKey in this._listeners) {
      this._listeners[eventKey].push(event);
    } else {
      this._listeners[eventKey] = [event];
    }
    return this;
  }

  /**
   * Call listener for all pooled events under the specified key.
   *
   * @param {string} eventKey
   */
  propagate(eventKey) {
    if (eventKey in this._pool && eventKey in this._listeners) {
      this._pool[eventKey].forEach(event => {
        this._listeners[eventKey].forEach((listener, i) => {
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
   * Propagate all pooled events.
   */
  propagateAll() {
    for (let eventKey in this._pool) {
      this.propagate(eventKey);
    }
    return this;
  }
}