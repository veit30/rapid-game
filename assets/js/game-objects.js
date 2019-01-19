class Circle {
  constructor({x,y},radius, color = '#ff6565') {
    this.pos = new Vector2(x,y);
    this.radius = radius;
    this.color = color;
    // for later with boundary box
    this.collision = true;
  }

  render() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x,this.pos.y,2,0,Math.PI*2);
    this.ctx.fill();
    this.ctx.restore();
  }
}

class Rectangle {
  constructor({x,y},width,height, rotation = 0, color = '#ff6565') {
    this.pos = new Vector2(x,y);
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.color = color;
    // for later with boundary box
    this.collision = true;
    this.ctx;
  }

  render() {
    this.ctx.save();
    this.ctx.translate(this.pos.x,this.pos.y);
    this.ctx.rotate(this.rotation * Math.PI / 180);
    this.ctx.translate(-this.pos.x,-this.pos.y);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.pos.x-this.width*.5,this.pos.y-this.height*.5,this.width,this.height);
    this.ctx.restore();

    //render axes
    let axes = this.getAxes();

    this.ctx.save();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#ff0000';
    this.ctx.beginPath();
    this.ctx.moveTo(this.pos.x,this.pos.y);
    this.ctx.lineTo(axes[0][1].x,axes[0][1].y);
    this.ctx.stroke();
    this.ctx.strokeStyle = '#0000ff';
    this.ctx.beginPath();
    this.ctx.moveTo(this.pos.x,this.pos.y);
    this.ctx.lineTo(axes[1][1].x,axes[1][1].y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  update() {


  }

  getAxes() {
    // Rotation defines the angle
    let rot = this.rotation;
    let xa = new Vector2(this.pos.x + this.width * 0.5, this.pos.y);
    let ya = new Vector2(this.pos.x,this.pos.y + this.height * 0.5);
    let a1 = [this.pos,xa.rotateTo(this.pos,rot)];
    let a2 = [this.pos,ya.rotateTo(this.pos,rot)];
    let axes = [];
    axes.push(a1);
    axes.push(a2);
    return axes;
  }



}

class Player {
  constructor({x,y},width,height) {
    this.pos = new Vector2(x,y);
    this.width = width;
    this.height = height;
    this.collision = true;
    this.rotation = 0;
    this.a = 0;
    this.jump = false;
  }

  render() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.pos.x-this.width*.5,this.pos.y-this.height*.5,this.width,this.height);
    this.ctx.restore();

    //render axes
    let axes = this.getAxes();

    this.ctx.save();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#ff0000';
    this.ctx.beginPath();
    this.ctx.moveTo(this.pos.x,this.pos.y);
    this.ctx.lineTo(axes[0][1].x,axes[0][1].y);
    this.ctx.stroke();
    this.ctx.strokeStyle = '#0000ff';
    this.ctx.beginPath();
    this.ctx.moveTo(this.pos.x,this.pos.y);
    this.ctx.lineTo(axes[1][1].x,axes[1][1].y);
    this.ctx.stroke();
    this.ctx.restore();

  }

  update() {
    // 37 - LEFT
    // 38 - UP
    // 39 - RIGHT
    // 40 - DOWN
    if(this.input.keyState[37]) {
      this.pos.x -= 1;
    }
    if(this.input.keyState[39]) {
      this.pos.x += 1;
    }
    if(this.input.keyState[38]) {
      this.pos.y -= 1;
    }
    if(this.input.keyState[40]) {
      this.pos.y += 1;
    }
  }

  getAxes() {
    // Rotation defines the angle
    let rot = -this.rotation;
    let xa = new Vector2(this.pos.x + this.width * 0.5, this.pos.y);
    let ya = new Vector2(this.pos.x,this.pos.y + this.height * 0.5);
    let a1 = [this.pos,xa.rotateTo(this.pos,rot)];
    let a2 = [this.pos,ya.rotateTo(this.pos,rot)];
    let axes = [];
    axes.push(a1);
    axes.push(a2);
    return axes;
  }

  applyForce() {

  }
}
