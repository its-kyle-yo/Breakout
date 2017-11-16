import { colorRect } from './helpers';
export class Player {
  constructor(gameContext, color, startingX = 0, startingY = 500, size = 10, width = 150){
    this.x = startingX;
    this.y = startingY;
    this.size = size;
    this.width = width;
    this.gameContext = gameContext;
    this.color = color;
  }

  draw() {
    colorRect(this.gameContext, this.x, this.y, this.width, this.size, this.color);
  }

  move(x){
    this.x = x - (this.width / 2);
  }
}
