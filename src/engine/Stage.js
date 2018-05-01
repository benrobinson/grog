import StageTriggers from './StageTriggers';
import StageCollisions from './StageCollisions';
import DrawingLayers from './DrawingLayers';

export default class Stage {

  constructor() {
    this.canvas = window.document.createElement('canvas');
    this.canvasContext = this.canvas.getContext('2d');
    this.empty();
  }

  empty() {
    this.drawingLayers = new DrawingLayers();
    this.collisions = new StageCollisions();
    this.triggers = new StageTriggers();
    return this;
  }

  setLevelDimensions(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.className = 'stage';
    return this;
  }

}