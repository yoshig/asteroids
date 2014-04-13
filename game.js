(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx, numAsteroids) {
    this.ctx = ctx;
		this.numAsteroids = numAsteroids;
    this.asteroids = [];
    this.ship = Asteroids.Ship.newShip([Game.DIM_X / 2, Game.DIM_Y / 2]);
    this.bullets = [];
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 30;

  Game.addAsteroids = function(numAsteroids) {
    var asteroids = [];
    for (i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroids.Asteroid.newAsteroid(Game.DIM_X, Game.DIM_Y))
    }
    return asteroids;
  };

  Game.prototype.draw = function() {
    var that = this

		this.ctx.fillStyle = "#9ea7b8";
		this.ctx.fillRect(0,0,Game.DIM_X,Game.DIM_Y);
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(that.ctx);
    });
    this.bullets.forEach( function(bullet) {
      bullet.draw(that.ctx);
    })
    this.ship.draw(this.ctx);
		this.ctx.font="30px Arial";
		this.ctx.strokeText("Level " + this.level,10,50);
  };

  Game.prototype.move = function() {
    this.asteroids.forEach( function(asteroid) {
      asteroid.move();
    })
    this.bullets.forEach( function(bullet) {
      bullet.move();
    })
    this.ship.move();
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.checkCollisions();
    this.checkAsteroidPos();
		this.checkOutOfBounds(this.ship);
  };

  Game.prototype.start = function() {
		this.level = 0;
    this.bindKeyHandlers();
    this.timerId = setInterval(this.step.bind(this), this.FPS)
  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.asteroids.forEach( function(asteroid) {
      if (asteroid.isCollided(that.ship)) {
        alert("YOU SUNK MY BATTLE SHIP");
        that.stop();
      }
    })

    this.bullets.forEach( function(bullet) {
      var ast = bullet.hitAsteroid(that.asteroids);
      if (ast) {
				that.removeAsteroid(ast, bullet);
				if (ast.radius == Asteroids.Asteroid.RADIUS) {
					var minis = ast.crumble();
					minis.forEach(function(mini) {
						that.asteroids.push(mini);
					})
				}
      }
    })
  };

  Game.prototype.stop = function() {
    clearInterval(this.timerId);
  };

  Game.prototype.checkAsteroidPos = function() {
		if (this.asteroids.length == 0) {
			this.levelUp();
		}
    var that = this;
    this.asteroids.forEach(function(ast) {
      that.checkOutOfBounds(ast)
		});
  };

	Game.prototype.levelUp = function() {
		this.level = this.level + 1;
		this.asteroids = Game.addAsteroids( this.numAsteroids + (this.level * 2) - 1);
	};

  Game.prototype.bindKeyHandlers = function() {
    var that = this;

    key('w', function() { that.ship.power([0, -0.2]) });
    key('a', function() { that.ship.power([-0.2, 0]) });
    key('s', function() { that.ship.power([0, 0.2]) });
    key('d', function() { that.ship.power([0.2, 0]) });
    key('m', function() { that.fireBullet() });
  };

  Game.prototype.fireBullet = function () {
    var that = this;
    this.bullets.push(that.ship.fireBullet());
  };

  Game.prototype.removeAsteroid = function(ast, bullet) {
    var that = this;
    that.asteroids.splice(that.asteroids.indexOf(ast), 1)
    that.bullets.splice(that.bullets.indexOf(bullet), 1)
  };

  Game.prototype.checkOutOfBounds = function(obj) {
    if ((obj.pos[0] + obj.radius < 0) ||
    (obj.pos[0] - obj.radius > Game.DIM_X) ||
    (obj.pos[1] + obj.radius < 0) ||
    (obj.pos[1] - obj.radius > Game.DIM_Y)) {
    	obj.switchSides(Game.DIM_X, Game.DIM_Y)
    }
  };

})(this);















