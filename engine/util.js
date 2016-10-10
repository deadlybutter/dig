const CELL = 32;

class Vector2 {
  /**
   * Create a Vector.
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.update = this.update.bind(this);
  }

  /**
   * Add two vectors together.
   * @param {Vector2} vec1
   * @param {Vector2} vec2
   * @return {Vector2}  The sum of both vectors.
   */
  static Add(vec1, vec2) {
    return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  /**
   * Subtracts two vectors.
   * @param {Vector2} vec1
   * @param {Vector2} vec2
   * @return {Vector2}  The difference of both vectors.
   */
  static Sub(vec1, vec2) {
    return new Vector2(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  /**
   * Scales a vector by a scalar.
   * @param {Vector2} vec
   * @param {number} scalar
   * @return {Vector2}  The vector scaled.
   */
  static Scale(vec, scalar) {
    return new Vector2(vec.x * scalar, vec.y * scalar);
  }

  /**
   * Divides a vector by a divisor.
   * @param {Vector2} vec
   * @param {number} divisor
   * @return {Vector2}  The vector divded.
   */
  static Divide(vec, divisor) {
    return new Vector2(vec.x / divisor, vec.y / divisor);
  }

  /**
   * Update the x & y components of this vector.
   * @param {Vector2} newVector
   * @return {Vector2} - updated version of this Vector.
   */
  update(newVector) {
    this.x = newVector.x;
    this.y = newVector.y;
    return this;
  }

  /**
   * Add the given vector with this one.
   * @param {Vector2} vec
   * @return {Vector2} - updated version of this Vector.
   */
  add(vec) {
    return this.update(Vector2.Add(this, vec));
  }

  /**
   * Subtract the given vector with this one.
   * @param {Vector2} vec
   * @return {Vector2} - updated version of this Vector.
   */
  sub(vec) {
    return this.update(Vector2.Sub(this, vec));
  }

  /**
   * Scale this vector with the given scalar.
   * @param {number} scalar
   * @return {Vector2} - updated version of this Vector.
   */
  scale(scalar) {
    return this.update(Vector2.Scale(this, scalar));
  }

  /**
   * Divide this vector with the given divisor.
   * @param {number} divisor
   * @return {Vector2} - updated version of this Vector.
   */
  divide(divisor) {
    return this.update(Vector2.Divide(this, divisor));
  }

  /**
   * Get the magnitude of this vector
   * @return {number} - magnitude of this Vector.
   */
  magnitude() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  /**
   * Normalize this vector.
   * @return {Vector2} - normalized version of this Vector.
   */
  normalize() {
    const mag = this.magnitude();
    if (mag === 0) return this;
    return this.update(Vector2.Divide(this, mag));
  }

  /**
   * Prevent this vectors components from going beyond the given cap.
   * @param {number} cap
   * @return {Vector2} - Capped version of this Vector.
   */
  limit(cap) {
    (this.x > 0) ? this.x = Math.min(this.x, cap) : this.x = Math.max(this.x, -cap);
    (this.y > 0) ? this.y = Math.min(this.y, cap) : this.y = Math.max(this.y, -cap);
    return this;
  }

  limitByVector(vec) {
    (this.x > 0) ? this.x = Math.min(this.x, vec.x) : this.x = Math.max(this.x, -vec.x);
    (this.y > 0) ? this.y = Math.min(this.y, vec.y) : this.y = Math.max(this.y, -vec.y);
    return this;
  }

  /**
   * Return a copy of this vector.
   * @return {Vector2} vector
   */
  copy() {
    return new Vector2(this.x, this.y);
  }
}

class BoundingBox {
  /**
   * Create a new bounding box.
   * @param {Vector2} location
   * @param {Vector2} dimensions
   */
  constructor(location, dimensions) {
    this.location = location;
    this.dimensions = dimensions;
  }

  /**
   * Check if this bounding box intersects with the given blocks.
   * @param {array} blocks
   * @return {bool} intersects
   */
  intersects(blocks) {
    for (var x = Math.round((this.location.x - (CELL / 2)) / CELL) * CELL; x < this.location.x + this.dimensions.x; x += CELL) {
      if (blocks[x] == undefined) {
        continue;
      }

      for (var y = Math.round((this.location.y) / CELL) * CELL; y > this.location.y - this.dimensions.y; y -= CELL) {
        if (blocks[x][y] != undefined) {
          return true;
        }
      }
    }

    return false;
  }
}

// http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
