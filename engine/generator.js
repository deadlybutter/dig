class WorldGenerator {
  /**
   * Construct a world generator.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Generate blocks to fill the world.
   */
  build() {
    // this.world.blocks[0] = [];
    // this.world.blocks[0][0] = new Block(new Vector2(0, 0), 'test');
    for (var x = 0; x < this.world.width; x++) {
      this.world.blocks[x] = [];
      for (var y = 0; y < this.world.height; y++) {
        this.world.blocks[x][y] = new Block(new Vector2(x, y), 'test');
      }
    }
  }
}
