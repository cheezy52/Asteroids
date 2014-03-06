"use strict";
(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Bullet = Asteroids.Bullet;

	var Ship = Asteroids.Ship = function(pos, vel) {
		Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
	};

	Ship.inherits(Asteroids.MovingObject);
	Ship.RADIUS = 7;
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

	Ship.prototype.draw = function(ctx) {
		var startPos = this.pos;
		var startX = startPos[0];
		var startY = startPos[1];

		var shipAngle = Math.asin(this.facing()[1]);
		if(this.facing()[0] > 0) {
			if (shipAngle > 0) {
				shipAngle += ((Math.PI / 2) - shipAngle) * 2;
			} else {
				shipAngle -= ((-Math.PI / 2) + shipAngle) * 2;
			}
		}

		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.moveTo(startX - Math.cos(shipAngle) * Ship.RADIUS,
							 startY + Math.sin(shipAngle) * Ship.RADIUS);
		ctx.lineTo(startX - Math.cos(shipAngle + (2/3 * Math.PI)) * Ship.RADIUS,
							 startY + Math.sin(shipAngle + (2/3 * Math.PI)) * Ship.RADIUS);
		ctx.lineTo(startX, startY);
		ctx.lineTo(startX - Math.cos(shipAngle - (2/3 * Math.PI)) * Ship.RADIUS,
 							 startY + Math.sin(shipAngle - (2/3 * Math.PI)) * Ship.RADIUS);
		ctx.closePath();
		ctx.fill();

	}

})(this);