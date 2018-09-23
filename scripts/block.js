class Block {
  constructor(x, y, w, h, shouldFill, r) {
    this.x = x;
    this.y = y;
    this.w = w || rand(500);
    this.h = h || rand(400);
    this.r = r || 0;
    this.left = x;
    this.top = y;
    this.right = x + w;
    this.bottom = y + h;
    this.isPlaced = false;
    this.shouldFill = shouldFill;
    this.area = this.w * this.h;
    this.r = 0;
    let { red, green, blue } = {
      red: rand(255),
      green: rand(255),
      blue: rand(255)
    };

    let wt = 3; //rand((this.l + this.w) % 5);

    this.place = () => {
      let res = false;
      //checks for any intersections
      blocks.forEach(block => {
        if (checkIntersection(this, block) && !gameOver) {
          gameOver = true;
          res = false;
          totalIntersections++;
          console.log(`Intersections : ${totalIntersections}`);
        }
      });
      this.isPlaced = true;
      res = true;
      !gameOver && score++;
      updateScoreAndLives();
      return res;
    };

    this.draw = () => {
      if (this.shouldFill) {
        fill(red, green, blue);
        strokeWeight(wt);
        stroke(255, 0, 0);
        rect(this.x, this.y, this.w, this.h, this.r);
      } else {
        stroke(red, green, blue);
        strokeWeight(wt);
        noFill();
        rect(this.x, this.y, this.w, this.h, this.r);
      }
    };

    this.move = (newX, newY) => {
      this.x = newX;
      this.y = newY;
    };
  }
}
