(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _settings = require('./settings');

var _player = require('./player');

var _helpers = require('./helpers');

var game = void 0,
    gameContext = void 0,
    ball = void 0,
    player = void 0,
    player2 = void 0;


window.onload = function () {
  game = document.getElementById('game');
  gameContext = game.getContext('2d');
  game.center = { x: game.width / 2, y: game.height / 2 };
  // Make a new player and ball
  ball = new _settings.Ball(gameContext, [game.center.x, game.center.y], 'orange', game.center.x, game.center.y);
  player = new _player.Player(gameContext, 'orange', game.center.x);

  // Adds player mouse controls
  game.addEventListener('mousemove', movePlayer);

  // Run the game!
  setInterval(run, _settings.gameSettings.fps);
};

// All draw functions should be in the run function.
// Each object needs to be drawn and redrawn each "frame"
function run() {
  drawBg(_settings.gameSettings.bgColor, gameContext);
  ball.move(game.width, game.height, player);
  ball.draw();
  player.draw();
}

function drawBg(bgColor, gameContext) {
  (0, _helpers.colorRect)(gameContext, 0, 0, game.width, game.height, bgColor);
}

function movePlayer(_ref) {
  var clientX = _ref.clientX;

  var rect = game.getBoundingClientRect();
  var root = document.documentElement;
  var x = clientX - rect.left - root.scrollLeft;
  player.move(x);
}

},{"./helpers":2,"./player":3,"./settings":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorRect = colorRect;
exports.colorCircle = colorCircle;
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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    key: 'draw',
    value: function draw() {
      (0, _helpers.colorRect)(this.gameContext, this.x, this.y, this.width, this.size, this.color);
    }
  }, {
    key: 'move',
    value: function move(x) {
      this.x = x - this.width / 2;
    }
  }]);

  return Player;
}();

},{"./helpers":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameSettings = exports.Ball = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      var playerLeftEdgeX = player.x - 5;
      var playerRightEdgeX = playerLeftEdgeX + player.width + 5;

      if (this.y > playerTopEdgeY && // below top paddle
      this.y < playerBottomEdgeY && // above bottom of paddle
      this.x > playerLeftEdgeX && // right
      this.x < playerRightEdgeX) {
        //left
        this.ySpeed = -this.ySpeed;

        var playerCenter = player.x + player.width / 2;
        var distFromCenter = this.x - playerCenter;
        this.xSpeed = distFromCenter * 0.35 > this.topSpeed || distFromCenter * 0.35 < -this.topSpeed ? this.topSpeed : distFromCenter * 0.35;
        console.log(this.xSpeed);
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

var gameSettings = exports.gameSettings = {
  bgColor: 'black',
  fps: 1000 / 60
};

},{"./helpers":2}]},{},[1]);
