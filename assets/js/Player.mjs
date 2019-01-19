export default class {
  constructor({x,y},width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.collision = true;
    this.a = 0;
    this.jump = false;
  }

  render() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x-this.width*.5,this.y-this.height*.5,this.width,this.height);
    this.ctx.restore();
  }

  update() {
    // 37 - LEFT
    // 38 - UP
    // 39 - RIGHT
    // 40 - DOWN
    if(this.input.keyState[37]) {
      this.x -= 1;
    }
    if(this.input.keyState[39]) {
      this.x += 1;
    }
    if(this.input.keyState[38]) {
      this.y -= 1;
    }
    if(this.input.keyState[40]) {
      this.y += 1;
    }
  }

  applyForce() {

  }
}
