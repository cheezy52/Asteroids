"use strict";
(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color){
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
	}

	MovingObject.prototype.move = function(xDim, yDim){
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
		if (this.offBoard(xDim, yDim)){
			this.wrap(xDim, yDim);
		}
	}

	MovingObject.prototype.draw = function(ctx){
		ctx.lineWidth = this.radius / 12;
		ctx.strokeStyle = 'white';

		ctx.fillStyle = this.color;
		ctx.beginPath();

		ctx.arc(
			this.pos[0],
			this.pos[1],
			this.radius,
			0,
			2 * Math.PI,
			false
		);

		ctx.fill();
		ctx.stroke();
	};

	MovingObject.prototype.isCollidedWith = function(obj){
		var dist = Math.sqrt(Math.pow((this.pos[0] - obj.pos[0]), 2) +
												 Math.pow((this.pos[1] - obj.pos[1]), 2));
		return (dist <= (this.radius + obj.radius));
	};

	MovingObject.prototype.offBoard = function(xDim, yDim){
		return (this.pos[0] < 0 ||
				this.pos[0] > xDim ||
				this.pos[1] < 0 ||
				this.pos[1] > yDim);
	};

	MovingObject.prototype.wrap = function(xDim, yDim){
		if(this.pos[0] < 0){
			this.pos[0] += xDim;
		}
		if(this.pos[0] > xDim){
			this.pos[0] -= xDim;
		}
		if(this.pos[1] < 0){
			this.pos[1] += yDim;
		}
		if(this.pos[1] > yDim){
			this.pos[1] -= yDim;
		}

	}

})(this);