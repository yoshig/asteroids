

(function(root) {

  Function.prototype.inherits = function(superClass) {
    function F() {};
    F.prototype = superClass.prototype;
    this.prototype = new F();
  }

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObj = Asteroids.MovingObj = function (pos, vel, radius, color, pts) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.pts = pts
  };

  MovingObj.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObj.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    if(this.pts) {
      var rotate = (this.pos[0] + this.pos[1] % 50) / 50;
      var x = this.pos[0], y = this.pos[1], r = this.radius, that = this;
      ctx.moveTo(x + Math.sin(rotate) * r + 4, y + Math.cos(rotate) * r + 4);
      this.pts.forEach(function(corner) {
        var pt = corner + rotate
        ctx.lineTo(x + Math.sin(pt) * r + 4, y + Math.cos(pt) * r + 4)
      })
      ctx.lineTo(x + Math.sin(rotate) * r + 4, y + Math.cos(rotate) * r + 4);
    } else {
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI,
        false
      );
    }
    ctx.fill();
  };

  MovingObj.prototype.isCollided = function(otherObj) {
    var x = Math.abs(this.pos[0] - otherObj.pos[0])
    var y = Math.abs(this.pos[1] - otherObj.pos[1])
    var distance = Math.sqrt(x * x + y * y);
    var radiiSum = this.radius + otherObj.radius

    return (radiiSum > distance);
  };

	MovingObj.prototype.switchSides = function(dimX, dimY) {
		this.pos = [Math.abs(Math.abs(this.pos[0]) - dimX), Math.abs(Math.abs(this.pos[1]) - dimY)];
	}

})(this);
