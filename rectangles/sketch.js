//global variables

var blocks = [];
var currentBlock;
var score = 0;
var lives = 3;
var modalIsOpen = false;
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
