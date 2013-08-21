
var test = require('tape');

var Readable = require('stream').Readable;
var Writable = require('stream').Writable;
var util = require('util');

test('stream - pipe after end', function (t) {
  util.inherits(TestReadable, Readable);
  function TestReadable(opt) {
    if (!(this instanceof TestReadable))
      return new TestReadable(opt);
    Readable.call(this, opt);
    this._ended = false;
  }

  TestReadable.prototype._read = function(n) {
    if (this._ended)
      this.emit('error', new Error('_read called twice'));
    this._ended = true;
    this.push(null);
  };

  util.inherits(TestWritable, Writable);
  function TestWritable(opt) {
    if (!(this instanceof TestWritable))
      return new TestWritable(opt);
    Writable.call(this, opt);
    this._written = [];
  }

  TestWritable.prototype._write = function(chunk, encoding, cb) {
    this._written.push(chunk);
    cb();
  };

  // this one should not emit 'end' until we read() from it later.
  var ender = new TestReadable();
  var enderEnded = false;

  // what happens when you pipe() a Readable that's already ended?
  var piper = new TestReadable();
  // pushes EOF null, and length=0, so this will trigger 'end'
  piper.read();

  setTimeout(function() {
    ender.on('end', function() {
      enderEnded = true;
      if (enderEnded && writableFinished) t.end();
    });
    t.ok(!enderEnded);
    var c = ender.read();
    t.equal(c, null);

    var w = new TestWritable();
    var writableFinished = false;
    w.on('finish', function() {
      writableFinished = true;
      if (enderEnded && writableFinished) t.end();
    });
    piper.pipe(w);
  });
});
