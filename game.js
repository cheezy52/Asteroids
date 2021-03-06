"use strict";
(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var MovingObject = Asteroids.MovingObject;
	var Asteroid = Asteroids.Asteroid;
	var Ship = Asteroids.Ship;
	var Bullet = Asteroids.Bullet;

	var Game = Asteroids.Game = function(DIM_X, DIM_Y) {
		this.asteroids = [];
		Game.DIM_X = DIM_X;
		Game.DIM_Y = DIM_Y;
		this.ship = new Ship([Game.DIM_X / 2, Game.DIM_Y / 2], [0,0]);
		this.bullets = [];
		this.score = 0;
		//this.img = new Image();
		//this.img.src = Game.BACKGROUND;
	};

	Game.FPS = 60;
	//Game.BACKGROUND = "./background.jpg";

	Game.prototype.addAsteroids = function(numAsteroids){
		for(var i = 0; i < numAsteroids; i++){
			this.asteroids.push(Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
		}
	};

	Game.prototype.draw = function (ctx){
		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

		this.drawBackground(ctx);

		this.asteroids.forEach(function (asteroid) {
			asteroid.draw(ctx);
		})

		this.ship.draw(ctx);

		this.bullets.forEach(function (bullet) {
			bullet.draw(ctx);
		})
		this.drawScore(ctx);
	};

	Game.prototype.drawBackground = function(ctx) {
		//ctx.drawImage(this.img, 0, 0);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y)
	}

	Game.prototype.drawScore = function(ctx){
		ctx.fillStyle = "red";
		ctx.font = 12+"pt Courier ";
		ctx.fillText("Score: "+this.score, 20, 20);
	}

	Game.prototype.bindKeyHandlers = function (){
		var game = this;
		key("space", function() {
			game.bullets.push(game.ship.fireBullet());
		})
		//prevent scrolling from arrow keys/space
		window.addEventListener("keydown", function(e) {
			if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
		}, false);
	}

	Game.prototype.move = function(){
		var game = this;

		this.ship.move(Game.DIM_X, Game.DIM_Y);

		this.bullets.forEach(function (bullet) {
			if (bullet.tooOld()) {
				bullet.die(game);
			} else {
				bullet.move(Game.DIM_X, Game.DIM_Y);
				bullet.age += 1;
			}
		})

		this.asteroids.forEach(function (asteroid) {
			asteroid.move(Game.DIM_X, Game.DIM_Y);
		})
	};

	Game.prototype.checkVictory = function(ctx){
		if (this.asteroids.length === 0){
			this.stop();
			ctx.fillStyle = "green";
			ctx.font = 36+"pt Courier Bold";
			ctx.textAlign = "center";
			ctx.fillText("YOU WIN!", Game.DIM_X / 2, Game.DIM_Y / 2);
		}
	};

	Game.prototype.stop = function(){
				window.clearInterval(this.interval);
	}

	Game.prototype.checkCollisions = function(ctx) {
		var game = this;
		this.asteroids.forEach(function(asteroid) {
			game.bullets.forEach(function(bullet){
				if(asteroid.isCollidedWith(bullet)){
					asteroid.die(game);
					bullet.die(game);
				};
			})
			if(asteroid.isCollidedWith(game.ship)) {
 				game.stop();
 				ctx.fillStyle = "red";
				ctx.font = 36+"pt Courier Bold ";
				ctx.textAlign = "center";
				ctx.fillText("GAME OVER", Game.DIM_X / 2, Game.DIM_Y / 2);
 				return;
 			}
		})
	}

	Game.prototype.step = function (ctx){
		this.getThrottleInputs();
		this.move();
		this.draw(ctx);
		this.checkCollisions(ctx);
		this.checkVictory(ctx);
	}

	Game.prototype.getThrottleInputs = function() {
		if(key.isPressed("up")) {
			this.ship.power([0, -1]);
		} if (key.isPressed("left")) {
			this.ship.power([-1, 0]);
		} if (key.isPressed("down")) {
			this.ship.power([0, 1]);
		} if (key.isPressed("right")) {
			this.ship.power([1, 0]);
		}
	}

	Game.prototype.start = function (canvasEl){
		var ctx = canvasEl.getContext("2d");
		var game = this;
		game.bindKeyHandlers();
		game.addAsteroids(10);
		game.interval = window.setInterval(function(){
			game.step(ctx);
		}, 1000/Game.FPS);

	};


})(this);