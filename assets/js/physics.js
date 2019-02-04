class CollisionDetector {

  checkCollision(a,b) {

    let oldPos = new Vector2(a.oldPos.x,a.oldPos.y);
    let actPos = new Vector2(a.pos.x,a.pos.y);
    let d1 = this.collisionMult(a,b,oldPos,actPos);
    let d2 = this.collisionMult(b,a,actPos,oldPos);
    let d = d1 ? (d2 ? (d1 <= d2 ? d1 : d2) : d1) : d2;
    if(d < 0 && d >= -1) {
      console.log("resolving");
      this.resolveCollision(a,b,d,oldPos,actPos);
    }
    // return this.testCollision(a,b) || this.testCollision(b,a)
  }

  testCollision(a,b) {
    let corner,lines,code;
    if(b.constructor.name === 'Circle') {
      for(corner of a.corners) {
        if(distance(corner,b.pos) <= b.radius) {
          return true;
        }
      }
      return false;
    }
    // check the same for the other object!
    for(corner of a.corners) {
      if(distance(corner,b.pos) > b.maxCollDist) {
        continue;
      }

      lines = b.corners.map(c => {
        return new Line(corner,c);
      });

      if(b.rotation !== 0) {
        lines = lines.map(l => {
          l.end = l.end.rotateTo(l.start,-b.rotation);
          return l;
        })
      }

      code = lines.map(l => {
        return l.translateStartTo(new Vector2(0,0));
      }).map(l => {
        l.end.x = l.end.x !== 0 ? l.end.x / Math.abs(l.end.x) : 0;
        l.end.y = l.end.y !== 0 ? l.end.y / Math.abs(l.end.y) : 0;
        return l.end.x + l.end.y;
      }).sort((a,b) => {return a-b}).reduce((ac,e) => {
        return ac + e;
      },"");
      if(['-2002','-2-1-10','-2-101','-1001','-1012','0112'].includes(code)) {
        return true;
      }
    }
    return false;
  }

  resolveCollision(a,b,d,p1,p2) {
    d = (d + 1);
    let oldPosA = p1;
    let newPosA = p2;
    let dir = Vector2.between(oldPosA,newPosA);
    let xoff = d * dir.x;
    let yoff = d * dir.y;
    a.posX = dir.x < 0 ? Math.ceil(p1.x + xoff) : Math.floor(p1.x + xoff);
    a.posY = dir.y < 0 ? Math.ceil(p1.y + yoff) : Math.floor(p1.y + yoff);
    a.oldPos.x = a.pos.x;
    a.oldPos.y = a.pos.y;
  }

  resolveCollision2(a,b) {
    // a need to be the player

    // a.pos = new Vector2(a.oldPos.x,a.oldPos.y);
    let oldPosA = a.oldPos;
    let newPosA = a.pos;
    let cornersA = a.corners;
    let cornersB = b.corners;

    cornersA = cornersA.map(c => {
      return c.rotateTo(b.pos,-b.rotation);
    })

    cornersB = cornersB.map(c => {
      return c.rotateTo(b.pos,-b.rotation);
    })
    let xmin = b.pos.x - b.width * .5;
    let xmax = b.pos.x + b.width * .5;
    let ymin = b.pos.y - b.height * .5;
    let ymax = b.pos.y + b.height * .5;
    // debugger;
    let oldPosARotated = oldPosA.rotateTo(b.pos,-b.rotation);
    let newPosARotated = newPosA.rotateTo(b.pos,-b.rotation);
    // richtungsvektor bestimmen aus zwei punkten
    let dir = Vector2.between(oldPosARotated,newPosARotated);


    let distMult = [];
    for(let ca of cornersA) {
      // kollisionen sind hier, wenn
      for(let cb of cornersB) {
        let m1 = (cb.x - ca.x)/dir.x;
        let m2 = (cb.y - ca.y)/dir.y;
        // für beide ms prüfen, ob sich der punkt dann im körper befindet
        let p1 = new Vector2(ca.x+dir.x*m1,ca.y+dir.y*m1);
        let p2 = new Vector2(ca.x+dir.x*m2,ca.y+dir.y*m2);
        if(p1.x >= xmin && p1.x <= xmax && p1.y >= ymin && p1.y <= ymax) {
          distMult.push(m1);
        }
        if(p2.x >= xmin && p2.x <= xmax && p2.y >= ymin && p2.y <= ymax) {
          distMult.push(m2);
        }

      }
    }
    // debugger;
    let finalDist = distMult.sort((a,b) => {
      return a - b;
    }).shift();
    let direction = Vector2.between(oldPosA,newPosA);
    a.posX = a.oldPos.x + (finalDist - 0.01) * direction.x;
    a.posY = a.oldPos.y + (finalDist - 0.01) * direction.y;
    // debugger;
    // berechne die distanz, die benötigt wird, bis der eine körper den andeern körper berührt
    // checke dafür, wann ein corner innerhalb eines anderen körpers ist
    // sortiere nach der kürzesten distanz, die die corners jeweils zurücklegen mussten
    // mache das gleiche für das andere objekt
    // finde den kleinsten abstand heraus, der zurückgelegt werden muss, damit es zu einer kollision kommt
    //






  }

  collisionMult(a,b,p1,p2) {
    let oldPosA = p1;
    let newPosA = p2;
    let cornersA = a.corners;
    let cornersB = b.corners;

    cornersA = cornersA.map(c => {
      return c.rotateTo(b.pos,-b.rotation);
    })

    cornersB = cornersB.map(c => {
      return c.rotateTo(b.pos,-b.rotation);
    })
    let xmin = b.pos.x - b.width * .5;
    let xmax = b.pos.x + b.width * .5;
    let ymin = b.pos.y - b.height * .5;
    let ymax = b.pos.y + b.height * .5;
    let oldPosARotated = oldPosA.rotateTo(b.pos,-b.rotation);
    let newPosARotated = newPosA.rotateTo(b.pos,-b.rotation);

    let dir = Vector2.between(oldPosARotated,newPosARotated);

    let distMult = [];
    for(let ca of cornersA) {
      for(let cb of cornersB) {
        let m1 = (cb.x - ca.x)/dir.x;
        let m2 = (cb.y - ca.y)/dir.y;
        let p1 = new Vector2(ca.x+dir.x*m1,ca.y+dir.y*m1);
        let p2 = new Vector2(ca.x+dir.x*m2,ca.y+dir.y*m2);
        if(p1.x >= xmin && p1.x <= xmax && p1.y >= ymin && p1.y <= ymax) {
          distMult.push(m1);
        }
        if(p2.x >= xmin && p2.x <= xmax && p2.y >= ymin && p2.y <= ymax) {
          distMult.push(m2);
        }
      }
    }
    return distMult.sort((a,b) => {
      return a - b;
    }).shift();
  }

}
