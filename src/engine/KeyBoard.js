// Based on: http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
export default class KeyBoard {

  static keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  constructor() {
    this.empty();
  }

  empty() {
    this.pressed = {};
  }

  isDown(keyCode) {
    return keyCode in this.pressed && this.pressed[keyCode];
  }

  onDown(event) {
    this.pressed[event.keyCode] = true;
  }

  onUp(event) {
    delete this.pressed[event.keyCode];
  }

  withDefaultListeners(events) {
    events.subscribe('keydown', event => this.onDown(event));
    events.subscribe('keyup', event => this.onUp(event));
    window.addEventListener('keyup', event => events.publish('keyup', event), false);
    window.addEventListener('keydown', event => events.publish('keydown', event), false);
    return this;
  }
}