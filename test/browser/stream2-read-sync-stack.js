
var test = require('tape');
var Buffer = require('buffer').Buffer;
var Readable = require('stream').Readable;
var r = new Readable();
var N = 256 * 1024;

test('stream2 - read sync stack', function (t) {
  var reads = 0;
  r._read = function(n) {
    var chunk = reads++ === N ? null : new Buffer(1);
    r.push(chunk);
  };

  r.on('readable', function onReadable() {
    r.read(N * 2);
  });

  var ended = false;
  r.on('end', function onEnd() {
    ended = true;
  });

  r.read(0);

  function done() {
    t.ok(ended);
    t.end();
  }
  r.on('end', done);
});
