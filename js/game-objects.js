import { colorRect, colorText, colorCircle } from './helpers';
export class BrickWall{
  constructor(gameContext, width = 100, height = 50){
    this.gameContext = gameContext;
    this.width = width;
    this.height = height;
    this.bricks = [];
  }

  draw(size = 8){
    for(let i = 0; i <= 8; i++){
      let brick = new Brick(true, this.width, this.height);
      if(i === 0){
        colorRect(this.gameContext, 0,0,this.width - 2 , this.height, 'yellow');
      } else {
        colorRect(this.gameContext, this.width * i ,0,this.width - 2, this.height, 'yellow');
      }
    }
  }
}

export class Brick {
  constructor(visible, width, height){
    this.visible = visible;
    this.width = width;
    this.height = height;
  }

  speak(){
    console.log(this.visible, this.width, this.height);
  }
}
export class Player {
  constructor(gameContext, color, startingX = 0, startingY = 500, size = 10, width = 150){
    this.x = startingX;
    this.y = startingY;
    this.size = size;
    this.width = width;
    this.gameContext = gameContext;
    this.color = color;
  }

  debug(x,y){
    this.mouseX = x;
    this.mouseY = y;
  }

  draw(debug) {
    colorRect(this.gameContext, this.x, this.y, this.width, this.size, this.color);
    if(debug){
      colorText(this.gameContext, `${this.mouseX}, ${this.mouseY}`, this.mouseX, this.mouseY, 'yellow');
    }
  }

  move(x){
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
      [this.x, this.y] = this.gameCenter;
      [this.xSpeed, this.ySpeed] = [5, 7];
    }

    move(gameWidth, gameHeight, player) {
      // Collisions to bound to game canvas
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      if(this.x > game.width || this.x < 0){
        this.xSpeed = -this.xSpeed;
      }
      if(this.y < 0){
        this.ySpeed = -this.ySpeed;
      } else if (this.y > game.height){
        this.reset();
      }

      let playerTopEdgeY = player.y - (this.size / 2);
      let playerBottomEdgeY = playerTopEdgeY + player.size;
      let playerLeftEdgeX = player.x;
      let playerRightEdgeX = playerLeftEdgeX + player.width;

      if(this.y > playerTopEdgeY && // below top paddle
         this.y < playerBottomEdgeY && // above bottom of paddle
         this.x > playerLeftEdgeX && // right
         this.x < playerRightEdgeX){ //left
           this.ySpeed = -this.ySpeed;

           let playerCenter = player.x + player.width/2;
           let distFromCenter = this.x - playerCenter;
           this.xSpeed = (distFromCenter * 0.35 > this.topSpeed || distFromCenter * 0.35 < -this.topSpeed)  ? this.topSpeed : distFromCenter * 0.35;
           console.log(`Ball Speed (rounded): ${Math.round(this.xSpeed)}/pps`);
         }

    }

    draw() {
      colorCircle(this.x, this.y, this.size, this.color, this.gameContext);
    }
};
