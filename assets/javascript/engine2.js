var gameArea = document.getElementById('gameArea');
var gameContext = gameArea.getContext("2d");

var grid = 16;
var counter = 0;

var randomPosition = function(){
  let max = (400/grid) + 1;
  let may = (400/grid) + 1;
  this.x = grid * (Math.floor(Math.random() * max));
  this.y = grid * (Math.floor(Math.random() * may));
}

var snake = {

  x: 160,
  y: 160,

  speedX: grid,
  speedY: 0,

  cells: [],

  maxCells: 4
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
  gameArea.key = e.keyCode;
  switch(e.keyCode){
    // move left
    case 37:
      if(snake.speedX === 0){
        snake.speedX = -grid;
        snake.speedY = 0;
      }
      break;
    // move up
    case 38:
      if(snake.speedY === 0){
        snake.speedX = 0;
        snake.speedY = -grid;
      }
      break;
    // move right
    case 39:
      if(snake.speedX === 0){
        snake.speedX = grid;
        snake.speedY = 0;
      }
      break;
    // move down
    case 40:
      if(snake.speedY === 0){
        snake.speedX = 0;
        snake.speedY = grid;
      }
      break;
  }
});

requestAnimationFrame(gameLoop);
