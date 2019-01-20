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
}

class Line {
  constructor(s,e) {
    if(s.x === e.x) {
      this.start = s.y >= e.y ? s : e;
      this.end = e.y <= s.y ? e : s;
    } else {
      this.start = s.x <= e.x ? s : e;
      this.end = e.x >= s.x ? e : s;
    }
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
}
