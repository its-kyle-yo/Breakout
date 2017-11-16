import { colorCircle } from './helpers';
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
      let playerLeftEdgeX = player.x - 5;
      let playerRightEdgeX = playerLeftEdgeX + player.width + 5;

      if(this.y > playerTopEdgeY && // below top paddle
         this.y < playerBottomEdgeY && // above bottom of paddle
         this.x > playerLeftEdgeX && // right
         this.x < playerRightEdgeX){ //left
           this.ySpeed = -this.ySpeed;

           let playerCenter = player.x + player.width/2;
           let distFromCenter = this.x - playerCenter;
           this.xSpeed = (distFromCenter * 0.35 > this.topSpeed || distFromCenter * 0.35 < -this.topSpeed)  ? this.topSpeed : distFromCenter * 0.35;
           console.log(this.xSpeed);
         }

    }

    draw() {
      colorCircle(this.x, this.y, this.size, this.color, this.gameContext);
    }
};

export const gameSettings = {
  bgColor: 'black',
  fps: 1000 / 60,
};
