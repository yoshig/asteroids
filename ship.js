(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, radius, color) {
    Asteroids.MovingObj.call(this, pos, vel, radius, color)
  };

  Ship.inherits(Asteroids.MovingObj);

  Ship.newShip = function(pos) {
    return new Ship(
      pos,
      [0, 0],
      Ship.RADIUS,
      Ship.COLOR
    );
  };

  Ship.COLOR = "GREEN";
  Ship.RADIUS = 10;

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function() {
    var speed = Math.sqrt(this.vel[0] * this.vel[0] + this.vel[1] * this.vel[1]);
    var dir =[(this.vel[0] / speed), (this.vel[1] / speed)];
    var bulletPos = [this.pos[0], this.pos[1]];

    return Asteroids.Bullet.addBullet(bulletPos, dir);
  }

})(this)