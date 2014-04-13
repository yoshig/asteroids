(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    Asteroids.MovingObj.call(this, pos, vel, radius, color)
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
      this.COLOR[Math.floor(Math.random()*(this.COLOR.length))]
    );
  }

  Asteroid.randomVec = function() {
    var dx = (Math.random() * 1) - 0.5;
    var dy = (Math.random() * 1) - 0.5;

    return [dx, dy];
  };

	Asteroid.prototype.crumble = function() {
		var minis = [];
		for (var i = 0; i < 3; i++) {
			minis.push(new Asteroid(
				[this.pos[0] + i, this.pos[1] + i],
				Asteroid.randomVec(),
				Asteroid.RADIUS * .7,
				Asteroid.COLOR[Math.floor(Math.random()*(Asteroid.COLOR.length))]
			))
		}
		return minis;
	};
})(this)