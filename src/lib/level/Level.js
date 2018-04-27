import LevelTriggers from './LevelTriggers';
import LevelCollisions from './LevelCollisions';
import DrawingLayers from '../application/DrawingLayers';

export default class Level {

  constructor() {
    this.empty();
  }

  empty() {
    this.canvas = window.document.createElement('canvas');
    this.canvasContext = this.canvas.getContext('2d');
    this.drawingLayers = new DrawingLayers();
    this.collisions = new LevelCollisions();
    this.triggers = new LevelTriggers();
  }

  setLevelDimensions(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

}