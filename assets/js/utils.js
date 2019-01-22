const rotateVector = ({x,y},angle) => {
  angle = calcDeg(angle);
  let x1 = Math.cos(angle)*x - Math.sin(angle)*y;
  let y1 = Math.sin(angle)*x + Math.cos(angle)*y;

  return new Vector2(x1,y1);
}

const calcDeg = (angle) => {return angle * Math.PI / 180};

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
  
  get direction() {
    return Math.acos(this.x/this.length) * 180/Math.PI;
  }
}

class Line {
  constructor(s,e) {
    /*
    if(s.x === e.x) {
      this.start = s.y >= e.y ? s : e;
      this.end = e.y <= s.y ? e : s;
    } else {
      this.start = s.x <= e.x ? s : e;
      this.end = e.x >= s.x ? e : s;
    }
    */
    this.start = s;
    this.end = e;
  }
  // returns true, if the line intersects with another line
  intersectWith(line) {
    let l1s = this.start, l1e = this.end;
    let l2s = line.start, l2e = line.end;
    if(l1s.x > l2s.x && l1e.x < l2e.x) {
      if(l1s.y < l2s.y && l1e.y > l2e.y) {
        //debugger;
        //console.log("collision");
        return true;
      }
    }
    return false;
  }

  render() {
    let ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = this.color || '#ff0000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.start.x,this.start.y);
    ctx.lineTo(this.end.x,this.end.y);
    ctx.stroke();
    ctx.restore();
  }

  get length() {
    return Math.sqrt(Math.pow(this.end.x-this.start.x,2) + Math.pow(this.end.y-this.start.y,2));
  }
  
  translateStartTo(pos) {
    let s = new Vector2(this.start.x-(pos.x+this.start.x),this.start.y-(pos.y+this.start.y))
    let e = new Vector2(this.end.x-(pos.x+this.start.x),this.end.y-(pos.y+this.start.y));
    return new Line(s,e);
  }
  
  


}
