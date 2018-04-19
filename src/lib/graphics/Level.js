export default class Level {

  constructor() {
    this.empty();
  }

  empty() {
    this.collisions = new LevelCollisions();
    this.drawings = {};
  }

  addDrawing(name, levelDrawing) {
    this.drawings[name] = levelDrawing;
  }

}