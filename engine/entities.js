class Entity {
  /**
   * Create an entity.
   * @param {Vector2} location - Starting location.
   * @param {Vector2} dimensions - Size of entity;
   */
  constructor(location, dimensions) {
    this.location = location;
    this.dimensions = dimensions;

    this._privateUpdate = this._privateUpdate.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  /**
   * !! Internal update function only a base class should override. !!
   * Designated for common update logic shared across multiple entities.
   * @param {World} world
   */
  _privateUpdate(world) {}

  /**
   * Public update function. Entities should override this
   * if needed for custom functionality.
   * @param {World} world
   */
  update(world) {}

  /**
   * Render this entity to the canvas.
   * @param {RenderPipeline} pipeline
   */
  render(pipeline) {}
}

class PhysicsEntity extends Entity {
  /**
   * Create an entity capable of physics.
   * @param {Vector2} location - Starting location.
   * @param {number} maxVelocity - The max velocity this entity can hit.
   * @param {number} mass - The mass of this entity.
   */
  constructor(location, dimensions, maxVelocity, mass) {
    super(location, dimensions);
    this.maxVelocity = maxVelocity;
    this.mass = mass;

    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);

    this.addForce = this.addForce.bind(this);
  }

  /**
   * Apply a force to this entity.
   * @param {Vector2} force
   */
  addForce(force) {
    force.divide(this.mass);
    this.acceleration.add(force);
  }

  /**
   * Overrides original _privateUpdate()
   */
  _privateUpdate(world) {
    // Update velocity with acceleration
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);

    // Update location info with velocity
    this.location.add(this.velocity);

    // Reset acceleration
    this.acceleration.scale(0);
  }
}
