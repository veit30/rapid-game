const createCanvas = (width,height,id,parent) => {
  width = width || 1200;
  height = height || 800;
  id = id || 'canvas-game';
  parent = parent || document.body;

  const canvas = document.createElement('canvas');
  parent.appendChild(canvas);
  canvas.width = width;
  canvas.height = height;
  canvas.id = id;

  const ctx = canvas.getContext('2d');
  return ctx;
}

// GLOBAL STUFF HERE
const ctx = createCanvas();
let bgColor = '#333';
const gameObjects = [];
let t0 = 0;

const clear = () => {
  ctx.save();
  ctx.fillStyle = bgColor;
  ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.restore();
}

const render = () => {
  for(let go of gameObjects) {
    go.render();
  }
}

const update = () => {
  for(let go of gameObjects) {
    go.update();
  }
}

const addGameObjects = (...el) => {
  for(let o of el) {
    gameObjects.push(o);
  }
}

const gameLoop = () => {
  clear();
  render();
  update();
  t0 = window.requestAnimationFrame(gameLoop);
}

class GameObject {
  constructor({x,y}) {
    this.x = x;
    this.y = y;
    this.color = '#ff6565';
    this.collision = true;
    this.mass = 1;
    this.input;
  }

  render() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,2,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  update() {
    // TODO
  }

}

class RectObject extends GameObject {
  constructor({x,y},width,height) {
    super({x,y});
    this.width = width;
    this.height = height;
    this.class = 'rectangle';
    this.collision = true;
  }

  render() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x-this.width*.5,this.y-this.height*.5,this.width,this.height);
    ctx.restore();
  }
}

class CircObject extends GameObject {
  constructor({x,y},radius) {
    super({x,y});
    this.radius = radius;
    this.class = 'circle';
    super.collision = true;
  }
}

class Player extends GameObject {
  constructor({x,y},width,height) {
    super({x,y});
    this.width = width;
    this.height = height;
    this.class = 'player';
    this.collision = true;
    this.a = 0;
    this.jump = false;
  }

  render() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x-this.width*.5,this.y-this.height*.5,this.width,this.height);
    ctx.restore();
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

class InputHandler {
  constructor() {
    this.mouseEvents = [];
    this.keyEvents = [];
    this.keyState = {};
    this.createEventListeners();
  }

  createEventListeners() {
    window.addEventListener('mousemove', e => {
      for(let f of this.mouseEvents) {
        f(e);
      }
    });

    window.addEventListener('keydown', e => {
      this.keyState[e.keyCode || e.which] = true;
      e.preventDefault();
    });

    window.addEventListener('keyup', e => {
      this.keyState[e.keyCode || e.which] = false;
      // for(let f of this.keyEvents) {
      //   f(e);
      // }
      e.preventDefault();
    })
  }

  bindOnMouseMove(callback) {
    this.mouseEvents.push(callback);
  }

  bindOnKeyEvent(callback) {
    this.keyEvents.push(callback);
  }

}
const IH = new InputHandler();
// IH.bindOnKeyEvent(e => {
//   console.log(e.keyCode + " " + e.which);
// })

let ground = new RectObject({x:600,y:760},1200,20);
ground.color = '#775d49'
let player = new Player({x:600,y:600},40,60);
player.color = '#5ca1c8';
player.input = IH;
addGameObjects(ground,player);
//IH.bindOnMouseMove(e => {console.log(e.clientX,e.clientY)});

gameLoop();
