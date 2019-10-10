function startGame(){
  gameArea.start();
  pos = new randomPosition();
  head =
  ssnake = [];
  for(var i=0; i<3; i++){
     ssnake.push(new component(10, 10, 'red', pos.x + 10*i, pos.y));
  }
  food = new foodComponent();
}

function foodComponent(){
  this.width = 10;
  this.height = 10;
  pos = new randomPosition();
  this.x = pos.x;
  this.y = pos.y;
  this.update = function(){
    ctx = gameArea.context;
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function randomPosition(){
  var max = (470/10) + 1;
  var may = (360/10) + 1;
  this.x = 10 * (Math.floor(Math.random() * max));
  this.y = 10 * (Math.floor(Math.random() * may));
}

function component(width, height, color, x, y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPosition = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.checkCollision = function(food){
    var crash = false;
    var rightEdge = this.x + this.width;
    var bottomEdge = this.y + this.height;
    var foodBottom = food.y + this.height;
    var foodRight = food.x + this.width;
    // if((rightEdge == food.x) && (bottomEdge == food.y)){
    //   crash = true;
    // }
    // if((this.x == foodRight) && (this.y == foodBottom)){
    //   crash = true;
    // }
    return crash;
  }
  this.borderCollision = function(){
    var crash = false;
    var rightEdge = this.x + this.width;
    var bottomEdge = this.y + this.height;
    if((rightEdge == 480) || (bottomEdge == 370)){
      crash = true;
    }
    if((this.x == 0) || (this.y == 0)){
      crash = true;
    }
    return crash;
  }
}

function updateGameArea() {
  // if(ssnake.borderCollision() == true){
  //   alert('GAME OVER');
  //   gameArea.stop();
  // }else{
  //   if(ssnake.checkCollision(food) == true){
  //     alert('gnamm');
  //   }
    gameArea.clear();
    stopMoving();
    getKeyMovement(gameArea.key);
    for(obj in ssnake){
      ssnake[obj].newPosition();
      ssnake[obj].update();
    }
    food.update();
  // }
}

function stopMoving(){
  for(obj in ssnake){
    ssnake[obj].speedX = 0;
    ssnake[obj].speedY = 0;
  }
}

function moveUp(){
  head = ssnake.pop()
  head.speedY -= 10;
  head.speedX = 0;
  for(obj in ssnake){
    ssnake[obj].y = head.y + (ssnake.length - obj)*10;
    ssnake[obj].speedY -= 10;
    ssnake[obj].speedX = head.speedX;
    ssnake[obj].x = head.x;
  }
  ssnake.push(head);
}

function moveDown(){
  head = ssnake.pop()
  head.speedY += 10;
  head.speedX = 0;
  for(obj in ssnake){
    ssnake[obj].y = head.y - (ssnake.length - obj)*10;
    ssnake[obj].speedY += 10;
    ssnake[obj].speedX = head.speedX;
    ssnake[obj].x = head.x;
  }
  ssnake.push(head);
}

function moveRight(){
  head = ssnake.pop()
  head.speedX += 10;
  head.speedY = 0;
  for(obj in ssnake){
    ssnake[obj].x = head.x - (ssnake.length - obj)*10;
    ssnake[obj].y = head.y;
    ssnake[obj].speedX += 10;
    ssnake[obj].speedY = head.speedY;
  }
  ssnake.push(head);
}

function moveLeft(){
  head = ssnake.pop()
  if( head.speedX == 0){
    head.speedX -= 10;
    head.speedY = 0;
    for(obj in ssnake){
      ssnake[obj].x = head.x + (ssnake.length - obj)*10;
      ssnake[obj].y = head.y;
      ssnake[obj].speedX -= 10;
      ssnake[obj].speedY = head.speedY;
    }
  }
  ssnake.push(head);
}

function getKeyMovement(key_code){
  switch(key_code){
    // move left
    case 37:
      moveLeft();
      break;
    // move up
    case 38:
      moveUp();
      break;
    // move right
    case 39:
      moveRight();
      break;
    // move down
    case 40:
      moveDown();
      break;
  }
}

var gameArea = {
  canvas: document.createElement("canvas"),
  start: function(){
    this.canvas.width = 480;
    this.canvas.height = 370;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function(e){
      gameArea.key = e.keyCode;
    });
    window.addEventListener('keyup', function(e){
      gameArea.key = false;
    });
  },
  clear: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}
