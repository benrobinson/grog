// Based on: http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
export default class KeyBoard {

  static events = {
    KEYDOWN: 'KEYDOWN',
    KEYUP: 'KEYUP'
  };

  static keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13
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
    events.subscribe(KeyBoard.events.KEYDOWN, (event) => this.onDown(event));
    events.subscribe(KeyBoard.events.KEYUP, (event) => this.onUp(event));
    window.addEventListener('keyup', (event) => events.publish(KeyBoard.events.KEYUP, event), false);
    window.addEventListener('keydown', (event) => events.publish(KeyBoard.events.KEYDOWN, event), false);
    return this;
  }
}