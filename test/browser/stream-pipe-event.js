
var stream = require('stream');
var test = require('tape');
var util = require('util');

test('stream - pipe event', function (t) {
  function Writable() {
    this.writable = true;
    stream.Stream.call(this);
  }
  util.inherits(Writable, stream.Stream);

  function Readable() {
    this.readable = true;
    stream.Stream.call(this);
  }
  util.inherits(Readable, stream.Stream);

  var passed = false;

  var w = new Writable();
  w.on('pipe', function(src) {
    passed = true;
  });

  var r = new Readable();
  r.pipe(w);

  t.ok(passed);
  t.end();
});
