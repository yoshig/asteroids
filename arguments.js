var sum = function() {
  var total = 0;
  for(var i = 0; i<arguments.length; i++){
    total += arguments[i]
  }
  return total;
};

// console.log(sum(2,3,4));

Function.prototype.myBind = function() {
  newArr = Array.prototype.slice.apply(arguments).slice(1)
  var obj = arguments[0]
  var that = this
  fn = function() {
    that.apply(obj, newArr)
  };
  return fn();
}

// function times(num, fun) {
//   for (var i = 0; i < num; i++) {
//     fun(); // call is made "function-style"
//   }
// }
//
// var cat = {
//   age: 5,
//
//   age_one_year: function () {
//     this.age += 1;
//   },
//
//   meow: function(n) {
//       for (var i = 0; i < n; i++) {
//         console.log("meow");
//       }
//   }
// };

// cat.meow.myBind(cat, 10);

var curriedSum = function(numArgs) {
  var numbers = [];

  var _curriedSum = function(n) {
    numbers.push(n);

    if (numbers.length == numArgs) {
      var total = 0;
      for ( var i = 0; i < numbers.length; i++ ) {
        total += numbers[i];
      }
      return total;
    } else {
      return _curriedSum;
    }
  };

  return _curriedSum;
}

// var sum2 = curriedSum(4);
// console.log(sum2)
// console.log(sum2(5)(30)(20)(1));
//
// console.log(sum2(5, 31)(20)(1));

Function.prototype.curry = function(numArgs) {
  var args = [];
  var that = this;

  var _curriedArgs = function(arg) {
    newArr = Array.prototype.slice.apply(arguments)
    args.push(newArr);

    if (args.length == numArgs) {
      mergedArgs = [];
      mergedArgs = mergedArgs.concat.apply(mergedArgs, args)
      return that.apply(null, mergedArgs);
    } else {
      return _curriedArgs;
    }
  }

  return _curriedArgs;
}

// x = sum.curry(3)
// console.log(x(2,3,4)(5,6)(7,8));








