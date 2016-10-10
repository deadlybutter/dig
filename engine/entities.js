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
   * Check if this entity collides with any blocks beneath it.
   * @param {array} blocks
   * @return {bool} collides - False if it doesn't collide.
   */
  checkBottom(blocks) {
    const x = Math.round((this.location.x) / CELL) * CELL;
    const y = Math.round((this.location.y - this.dimensions.y) / CELL) * CELL;
    if (blocks[x] == undefined) return false;
    return blocks[x][y] != undefined;
  }

  /**
   * Check if this entity collides with any blocks above it.
   * @param {array} blocks
   * @return {bool} collides - False if it doesn't collide.
   */
  checkTop(blocks) {
    const x = Math.round((this.location.x) / CELL) * CELL;
    const y = Math.round((this.location.y + CELL) / CELL) * CELL;
    if (blocks[x] == undefined) return false;
    return blocks[x][y] != undefined;
  }

  /**
   * Check if this entitiy collides with any block on the left or right.
   * @param {array} blocks
   * @param {string} side - "left" or "right"
   * @param {bool} collides - True if it doesn't collide.
   */
  checkSide(blocks, side) {
    const x = side === "left" ?
      Math.round((this.location.x + -CELL) / CELL) * CELL :
      Math.round((this.location.x + this.dimensions.x) / CELL) * CELL;

    if (blocks[x] == undefined) {
      return false;
    }

    for (var y = Math.round((this.location.y) / CELL) * CELL; y > this.location.y - this.dimensions.y; y -= CELL) {
      if (blocks[x][y] != undefined) {
        return true;
      }
    }

    return false;
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
   * @param {number} maxVelocity - The max velocity this entity can hit.
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

    // Update location info with velocity if it doesn't collide with a block
    if (this.velocity.y < 0) {
      if (this.checkBottom(world.blocks)) {
        this.location.y = Math.round((this.location.y) / CELL) * CELL;
      }
      else {
        this.location.y += this.velocity.y;
      }
    }
    else if (this.velocity.y > 0) {
      if (!this.checkTop(world.blocks)) {
        this.location.y += this.velocity.y;
      }
    }

    const horizontalVelocity = this.velocity.x;
    if (horizontalVelocity != 0) {
      const direction = horizontalVelocity > 0 ? 'right' : 'left';
      if (this.checkSide(world.blocks, direction)) {
        this.location.x = Math.round((this.location.x) / CELL) * CELL;
      }
      else {
        this.location.x += this.velocity.x;
      }
    }

    // Reset acceleration
    this.acceleration = new Vector2(0, 0);
  }
}
