export default class TextDrawing {

  constructor() {
    this.empty();
  }

  empty() {
    this._letterMap = {};
    this._letterSpacing = 1;
    this._position = {
      x: 0,
      y: 24
    };
    this._tileSheet = null;
    this._text = "";
  }

  _drawLetter(canvasContext, letter, x, y) {
    const tile = this._letterMap[letter.toLowerCase()];
    if (!!tile === true) {

      canvasContext.drawImage(
        this._tileSheet.imageAsset.resource,
        tile[0],
        tile[1],
        tile[2],
        tile[3],
        x,
        y,
        this._tileSheet.tileWidth,
        this._tileSheet.tileHeight);
    }
  }

  _makeLetterMap() {
    this._letterMap = {
      a: this._tileSheet.getTile(0, 0),
      b: this._tileSheet.getTile(1, 0),
      c: this._tileSheet.getTile(2, 0),
      d: this._tileSheet.getTile(3, 0),
      e: this._tileSheet.getTile(4, 0),
      f: this._tileSheet.getTile(5, 0),
      g: this._tileSheet.getTile(6, 0),
      h: this._tileSheet.getTile(7, 0),
      i: this._tileSheet.getTile(8, 0),
      j: this._tileSheet.getTile(0, 1),
      k: this._tileSheet.getTile(1, 1),
      l: this._tileSheet.getTile(2, 1),
      m: this._tileSheet.getTile(3, 1),
      n: this._tileSheet.getTile(4, 1),
      o: this._tileSheet.getTile(5, 1),
      p: this._tileSheet.getTile(6, 1),
      q: this._tileSheet.getTile(7, 1),
      r: this._tileSheet.getTile(8, 1),
      s: this._tileSheet.getTile(0, 2),
      t: this._tileSheet.getTile(1, 2),
      u: this._tileSheet.getTile(2, 2),
      v: this._tileSheet.getTile(3, 2),
      w: this._tileSheet.getTile(4, 2),
      x: this._tileSheet.getTile(5, 2),
      y: this._tileSheet.getTile(6, 2),
      z: this._tileSheet.getTile(7, 2),
      1: this._tileSheet.getTile(8, 2),
      2: this._tileSheet.getTile(0, 3),
      3: this._tileSheet.getTile(1, 3),
      4: this._tileSheet.getTile(2, 3),
      5: this._tileSheet.getTile(3, 3),
      6: this._tileSheet.getTile(4, 3),
      7: this._tileSheet.getTile(5, 3),
      8: this._tileSheet.getTile(6, 3),
      9: this._tileSheet.getTile(7, 3),
      0: this._tileSheet.getTile(8, 3),
      '.': this._tileSheet.getTile(0, 4),
      ',': this._tileSheet.getTile(1, 4),
      ':': this._tileSheet.getTile(2, 4),
      ';': this._tileSheet.getTile(3, 4),
      '!': this._tileSheet.getTile(4, 4),
      '?': this._tileSheet.getTile(5, 4),
      '-': this._tileSheet.getTile(6, 4),
      '+': this._tileSheet.getTile(7, 4),
      '=': this._tileSheet.getTile(8, 4)
    }
  }

  draw(canvasContext) {
    let x = this._position.x;
    let y = this._position.y;
    this._text.split("").forEach(letter => {
      this._drawLetter(canvasContext, letter, x, y);
      x += this._tileSheet.tileWidth + this._letterSpacing;
    })
  }

  setPosition(x, y) {
    this._position = { x, y };
    return this;
  }

  setTileSheet(tileSheet) {
    this._tileSheet = tileSheet;
    this._makeLetterMap();
    return this;
  }

  setLetterSpacing(letterSpacing) {
    this._letterSpacing = letterSpacing;
    return this;
  }

  setText(text) {
    this._text = text;
    return this;
  }

}