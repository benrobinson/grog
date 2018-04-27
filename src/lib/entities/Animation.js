import * as Degrees from '../util/Degrees';
import Events from '../events/Events';

export default class Animation {
  
  static states = {
    STOPPED: 'STOPPED',
    PLAYING: 'PLAYING'
  };
  
  constructor(app, tileSheet) {
    this.tileSheet = tileSheet;
    this.application = app;
    this.empty();
  }
  
  empty() {
    this._callbacks = {
      onFrame: (frame) => {},
      onLoop: (count) => {},
      onStart: (frame) => {},
      onStop: (frame) => {}
    };
    this._frameAcc = 0;
    this._frame = 0; // First loop adds to it before displaying.
    this._frames = [];
    this._framesPerSecond = 60;
    this._isLoop = false;
    this._loops = 0;
    this._loopCount = 0;
    this._state = Animation.states.STOPPED;

    this.application.events.subscribe(Events.common.APPLICATION_ANIMATION, this._update.bind(this));
  }

  _update(dt) {
    if (this._state !== Animation.states.PLAYING) return;

    if (this._loopCount === 0 && this._frameAcc === 0) {
      this._callbacks.onFrame(this.display(this._frame));
    }

    this._frameAcc += dt * this._framesPerSecond;
    if (this._frameAcc < 1) {
      return;
    } else {
      this._frameAcc = 0;
    }

    const maybeNextFrame = this._frame + 1;
    if (maybeNextFrame < (this._frames.length)) {
      this._frame = maybeNextFrame;
      this._callbacks.onFrame(this.display(maybeNextFrame));
    } else if (this._isLoop && (this._loops === 0 || this._loopCount < (this._loops - 1))) {
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
    if (this._state === Animation.states.PLAYING) return this;

    this._callbacks.onStart(this.display(frame));
    this.show(frame);
    this._state = Animation.states.PLAYING;
  };

  setFramesPerSecond(framesPerSecond) {
    this._framesPerSecond = framesPerSecond;
    return this;
  }

  setIsLoop(isLoop) {
    this._isLoop = isLoop;
    return this;
  }

  setLoops(loops) {
    this._loops = loops;
    return this;
  }

  stop(frame = 0) {
    if (this._state === Animation.states.STOPPED) return this;

    this.show(frame);
    this._callbacks.onStop(this.display(frame));
    this._state = Animation.states.STOPPED;
  };

  show(frame = 0) {
    this._frame = frame;
    this._callbacks.onFrame(this.display(frame));
  }
}