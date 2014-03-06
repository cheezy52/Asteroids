"use strict";
(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Asteroid = Asteroids.Asteroid = function(pos, vel) {
		Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
	};

	Asteroid.inherits(Asteroids.MovingObject);

	Asteroid.COLOR = "green";
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
		} return new Asteroid(position, Asteroid.randomVel(3));
	};

	Asteroid.randomVel = function(scale){
		return [(Math.random() -0.5) * scale, (Math.random() -0.5) * scale];
	};

})(this);