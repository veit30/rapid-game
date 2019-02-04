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
let player;
let t0 = 0;
let collDetector = new CollisionDetector();

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
  player.render();
}

const update = () => {
  player.update();
  for(let go of gameObjects) {
    go.update();
    collDetector.checkCollision(player,go);
  }
}

const addGameObjects = (...el) => {
  for(let o of el) {
    gameObjects.push(o);
  }
}

const gameLoop = () => {
  clear();
  update();
  render();
  t0 = window.requestAnimationFrame(gameLoop);
}

const IH = new InputHandler();







// IH.bindOnKeyEvent(e => {
//   console.log(e.keyCode + " " + e.which);
// })

let ground = new Rectangle({x:600,y:760},1200,20);
ground.color = '#775d49';
ground.ctx = ctx;
player = new Player({x:100,y:160},40,60);
player.color = '#5ca1c8';
player.input = IH;
player.ctx = ctx;
let obj1 = new Rectangle({x: 200, y: 200}, 60,60,60,'#718ebc');
obj1.ctx = ctx;
addGameObjects(ground);
//IH.bindOnMouseMove(e => {console.log(e.clientX,e.clientY)});

gameLoop();
