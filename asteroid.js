"use strict";
(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Asteroid = Asteroids.Asteroid = function(pos, vel, radius) {
		Asteroids.MovingObject.call(this, pos, vel, radius, Asteroid.COLOR);
	};

	Asteroid.inherits(Asteroids.MovingObject);

	Asteroid.COLOR = "#993300";
	Asteroid.RADIUS = 24;
	Asteroid.SAFEX = 0.3;
	Asteroid.SAFEY = 0.3;

	Asteroid.randomAsteroid = function(dimX, dimY){
		var position = [Math.random() * dimX, Math.random() * dimY];
		if ((position[0] > ((1 - Asteroid.SAFEX) * 0.5 * dimX) &&
					position[0] < ((1 + Asteroid.SAFEX) * 0.5 * dimX)) ||
				(position[1] > ((1 - Asteroid.SAFEY) * 0.5 * dimY) &&
					position[1] < ((1 - Asteroid.SAFEY) * 0.5 * dimY))) {
			return Asteroid.randomAsteroid(dimX, dimY);
		} return new BigAsteroid(position, Asteroid.randomVel(3));
	};

	Asteroid.randomVel = function(scale){
		return [(Math.random() -0.5) * scale, (Math.random() -0.5) * scale];
	};


	var BigAsteroid = Asteroids.BigAsteroid = function(pos, vel) {
		Asteroids.Asteroid.call(this, pos, vel, BigAsteroid.RADIUS, Asteroid.COLOR);
	}

	BigAsteroid.inherits(Asteroid);
	BigAsteroid.RADIUS = 24;
	BigAsteroid.SCORE = 50;


	BigAsteroid.prototype.die = function(game) {
		game.asteroids.splice(game.asteroids.indexOf(this), 1);
		var pos1 = [this.pos[0], this.pos[1]];
		var pos2 = [this.pos[0], this.pos[1]];
		var vel1 = [this.vel[0] - 1, this.vel[1]];
		var vel2 = [this.vel[0] + 1, this.vel[1]];

		var spawn1 = new MedAsteroid(pos1, vel1);
		var spawn2 = new MedAsteroid(pos2, vel2);
		game.asteroids.push(spawn1);
		game.asteroids.push(spawn2);
		game.score += BigAsteroid.SCORE;
	}


	var MedAsteroid = Asteroids.MedAsteroid = function(pos, vel) {
		Asteroids.Asteroid.call(this, pos, vel, MedAsteroid.RADIUS, Asteroid.COLOR);
	}

	MedAsteroid.inherits(Asteroid);
	MedAsteroid.RADIUS = 12;
	MedAsteroid.SCORE = 100;

	MedAsteroid.prototype.die = function(game) {
		game.asteroids.splice(game.asteroids.indexOf(this), 1);
		var pos1 = [this.pos[0], this.pos[1]];
		var pos2 = [this.pos[0], this.pos[1]];
		var vel1 = [this.vel[0] - 1, this.vel[1]];
		var vel2 = [this.vel[0] + 1, this.vel[1]];

		var spawn1 = new SmlAsteroid(pos1, vel1);
		var spawn2 = new SmlAsteroid(pos2, vel2);
		game.asteroids.push(spawn1);
		game.asteroids.push(spawn2);
		game.score += MedAsteroid.SCORE;
	}


	var SmlAsteroid = Asteroids.SmlAsteroid = function(pos, vel) {
		Asteroids.Asteroid.call(this, pos, vel, SmlAsteroid.RADIUS, Asteroid.COLOR);
	}

	SmlAsteroid.inherits(Asteroid);
	SmlAsteroid.RADIUS = 6;
	SmlAsteroid.SCORE = 150;

	SmlAsteroid.prototype.die = function(game) {
		game.asteroids.splice(game.asteroids.indexOf(this), 1);
		game.score += SmlAsteroid.SCORE;
	}

})(this);