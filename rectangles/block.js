class Block {
  constructor(x, y, l, b, r, s) {
    this.x = x;
    this.y = y;
    this.l = l || rand(500);
    this.b = b || rand(400);
    this.r = r || rand(10);
    this.isPlaced = false;

    let { red, green, blue } = {
      red: rand(255),
      green: rand(255),
      blue: rand(255)
    };

    let wt = 3; //rand((this.l + this.w) % 5);

    this.place = () => {
      this.isPlaced = true;
      //checks for any intersections
      blocks.forEach(block => {
        if (checkIntersection(this, block)) {
          gameOver = true;
        }
      });
    };

    this.draw = () => {
      stroke(red, green, blue);
      strokeWeight(wt);
      noFill();
      rect(this.x, this.y, this.l, this.b, this.r);
    };

    this.move = (newX, newY) => {
      this.x = newX;
      this.y = newY;
    };
  }
}
