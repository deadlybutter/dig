class Entity {
  /**
   * Create an entity.
   * @param {Vector2} location - Starting location.
   * @param {Vector2} dimensions - Size of entity;
   */
  constructor(location, dimensions) {
    this.location = location;
    this.dimensions = dimensions;
    this.uuid = generateUUID();

    this._privateUpdate = this._privateUpdate.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  /**
   * Get the block under this entity.
   * @param {array} blocks
   * @return {Block} block || undefined
   */
  getBlockUnder(blocks) {
    const blockX = Math.round((this.location.x) / CELL) * CELL;
    if (!blocks[blockX]) return undefined;
    const blockY = Math.round((this.location.y - this.dimensions.y) / CELL) * CELL;
    return blocks[blockX][blockY];
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
   * @param {Vector2} dimensions - Size of entity;
   * @param {Vector2} maxVelocity - The max velocity this entity can hit.
   * @param {number} mass - The mass of this entity.
   * @param {Vector2} moveSpeed - The speed this entity moves from a keypress.
   * @param {Vector2} jumpSpeed - The speed this entity jumps at.
   */
  constructor(location, dimensions, maxVelocity, mass, moveSpeed, jumpSpeed) {
    super(location, dimensions);
    this.maxVelocity = maxVelocity;
    this.mass = mass;
    this.moveSpeed = moveSpeed;
    this.jumpSpeed = jumpSpeed;

    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);

    this.addForce = this.addForce.bind(this);
  }

  /**
   * Attach controls to this entity.
   * @param {KeyboardControls} controls
   */
  attachControls(controls) {
    this.controls = controls;
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
    this.velocity.limitByVector(this.maxVelocity);

    // Apply vertical velocity
    const verticalVelocity = this.velocity.y;
    const verticalLocation = Vector2.Add(this.location, new Vector2(0, verticalVelocity));
    const verticalBB = new BoundingBox(verticalLocation, this.dimensions);

    if (verticalBB.intersects(world.blocks)) {
      if (this.velocity.y < 0) {
        this.location.y = Math.round((this.location.y - (CELL / 2)) / CELL) * CELL;
      }
    }
    else {
      this.location.y += this.velocity.y;
    }

    // Apply horizontal velocity
    const horizontalVelocity = this.velocity.x;
    const horizontalLocation = Vector2.Add(this.location, new Vector2(horizontalVelocity, 0));
    const horizontalBB = new BoundingBox(horizontalLocation, this.dimensions);

    if (horizontalBB.intersects(world.blocks)) {
      this.location.x = Math.round((this.location.x) / CELL) * CELL;
    }
    else {
      this.location.x += this.velocity.x;
    }

    // Reset acceleration
    this.acceleration = new Vector2(0, 0);
  }
}
