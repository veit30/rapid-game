class InputHandler {
  constructor() {
    this.mouseEvents = [];
    this.keyEvents = [];
    this.keyState = {};
    this.createEventListeners();
  }

  createEventListeners() {
    window.addEventListener('mousemove', e => {
      for(let f of this.mouseEvents) {
        f(e);
      }
    });

    window.addEventListener('keydown', e => {
      this.keyState[e.keyCode || e.which] = true;
      e.preventDefault();
    });

    window.addEventListener('keyup', e => {
      this.keyState[e.keyCode || e.which] = false;
      // for(let f of this.keyEvents) {
      //   f(e);
      // }
      e.preventDefault();
    })
  }

  bindOnMouseMove(callback) {
    this.mouseEvents.push(callback);
  }

  bindOnKeyEvent(callback) {
    this.keyEvents.push(callback);
  }

}
