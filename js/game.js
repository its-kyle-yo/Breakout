import {gameSettings} from './settings';
import { Player,BrickWall,Ball } from './game-objects';
import { colorRect } from './helpers';
let game, gameContext, ball, player, debug, wall;

window.onload = () => {

  game = document.getElementById('game');
  game.width = 1600;
  gameContext = game.getContext('2d');
  game.center = { x: game.width / 2, y: game.height / 2};
  // Make a new player and ball
  ball = new Ball(gameContext, [game.center.x, game.center.y], 'orange', game.center.x, game.center.y);
  player = new Player(gameContext, ball, 'orange', game.center.x);
  wall = new BrickWall(game, gameContext)
  wall.init();
  debug = {
    enabled: true,
    brickSize: wall.bricks[0].width,
    brickHeight: wall.bricks[0].height,
  };
  // Adds player mouse controls
  game.addEventListener('mousemove', movePlayer);
  if(debug){
    game.addEventListener('mousemove', playerDebug);
  }
  // Run the game!
  setInterval(run, gameSettings.fps);
};

// All draw functions should be in the run function.
// Each object needs to be drawn and redrawn each "frame"
function run () {
  drawBg(gameSettings.bgColor, gameContext);
  ball.move(game.width, game.height);
  player.ball = ball;
  ball.draw();
  player.draw(debug);
  wall.draw();
}

function drawBg(bgColor, gameContext) {
  colorRect(gameContext, 0, 0, game.width, game.height, bgColor);
}

function movePlayer({clientX, clientY}) {
  let rect = game.getBoundingClientRect();
  let root = document.documentElement;
  let x = clientX - rect.left - root.scrollLeft;
  player.move(x);
}

function playerDebug({clientX, clientY}){
  let rect = game.getBoundingClientRect();
  let root = document.documentElement;
  let x = clientX - rect.left - root.scrollLeft;
  let y = clientY - rect.top - root.scrollTop;
  player.debug(x, y);
}
