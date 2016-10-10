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
    for (var x = 0; x < this.world.width; x += CELL) {
      this.world.blocks[x] = [];
      for (var y = 0; y < this.world.height; y += CELL) {
        if (Math.random() > 0.5) continue;
        this.world.blocks[x][y] = new Block(new Vector2(x, y), 'test', 10);
      }
    }
  }
}
