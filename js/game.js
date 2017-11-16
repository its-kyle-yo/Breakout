let game, gameContext, ball, player, player2;
import {Ball, gameSettings} from './settings';
import { Player } from './player'
import { colorRect } from './helpers';

window.onload = () => {
  game = document.getElementById('game');
  gameContext = game.getContext('2d');
  game.center = { x: game.width / 2, y: game.height / 2};
  // Make a new player and ball
  ball = new Ball(gameContext, [game.center.x, game.center.y], 'orange', game.center.x, game.center.y);
  player = new Player(gameContext, 'orange', game.center.x);

  // Adds player mouse controls
  game.addEventListener('mousemove', movePlayer);

  // Run the game!
  setInterval(run, gameSettings.fps);
};

// All draw functions should be in the run function.
// Each object needs to be drawn and redrawn each "frame"
function run () {
  drawBg(gameSettings.bgColor, gameContext);
  ball.move(game.width, game.height, player);
  ball.draw();
  player.draw();
}

function drawBg(bgColor, gameContext) {
  colorRect(gameContext, 0, 0, game.width, game.height, bgColor);
}

function movePlayer({clientX}) {
  let rect = game.getBoundingClientRect();
  let root = document.documentElement
  let x = clientX - rect.left - root.scrollLeft;
  player.move(x);
}
