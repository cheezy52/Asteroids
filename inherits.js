Function.prototype.inherits = function(parentObj){
	function Surrogate() {};
	Surrogate.prototype = parentObj.prototype;
	this.prototype = new Surrogate ();
};

