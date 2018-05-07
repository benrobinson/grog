export default function drawBackground(engine, color) {

  engine.stage.drawingLayers
    .getLayer('floor')
    .addDrawable({
      draw: (canvasContext) => {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(0, 0, engine.stage.canvas.width, engine.stage.canvas.height);
      }
    });

}