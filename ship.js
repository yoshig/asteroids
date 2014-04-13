(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, radius, color, pts) {
    Asteroids.MovingObj.call(this, pos, vel, radius, color, pts)
  };

  Ship.inherits(Asteroids.MovingObj);

  Ship.newShip = function(pos) {
    return new Ship(
      pos,
      [0, 0],
      Ship.RADIUS,
      Ship.COLOR,
      Ship.getPts(0)
    );
  };

  Ship.getPts =function(dir) {
    console.log(dir)
    console.log([dir, dir + 1/3 * Math.PI, dir + 2/3 * Math.PI])
    return [dir, dir + 2/3 * Math.PI, dir + 4/3 * Math.PI]
  };

  Ship.COLOR = "GREEN";
  Ship.RADIUS = 10;

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    var dir;
    if (this.vel[0] == 0 && this.vel[1] == 0) {
      dir = 0;
    } else if (this.vel[0] == 0) {
      dir = this.vel[1] > 0 ? Math.PI : -Math.PI
    } else if (this.vel[1] == 0) {
      dir = this.vel[0] > 0 ? 0 : -2 * Math.PI
    } else {
      dir = this.vel[0] == 0 && this.vel[1] == 0 ? 0 : this.vel[0]/this.vel[1]
    }
    this.pts = Ship.getPts(Math.atan(dir));
    
  };

  Ship.prototype.fireBullet = function() {
    var speed = Math.sqrt(this.vel[0] * this.vel[0] + this.vel[1] * this.vel[1]);
    var dir =[(this.vel[0] / speed), (this.vel[1] / speed)];
    var bulletPos = [this.pos[0], this.pos[1]];

    return Asteroids.Bullet.addBullet(bulletPos, dir);
  };
})(this)