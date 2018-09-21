//global variables

var blocks = [];
var currentBlock;

//p5 setup
function setup() {
  var canvas = createCanvas(800, 500);
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
}

//event functions
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
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
  if (keyCode == ESCAPE) {
    blocks.pop();
    currentBlock = undefined;
  }
}

//functions for dom
function resetButtonClicked() {
  blocks = [];
}

//helper functions
var rand = function(end) {
  return Math.floor(Math.random() * end);
};
