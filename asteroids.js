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

	Asteroid.moveAsteroid = function (ast, dimX, dimY) {
		return new Asteroid(
			[Math.abs(Math.abs(ast.pos[0]) - dimX), Math.abs(Math.abs(ast.pos[1]) - dimY)],
			ast.vel,
			ast.radius,
			ast.color
		)
	}

  Asteroid.randomVec = function() {
    var dx = (Math.random() * 1) - 0.5;
    var dy = (Math.random() * 1) - 0.5;

    return [dx, dy];
  };
})(this)