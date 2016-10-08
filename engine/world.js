class World {
  /**
   * Create a world.
   * A world represents all entities in the game.
   */
  constructor() {
    this.entities = {
      blocks: [],
      physics: [],
      particles: []
    };

    this.update = this.update.bind(this);
  }

  update() {
    for (const entityGroup in this.entities) {
      for (const entityIndex in this.entities[entityGroup]) {
        const entity = this.entities[entityGroup][entityIndex];
        entity.update(this);
        entity._privateUpdate(this);
      }
    }
  }
}
