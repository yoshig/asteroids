

(function(root) {

  Function.prototype.inherits = function(superClass) {
    function F() {};
    F.prototype = superClass.prototype;
    this.prototype = new F();
  }

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObj = Asteroids.MovingObj = function (pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObj.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObj.prototype.draw = function(ctx) {
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
  };

  MovingObj.prototype.isCollided = function(otherObj) {
    var x = Math.abs(this.pos[0] - otherObj.pos[0])
    var y = Math.abs(this.pos[1] - otherObj.pos[1])
    var distance = Math.sqrt(x * x + y * y);
    var radiiSum = this.radius + otherObj.radius

    return (radiiSum > distance);
  };

})(this);
