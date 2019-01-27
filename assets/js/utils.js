const rotateVector = ({x,y},angle) => {
  angle = calcDeg(angle);
  let x1 = Math.cos(angle)*x - Math.sin(angle)*y;
  let y1 = Math.sin(angle)*x + Math.cos(angle)*y;
  return new Vector2(x1,y1);
}

const calcDeg = angle => {return angle * Math.PI / 180};

const distance = (a,b) => {
  return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2));
}

class Vector2 {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  rotateTo({x,y},angle) {
    let nV = rotateVector({x: this.x-x,y: this.y-y},angle);
    return new Vector2(nV.x + x,nV.y + y);
  }

  get norm() {
    return new Vector2(1/this.length*this.x,1/this.length*this.y);
  }

  get length() {
    return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
  }

  // might be buggy
  get direction() {
    return Math.acos(this.x/this.length) * 360/Math.PI;
  }

  static between(a,b) {
    return new Vector2(b.x - a.x,b.y - a.y);
  }

}

class Line {
  constructor(s,e) {
    this.start = s
    this.end = e
  }

  render() {
    if(!this.ctx) console.log('no rendering context'); return;
    let ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = this.color || '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.start.x,this.start.y);
    ctx.lineTo(this.end.x,this.end.y);
    ctx.stroke();
    ctx.restore();
  }

  translateStartTo(pos) {
    let s = new Vector2(this.start.x-(pos.x+this.start.x),this.start.y-(pos.y+this.start.y))
    let e = new Vector2(this.end.x-(pos.x+this.start.x),this.end.y-(pos.y+this.start.y));
    return new Line(s,e);
  }

  get length() {
    return Math.sqrt(Math.pow(this.end.x-this.start.x,2) + Math.pow(this.end.y-this.start.y,2));
  }

  get slope() {
    return (this.end.y - this.start.y)/(this.end.x - this.start.x);
  }


}
