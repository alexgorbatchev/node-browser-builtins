
var test = require('tape');
var stream = require('stream');
var timers = require('timers');
var Buffer = require('buffer').Buffer;

function randomBytes(size) {
  var arr = [];
  for (var i = 0; i < size; i++) arr[i] = Math.floor(Math.random() * 256);
  return new Buffer(arr);
}

var util = require('util');

test('stream2 - unpipe drain', function (t) {
  function TestWriter() {
      stream.Writable.call(this);
  }
  util.inherits(TestWriter, stream.Writable);

  TestWriter.prototype._write = function (buffer, encoding, callback) {
    // super slow write stream (callback never called)
  };

  var dest = new TestWriter();

  function TestReader(id) {
      stream.Readable.call(this);
      this.reads = 0;
  }
  util.inherits(TestReader, stream.Readable);

  TestReader.prototype._read = function (size) {
    this.reads += 1;
    this.push(randomBytes(size));
  };

  var src1 = new TestReader();
  var src2 = new TestReader();

  src1.pipe(dest);

  src1.once('readable', function () {
    timers.setImmediate(function () {

      src2.pipe(dest);

      src2.once('readable', function () {
        timers.setImmediate(function () {

          src1.unpipe(dest);

          done();
        });
      });
    });
  });

  function done() {
    t.equal(src1.reads, 2);
    t.equal(src2.reads, 2);
    t.end();
  }
});
