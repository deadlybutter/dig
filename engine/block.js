class Block {
  constructor(location, texture) {
    this.location = location;
    this.texture = texture;
  }

  render(pipeline) {
    const camera = pipeline.camera;
    const x = camera.tx(this.location.x);
    const y = camera.ty(this.location.y);
    pipeline.ctx.fillStyle = 'blue';
    pipeline.ctx.fillRect(x, y, camera.sx(CELL), camera.sy(CELL));
  }
}
