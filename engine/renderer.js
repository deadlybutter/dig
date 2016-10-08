let DEBUG = false;

class RenderPipeline {
  /**
   * Create a render pipeline. Automatically constructs the grid & fetches canvas.
   */
  constructor(world, width, height) {
    this.world = world;

    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.camera = new Camera(this.canvas, width, height, world.getMainPlayer());

    this.render = this.render.bind(this);

    this.lastCall = undefined;
    this.delta = 0;
    this.fps = 0;
  }

  /**
   * Render pipeline, recursive function once called.
   */
  render() {

    if (!this.lastCall) {
      this.lastCall = Date.now();
    }
    this.delta = (Date.now() - this.lastCall) / 1000;
    this.lastCall = Date.now();
    if (DEBUG) console.log('FPS:', 1 / this.delta);

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.world.update();

    // render bg layers

    // render particles

    // render blocks
    for (var x = 0; x < this.world.blocks.length; x++) {
      for (var y = 0; y < this.world.blocks[x].length; y++) {
        this.world.blocks[x][y].render(this);
      }
    }

    // render physics entities
    for (const entityIndex in this.world.entities.physics) {
      const entity = this.world.entities.physics[entityIndex];
      entity.render(this);
    }

    // render debug
    if (DEBUG) {
      console.log('FPS:', this.fps);
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
