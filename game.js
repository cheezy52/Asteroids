"use strict";
(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var MovingObject = Asteroids.MovingObject;
	var Asteroid = Asteroids.Asteroid;
	var Ship = Asteroids.Ship;
	var Bullet = Asteroids.Bullet;

	var Game = Asteroids.Game = function() {
		this.asteroids = [];
		this.ship = new Ship([Game.DIM_X / 2, Game.DIM_Y / 2], [0,0]);
		this.bullets = [];
	};

	Game.DIM_X = 500;
	Game.DIM_Y = 500;
	Game.FPS = 60;

	Game.prototype.addAsteroids = function(numAsteroids){
		for(var i = 0; i < numAsteroids; i++){
			this.asteroids.push(Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
		}
	};

	Game.prototype.draw = function (ctx){
		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

		this.asteroids.forEach(function (asteroid) {
			asteroid.draw(ctx);
		})

		this.ship.draw(ctx);

		this.bullets.forEach(function (bullet) {
			bullet.draw(ctx);
		})
	};

	Game.prototype.bindKeyHandlers = function (){
		var game = this;
		key("space", function() {
			game.bullets.push(game.ship.fireBullet());
		})
	}

	Game.prototype.move = function(){
		this.ship.move(Game.DIM_X, Game.DIM_Y);

		this.bullets.forEach(function (bullet) {
			bullet.move(Game.DIM_X, Game.DIM_Y);
		})

		this.asteroids.forEach(function (asteroid) {
			asteroid.move(Game.DIM_X, Game.DIM_Y);
		})
	};

	Game.prototype.removeAsteroid = function(a_idx){
		this.asteroids.splice(a_idx, 1);
	}

	Game.prototype.removeBullet = function(b_idx){
		this.bullets.splice(b_idx, 1);
	}

	Game.prototype.checkVictory = function(){
		if (this.asteroids.length === 0){
			this.stop();
			alert("A winner is you.");
		}
	};

	Game.prototype.stop = function(){
				window.clearInterval(this.interval);
	}

	Game.prototype.checkCollisions = function() {
		var game = this;
		this.asteroids.forEach(function(asteroid) {
			if(asteroid.isCollidedWith(game.ship)) {
				alert("Game over! Better luck next time!");
				game.stop();
			}
			game.bullets.forEach(function(bullet){
				if(asteroid.isCollidedWith(bullet)){
					game.removeAsteroid(game.asteroids.indexOf(asteroid));
					game.removeBullet(game.bullets.indexOf(bullet));
				};
			})
		})
	}

	Game.prototype.step = function (ctx){
		this.getThrottleInputs();
		this.move();
		this.checkCollisions();
		this.draw(ctx);
		this.checkVictory();
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