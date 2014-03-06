(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    Asteroids.MovingObj.call(this, pos, vel, radius, color)
  };

  Asteroid.inherits(Asteroids.MovingObj);
  Asteroid.COLOR = ["red", "orange", "yellow"];
  Asteroid.RADIUS = 25;

  Asteroid.randomAsteroid = function (dimX, dimY) {
    return new Asteroid(
      [dimX * Math.random(), dimY * Math.random()],
      Asteroid.randomVec(),
      this.RADIUS * Math.random(),
      this.COLOR[Math.floor(Math.random()*(this.COLOR.length))]
    );
  }

  Asteroid.randomVec = function() {
    var dx = (Math.random() * 1) - 0.5;
    var dy = (Math.random() * 1) - 0.5;

    return [dx, dy];
  };
})(this)