(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = exports.Player = exports.Brick = exports.BrickWall = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrickWall = exports.BrickWall = function () {
  function BrickWall(gameContext, ball) {
    var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;

    _classCallCheck(this, BrickWall);

    this.gameContext = gameContext;
    this.size = size;
    this.grid = { row: 4, col: 8 };
    this.bricks = new Array(size);
  }

  _createClass(BrickWall, [{
    key: 'init',
    value: function init() {
      for (var i = 0; i <= this.bricks.length - 1; i++) {
        this.bricks[i] = new Brick(this.gameContext, i);
      }
      console.log(this.bricks);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var len = this.bricks.length;
      var counter = 0;
      //
      // for(let currentBrick = 0; currentBrick <= len; currentBrick++){
      //
      // }
      // For each brick we want to draw, we draw the total amount that can fit in the canvas (game.width/(brick.width - brick.spacing))
      //
      var col = 0;
      for (var i = 0; i < len; i++) {
        if (col % 16 === 0) {
          counter++;
          col = 0;
        }
        this.bricks[i].draw(col, counter);
        col++;
      }
      //this.bricks[0-31].draw()
      //
      //
      //
      // for(let i = 0; i <= this.bricks.length - 1; i++){
      //   if(this.bricks[i].visible) {
      //
      //   }
      //   if(i % 7 === 0 ){
      //     this.bricks[i].draw(i,i * this.bricks[i].height);
      //   }
      //   // colorRect(this.gameContext, this.width * i ,0,this.width - 2, this.height, 'yellow');
      // }
    }
  }]);

  return BrickWall;
}();

var Brick = exports.Brick = function () {
  function Brick(gameContext, index) {
    var visible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
    var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'yellow';

    _classCallCheck(this, Brick);

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

  _createClass(Brick, [{
    key: 'speak',
    value: function speak() {
      console.log(this.visible, this.width, this.height);
    }
  }, {
    key: 'draw',
    value: function draw(col, row) {
      this.x = this.width * col;
      this.y = this.height * row;
      if (!this.visible) return;
      (0, _helpers.colorRect)(this.gameContext, this.x, this.y, this.width - this.spacing, this.height - this.spacing, this.color);
      (0, _helpers.colorText)(this.gameContext, this.index + 1 + '(' + this.index + '),' + col + ',' + (row + 1), this.x + (this.width / 2 - 20), this.y + this.height / 2, 'black');
    }
  }]);

  return Brick;
}();

var Player = exports.Player = function () {
  function Player(gameContext, ball, color) {
    var startingX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var startingY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 500;
    var size = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 10;
    var width = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 150;

    _classCallCheck(this, Player);

    this.x = startingX;
    this.y = startingY;
    this.size = size;
    this.width = width;
    this.gameContext = gameContext;
    this.color = color;
    this.ball = ball;
  }

  _createClass(Player, [{
    key: 'debug',
    value: function debug(x, y) {
      this.mouseX = x;
      this.mouseY = y;
    }
  }, {
    key: 'draw',
    value: function draw(debug) {
      // Draw the backgroudn
      (0, _helpers.colorRect)(this.gameContext, this.x, this.y, this.width, this.size, this.color);
      if (debug) {
        // Draw Mouse x/y coords
        (0, _helpers.colorText)(this.gameContext, this.mouseX + ', ' + this.mouseY, this.mouseX, this.mouseY, 'white');
      }
      var playerTopEdgeY = this.y;
      var playerBottomEdgeY = playerTopEdgeY + this.size;
      var playerLeftEdgeX = this.x;
      var playerRightEdgeX = playerLeftEdgeX + this.width;

      // Paddle Collisions
      if (this.ball.y > playerTopEdgeY && // below top paddle
      this.ball.y < playerBottomEdgeY && // above bottom of paddle
      this.ball.x > playerLeftEdgeX && // right
      this.ball.x < playerRightEdgeX) {
        //left
        this.ball.ySpeed = -this.ball.ySpeed;
        console.log('HIT! x: ' + this.ball.x + ' y: ' + this.ball.y);
        var playerCenter = this.x + this.width / 2;
        var distFromCenter = this.ball.x - playerCenter;
        this.ball.xSpeed = distFromCenter * 0.35 > this.ball.topSpeed || distFromCenter * 0.35 < -this.ball.topSpeed ? this.ball.topSpeed : distFromCenter * 0.35;
        console.log('Ball Speed (rounded): ' + Math.round(this.ball.xSpeed) + '/pps');
      }
    }
  }, {
    key: 'move',
    value: function move(x) {
      this.x = x - this.width / 2;
    }
  }]);

  return Player;
}();

var Ball = exports.Ball = function () {
  function Ball(gameContext, center, color) {
    var startingX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var startingY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var xSpeed = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;
    var ySpeed = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 5;
    var size = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 10;

    _classCallCheck(this, Ball);

    this.x = startingX;
    this.y = startingY;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = size;
    this.color = color;
    this.gameContext = gameContext;
    this.gameCenter = center;
    this.topSpeed = 15;
  }

  _createClass(Ball, [{
    key: 'reset',
    value: function reset() {
      var _gameCenter = _slicedToArray(this.gameCenter, 2);

      this.x = _gameCenter[0];
      this.y = _gameCenter[1];
      var _ref = [5, 7];
      this.xSpeed = _ref[0];
      this.ySpeed = _ref[1];
    }
  }, {
    key: 'move',
    value: function move(gameWidth, gameHeight, player) {
      // Collisions to bound to game canvas
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      if (this.x > game.width || this.x < 0) {
        this.xSpeed = -this.xSpeed;
      }
      if (this.y < 0) {
        this.ySpeed = -this.ySpeed;
      } else if (this.y > game.height) {
        this.reset();
      }

      // let playerTopEdgeY = player.y - (this.size / 2);
      // let playerBottomEdgeY = playerTopEdgeY + player.size;
      // let playerLeftEdgeX = player.x;
      // let playerRightEdgeX = playerLeftEdgeX + player.width;
      //
      // if(this.y > playerTopEdgeY && // below top paddle
      //    this.y < playerBottomEdgeY && // above bottom of paddle
      //    this.x > playerLeftEdgeX && // right
      //    this.x < playerRightEdgeX){ //left
      //      this.ySpeed = -this.ySpeed;
      //      let playerCenter = player.x + player.width/2;
      //      let distFromCenter = this.x - playerCenter;
      //      this.xSpeed = (distFromCenter * 0.35 > this.topSpeed || distFromCenter * 0.35 < -this.topSpeed)  ? this.topSpeed : distFromCenter * 0.35;
      //      console.log(`Ball Speed (rounded): ${Math.round(this.xSpeed)}/pps`);
      // }
    }
  }, {
    key: 'draw',
    value: function draw() {
      (0, _helpers.colorCircle)(this.x, this.y, this.size, this.color, this.gameContext);
    }
  }]);

  return Ball;
}();

;

},{"./helpers":3}],2:[function(require,module,exports){
'use strict';

var _settings = require('./settings');

var _gameObjects = require('./game-objects');

var _helpers = require('./helpers');

var game = void 0,
    gameContext = void 0,
    ball = void 0,
    player = void 0,
    debug = void 0,
    wall = void 0;

window.onload = function () {
  debug = true;
  game = document.getElementById('game');
  game.width = 1600;
  gameContext = game.getContext('2d');
  game.center = { x: game.width / 2, y: game.height / 2 };
  // Make a new player and ball
  ball = new _gameObjects.Ball(gameContext, [game.center.x, game.center.y], 'orange', game.center.x, game.center.y);
  player = new _gameObjects.Player(gameContext, ball, 'orange', game.center.x);
  wall = new _gameObjects.BrickWall(gameContext);
  wall.init();

  // Adds player mouse controls
  game.addEventListener('mousemove', movePlayer);
  if (debug) {
    game.addEventListener('mousemove', playerDebug);
  }
  // Run the game!
  setInterval(run, _settings.gameSettings.fps);
};

// All draw functions should be in the run function.
// Each object needs to be drawn and redrawn each "frame"
function run() {
  drawBg(_settings.gameSettings.bgColor, gameContext);
  ball.move(game.width, game.height);
  player.ball = ball;
  ball.draw();
  player.draw(debug);
  wall.draw();
}

function drawBg(bgColor, gameContext) {
  (0, _helpers.colorRect)(gameContext, 0, 0, game.width, game.height, bgColor);
}

function movePlayer(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;

  var rect = game.getBoundingClientRect();
  var root = document.documentElement;
  var x = clientX - rect.left - root.scrollLeft;
  player.move(x);
}

function playerDebug(_ref2) {
  var clientX = _ref2.clientX,
      clientY = _ref2.clientY;

  var rect = game.getBoundingClientRect();
  var root = document.documentElement;
  var x = clientX - rect.left - root.scrollLeft;
  var y = clientY - rect.top - root.scrollTop;
  player.debug(x, y);
}

},{"./game-objects":1,"./helpers":3,"./settings":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorRect = colorRect;
exports.colorCircle = colorCircle;
exports.colorText = colorText;
function colorRect(gameContext, topLeftX, topLeftY, boxWidth, boxHeight) {
  var fillColor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'red';

  gameContext.fillStyle = fillColor;
  gameContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

function colorCircle(centerX, centerY, radius) {
  var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'blue';
  var gameContext = arguments[4];

  gameContext.fillStyle = color;
  gameContext.beginPath();
  gameContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  gameContext.fill();
};

function colorText(gameContext, text, x, y, fillColor) {
  gameContext.fillStyle = fillColor;
  gameContext.fillText(text, x, y);
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var gameSettings = exports.gameSettings = {
  bgColor: 'black',
  fps: 1000 / 60
};

},{}]},{},[2]);
