//global variables
var totalIntersections = 0;
var blocks = [];
var currentBlock;
var score = 0;
var lives = 3;
var modalIsOpen = false;
var gameOver = false;
//p5 setup
function setup() {
  var canvas = createCanvas(850, 550);
  canvas.parent("sketchContainer");
  updateScoreAndLives();
  frameRate(60);
}
//p5 draw
function draw() {
  background(2);
  gameOver && showGameOver();
  blocks.forEach(block => {
    block.draw();
    // block.fall();
  });
  if (currentBlock) {
    currentBlock.draw();
    currentBlock.move(mouseX, mouseY);
  }
  if (lives < 0) {
    gameOver = true;
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
    } else {
      currentBlock.place() && blocks.push(currentBlock);
      currentBlock = undefined;
    }
  }
}

function keyPressed() {
  if (modalIsOpen && keyCode == ESCAPE) {
    modalIsOpen = false;
    return;
  }
  if (keyCode == ESCAPE && currentBlock !== undefined && lives >= 0) {
    currentBlock = undefined;
    lives--;
    updateScoreAndLives();
  }
}

//functions for dom
function resetButtonClicked() {
  blocks = [];
  gameOver = false;
  score = 0;
  lives = 3;
  intersects = 0;
  updateScoreAndLives();
}

function showGameOver() {
  document.getElementById("score").innerHTML = score;
  document.getElementById("gameOver").classList.add("show");
  modalIsOpen = true;
}

function infoButtonClicked() {
  // alert("Information about game!");
  if (!document.getElementById("help").classList.contains("show")) {
    document.getElementById("help").classList.add("show");
    modalIsOpen = true;
  }
}

function modalOkayClicked(m) {
  document.getElementById(m).classList.remove("show");
  resetButtonClicked();
  modalIsOpen = false;
}

function updateScoreAndLives() {
  document.getElementById("mainScore").innerHTML = score;
  document.getElementById("lives").innerHTML = lives;
}

//helper functions
var rand = function(end) {
  return Math.floor(Math.random() * end);
};

//the only thing you figure out in the morning -- figured out at around 12:44 pm
function checkIntersection(r1, r2) {
  console.log(`checking instersetions`);
  let intersects = !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
  if (!intersects) {
    console.log(intersects);
    return false;
  }

  let leftX = Math.max(r1.x, r2.x);
  let rightX = Math.min(r1.x + r1.w, r2.x + r2.w);
  let topY = Math.max(r1.y, r2.y);
  let bottomY = Math.min(r1.y + r1.h, r2.y + r2.h);

  if (leftX < rightX && topY < bottomY) {
    rect4 = new Block(leftX, topY, rightX - leftX, bottomY - topY, true);
    let a1 = r1.area;
    let a2 = r2.area;
    let a3 = rect4.area;
    if (a1 == a2) return true;
    return !(a3 >= a2 || a3 >= a1);
  } else {
    intersects = false;
    return intersects;
    // Rectangles do not overlap, or overlap has an area of zero (edge/corner overlap)
  }
  console.log(intersects);
  return intersects;
}
