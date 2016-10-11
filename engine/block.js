class Block {
  /**
   * Construct a block class.
   * @param {Vector2} location
   * @param {string} texture - Hex string. TODO: Reference a file
   * @param {number} friction - How quickly (or slowly) can you move across this
   * TODO: air (rather than null blocks?)
   * TODO: fluid (In which case, define resistance)
   */
  constructor(location, texture, friction) {
    this.location = location;
    this.texture = texture;
    this.friction = friction;
  }

  render(pipeline) {
    const camera = pipeline.camera;
    const x = camera.tx(this.location.x);
    const y = camera.ty(this.location.y);
    pipeline.ctx.fillStyle = this.texture;
    pipeline.ctx.fillRect(x, y, camera.sx(CELL), camera.sy(CELL));
  }
}
