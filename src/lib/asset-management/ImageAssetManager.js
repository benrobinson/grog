export default class ImageAssetManager {

  constructor(assets = []) {
    this.assets = assets;
  }

  getAsset = (name) =>
    this.assets.find((asset) => asset.name === name);

}