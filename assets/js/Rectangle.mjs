export default class {
  constructor({x,y},width,height, rotation = 0, color = '#ff6565') {
    this.x = x;
    this.y = y;
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
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x-this.width*.5,this.y-this.height*.5,this.width,this.height);
    this.ctx.restore();
  }

  update() {


  }
}
