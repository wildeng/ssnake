var gameArea = document.getElementById('gameArea');
var gameContext = gameArea.getContext("2d");

var grid = 16;
var counter = 0;


var foodPosition = {
  x: 0,
  y: 0
}

var score = {
  food: 0,
}
var snake = {

  x: 160,
  y: 160,

  speedX: grid,
  speedY: 0,

  cells: [],

  maxCells: 4
}

function generateFoodPosition(){
  let max = (400/grid) + 1;
  let may = (400/grid) + 1;
  foodPosition.x = grid * (Math.floor(Math.random() * max));
  foodPosition.y = grid * (Math.floor(Math.random() * may));
  if (foodPosition.x >= 400 || foodPosition.y >= 400) {
    generateFoodPosition()
  }
}

function drawFood() {
  gameContext.fillStyle = 'red';
  gameContext.fillRect(foodPosition.x, foodPosition.y, grid-1, grid-1);
}

function gameLoop(){
  requestAnimationFrame(gameLoop);

  if(++counter < 8){
    return;
  }
  counter = 0;
  gameContext.clearRect(0, 0, gameArea.width, gameArea.height);

  snake.x += snake.speedX;
  snake.y += snake.speedY;

  if (foodPosition.x == 0 && foodPosition.y == 0) {
    generateFoodPosition();
    drawFood();
  } else {
    drawFood();
  }

  if (snake.x == foodPosition.x && snake.y == foodPosition.y) {
    snake.maxCells++;
    score.food++;
    console.log(foodPosition);
    foodPosition.x = 0;
    foodPosition.y = 0;
  }
  snake.cells.unshift({x: snake.x, y: snake.y});

  if(snake.cells.length > snake.maxCells){
    snake.cells.pop();
  }

  if(snake.x > gameArea.width){
    snake.x = 0;
  }

  if(snake.x < 0){
    snake.x = gameArea.width;
  }

  if(snake.y > gameArea.height){
    snake.y = 0;
  }

  if(snake.y < 0){
    snake.y = gameArea.height;
  }

  gameContext.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    gameContext.fillRect(cell.x, cell.y, grid-1, grid-1);
  });
}

window.addEventListener('keydown', function(e){
  gameArea.key = e.key;

  switch(e.key) {
    case 'ArrowLeft':
      if(snake.speedX === 0){
        snake.speedX = -grid;
        snake.speedY = 0;
      }
      break;
    case 'ArrowUp':
      if(snake.speedY === 0){
        snake.speedX = 0;
        snake.speedY = -grid;
      }
      break;
    case 'ArrowRight':
      if(snake.speedX === 0){
        snake.speedX = grid;
        snake.speedY = 0;
      }
      break;
    case 'ArrowDown':
      if(snake.speedY === 0){
        snake.speedX = 0;
        snake.speedY = grid;
      }
      break;
  }
});
// requestAnimationFrame(gameLoop);

gameLoop()
