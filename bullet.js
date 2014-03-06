"use strict";
(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Bullet = Asteroids.Bullet = function(pos, vel) {
		Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
	};

	Bullet.RADIUS = 2;
	Bullet.COLOR = "blue";
	Bullet.SHOT_VEL_SCALE = 10;

	Bullet.inherits(Asteroids.MovingObject);



})(this);