(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color, pts) {
    Asteroids.MovingObj.call(this, pos, vel, radius, color, pts)
  };

  Asteroid.inherits(Asteroids.MovingObj);
  Asteroid.COLOR = ["red", "orange", "yellow"];
  Asteroid.RADIUS = 25;

  Asteroid.newAsteroid = function (dimX, dimY) {
		// Will have to continue to fix
		var placement = Math.round(Math.random()) == 0 ? [dimX * Math.random(), 50] : [50, dimY * Math.random()]

    return new Asteroid(
      placement,
      Asteroid.randomVec(),
      this.RADIUS,
      this.COLOR[Math.floor(Math.random()*(this.COLOR.length))],
      Asteroid.createPts()
    );
  }

  Asteroid.randomVec = function() {
    var dx = (Math.random() * 1) - 0.5;
    var dy = (Math.random() * 1) - 0.5;

    return [dx, dy];
  };

  Asteroid.createPts = function() {
    var i = 0;
    var r = this.RADIUS;
    var astPts = [0];
    while (i < 2 * Math.PI) {
      i = i + Math.random()
      if (i < 2 * Math.PI) {
        astPts.push(i)
      }
    }
    astPts.push(2 * Math.PI)
    return astPts
  };

	Asteroid.prototype.crumble = function() {
		var minis = [];
		for (var i = 0; i < 3; i++) {
			minis.push(new Asteroid(
				[this.pos[0] + i, this.pos[1] + i],
				Asteroid.randomVec(),
				Asteroid.RADIUS * .7,
				Asteroid.COLOR[Math.floor(Math.random()*(Asteroid.COLOR.length))],
        Asteroid.createPts()
			))
		}
		return minis;
	};
})(this)