const PLAYER_TEST_NAME = 'TestPlayer';

class TestPlayer extends PhysicsEntity {
  constructor() {
    super(
      new Vector2(0, 532),            // Location
      new Vector2(CELL, CELL * 2),    // Dimensions
      new Vector2(5, 20),             // Max velocity
      1,                              // Mass
      new Vector2(2, 0),              // Move speed
      new Vector2(0, 15.5)            // Jump speed
    );

    this.jumping = false;
  }

  update(world) {
    if (!this.controls) return;

    if (this.jumping) {
      const block = this.getBlockUnder(world.blocks);
      if (block) {
        this.jumping = false;
      }
    }
    else if (this.controls.state.JUMP) {
      this.jumping = true;
      this.addForce(this.jumpSpeed);
    }

    if (this.controls.state.LEFT) {
      this.addForce(Vector2.Scale(this.moveSpeed, -1));
    }
    else if (this.controls.state.RIGHT) {
      this.addForce(this.moveSpeed);
    }
  }

  render(pipeline) {
    const ctx = pipeline.ctx;
    const camera = pipeline.camera;
    pipeline.ctx.fillStyle = 'red';
    ctx.fillRect(camera.tx(this.location.x), camera.ty(this.location.y), camera.sx(this.dimensions.x), camera.sy(this.dimensions.y));
  }

  toString() {
    return PLAYER_TEST_NAME;
  }
}
