const GRAVITY = new Vector2(0, -2);

class World {
  /**
   * Create a world.
   * A world represents all entities in the game.
   */
  constructor(width, height, mainPlayer) {
    this.blocks = [];

    this.entities = {
      physics: [],
      particles: []
    };

    this.width = width;
    this.height = height;

    this.entities.physics.push(mainPlayer);

    this.update = this.update.bind(this);
    this.getMainPlayer = this.getMainPlayer.bind(this);
  }

  /**
   * Apply gravity & friction to the given entity.
   * @param {PhysicsEntity} entity
   */
  applyWorldForces(entity) {
    entity.addForce(Vector2.Scale(GRAVITY, entity.mass));

    const block = entity.getBlockUnder(this.blocks);
    if (!block) return;

    const blockFriction = block.friction;
    const normal = 1;
    const frictionMag = blockFriction * normal;
    const friction = entity.velocity.copy().scale(-1).normalize().scale(frictionMag);
    friction.y = 0;
    entity.addForce(friction);
  }

  getMainPlayer() {
    return this.entities.physics[0];
  }

  /**
   * Update all entities.
   */
  update() {
    for (const entityGroup in this.entities) {
      for (const entityIndex in this.entities[entityGroup]) {
        const entity = this.entities[entityGroup][entityIndex];

        if (entityGroup == 'physics') {
          this.applyWorldForces(entity);
        }

        entity.update(this);
        entity._privateUpdate(this);
      }
    }
  }
}
