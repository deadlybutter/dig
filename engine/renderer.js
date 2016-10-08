let DEBUG = false;

class RenderPipeline {
  /**
   * Create a render pipeline. Automatically constructs the grid & fetches canvas.
   */
  constructor(world, width, height, targetFps) {
    this.world = world;

    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.camera = new Camera(this.canvas, width, height, world.getMainPlayer());

    this.render = this.render.bind(this);

    this._now = undefined;
    this._then = Date.now();
    this._interval = 1000 / targetFps;
    this.delta = 0;
  }

  /**
   * Render pipeline, recursive function once called.
   */
  render() {
    requestAnimationFrame(this.render);

    this._now = Date.now();
    this.delta = this._now - this._then;

    if (this.delta < this._interval) return;

    this._then = this._now - (this.delta % this._interval);

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

    // requestAnimationFrame(this.render);
  }
}
