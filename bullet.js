(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, radius, color) {
    Asteroids.MovingObj.call(this, pos, vel, radius, color)
  };

  Bullet.inherits(Asteroids.MovingObj);

  Bullet.RADIUS = 10;
  Bullet.COLOR = "blue"

  Bullet.addBullet = function(pos, dir) {
    var speed = [(dir[0]*(3/2)), (dir[1]*(3/2))]
    return new Bullet(
      pos,
      speed,
      Bullet.RADIUS,
      Bullet.COLOR
    )
  }

  Bullet.prototype.hitAsteroid = function(asteroids) {
    var that = this;
    var hit = false;

    asteroids.forEach( function(stroid) {
      if (that.isCollided(stroid)) {
        hit = stroid;
      }
    })

    return hit;
  };

}(this))