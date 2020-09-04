"use strict";

// 934px x 114px
window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    document.getElementById("game-board").style.display = "block";
    gameSetup();
  }; //


  function gameSetup() {
    //startGame
    sky = new Component(0, -3 + 114 - 174, 2.75, 0.4, "/images/sky.png", "n");
    background = new Component(0, 0, 1, 1, "/images/back_terrain_front.png");
    redZone = new Component(0, 0, 1, 1, "/images/red.png");
    orangeZone = new Component(50, 0, 1, 1, "/images/orange.png"); // 114 = background.height

    floor = new Component(0, 114, 0.5, 1, "/images/terrain_HQ_scrollable.png"); // player.x = (floor.height - this.height) / 2 + background.height
    // player.y = (gameScript.canvas.width - this.width) * 0.8);

    player = new Component(500, 230, 0.34, 0.34, "/images/rover_test.png");
    gameScript.start();
    gameScript.obstaclesArray = [];
  } //


  var gameScript = {
    //myGameArea
    canvas: document.createElement("canvas"),
    obstaclesArray: [],
    drawCanvas: function drawCanvas() {
      this.canvas.width = 661; // OR screen.width * 0.7;

      this.canvas.height = 395; // 400 px playable area + ~114 px background

      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").append(this.canvas);
    },
    start: function start() {
      this.drawCanvas();
      this.reqAnimation = window.requestAnimationFrame(gameLoop);
    },
    clear: function clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    score: function score() {},
    stop: function stop() {},
    gameOver: function gameOver() {},
    drawFinalPoints: function drawFinalPoints() {},
    restartGame: function restartGame() {}
  };

  function gameLoop() {
    //updateGameArea
    ctx = gameScript.canvas.context;
    gameScript.clear();
    sky.draw();
    background.draw();
    floor.draw(); //591

    redZone.draw();
    orangeZone.draw();
    player.draw();
    gameScript.reqAnimation = window.requestAnimationFrame(gameLoop);
  }

  function Component(x, y, scaleW, scaleH, image, repeat) {
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = y;
    this.width = this.img.width * scaleW;
    this.height = this.img.height * scaleH;
    this.battery = 100;

    this.img.onload = function () {
      // create pattern
      if (repeat == "y") {
        ctx = gameScript.context;
        var ptrn = ctx.createPattern(this.img, "repeat"); // Create a pattern with this image, and set it to "repeat".

        ctx.fillStyle = ptrn;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // context.fillRect(x, y, width, height);
      }
    };

    this.draw = function () {
      ctx = gameScript.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    this.left = function () {
      return this.x;
    };

    this.right = function () {
      return this.x + this.width;
    };

    this.top = function () {
      return this.y;
    };

    this.bottom = function () {
      return this.y + this.height;
    };
  }

  document.onkeydown = function (e) {
    var step = 5;

    if (e.keyCode == 37) {
      player.x -= step;
    }

    if (e.keyCode == 38) {
      player.y -= step;
    }

    if (e.keyCode == 39) {
      player.x += step;
    }

    if (e.keyCode == 40) {
      player.y += step;
    }
  };

  function con(consoleMsg) {
    console.log(consoleMsg);
  }
};