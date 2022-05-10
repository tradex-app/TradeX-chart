// chart-grid.js

const chartGrid = {

  draw(target, config) {
    const scene = target.scene,
    ctx = scene.context;
  
    scene.clear();
    ctx.save();
    ctx.beginPath();
    ctx.arc(config.x, config.y, 60, 0, Math.PI*2, false);
    ctx.fillStyle = config.color;
    ctx.fill();
  
    if (config.selected) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 6;
    ctx.stroke();
    }
  
    if (config.hovered) {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
    }
    ctx.restore();
  }
}

export default chartGrid
