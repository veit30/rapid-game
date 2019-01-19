const rotateVector = ({x,y},angle) => {
  angle = calcDeg(angle);
  let x1 = Math.cos(angle)*x - Math.sin(angle)*y;
  let y1 = Math.sin(angle)*x + Math.cos(angle)*y;
  return {
    x: x1,
    y: y1
  };
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
