//global variables

var blocks = [];
var currentBlock;
var score = 0;
var lives = 3;
var modalIsOpen = false;
var gameOver = true;
//p5 setup
function setup() {
  var canvas = createCanvas(850, 550);
  canvas.parent("sketchContainer");
  frameRate(60);
}
//p5 draw
function draw() {
  background(2);
  blocks.forEach(block => {
    block.draw();
    !block.isPlaced && block.move(mouseX, mouseY);
    // block.fall();
  });
  if (lives === 0) {
    alert(`Game over! Your score : ${score}. Don't let it stop you! `);
    lives = 3;
    resetButtonClicked();
  }
}

//event functions
function mousePressed() {
  if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height &&
    lives >= 0 &&
    !modalIsOpen
  ) {
    if (!currentBlock) {
      currentBlock = new Block(mouseX, mouseY);
      blocks.push(currentBlock);
    } else {
      currentBlock.place();
      currentBlock = undefined;
    }
  }
}

function keyPressed() {
  if (modalIsOpen && keyCode == ESCAPE) {
    modalIsOpen = false;
    return;
  }
  if (keyCode == ESCAPE && currentBlock !== undefined) {
    blocks.pop();
    currentBlock = undefined;
    lives--;
  }
}

//functions for dom
function resetButtonClicked() {
  blocks = [];
}

function infoButtonClicked() {
  // alert("Information about game!");
  if (!document.getElementById("modal").classList.contains("show")) {
    document.getElementById("modal").classList.add("show");
    modalIsOpen = true;
  }
}

function modalOkayClicked() {
  document.getElementById("modal").classList.remove("show");
  modalIsOpen = false;
}

//helper functions
var rand = function(end) {
  return Math.floor(Math.random() * end);
};

var linesIntersect = function(x1, y1, x2, y2, x3, y3, x4, y4) {
  // calculate the distance to intersection point
  let uA =
    ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  let uB =
    ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    // optionally, draw a circle where the lines meet
    let intersectionX = x1 + uA * (x2 - x1);
    let intersectionY = y1 + uA * (y2 - y1);
    fill(255, 0, 0);
    noStroke();
    ellipse(intersectionX, intersectionY, 20, 20);
    return true;
  }
  return false;
};

//the only thing you figure out in the morning
var checkIntersection = function(b1, b2) {
  let ans = [];
  ans.push(
    linesIntersect(b1.x, b1.y, b1.x + b1.w, y2, b2.x, b2.y, b2.x, b2.y + b2.h)
  );
  ans.push(
    linesIntersect(b1.x, b1.y, b1.x, y2 + b1.h, b2.x, b2.y, b2.x, b2.y + b2.h)
  );
  ans.push(
    linesIntersect(
      b1.x + b1.w,
      b1.y,
      b1.x + b1.w,
      y2,
      b2.x,
      b2.y,
      b2.x,
      b2.y + b2.h
    )
  );
  ans.push(
    linesIntersect(b1.x, b1.y, b1.x + b1.w, y2, b2.x, b2.y, b2.x, b2.y + b2.h)
  );
  ans.push(
    linesIntersect(b1.x, b1.y, b1.x + b1.w, y2, b2.x, b2.y, b2.x, b2.y + b2.h)
  );
  ans.push(
    linesIntersect(b1.x, b1.y, b1.x + b1.w, y2, b2.x, b2.y, b2.x, b2.y + b2.h)
  );
};
