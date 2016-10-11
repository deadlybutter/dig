const GRAVITY = new Vector2(0, -2);

class World {
  /**
   * Create a world.
   * A world represents all entities in the game.
   * @param {number} width - Width of the world.
   * @param {number} height - Height of the world.
   * @param {Player} mainPlayer - Player being controlled in this instance.
   * @param {NetworkInterface} socket
   * @param {bool} host - Is this player hosting the game?
   */
  constructor(width, height, mainPlayer, socket, host) {
    this.blocks = [];

    this.entities = {};

    this.width = width;
    this.height = height;

    this.mainPlayerUUID = mainPlayer.uuid;
    this.entities[this.mainPlayerUUID] = mainPlayer;

    this.socket = socket;
    this.host = host;

    this.addEntity = this.addEntity.bind(this);
    this.addEntityByType = this.addEntityByType.bind(this);
    this.update = this.update.bind(this);
    this.getMainPlayer = this.getMainPlayer.bind(this);
    this.pushChangedEntityLocation = this.pushChangedEntityLocation.bind(this);
    this.fixPlayerHeight = this.fixPlayerHeight.bind(this);

    this.socket.broadcast(EVENT_ENTITY_ADD, {uuid: mainPlayer.uuid, type: mainPlayer.toString()});

    this.subscribeToWorldEvents = this.subscribeToWorldEvents.bind(this);
    this.subscribeToWorldEvents();

    if (this.host) {
      this.subscribeToHostEvents = this.subscribeToHostEvents.bind(this);
      this.subscribeToHostEvents();
    }
  }

  subscribeToWorldEvents() {
    this.socket.subscribe(EVENT_MAP_RECIEVE, data => {
      if (!data.blocks) return;
      for (var x = 0; x < data.blocks.length; x += CELL) {
        if (!this.blocks[x]) {
          this.blocks[x] = [];
        }
        for (var y = 0; y < data.blocks[x].length; y += CELL) {
          const block = data.blocks[x][y];
          if (block == null) continue;

          const location = new Vector2(x, y);
          this.blocks[x][y] = new Block(location, block.texture, block.friction);
        }
      }

      this.fixPlayerHeight();
    });

    this.socket.subscribe(EVENT_ENTITY_LOCATION_CHANGE, data => {
      if (!data.uuid || !data.location || !this.entities[data.uuid]) return;
      this.entities[data.uuid].location = new Vector2(data.location.x, data.location.y);
    });

    this.socket.subscribe(EVENT_ENTITY_ADD, data => {
      if (!data.type) return;
      this.addEntityByType(data.type, data.uuid);
    });
  }

  subscribeToHostEvents() {
    this.socket.subscribe(EVENT_CLIENT_JOIN, data => {
      // Send the current map
      this.socket.send(EVENT_MAP_RECIEVE, {blocks: this.blocks}, data._headers.from);

      // Send the current entities
      Object.keys(this.entities).forEach(uuid => {
        this.socket.send(EVENT_ENTITY_ADD, {type: this.entities[uuid].toString(), uuid: uuid}, data._headers.from);
      });
    });
  }

  /**
   * Put the current player on the top of the map.
   */
  fixPlayerHeight() {
    this.getMainPlayer().location.y = this.height + CELL;
  }

  /**
   * Add an entity to the world by it's type & assign UUID.
   * @param {string} type
   * @param {string} uuid
   */
  addEntityByType(type, uuid) {
    let entity = undefined;
    switch (type) {
      case PLAYER_TEST_NAME: entity = new TestPlayer();
    }

    if (entity) {
      entity.uuid = uuid;
      this.addEntity(entity);
    }
  }

  /**
   * Add an entity to the world.
   * @param {Entity} entity
   */
  addEntity(entity) {
    this.entities[entity.uuid] = entity;
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

  /**
   * Send a newly modified entity location.
   * @param {Vector2} location
   */
  pushChangedEntityLocation(entity) {
    this.socket.broadcast(EVENT_ENTITY_LOCATION_CHANGE, {uuid: entity.uuid, location: entity.location});
  }

  /**
   * Get the main player of this world.
   * The main player being whomever is controlling this instance of the game.
   * @return {PhysicsEntity}
   */
  getMainPlayer() {
    return this.entities[this.mainPlayerUUID];
  }

  /**
   * Runs common updates on the given entity.
   * @param {Entity} entity
   */
  updateEntity(entity) {
    const originalLocation = entity.location.copy();

    if (entity instanceof PhysicsEntity) { // TODO: Check its not a particle.
      this.applyWorldForces(entity);
    }

    entity.update(this);
    entity._privateUpdate(this);

    if (entity.location.x != originalLocation.x || entity.location.y != originalLocation.y) {
      this.pushChangedEntityLocation(entity);
    }
  }

  /**
   * Calls for updates on all entities this world instance is responsible for.
   */
  update() {
    if (this.host) {
      Object.keys(this.entities).forEach(uuid => {
        this.updateEntity(this.entities[uuid]);
      });
    }
    else {
      this.updateEntity(this.getMainPlayer());
    }
  }
}
