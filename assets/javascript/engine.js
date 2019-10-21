function startGame(){
  const SPEED = 5;
  gameArea.start();
  let pos = new randomPosition();
  ssnake = [];
  for(var i=0; i<5; i++){
     ssnake.push(new component(10, 10, 'red', pos.x + 10*i, pos.y));
  }
  food = new foodComponent();
}

function foodComponent(){
  this.width = 10;
  this.height = 10;
  let pos = new randomPosition();
  this.x = pos.x;
  this.y = pos.y;
  this.update = function(){
    ctx = gameArea.context;
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function randomPosition(){
  let max = (470/10) + 1;
  let may = (360/10) + 1;
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
  this.HDirection = '';
  this.VDirection = '';
  this.update = function(){
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.setHDirection();
    this.setVDirection();
  }

  this.newPosition = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.getDirection = function(){
    if(this.speedX > 0){
      return 'right';
    }
    if(this.speedX < 0){
      return 'left';
    }
    if(this.speedY > 0){
      return 'bottom';
    }
    if(this.speedY < 0){
      return 'top';
    }
  }

  this.setHDirection = function(){
    if(this.speedX > 0){
      this.HDirection = 'right';
    }
    if(this.speedX < 0){
      this.HDirection = 'left';
    }
  }

  this.setVDirection = function(){
    if(this.speedY > 0){
      this.VDirection = 'bottom';
    }
    if(this.speedY < 0){
      this.VDirection = 'top';
    }
  }

  this.borderCollision = function(){
    let crash = false;
    let rightEdge = this.x + this.width;
    let bottomEdge = this.y + this.height;
    let canWidth = gameArea.context.canvas.clientWidth;
    let canHeight = gameArea.context.canvas.clientHeight;
    if( rightEdge > canWidth ){
      crash = true;
    } else if (bottomEdge > canHeight) {
      crash = true;
    } else if (this.x < 0){
      crash = true;
    } else if(this.y < 0){
      crash = true;
    }
    return crash;
  }

  this.foodCollision = function(){
    let crash = false;
    let rightEdge = this.x + this.width;
    let bottomEdge = this.y + this.height;
    let foodRightEdge = food.x + this.width;
    let foodBottomEdge = food.y + this.height;
    this.eatFood(this.getDirection());
  }

  this.eatFood = function(direction){
    if((this.x == food.x) && (this.y == food.y)){
      gameArea.context.clearRect(food.x, food.y, 10, 10);
      let head = ssnake.pop();
      ssnake.push(new component(10, 10, 'red', head.x, head.y));
      switch(direction){
        case 'right':
          head.x += 10;
          ssnake.push(head);
          break;
        case 'left':
          head.x -= 10;
          ssnake.push(head);
          break;
        case 'top':
          head.y -= 10;
          ssnake.push(head);
          break;
        case 'bottom':
          head.y += 10;
          ssnake.push(head);
          break;
        default:
          break;
      }
      food = new foodComponent();
    }
  }
}

function updateGameArea() {
  head = ssnake.pop();
  ssnake.push(head);
  if(head.borderCollision() == true){
    alert('GAME OVER');
    gameArea.stop();
  }
  head.foodCollision();
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
  let head = ssnake.pop()
  head.setHDirection();
  head.setVDirection();
  ssnake.push(head);
  for(obj in ssnake){
    ssnake[obj].speedX = 0;
    ssnake[obj].speedY = 0;
  }
}

function moveUp(){
  let head = ssnake.pop();
  head.speedY -= 10;
  head.setVDirection();
  for(obj in ssnake){
    if(head.speedY < 0){
      if(ssnake[obj].x == head.x){
        ssnake[obj].y = head.y + (ssnake.length - obj)*10;
        ssnake[obj].speedY -= 10;
        ssnake[obj].speedX = head.speedX;
      }else{
        switch (head.HDirection) {
          case 'right':
            ssnake[obj].speedX += 10;
            break;
          case 'left':
            ssnake[obj].speedX -= 10;
            break;
          default:
          ssnake[obj].speedX += 10;
          break;
        }
      }
    }
  }
  head.speedX = 0;
  ssnake.push(head);
}

function moveDown(){
  let head = ssnake.pop()
  head.speedY += 10;
  head.setVDirection();
  for(obj in ssnake){
    if( head.speedY > 0){
      if(ssnake[obj].x == head.x){
        ssnake[obj].y = head.y - (ssnake.length - obj)*10;
        ssnake[obj].speedY += 10;
        ssnake[obj].speedX = head.speedX;
      }else{
        switch (head.HDirection) {
          case 'right':
            ssnake[obj].speedX += 10;
            break;
          case 'left':
            ssnake[obj].speedX -= 10;
            break;
          default:
          ssnake[obj].speedX += 10;
          break;
        }
      }
    }
  }
  head.speedX = 0;
  ssnake.push(head);
}

function moveRight(){
  let head = ssnake.pop();
  head.speedX += 10;
  head.setHDirection();
  for(obj in ssnake){
    if(head.speedX > 0){
      if(ssnake[obj].y == head.y){
        ssnake[obj].x = head.x - (ssnake.length - obj)*10;
        ssnake[obj].y = head.y;
        ssnake[obj].speedX += 10;
      }else{
        if(head.VDirection == 'bottom'){
          ssnake[obj].speedY += 10;
        }else{
          ssnake[obj].speedY -= 10;
        }
      }
    }
  }
  head.speedY = 0;
  ssnake.push(head);
}

function moveLeft(){
  let head = ssnake.pop();
  head.speedX -= 10;
  head.setHDirection();
  for(obj in ssnake){
    if(head.speedX < 0){
      if(ssnake[obj].y == head.y ){
        ssnake[obj].x = head.x + (ssnake.length - obj)*10;
        ssnake[obj].y = head.y;
        ssnake[obj].speedX -= 10;
      }else{
        if(head.VDirection == 'bottom'){
          ssnake[obj].speedY += 10;
        }else{
          ssnake[obj].speedY -= 10;
        }
      }
    }
  }
  head.speedY = 0;
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
    this.canvas.width = 580;
    this.canvas.height = 470;
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
