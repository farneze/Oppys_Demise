// TODO:
// Bug click twice to start (Onload event)
// Game over screen
//
window.onload = () => {
  var soundBoard = new SoundBoard();
  var musicType = document.getElementById("music-button");
  soundBoard.mood = musicType.innerHTML;

  document.getElementById("music-button").onclick = () => {
    if (musicType.innerHTML == "BGM") {
      musicType.innerHTML = "Funny";
      soundBoard.mood = "Funny";
      soundBoard.bgm.src = "./audio/Rock Around the Clock-Bill Haley.m4a";
    } else if (musicType.innerHTML == "Sad") {
      musicType.innerHTML = "BGM";
      soundBoard.mood = "BGM";
      soundBoard.bgm.src = "./audio/Start_Kornephoros.mp3";
    } else {
      musicType.innerHTML = "Sad";
      soundBoard.mood = "Sad";
      soundBoard.bgm.src = "./audio/David Bowie – Space Oddity.ogg";
    }
  };

  document.getElementById("start-button").onclick = () => {
    gamePreparation();
  };

  function gamePreparation() {
    if (soundBoard.mood == "Funny") {
      soundBoard.bgm.src = "./audio/I Will Survive - Gloria Gaynor.mp3";
    }
    if (soundBoard.mood == "BGM") {
      soundBoard.bgm.src = "./audio/Game_Space-Debris.mp3";
    }
    if (soundBoard.mood == "Sad") {
      soundBoard.bgm.src = "./audio/Kansas - Dust in the wind.mp3";
    }
    soundBoard.src;
    document.getElementById("menu").style.display = "none";
    document.getElementById("game-board").style.display = "flex";
    gameSetup();
  }

  function gameSetup() {
    //startGame
    // player.y = (floor.height - this.height) / 2 + background.height
    // player.x = (gameScript.canvas.width - this.width) * 0.8);
    ending = new Ending(0, 0, 1, 1, "./images/ending.png");

    // Player Sprites
    player = new Player(0, 230, 0.4, 0.4, "./images/rover.png");
    tireSmoke1 = new Smoke(400, 200, 0.2, 0.2, "./images/roversmoke1.png", 0);
    tireSmoke2 = new Smoke(400, 200, 0.2, 0.2, "./images/roversmoke2.png", 0);
    tireSmoke3 = new Smoke(400, 200, 0.2, 0.2, "./images/roversmoke3.png", 0);

    // Background Scenery
    sky = new Background(0, 0, 0.5, 0.4, "./images/sky.png", 0);
    clouds = new Background(0, 100, 0.1, 0.1, "./images/cloudsbn.png", 3);
    mountainFront = new Background(0, 0, 1, 1, "./images/bckgndFront.png", 1.5);
    mountainMid = new Background(0, 0, 1, 1, "./images/bckgndMid.png", 0.75);
    mountainBack = new Background(0, 0, 1, 1, "./images/bckgndBack.png", 0.3);
    floor = new Background(0, 114, 0.25, 0.25, "./images/terrain.png", 5);

    // Storm sprites
    orangeZone1 = new Storm(40, 75, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone2 = new Storm(40, 122, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone3 = new Storm(40, 169, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone4 = new Storm(40, 216, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone5 = new Storm(40, 263, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone6 = new Storm(40, 310, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone7 = new Storm(100, 75, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone8 = new Storm(100, 122, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone9 = new Storm(100, 169, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone10 = new Storm(100, 216, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone11 = new Storm(100, 263, 0.5, 0.5, "./images/smlcloud.png");
    orangeZone12 = new Storm(100, 310, 0.5, 0.5, "./images/smlcloud.png");
    redZone1 = new Storm(-125, 0, 0.5, 0.5, "./images/bigcloud1.png");
    redZone2 = new Storm(-125, 51.4, 0.5, 0.5, "./images/bigcloud2.png");
    redZone3 = new Storm(-125, 102.8, 0.5, 0.5, "./images/bigcloud1.png");
    redZone4 = new Storm(-125, 153.6, 0.5, 0.5, "./images/bigcloud2.png");
    redZone5 = new Storm(-125, 204.2, 0.5, 0.5, "./images/bigcloud1.png");

    gameScript.start();

    gameScript.componentsPosY = [];
    gameScript.obstaclesArray = [];
  }

  function gameLoop() {
    gameScript.clear();
    gameScript.frames += 1;
    let frames = gameScript.frames;

    // Moves main elements
    player.move();
    orangeZone1.move();
    orangeZone2.move();
    orangeZone3.move();
    orangeZone4.move();
    orangeZone5.move();
    orangeZone6.move();
    orangeZone7.move();
    orangeZone8.move();
    orangeZone9.move();
    orangeZone10.move();
    orangeZone11.move();
    orangeZone12.move();
    redZone1.move();
    redZone2.move();
    redZone3.move();
    redZone4.move();
    redZone5.move();

    // Moves and checks existence of every obstacle
    // Also, adds it to componentsPosY array
    gameScript.obstaclesArray.forEach((obj) => {
      if (obj.x < 0) {
        gameScript.obstaclesArray.shift();
      }
      obj.move();
      gameScript.componentsPosY.push(obj);
    });

    // Player tire smoke animation
    // Also, adds it to componentsPosY array
    if (frames % 15 >= 0 && frames % 15 < 5) {
      gameScript.componentsPosY.push(tireSmoke1);
      tireSmoke1.moveSmoke();
    } else if (frames % 15 >= 5 && frames % 15 < 10) {
      gameScript.componentsPosY.push(tireSmoke3);
      tireSmoke3.moveSmoke();
    } else {
      gameScript.componentsPosY.push(tireSmoke2);
      tireSmoke2.moveSmoke();
    }

    // Loads other foreground components to componentsPosY array
    gameScript.componentsPosY.push(player);
    gameScript.componentsPosY.push(orangeZone1);
    gameScript.componentsPosY.push(orangeZone2);
    gameScript.componentsPosY.push(orangeZone3);
    gameScript.componentsPosY.push(orangeZone4);
    gameScript.componentsPosY.push(orangeZone5);
    gameScript.componentsPosY.push(orangeZone6);
    gameScript.componentsPosY.push(orangeZone7);
    gameScript.componentsPosY.push(orangeZone8);
    gameScript.componentsPosY.push(orangeZone9);
    gameScript.componentsPosY.push(orangeZone10);
    gameScript.componentsPosY.push(orangeZone11);
    gameScript.componentsPosY.push(orangeZone12);
    gameScript.componentsPosY.push(redZone1);
    gameScript.componentsPosY.push(redZone2);
    gameScript.componentsPosY.push(redZone3);
    gameScript.componentsPosY.push(redZone4);
    gameScript.componentsPosY.push(redZone5);

    // Draws/Scrolls background Scenery
    sky.draw();
    mountainBack.scroll();
    mountainMid.scroll();
    mountainFront.scroll();
    floor.scroll();
    clouds.scroll();

    // Sorts order of screen drawing/appearance
    // based on Y coordinates
    gameScript.componentsPosY.sort((a, b) =>
      a.bottom() > b.bottom() ? 1 : -1
    );

    // Draws each foreground component in sequence
    gameScript.componentsPosY.forEach((obj) => obj.draw());

    gameScript.score();
    gameScript.reqAnimation = window.requestAnimationFrame(gameLoop);

    // Game rules
    if (player.reachStart) {
      // Obstacle creation mechanic
      if (frames % Math.floor(30 / gameScript.gameSpeed) == 0) {
        createObstacle();
      }
      // Game difficulty mechanic
      if (frames % 600 === 0 && gameScript.gameSpeed < 3.25) {
        gameScript.gameSpeed += 0.25;
      }

      // Battery charge/discharge mechanics
      if (frames % 30 == 0) {
        if (player.x < 350) {
          gameScript.batteryStatus = "Discharging!";
          gameScript.battery.pop();
        } else if (gameScript.battery.length < 10) {
          if (frames % 90 == 0) {
            gameScript.batteryStatus = "Charging...";
            gameScript.battery.push("|");
          }
        } else {
          gameScript.batteryStatus = "FULL";
        }
      }

      // Gameover mechanic
      if (player.x < 100 || gameScript.battery[0] == undefined) {
        gameScript.stop();
      }
    }
    gameScript.componentsPosY = [];

    if (!gameScript.game1stReload) {
      gameScript.restartGame();
      gameScript.game1stReload = true;
      // gamePreparation(); // <-- isso eh o que o
      //                           onclick do botao
      //                           start faz
    }
  }
  const gameScript = {
    //myGameArea
    canvas: document.createElement("canvas"),
    context: 0,
    obstaclesArray: [],
    componentsPosY: [],
    frames: 0,
    seconds: 0,
    minutes: 0,
    gameSpeed: 1,
    oldGameSpeed: 1,
    counter: 0,
    battery: [],
    batteryStatus: "",
    fontX: 30,
    fontY: 30,
    game1stReload: false,
    drawCanvas: function () {
      this.canvas.width = 800;
      this.canvas.height = 395;
      this.context = this.canvas.getContext("2d");
    },
    start: function () {
      this.drawCanvas();
      this.battery = [];
      let arr = [...new Array(10)].forEach((el) => this.battery.push("|"));
      document.getElementById("game-board").append(this.canvas);
      this.reqAnimation = window.requestAnimationFrame(gameLoop);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    score: function () {
      const ctx = this.context;
      seconds = Math.floor((this.frames / 60) % 60);
      minutes = Math.floor(this.frames / 3600);

      ctx.font = "24px DOS437";
      // ctx.fillStyle = '#0f6'
      ctx.fillStyle = "#00FF00";
      if (this.frames / 3600 >= 1) {
        ctx.fillText(
          "Alive for 14 years, 46 days, " +
            minutes +
            " minutes and " +
            seconds +
            " seconds",
          this.fontX,
          this.fontY
        );
      } else {
        ctx.fillText(
          "Alive:    14 years, 46 days and " + seconds + " seconds",
          this.fontX,
          this.fontY
        );
      }
      ctx.fillText("Battery: ", this.fontX, this.fontY + 30);

      // Text for battery bars and its gradient
      var gradient = ctx.createLinearGradient(
        this.fontX + 150,
        0,
        this.fontX + 200,
        0
      );
      gradient.addColorStop("0", "red");
      gradient.addColorStop("0.05", "yellow");
      gradient.addColorStop("0.95", "yellow");
      gradient.addColorStop("1.0", "#00FF00");
      ctx.fillStyle = gradient;
      ctx.fillText(this.battery.join(""), this.fontX + 130, this.fontY + 30);
      ctx.fillStyle = "#00FF00";
      ctx.fillText("Status: ", this.fontX, this.fontY + 60);
      ctx.fillText(gameScript.batteryStatus, this.fontX + 130, this.fontY + 60);

      // Shows actual speed
      ctx.fillText(
        "Game speed: " + (this.gameSpeed * 4 - 3),
        this.fontX + 290,
        this.fontY + 350
      );
      // Shows alert bigger storm alert
      if (this.gameSpeed != this.oldGameSpeed) {
        if (
          this.frames % 60 < 15 ||
          (this.frames % 60 >= 30 && this.frames % 60 < 60)
        ) {
          ctx.fillStyle = "#FF0000";
          ctx.fillText("Alert:", 260, 200);
          ctx.fillStyle = "#00FF00";
          ctx.fillText("Storm thickens!!", 350, 200);
          this.counter += 1;
          if (this.counter > 130) {
            this.oldGameSpeed = this.gameSpeed;
            this.counter = 0;
          }
        }
      }
    },
    stop: function () {
      window.cancelAnimationFrame(gameScript.reqAnimation);
      //   soundBoard.stopBGM();
      // this.timeId = setTimeout(this.gameOver, 2000)
      // this.reqAnimation = window.requestAnimationFrame(this.gameOver())

      if (soundBoard.mood == "Funny") {
        soundBoard.bgm.src = "./audio/Portal - Still Alive - Ending.mp3";
      }
      if (soundBoard.mood == "BGM") {
        soundBoard.bgm.src = "./audio/End_Magellanic Clouds.mp3";
      }
      if (soundBoard.mood == "Sad") {
        soundBoard.bgm.src = "./audio/Way to Fall-pPBHMgc9wVQ.mp3";
      }
      this.alpha0 = 0;
      this.alpha1 = 0;
      this.alpha2 = 0;
      this.alpha3 = 0;
      this.frames = 0;
      this.reqAnimation2 = window.requestAnimationFrame(this.gameOver);
    },
    gameOver: function () {
      this.width = gameScript.canvas.width;
      this.height = gameScript.canvas.height;

      gameScript.clear();
      gameScript.frames += 1;

      gameScript.context.textAlign = "center";
      gameScript.context.fillStyle = "#000000";
      gameScript.context.fillRect(0, 0, this.width, this.height);

      gameScript.context.save();
      gameScript.context.globalAlpha = 0.4;
      ending.draw();
      //   ctx.globalAlpha = 1;
      gameScript.context.restore();

      gameScript.context.fillStyle = `rgba(0,255,0, ${gameScript.alpha0})`;

      gameScript.context.fillText(
        `It was a long road`,
        this.width / 2,
        this.height / 2 - 60
      );

      gameScript.context.fillStyle = `rgba(0,255,0, ${gameScript.alpha1})`;

      if (gameScript.alpha0 >= 1) {
        gameScript.context.fillText(
          `but Oppy's gone...`,
          this.width / 2,
          this.height / 2 - 30
        );
      }

      gameScript.context.fillStyle = `rgba(0,255,0, ${gameScript.alpha3})`;

      if (gameScript.alpha2 >= 1) {
        gameScript.context.textAlign = "left";

        gameScript.context.fillText(
          `... or is it?`,
          this.width / 2,
          this.height / 2 + 60
        );
      }

      if (gameScript.frames % 10 == 0 && gameScript.alpha0 < 1) {
        gameScript.alpha0 += 0.05;
      }
      if (
        gameScript.frames % 30 == 0 &&
        gameScript.alpha0 >= 1 &&
        gameScript.alpha1 < 1
      ) {
        gameScript.alpha1 += 0.05;
      }
      if (
        gameScript.frames % 30 == 0 &&
        gameScript.alpha1 >= 1 &&
        gameScript.alpha2 < 1
      ) {
        gameScript.alpha2 += 0.5;
      }
      if (
        gameScript.frames % 30 == 0 &&
        gameScript.alpha2 >= 1 &&
        gameScript.alpha3 < 1
      ) {
        gameScript.alpha3 += 0.05;
      }

      gameScript.reqAnimation2 = window.requestAnimationFrame(
        gameScript.gameOver
      );
    },
    // drawFinalPoints: function () {},
    restartGame: function () {
      soundBoard.stopBGM();
      window.cancelAnimationFrame(gameScript.reqAnimation);
      document.getElementById("menu").style.display = "flex";
      document.getElementById("game-board").style.display = "none";
    },
  };

  function createObstacle() {
    x = gameScript.canvas.width;
    y = rndGen(114, gameScript.canvas.height - 42); // player.y //
    if (rndGen(1, 4, "f") == 1) {
      gameScript.obstaclesArray.push(
        new Obstacle(
          x,
          y,
          0.1,
          0.1,
          "./images/boulder1.png",
          5 * gameScript.gameSpeed
        )
      );
    } else if (rndGen(1, 4, "f") == 1) {
      gameScript.obstaclesArray.push(
        new Obstacle(
          x,
          y,
          0.1,
          0.1,
          "./images/boulder2.png",
          5 * gameScript.gameSpeed
        )
      );
    } else {
      gameScript.obstaclesArray.push(
        new Obstacle(
          x,
          y,
          0.1,
          0.1,
          "./images/boulder3.png",
          5 * gameScript.gameSpeed
        )
      );
    }
  }

  // ================= Background ==================
  function Background(x, y, scaleW, scaleH, image, speed) {
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = y;
    this.directionX = rndGen(-1);
    this.directionY = rndGen(-1);
    this.targetX = x + 25 * this.directionX;
    this.targetY = y + 10 * this.directionY;
    this.speed = speed * gameScript.gameSpeed;
    this.dx = 0;
    this.width = this.img.width * scaleW;
    this.height = this.img.height * scaleH;
    this.draw = function () {
      const ctx = gameScript.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    this.scroll = function () {
      const ctx = gameScript.context;
      if (this.dx <= -this.width) {
        this.dx = 0;
      }
      this.dx -= this.speed * gameScript.gameSpeed;
      ctx.drawImage(this.img, this.dx, this.y, this.width, this.height);
      ctx.drawImage(
        this.img,
        this.width + this.dx,
        this.y,
        this.width,
        this.height
      );
    };
    this.bottom = function () {
      return this.y + this.height;
    };
  }
  // =================== Player ====================
  function Player(x, y, scaleW, scaleH, image) {
    this.img = new Image();
    this.img.src = image;
    this.reachStart = false;
    this.x = x;
    this.y = y;
    this.stepX = 0.05;
    this.stepY = 0.05;
    this.targetX = x;
    this.targetY = y;
    this.width = this.img.width * scaleW;
    this.height = this.img.height * scaleH;

    this.draw = function () {
      const ctx = gameScript.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    this.move = function () {
      this.targetX = gameScript.canvas.width - this.width - 100;

      // Checks if player is near target
      if (!this.reachStart && this.x == this.targetX) {
        this.reachStart = true;
      }
      if (!this.reachStart) {
        this.stepX = 0.035;
      } else {
        this.stepX = 0.02;
      }
      this.x += (this.targetX - this.x) * this.stepX;
      this.y += (this.targetY - this.y) * this.stepY;
      this.collision();
      this.checkBoundaries();
      this.setScale();
    };
    this.collision = function () {
      gameScript.obstaclesArray.forEach((el) => {
        if (
          player.right() > el.left() - 15 &&
          player.left() < el.right() &&
          player.top() < el.bottom() &&
          player.bottom() > el.top()
        ) {
          // if (player.right() > el.x + 50) {
          // } else {
          player.x = el.x - 50;
          // }
          // if (player.top() > el.bottom()) {
          //     player.y = el.y + 1
          // }
          // if (player.bottom() < el.top()) {
          //     player.y = el.y - 1
          // }
        }
      });
    };

    this.checkBoundaries = function () {
      // Checks and corrects boundaries
      if (this.y < 114) {
        this.y = 114;
      }
      if (this.y + this.height > gameScript.canvas.height) {
        this.y = gameScript.canvas.height - this.height;
      }

      // Tests if player is near target. If so, target = player position
      // This is done to avoid 499.999999...
      this.targetX - this.x < 1 ? (this.x = this.targetX) : {};
    };
    this.setScale = function () {
      // Y scale width/height change
      const rate = 0.6;
      myScale = rate + (1 - rate) * ((this.y - 114) / 246);
      this.width = this.img.width * scaleW * myScale;
      this.height = this.img.height * scaleH * myScale;
    };
    this.left = function () {
      return this.x;
    };
    this.right = function () {
      return this.x + this.width;
    };
    this.top = function () {
      return this.y + 24;
    };
    this.bottom = function () {
      return this.y + this.height;
    };
  }
  function Smoke(x, y, scaleW, scaleH, image) {
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = y;
    this.width = this.img.width * scaleW;
    this.height = this.img.height * scaleH;
    this.draw = function () {
      const ctx = gameScript.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    this.moveSmoke = function () {
      const rate = 0.6;
      this.myScale = rate + (1 - rate) * ((this.y - 114) / 246);
      this.x = player.x - this.width + 10;
      this.y = player.y;
      this.setScale();
    };
    this.setScale = function () {
      this.width = this.img.width * scaleW * this.myScale;
      this.height = this.img.height * scaleH * this.myScale;
    };
    this.bottom = function () {
      return this.y + this.height;
    };
  }
  // ================== Obstacle ===================
  function Obstacle(x, y, scaleW, scaleH, image, speed) {
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.dx = 0;
    this.width = this.img.width * scaleW;
    this.height = this.img.height * scaleH;

    this.move = function () {
      this.x -= this.speed;

      const rate = 0.6;
      this.myScale = rate + (1.2 - rate) * ((this.y - 114) / 246);
      this.setScale();
    };
    this.draw = function () {
      const ctx = gameScript.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    this.setScale = function () {
      this.width = this.img.width * scaleW * this.myScale;
      this.height = this.img.height * scaleH * this.myScale;
    };
    this.left = function () {
      return this.x;
    };
    this.right = function () {
      return this.x + this.width;
    };
    this.top = function () {
      return this.y + this.height / 5;
    };
    this.bottom = function () {
      return this.y + this.height;
    };
  }
  // ==================== STORM ====================
  function Storm(x, y, scaleW, scaleH, image) {
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = y;
    this.directionX = rndGen(-1);
    this.directionY = rndGen(-1);
    this.targetX = x + 25 * this.directionX;
    this.targetY = y + 10 * this.directionY;
    this.speed = rndGen(0.4, 0.5);
    this.width = this.img.width * scaleW;
    this.height = this.img.height * scaleH;
    this.move = function () {
      Math.abs(this.targetX - this.x) < 1 ? (this.x = this.targetX) : {};
      if (this.x == this.targetX) {
        this.directionX *= -1;
        this.targetX += 50 * this.directionX;
      }
      this.x += this.speed * this.directionX * gameScript.gameSpeed;
      // this.x += (this.targetX - this.x) * 0.025;
      Math.abs(this.targetY - this.y) < 1 ? (this.y = this.targetY) : {};
      if (this.y == this.targetY) {
        this.directionY *= -1;
        this.targetY += 20 * this.directionY;
      }
      this.y += this.speed * this.directionY * gameScript.gameSpeed;
      // this.y += (this.targetY - this.y) * 0.025;
    };
    this.draw = function () {
      const ctx = gameScript.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    this.right = function () {
      return this.x + this.width;
    };
    this.bottom = function () {
      return this.y + this.height;
    };
  }
  function Ending(x, y, scaleW, scaleH, image) {
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = y;
    this.width = this.img.width;
    this.height = this.img.height;
    this.draw = function () {
      const ctx = gameScript.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }
  //
  document.onkeydown = function (e) {
    const step = 50;
    if (!player.reachStart) {
      if (e.keyCode == 38) {
        player.targetY = player.y - step;
      }
      if (e.keyCode == 87) {
        player.targetY = player.y - step;
      }
      if (e.keyCode == 40) {
        player.targetY = player.y + step;
      }
      if (e.keyCode == 83) {
        player.targetY = player.y + step;
      }
      if (e.keyCode == 82) {
        gameScript.restartGame();
      }
    }

    if (e.keyCode == 77) {
      if (!soundBoard.mute) {
        soundBoard.mute = true;
        soundBoard.stopBGM();
      } else {
        soundBoard.mute = false;
        soundBoard.playBGM();
      }
    }
    // DEBUG ONLY
    //
    // if (e.keyCode == 37) {
    // gameScript.stop();
    // <---- Arrow
    // }
    // if (e.keyCode == 39) {
    //    Arrow ---->
    // }
  };

  //
  function con(consoleMsg) {
    console.log(consoleMsg);
  }

  // if max not defined, returns a -1 OR +1
  // if fn == 'f' (floor) works as expected
  // if fn != 'f', renturns 'not floored'
  function rndGen(min, max, fn) {
    if (max == undefined) {
      return Math.sign(rndGen(0, 2) - 0.5);
    } else if (fn == "f") {
      return Math.floor(Math.random() * (max - min) + min);
    } else {
      return Math.random() * (max - min) + min;
    }
  }

  function SoundBoard() {
    this.bgm = document.createElement("audio");
    this.bgm.src = "";
    this.bgm.setAttribute("preload", "autoplay");
    this.bgm.setAttribute("controls", "none");
    this.bgm.autoplay = true;
    this.mood = "";
    this.mute = false;
    this.bgm.loop = true;
    this.bgm.style.display = "none";
    this.bgm.volume = 0.05;
    this.playBGM = () => {
      this.bgm.play();
    };
    this.stopBGM = () => {
      this.bgm.pause();
    };
  }
};

// Horizon smoke, small storm, rover smoke
// http://www.chonkypixel.com/
// Boulders:
// twitter: @Anokolisa
// big storm:
// twitter: @16pxl
// Font:
// https://www.dafont.com/perfect-dos-vga-437.font
// Audio:
// - https://www.dl-sounds.com/royalty-free/kornephoros/
// - https://www.dl-sounds.com/royalty-free/space-debris/
// - https://www.dl-sounds.com/royalty-free/magellanic-clouds/
//
// Help:
// Pedro Resch - Teacher
// Julia Foresti - Teacher Assistant
// Stack overflow
// Google
