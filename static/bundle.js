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
  function BrickWall(gameContext) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;

    _classCallCheck(this, BrickWall);

    this.gameContext = gameContext;
    this.width = width;
    this.height = height;
    this.bricks = [];
  }

  _createClass(BrickWall, [{
    key: 'draw',
    value: function draw() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

      for (var i = 0; i <= 8; i++) {
        var brick = new Brick(true, this.width, this.height);
        if (i === 0) {
          (0, _helpers.colorRect)(this.gameContext, 0, 0, this.width - 2, this.height, 'yellow');
        } else {
          (0, _helpers.colorRect)(this.gameContext, this.width * i, 0, this.width - 2, this.height, 'yellow');
        }
      }
    }
  }]);

  return BrickWall;
}();

var Brick = exports.Brick = function () {
  function Brick(visible, width, height) {
    _classCallCheck(this, Brick);

    this.visible = visible;
    this.width = width;
    this.height = height;
  }

  _createClass(Brick, [{
    key: 'speak',
    value: function speak() {
      console.log(this.visible, this.width, this.height);
    }
  }]);

  return Brick;
}();

var Player = exports.Player = function () {
  function Player(gameContext, color) {
    var startingX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var startingY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
    var size = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
    var width = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 150;

    _classCallCheck(this, Player);

    this.x = startingX;
    this.y = startingY;
    this.size = size;
    this.width = width;
    this.gameContext = gameContext;
    this.color = color;
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
      (0, _helpers.colorRect)(this.gameContext, this.x, this.y, this.width, this.size, this.color);
      if (debug) {
        (0, _helpers.colorText)(this.gameContext, this.mouseX + ', ' + this.mouseY, this.mouseX, this.mouseY, 'yellow');
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

      var playerTopEdgeY = player.y - this.size / 2;
      var playerBottomEdgeY = playerTopEdgeY + player.size;
      var playerLeftEdgeX = player.x;
      var playerRightEdgeX = playerLeftEdgeX + player.width;

      if (this.y > playerTopEdgeY && // below top paddle
      this.y < playerBottomEdgeY && // above bottom of paddle
      this.x > playerLeftEdgeX && // right
      this.x < playerRightEdgeX) {
        //left
        this.ySpeed = -this.ySpeed;

        var playerCenter = player.x + player.width / 2;
        var distFromCenter = this.x - playerCenter;
        this.xSpeed = distFromCenter * 0.35 > this.topSpeed || distFromCenter * 0.35 < -this.topSpeed ? this.topSpeed : distFromCenter * 0.35;
        console.log('Ball Speed (rounded): ' + Math.round(this.xSpeed) + '/pps');
      }
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
    player2 = void 0,
    debug = void 0,
    wall = void 0;


window.onload = function () {
  game = document.getElementById('game');
  gameContext = game.getContext('2d');
  game.center = { x: game.width / 2, y: game.height / 2 };
  // Make a new player and ball
  ball = new _gameObjects.Ball(gameContext, [game.center.x, game.center.y], 'orange', game.center.x, game.center.y);
  player = new _gameObjects.Player(gameContext, 'orange', game.center.x);
  wall = new _gameObjects.BrickWall(gameContext);

  // Adds player mouse controls
  game.addEventListener('mousemove', movePlayer);
  debug = true;
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
  ball.move(game.width, game.height, player);
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
