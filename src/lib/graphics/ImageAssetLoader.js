import ImageAssetManager from './ImageAssetManager';

export default class ImageAssetLoader {

  constructor(assets = []) {
    this.assets = assets;
    this.assetsLoaded = 0;
  }

  addAsset = (asset) => {
    this.assets.push(asset);
    return this;
  };

  load = () =>
    this.assets.map(asset =>
      asset.resource.addEventListener('load', this.onAssetComplete));

  onAssetComplete = () => {
    this.assetsLoaded++;
    if (this.assetsLoaded >= this.assets.length) {
      return this.successFn(new ImageAssetManager(this.assets));
    }
    return this;
  };

  onSuccess = (fn) =>  {
    this.successFn = fn;
    return this;
  }
}