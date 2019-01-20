class CollisionDetector {

  static isCollision(a,b) {
    let aBounds = a.calcBounds();
    let bBounds = b.calcBounds();

    // look if corners are inside other object
    for(let ab of aBounds) {
      for(let bb of bBounds) {
        if(ab.intersectWith(bb)) {;
          return true;
        }
      }
    }
    return false;
  }
}

class CollisionResolver {
  static resolveCollision() {

  }


}
