class TestPlayer extends PhysicsEntity {
  constructor() {
    super(new Vector2(0, 532), new Vector2(CELL, CELL * 2), 10, 1, new Vector2(30, 0), new Vector2(0, 20));
  }

  update(world) {
    // // this.addForce(new Vector2(1, 1));
    // this.addForce(new Vector2(0, -GRAVITY.y));
  }

  render(pipeline) {
    const ctx = pipeline.ctx;
    const camera = pipeline.camera;
    pipeline.ctx.fillStyle = 'red';
    ctx.fillRect(camera.getCenterX(), camera.getCenterY(), camera.sx(this.dimensions.x), camera.sy(this.dimensions.y));

    pipeline.ctx.fillStyle = 'blue';
    let x = Math.round((this.location.x) / CELL) * CELL;
    let y = Math.round((this.location.y + CELL) / CELL) * CELL;
    ctx.fillRect(pipeline.camera.tx(x), pipeline.camera.ty(y), 8, 8);
    y = Math.round((this.location.y - this.dimensions.y) / CELL) * CELL;
    ctx.fillRect(pipeline.camera.tx(x), pipeline.camera.ty(y), 8, 8);

    let side = "left";
    x = side === "left" ?
      Math.round((this.location.x + -CELL) / CELL) * CELL :
      Math.round((this.location.x + this.dimensions.x) / CELL) * CELL;
    for (y = Math.round((this.location.y) / CELL) * CELL; y > this.location.y - this.dimensions.y; y -= CELL) {
      ctx.fillRect(pipeline.camera.tx(x), pipeline.camera.ty(y), 8, 8);
    }

    side = "right";
    x = side === "left" ?
      Math.round((this.location.x + -CELL) / CELL) * CELL :
      Math.round((this.location.x + this.dimensions.x) / CELL) * CELL;
      for (y = Math.round((this.location.y) / CELL) * CELL; y > this.location.y - this.dimensions.y; y -= CELL) {
        ctx.fillRect(pipeline.camera.tx(x), pipeline.camera.ty(y), 8, 8);
      }
  }
}
