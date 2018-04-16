export default class ImageAsset {

  constructor() {
    this.name = '';
    this.height = 0;
    this.width = 0;
    this.source = '';
    this.resource = new Image();
  }

  setName = (name) => {
    this.name = name;
    return this;
  };

  setHeight = (height) => {
    this.height = height;
    return this;
  };

  setWidth = (width) => {
    this.width = width;
    return this;
  };

  setSource = (source) => {
    this.source = source;
    return this;
  };

  buildResource = () => {
    this.resource = new Image(this.width, this.height);
    this.resource.src = this.source;
    return this;
  }
}