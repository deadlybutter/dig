class Block {
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
