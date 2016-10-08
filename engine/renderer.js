
const test = new PhysicsEntity(new Vector2(0, 0), 10, 1);

class Grid {
  /**
   * Create a grid.
   * Grids are used to shift coordinates from the internal grid to the external canvas.
   * This allows the game to look the same for everyone regardless of screen size.
   * @param {canvas} canvas - HTML5 Canvas.
   * @param {number} staticWidth - Internal grid width.
   * @param {number} staticHeight - Internal grid height.
   */
  constructor(canvas, staticWidth, staticHeight) {
    this.canvas = canvas;
    this.staticWidth = staticWidth;
    this.staticHeight = staticHeight;
    this.tx = this.translateX.bind(this);
    this.ty = this.translateY.bind(this);
    this.sy = this.scaleY.bind(this);
  }

  /**
   * Translate the given X value based on this grid.
   * @param {number} x
   */
  translateX(x) {
    return (this.canvas.width / this.staticWidth) * x;
  }

  /**
   * Scale the coordinate based on this grid.
   * Useful for variables like height which are relative to the actual coordinate.
   * @param {number} y
   */
  scaleY(y) {
    return (this.canvas.height / this.staticHeight) * y;
  }

  /**
   * Translate the given Y value based on this grid.
   * @param {number} y
   */
  translateY(y) {
    return this.canvas.height - this.scaleY(y);
  }
}

class RenderPipeline {
  /**
   * Create a render pipeline. Automatically constructs the grid & fetches canvas.
   */
  constructor(world, width, height) {
    this.world = world;

    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.grid = new Grid(this.canvas, width, height);

    this.render = this.render.bind(this);
  }

  /**
   * Render pipeline, recursive function once called.
   */
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.world.update();

    // render bg layers
    // render particles
    for (const entityIndex in this.world.entities.physics) {
      const entity = this.world.entities.physics[entityIndex];
      entity.render(this);
    }
    // render blocks

    requestAnimationFrame(this.render);
  }
}
