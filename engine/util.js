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
    if (mag === 0) return;
    return this.update(Vector2.Divide(this, mag));
  }

  /**
   * Prevent this vectors components from going beyond the given cap.
   * @param {number} cap
   * @return {Vector2} - Capped version of this Vector.
   */
  limit(cap) {
    this.x = Math.min(this.x, cap);
    this.y = Math.min(this.y, cap);
    return this;
  }
}


// http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
