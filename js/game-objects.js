import { colorRect, colorText, colorCircle } from './helpers';
export class BrickWall{
  constructor(game, gameContext, ball, size = 32){
    this.gameContext = gameContext;
    this.game = game;
    this.size = size;
    this.bricks = new Array(size);
    this.colors = [
      'red',
      'yellow',
      'pink',
      'green',
      'purple',
      'orange',
      'blue',
    ]
  }

  init() {
    for(let i = 0; i <= this.bricks.length - 1; i++){
      let randomColor = this.colors[Math.floor(Math.random() * this.colors.length) + 1]
      this.bricks[i] = new Brick(this.gameContext, i, randomColor);
    }
    console.table(this.bricks);
  }

  draw(){
    let len = this.bricks.length;
    let counter = 0;
    var col = 0;
    for(let i = 0; i < len; i++){
      if(col % Math.round((this.game.width / this.bricks[0].width)) === 0){
        counter++;
        col = 0;
      }
      this.bricks[i].draw(col, counter);
      col++;
    }
  }
}

export class Brick {
  constructor(gameContext, index, color = 'yellow', visible = true, width = 100, height = 50){
    this.index = index;
    this.visible = visible;
    this.width = width;
    this.height = height;
    this.color = color;
    this.gameContext = gameContext;
    this.spacing = 2;
    this.x;
    this.y;
  }

  speak(){
    console.log(this.visible, this.width, this.height);
  }

  draw(col, row) {
    this.x = this.width * col;
    this.y = this.height * row;
    if(!this.visible) return;
    colorRect(this.gameContext, this.x, this.y, this.width - this.spacing, this.height - this.spacing, this.color);
    // colorText(this.gameContext,`${this.index + 1}(${this.index}),${col},${row + 1}`, this.x + (this.width/2 - 20), this.y + (this.height/2),'black');
  }
}
export class Player {
  constructor(gameContext, ball, color, startingX = 0, startingY = 500, size = 10, width = 150){
    this.x = startingX;
    this.y = startingY;
    this.size = size;
    this.width = width;
    this.gameContext = gameContext;
    this.color = color;
    this.ball = ball;
  }

  debug(x,y){
    this.mouseX = x;
    this.mouseY = y;
  }

  draw(debug) {
    // Draw the backgroudn
    colorRect(this.gameContext, this.x, this.y, this.width, this.size, this.color);
    if(debug.enabled){
      // Draw Mouse x/y coords
      colorText(this.gameContext, `${this.mouseX / debug.brickSize }, ${this.mouseY/debug.brickSize}`, this.mouseX, this.mouseY, 'white');
    }
    let playerTopEdgeY = this.y;
    let playerBottomEdgeY = playerTopEdgeY + this.size;
    let playerLeftEdgeX = this.x;
    let playerRightEdgeX = playerLeftEdgeX + this.width;

    // Paddle Collisions
    if(this.ball.y > playerTopEdgeY && // below top paddle
       this.ball.y < playerBottomEdgeY && // above bottom of paddle
       this.ball.x > playerLeftEdgeX && // right
       this.ball.x < playerRightEdgeX){ //left
         this.ball.ySpeed = -this.ball.ySpeed;
         // Logging for ball infomatin on hit
         console.groupCollapsed('HIT');
         console.log(`Ball x: ${this.ball.x} y: ${this.ball.y}`);
         let playerCenter = this.x + this.width/2;
         let distFromCenter = this.ball.x - playerCenter;
         this.ball.xSpeed = (distFromCenter * 0.35 > this.ball.topSpeed || distFromCenter * 0.35 < -this.ball.topSpeed)  ? this.ball.topSpeed : distFromCenter * 0.35;
         console.log(`Ball Speed (rounded): ${Math.round(this.ball.xSpeed)}/pps`);
         console.groupEnd('HIT')
    }
  }

  move(x){
    // Centers on mouse x position
    this.x = x - (this.width / 2);
  }
}

export class Ball {
    constructor(gameContext, center, color, startingX = 0, startingY = 0, xSpeed = 5, ySpeed = 5, size = 10){
      this.x = startingX;
      this.y = startingY;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;
      this.size = size;
      this.color = color ;
      this.gameContext = gameContext;
      this.gameCenter = center
      this.topSpeed = 15;
    }

    reset() {
      // Set the ball to the center of the game,
      // reset the speeds to defaults 5,7
      [this.x, this.y] = this.gameCenter;
      [this.xSpeed, this.ySpeed] = [5, 7];
    }

    move(gameWidth, gameHeight, player) {
      // Collisions to bound to game canvas
      // Moves each frame
      this.x += this.xSpeed;
      this.y += this.ySpeed;

      //Collisions for the walls
      this.collide(gameWidth);
    }

    collide(gameWidth) {
      if(this.x > gameWidth || this.x < 0){
        this.xSpeed = -this.xSpeed;
      }
      if(this.y < 0){
        this.ySpeed = -this.ySpeed;
      } else if (this.y > game.height){
        this.reset();
      }
    }

    draw() {
      colorCircle(this.x, this.y, this.size, this.color, this.gameContext);
    }
};
