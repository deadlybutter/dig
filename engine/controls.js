class KeyboardControls {
  /**
   * Create a new Keyboard Control handler.
   */
  constructor() {
    this.state = {JUMP: false, LEFT: false, RIGHT: false};
    this.keys = {
      32: 'JUMP',
      65: 'LEFT',
      68: 'RIGHT'
    }

    this.handleEvent = this.handleEvent.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;
  }

  /**
   * Handle a keyboard event by matching its binding & updating the state.
   * @param {event} e
   * @param {bool} newValue - Value to update state with.
   */
  handleEvent(e, newValue) {
    e.preventDefault();
    const code = e.keyCode ? e.keyCode : e.which;
    const key = this.keys[code];
    if (key) {
      this.state[key] = newValue;
    }
  }

  handleKeyUp(e) {
    this.handleEvent(e, false);
  }

  handleKeyDown(e) {
    this.handleEvent(e, true);
  }
}
