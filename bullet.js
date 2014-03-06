"use strict";
(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Bullet = Asteroids.Bullet = function(pos, vel) {
		this.age = 0;
		Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
	};

	Bullet.RADIUS = 2;
	Bullet.COLOR = "blue";
	Bullet.SHOT_VEL_SCALE = 10;
	Bullet.LIFETIME = 40;

	Bullet.inherits(Asteroids.MovingObject);

	Bullet.prototype.tooOld = function() {
		return (this.age > Bullet.LIFETIME);
	}

	Bullet.prototype.die = function(game) {
		game.bullets.splice(game.bullets.indexOf(this), 1);
	}

})(this);