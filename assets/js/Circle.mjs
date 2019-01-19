export default class {
  constructor({x,y},radius, color = '#ff6565') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    // for later with boundary box
    this.collision = true;
  }

  render() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,2,0,Math.PI*2);
    this.ctx.fill();
    this.ctx.restore();
  }
}
