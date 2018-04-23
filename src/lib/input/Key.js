// Based on: http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
const Key = {
  pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  isDown: function(keyCode) {
    return keyCode in this.pressed && this.pressed[keyCode];
  },

  onDown: function(event) {
    this.pressed[event.keyCode] = true;
  },

  onUp: function(event) {
    delete this.pressed[event.keyCode];
  }
};

export default Key;

/**

 Example:

 EventManager.subscribe('keydown', function(event) { Key.onDown(event); });
 EventManager.subscribe('keyup', function(event) { Key.onUp(event); });
 EventManager.subscribe('update', function() { Event.propagateAll(); });

 window.addEventListener('keyup', function(event) { Event.publish('keyup', event); }, false);
 window.addEventListener('keydown', function(event) { Event.publish('keydown', event); }, false);
 window.addEventListener('click', function() { Event.publish('update'); });

 */