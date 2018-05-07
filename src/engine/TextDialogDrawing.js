import TextDrawing from './TextDrawing';

export default class TextDialogDrawing {

  static events = {
    NEXT_PAGE: 'NEXT_PAGE',
    LAST_PAGE: 'LAST_PAGE'
  };

  constructor() {
    this.empty();
  }

  empty() {
    this._backgroundColor = '0, 0, 0';
    this._backgroundOpacity = 1;
    this.dimensions = {
      width: 64,
      height: 48
    };
    this._letterMap = {};
    this._letterSpacing = 1;
    this._position = {
      x: 0,
      y: 24
    };
    this._tileSheet = null;
    this._text = "";
    this._pages = [];
    this._page = 0;
    this._padding = 5;
    this._showShadow = false;
    this._textDrawing = new TextDrawing();
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

  _makePages(text) {
    const textAsArray = text.split(" ");
    const lettersPerLine = Math.ceil(this._dimensions.width / (this._tileSheet.tileWidth + this._letterSpacing));
    const linesPerPage = Math.ceil(this._dimensions.height / (this._tileSheet.tileHeight + this._letterSpacing));

    console.log('lettersPerLine', lettersPerLine, 'linesPerPage', linesPerPage);

    let lineLength = 0;
    let line = [];
    let lines = [];
    let pages = [];

    textAsArray.forEach(word => {
      const l = word.length + 1;
      const nextLineLength = lineLength + l;
      if (nextLineLength >= lettersPerLine) {
        lines.push(line.join(" "));
        lineLength = l;
        line = [word];
      } else {
        lineLength = nextLineLength;
        line.push(word);
      }

      if (lines.length >= linesPerPage) {
        pages.push(lines);
        lines = [];
      }
    });
    lines.push(line.join(" "));
    pages.push(lines);

    console.log(pages);

    this._pages = pages;
  }

  draw(canvasContext) {
    const lines = this._pages[this._page];

    if (this._showShadow) {
      canvasContext.fillStyle = `rgba(0, 0, 0, 0.1)`;
      canvasContext.fillRect(
        (this._position.x - this._padding + 1),
        (this._position.y - this._padding + 1),
        (this._dimensions.width + (this._padding * 2)),
        (this._dimensions.height + (this._padding * 2)));
    }

    canvasContext.fillStyle = `rgba(${this._backgroundColor}, ${this._backgroundOpacity})`;
    canvasContext.fillRect(
      (this._position.x - this._padding),
      (this._position.y - this._padding),
      (this._dimensions.width + (this._padding * 2)),
      (this._dimensions.height + (this._padding * 2)));

    let x = this._position.x;
    let y = this._position.y;
    lines.forEach(line => {
      this._textDrawing
        .setText(line)
        .setPosition(x, y)
        .draw(canvasContext);
      x = this._position.x;
      y += this._tileSheet.tileHeight + this._letterSpacing;
    });
  }

  setBackgroundColor(r, g, b) {
    this._backgroundColor = `${r}, ${g}, ${b}`;
    return this;
  }

  setBackgroundOpacity(opacity) {
    this._backgroundOpacity = opacity;
    return this;
  }

  setDimensions(width, height) {
    this._dimensions = { width, height };
    return this;
  }

  setPadding(padding) {
    this._padding = padding;
    return this;
  }

  setPosition(x, y) {
    this._position = { x, y };
    return this;
  }

  setText(text) {
    this._text = text;
    this._makePages(text);
    return this;
  }

  setTileSheet(tileSheet) {
    this._tileSheet = tileSheet;
    this._textDrawing.setTileSheet(this._tileSheet);
    return this;
  }

  setLetterSpacing(letterSpacing) {
    this._letterSpacing = letterSpacing;
    this._textDrawing.setLetterSpacing(letterSpacing);
    return this;
  }

  setShowShadow(showShadow) {
    this._showShadow = showShadow;
    return this;
  }

  setPage(page) {
    if (page < this._pages.length) {
      this._page = page;
    }
    return this;
  }

  nextPage() {
    const nextPage = this._page + 1;
    if (nextPage < this._pages.length) {
      this._page = nextPage;
      return TextDialogDrawing.events.NEXT_PAGE;
    } else {
      return TextDialogDrawing.events.LAST_PAGE;
    }
  }
}