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

class Triangle {
  constructor({x,y}) {
    this.pos = new Vector2(x,y);
  }
}

class Rectangle {
  constructor({x,y},width,height, rotation = 0, color = '#ff6565') {
    this._pos = new Vector2(x,y);
    this._width = width;
    this._height = height;
    this._rotation = rotation;
    this.color = color;
    // for later with boundary box
    this._corners = this.calcCorners();
    this._maxCollDist = this.corners.map(c => {
      return distance(c,this.pos);
    }).sort((a,b) => {
      return b-a;
    })[0];
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

  get corners() {
    return this._corners;
  }

  set pos(pos) {
    this._pos = pos;
    this._corners = this.calcCorners();
  }

  set posX(x) {
    this._pos.x = x;
    this._corners = this.calcCorners();
  }

  set posY(y) {
    this._pos.y = y;
    this._corners = this.calcCorners();
  }

  get pos() {
    return this._pos;
  }

  set width(width) {
    this._width = width;
    this._corners = this.calcCorners();
    this._maxCollDist = this.corners.map(c => {
      return distance(c,this.pos);
    }).sort((a,b) => {
      return b-a;
    })[0];
  }

  get width() {
    return this._width;
  }

  set height(height) {
    this._height = height;
    this._corners = this.calcCorners();
    this._maxCollDist = this.corners.map(c => {
      return distance(c,this.pos);
    }).sort((a,b) => {
      return b-a;
    })[0];
  }

  get height() {
    return this._height;
  }

  set rotation(rotation) {
    this._rotation = rotation;
    this._corners = this.calcCorners();
  }

  get rotation() {
    return this._rotation;
  }

  get maxCollDist() {
    return this._maxCollDist;
  }

}

class Player extends Rectangle {
  constructor({x,y},width,height) {
    super({x:x,y:y},width,height);
    this.a = 0;
    this.jump = false;
    this.direction = new Vector2(0,0);
    this.oldPos = new Vector2(0,0);
  }

  update() {
    // 37 - LEFT
    // 38 - UP
    // 39 - RIGHT
    // 40 - DOWN
    let speed = 5;
    let x = 0,y = 0;
    if(this.input.keyState[37]) {
      // this.posX = this.pos.x - speed;
      x = -1;
    }
    if(this.input.keyState[39]) {
      // this.posX = this.pos.x + speed;
      x = 1;
    }
    if(this.input.keyState[38]) {
      // this.posY = this.pos.y - speed;
      y = -1;
    }
    if(this.input.keyState[40]) {
      // this.posY = this.pos.y + speed;
      y = 1;
    }
    if(this.input.keyState[37] && this.input.keyState[38]) {
      x = -1;
      y = -1;
    }
    if(this.input.keyState[37] && this.input.keyState[40]) {
      x = -1;
      y =  1;
    }
    if(this.input.keyState[39] && this.input.keyState[38]) {
      x =  1;
      y = -1;
    }
    if(this.input.keyState[39] && this.input.keyState[40]) {
      x = 1;
      y = 1;
    }

    this.oldPos.x = this.pos.x;
    this.oldPos.y = this.pos.y;
    this.direction.x = x;
    this.direction.y = y;
    this.posX = this.pos.x + this.direction.x * speed;
    this.posY = this.pos.y + this.direction.y * speed;
  }

  applyForce() {

  }
}
