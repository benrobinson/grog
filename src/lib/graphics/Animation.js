import {application} from '../core/index';
import {Degrees} from '../util/Math';

export default class Animation {
  constructor(tileSheet, options) {
    this._callbacks = {
      onFrame: (frame) => {},
      onLoop: (count) => {},
      onStart: (frame) => {},
      onStop: (frame) => {}
    };
    this._frameAcc = 0;
    this._frame = 0; // First loop adds to it before displaying.
    this._frames = [];
    this._loopCount = 0;
    this._options = {
      framesPerSecond: options.framesPerSecond || 60,
      isLoop: options.isLoop || false,
      loopCount: options.loopCount || 0
    };
    this._states = {
      STOPPED: 'STOPPED',
      PLAYING: 'PLAYING'
    };
    this._state = this._states.STOPPED;
    this.tileSheet = tileSheet;
    this._init();
  }

  _init() {
    application.eventManager
      .subscribe('application:animation', this._update.bind(this));
  }

  _update(dt) {
    if (this._state !== this._states.PLAYING) return;

    if (this._loopCount === 0 && this._frameAcc === 0) {
      this._callbacks.onFrame(this.display(this._frame));
    }

    this._frameAcc += dt * this._options.framesPerSecond;
    if (this._frameAcc < 1) {
      return;
    } else {
      this._frameAcc = 0;
    }

    const maybeNextFrame = this._frame + 1;
    if (maybeNextFrame < (this._frames.length)) {
      this._frame = maybeNextFrame;
      this._callbacks.onFrame(this.display(maybeNextFrame));
    } else if (this._options.isLoop && (this._options.loopCount === 0 || this._loopCount < (this._options.loopCount - 1))) {
      this._frame = 0;
      this._callbacks.onFrame(this.display(0));
      this._loopCount++;
      this._callbacks.onLoop(this._loopCount);
    } else {
      this.stop(0);
    }
  };

  addFrame(tileX, tileY, moveX = 0, moveY = 0, rotation = 0) {
    this._frames.push({
      tile: this.tileSheet.getTile(tileX, tileY),
      move: {
        x: moveX,
        y: moveY
      },
      rotation: Degrees.toRadians(rotation)
    });
    return this;
  };

  display(frame) {
    return this._frames[frame];
  }

  onFrame(fn) {
    this._callbacks.onFrame = fn;
    return this;
  };

  onLoop(fn) {
    this._callbacks.onLoop = fn;
    return this;
  };

  onStart(fn) {
    this._callbacks.onStart = fn;
    return this;
  };

  onStop(fn) {
    this._callbacks.onStop = fn;
    return this;
  };

  play(frame = 0) {
    if (this._state === this._states.PLAYING) return this;


    this._callbacks.onStart(this.display(frame));
    this.show(frame);
    this._state = this._states.PLAYING;
  };

  stop(frame = 0) {
    if (this._state === this._states.STOPPED) return this;

    this.show(frame);
    this._callbacks.onStop(this.display(frame));
    this._state = this._states.STOPPED;
  };

  show(frame = 0) {
    this._frame = frame;
    this._callbacks.onFrame(this.display(frame));
  }
}