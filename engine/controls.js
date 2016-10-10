const KEY_JUMP = 32;
const KEY_LEFT = 65;
const KEY_RIGHT = 68;

class KeyboardControls {
  /**
   * Create a new Keyboard Control handler.
   * @param {Entity} entity - Entity to control.
   */
  constructor(entity) {
    this.entity = entity;

    this.handleKeyDown = this.handleKeyDown.bind(this);

    window.onkeydown = this.handleKeyDown;
  }

  handleKeyDown(e) {
    e.preventDefault();
    const code = e.keyCode ? e.keyCode : e.which;

    switch (code) {
      case KEY_JUMP: this.entity.addForce(this.entity.jumpSpeed); break;
      case KEY_LEFT: this.entity.addForce(Vector2.Scale(this.entity.moveSpeed, -1)); break;
      case KEY_RIGHT: this.entity.addForce(this.entity.moveSpeed); break;
    }
  }
}
