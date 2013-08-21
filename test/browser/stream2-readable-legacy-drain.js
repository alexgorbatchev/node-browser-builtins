
var test = require('tape');
var Buffer = require('buffer').Buffer;

var Stream = require('stream');
var Readable = Stream.Readable;
var timers = require('timers');

test('stream2 - readable legacy drain', function (t) {
  var r = new Readable();
  var N = 256;
  var reads = 0;
  r._read = function(n) {
    return r.push(++reads === N ? null : new Buffer(1));
  };

  var rended = false;
  r.on('end', function() {
    rended = true;
  });

  var w = new Stream();
  w.writable = true;
  var writes = 0;
  var buffered = 0;
  w.write = function(c) {
    writes += c.length;
    buffered += c.length;
    timers.setImmediate(drain);
    return false;
  };

  function drain() {
    t.ok(buffered <= 2);
    buffered = 0;
    w.emit('drain');
  }


  var wended = false;
  w.end = function() {
    wended = true;
  };

  // Just for kicks, let's mess with the drain count.
  // This verifies that even if it gets negative in the
  // pipe() cleanup function, we'll still function properly.
  r.on('readable', function() {
    w.emit('drain');
  });

  r.pipe(w);
  function done() {
    t.ok(rended);
    t.ok(wended);
    t.end();
  }
  r.on('end', done);
});
