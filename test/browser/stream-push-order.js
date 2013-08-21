
var Readable = require('stream').Readable;
var test = require('tape');

test('stream - push order', function (t) {
  var s = new Readable({
    highWaterMark: 20,
    encoding: 'ascii'
  });

  var list = ['1', '2', '3', '4', '5', '6'];

  s._read = function (n) {
    var one = list.shift();
    if (!one) {
      s.push(null);
      done();
    } else {
      var two = list.shift();
      s.push(one);
      s.push(two);
    }
  };

  var v = s.read(0);

  // ACTUALLY [1, 3, 5, 6, 4, 2]

  function done() {
    t.deepEqual(s._readableState.buffer,
                     ['1', '2', '3', '4', '5', '6']);
    t.end();
  }
});