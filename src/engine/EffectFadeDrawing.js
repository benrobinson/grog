import Effect from './Effect';

export default class EffectFadeDrawing extends Effect {

  static directions = {
    IN: 'IN',
    OUT: 'OUT'
  };

  constructor() {
    super();
    this.empty();
  }

  empty() {
    super.empty();
    this._color = '0, 0, 0';
    this._area = {
      height: 0,
      width: 0
    };
    this._direction = EffectFadeDrawing.directions.IN;
  }

  draw(canvasContext) {
    let opacity;

    switch(this._direction) {
      case EffectFadeDrawing.directions.IN:
        opacity = this._percentage;
        break;
      case EffectFadeDrawing.directions.OUT:
        opacity = 1 - this._percentage;
        break;
    }

    canvasContext.fillStyle = `rgba(${this._color}, ${opacity})`;
    canvasContext.fillRect(0, 0, this._area.width, this._area.height);
  }

  setDirection(direction) {
    this._direction = direction;
    return this;
  }

  setColor(r, g, b) {
    this._color = `${r}, ${g}, ${b}`;
    return this;
  }

  setArea(width, height) {
    this._area = { height, width };
    return this;
  }
}