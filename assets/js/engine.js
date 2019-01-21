const createCanvas = (width,height,id,parent) => {
  width = width || 1200;
  height = height || 800;
  id = id || 'game-canvas';
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
    if(CollisionDetector.isCollision(player,go)) {
      console.log("Collision");
    }
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

const IH = new InputHandler();







// IH.bindOnKeyEvent(e => {
//   console.log(e.keyCode + " " + e.which);
// })
/*
let ground = new Rectangle({x:600,y:760},1200,20);
ground.color = '#775d49';
ground.ctx = ctx;
player = new Player({x:160,y:140},40,60);
player.color = '#5ca1c8';
player.input = IH;
player.ctx = ctx;
let obj1 = new Rectangle({x: 200, y: 200}, 60,60,60,'#718ebc');
obj1.ctx = ctx;
addGameObjects(ground,obj1);
*/
let rec = new Rectangle(new Vector2(600,500),60,70);
rec.ctx = ctx;
let bounds = rec.calcBounds();
let perimeter = bounds.reduce((a,c) => {
  return a += c.length;
},0)
console.log(perimeter);
let rCorners = rec.calcCorners();
let dot = new Circle(new Vector2(610,480),2);
dot.ctx = ctx;
dot.color = '#ffffff';
let wrap = () => {
  clear();
  rec.render();
  dot.render();

  let lines = rCorners.map(e => {
    return new Line(e,dot.pos);
  })
  lines.push(new Line(rec.pos,dot.pos));
  let line;
  let colors = ['#ff0000','#00ff00','#0000ff','#00ffff','#ffff00'];
  let i = 0;
  for(line of lines) {
    line.ctx = ctx;
    line.color = colors[i];
    line.render();
    // console.log(line.length,colors[i],i);
    i++;
  }

  let len = lines.reduce((a,e) => {
    return a += e.length;
  },0);

  console.log('ges. length: ' + len);
}

wrap();

IH.bindOnKeyEvent(e => {
  if(e.keyCode === 37) {
    dot.pos.x -= 1;
  }
  if(e.keyCode === 38) {
    dot.pos.y -= 1;
  }
  if(e.keyCode === 39) {
    dot.pos.x += 1;
  }
  if(e.keyCode === 40) {
    dot.pos.y += 1;
  }

  wrap();

});

//gameLoop();
