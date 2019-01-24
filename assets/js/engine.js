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

let rec = new Rectangle(new Vector2(600,500),60,70,40);
rec.ctx = ctx;
rec.color = '#555';
let corners = rec.corners;
let dot = new Circle(new Vector2(610,480),2);
dot.ctx = ctx;
dot.color = '#ffffff';



let collisioncheck2 = () => {
  clear();
  rec.render();
  dot.render();

  let lines = corners.map(c => {
    return new Line(dot.pos,c);
  })

  for(let line of lines) {
    line.ctx = ctx;
    line.color = '#22f2f1';
    line.render();
  }

  // COLLISION ALGORITHM
  if(rec.rotation !== 0) {
    lines = lines.map(l => {
      l.end = l.end.rotateTo(l.start,-rec.rotation);
      return l;
    })
  }

  let code = lines.map(l => {
    return l.translateStartTo(new Vector2(0,0));
  }).map(l => {
    l.end.x = l.end.x !== 0 ? l.end.x / Math.abs(l.end.x) : 0;
    l.end.y = l.end.y !== 0 ? l.end.y / Math.abs(l.end.y) : 0;
    return l.end.x + l.end.y;
  }).sort((a,b) => {return a-b}).reduce((ac,e) => {
    return ac + e;
  },"");
  if(['-2002','-2-1-10','-2-101','-1001','-1012','0112'].includes(code)) {
    console.log('collision');
  }
}

collisioncheck2();

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

  collisioncheck2();

});

//gameLoop();
