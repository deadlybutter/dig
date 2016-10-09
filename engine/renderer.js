let DEBUG = false;

class RenderPipeline {
  /**
   * Create a render pipeline. Automatically constructs the grid & fetches canvas.
   * @param {World} world
   * @param {number} width - Camera width.
   * @param {number} height - Camera height.
   */
  constructor(world, width, height, distance) {
    this.world = world;

    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.camera = new Camera(this.canvas, width, height, world.getMainPlayer());

    this.render = this.render.bind(this);
  }

  /**
   * Render pipeline, recursive function once called.
   */
  render() {
    this.world.update();

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // render bg layers

    // render particles

    // render blocks
    const center = world.getMainPlayer().location;
    const centerX = Math.round(center.x / CELL) * CELL;
    const centerY = Math.round(center.y / CELL) * CELL;
    const wDistance = world.width / 2;
    const hDistance = world.height / 2;
    for (var x = centerX - wDistance; x < centerX + wDistance; x += CELL) {
      if (!this.world.blocks[x]) {
        continue;
      }
      for (var y = centerY - hDistance; y < centerY + hDistance; y += CELL) {
        const block = this.world.blocks[x][y];
        if (block) {
          block.render(this);
        }
      }
    }

    // render physics entities
    this.world.entities.physics.forEach((entity) => {
      entity.render(this);
    });

    // render debug
    if (DEBUG) {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(this.canvas.width / 2, 0);
      ctx.lineTo(this.canvas.width / 2, this.canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, this.canvas.height / 2);
      ctx.lineTo(this.canvas.width, this.canvas.height / 2);
      ctx.stroke();
    }

    requestAnimationFrame(this.render);
  }
}
