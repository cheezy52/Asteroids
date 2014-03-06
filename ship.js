"use strict";
(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Bullet = Asteroids.Bullet;

	var Ship = Asteroids.Ship = function(pos, vel) {
		Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
	};

	Ship.inherits(Asteroids.MovingObject);
	Ship.RADIUS = 5;
	Ship.COLOR = "red";
	Ship.IMPULSE_SCALE = 0.1;

	Ship.prototype.power = function(impulse) {
		this.vel[0] += impulse[0] * Ship.IMPULSE_SCALE;
		this.vel[1] += impulse[1] * Ship.IMPULSE_SCALE;
	}

	Ship.prototype.facing = function() {
		var totalVel = Math.sqrt(Math.pow(this.vel[0], 2) +
														 Math.pow(this.vel[1], 2));
		if(totalVel === 0) {
			return [0, -1];
		} else {
			var xVel = this.vel[0];
			var yVel = this.vel[1];
			return [xVel / totalVel, yVel / totalVel];
		}
	}

	Ship.prototype.fireBullet = function() {
		var shotVel = this.facing();

		shotVel[0] *= Bullet.SHOT_VEL_SCALE;
		shotVel[1] *= Bullet.SHOT_VEL_SCALE;

		var shotPos = [];
		shotPos[0] = this.pos[0];
		shotPos[1] = this.pos[1];
		return new Bullet(shotPos, shotVel);
	}

})(this);