class Circle {
  constructor({x,y},radius, color = '#ff6565') {
    this.pos = new Vector2(x,y);
    this.radius = radius;
    this.color = color;
    // for later with boundary box
    this.collision = true;
    this.axes = [];
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
  
  get collisionRadius() {
    let l =  new Line(this.calcCorners()[0],this.pos);
    return l.length;
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
    let axes = this.calcAxes();

    this.ctx.save();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#ff0000';
    this.ctx.beginPath();
    this.ctx.moveTo(axes[0].start.x,axes[0].start.y);
    this.ctx.lineTo(axes[0].end.x,axes[0].end.y);
    this.ctx.stroke();
    this.ctx.strokeStyle = '#0000ff';
    this.ctx.beginPath();
    this.ctx.moveTo(axes[1].start.x,axes[1].start.y);
    this.ctx.lineTo(axes[1].end.x,axes[1].end.y);
    this.ctx.stroke();
    this.ctx.restore();

    let corners = this.calcCorners();

    this.ctx.save();
    this.ctx.fillStyle = '#00ff00';
    corners.forEach(c => {
      this.ctx.fillRect(c.x - 1, c.y - 1, 2, 2);
    })
    this.ctx.restore();


  }

  update() {


  }

  //only recalc, when rotation changes for object
  calcAxes() {
    let endPoints = [
      new Vector2(this.pos.x + this.width * 0.5, this.pos.y),
      new Vector2(this.pos.x,this.pos.y + this.height * 0.5)
    ]
    return endPoints.map(p => {
      return new Line(this.pos,p.rotateTo(this.pos,this.rotation))
    });
  }

  calcCorners() {
    // reihenfolge ist wichtig
    let corners = [
      new Vector2(this.pos.x - this.width * .5, this.pos.y - this.height * .5),
      new Vector2(this.pos.x + this.width * .5, this.pos.y - this.height * .5),
      new Vector2(this.pos.x + this.width * .5, this.pos.y + this.height * .5),
      new Vector2(this.pos.x - this.width * .5, this.pos.y + this.height * .5),
    ]
    let cornersRotated = corners.map(c => c.rotateTo(this.pos,this.rotation));
    return cornersRotated;
  }

  calcBounds() {
    let corners = this.calcCorners();
    let lastCorner;
    let bounds = [];
    for(let corner of corners) {
      if(!lastCorner) {
        lastCorner = corner;
        continue;
      } else {
        bounds.push(new Line(lastCorner,corner));
        lastCorner = corner;
      }
    }
    bounds.push(new Line(lastCorner,corners[0]));
    return bounds;
  }

  calcBoundsWithMaxLenght() {

  }
}

class Player extends Rectangle {
  constructor({x,y},width,height) {
    super({x:x,y:y},width,height);
    this.a = 0;
    this.jump = false;
  }

  update() {
    // 37 - LEFT
    // 38 - UP
    // 39 - RIGHT
    // 40 - DOWN
    let speed = 5;

    if(this.input.keyState[37]) {
      this.pos.x -= speed;
    }
    if(this.input.keyState[39]) {
      this.pos.x += speed;
    }
    if(this.input.keyState[38]) {
      this.pos.y -= speed;
    }
    if(this.input.keyState[40]) {
      this.pos.y += speed;
    }

  }

  applyForce() {

  }
}
