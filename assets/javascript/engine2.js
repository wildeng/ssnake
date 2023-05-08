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
  previous: 0,
}

var snake = {

  x: 160,
  y: 160,

  speedX: grid,
  speedY: 0,

  cells: [],

  maxCells: 4,

  speed: 15,
  minSpeed: 5
}

function generateFoodPosition(){
  let max = (400/grid) + 1;
  let may = (400/grid) + 1;
  foodPosition.x = grid * (Math.floor(Math.random() * max));
  foodPosition.y = grid * (Math.floor(Math.random() * may));
  if (foodPosition.x >= 400 || foodPosition.y >= 400) {
    generateFoodPosition();
  }
  if (checkCellPosition(snake.cells, foodPosition)) {
    generateFoodPosition();
  }
}

function drawFood() {
  gameContext.fillStyle = 'red';
  gameContext.fillRect(foodPosition.x, foodPosition.y, grid-1, grid-1);
}

function checkCellPosition(snakeCells, cell) {
  if (typeof snakeCells === undefined) {
    return false;
  }
  const map = new Map();
  snakeCells.forEach(obj => map.set(`${obj.x}-${obj.y}`, obj));
  const result = map.get(`${cell.x}-${cell.y}`);
  if (result) {
    return true
  }
  return false
}

function checkCollisions() {
  if (snake.x < 0 || snake.x >= gameArea.width || snake.y < 0 || snake.y >= gameArea.height ) {
    return true;
  }
  for (let i = 1; i < snake.cells.length; i++) {
    if (snake.x === snake.cells[i].x && snake.y === snake.cells[i].y) {
      return true;
    }
  }
  return false;
}

function speedIncrease() {
  if (score.food > 0 && score.previous != score.food){
    if(score.food % 10 == 0 && snake.speed >= snake.minSpeed) {
      snake.speed -= 2;
      score.previous = score.food
    }
  }
}
function gameLoop(){
  requestAnimationFrame(gameLoop);
  speedIncrease();
  if (checkCollisions()) {
    return;
  }

  if(++counter < snake.speed){
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

gameLoop()
