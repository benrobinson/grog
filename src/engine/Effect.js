export default class Effect {

  constructor() {
    this.empty();
  }

  empty() {
    this._complete = false;
    this._duration = 0;
    this._time = this._duration;
    this._onComplete = () => {};
  }

  setDuration(duration) {
    this._duration = duration;
    this._time = this._duration;
    return this;
  }

  onComplete(fn) {
    this._onComplete = fn;
    return this;
  }

  tick(dt) {
    this._time -= dt;
    this._percentage = this._time / this._duration;
    if (this._time <= 0){
      this._time = 0;
      if (!this._complete) {
        this._complete = true;
        this._onComplete(dt);
      }
    }
    return this;
  }
}