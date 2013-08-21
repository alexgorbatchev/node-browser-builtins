
var R = require('stream').Readable;
var test = require('tape');
var Buffer = require('buffer').Buffer;

var util = require('util');
var EE = require('events').EventEmitter;

test('stream2 - compatibility', function (t) {

  var ondataCalled = 0;

  function TestReader() {
    R.apply(this);
    this._buffer = new Buffer(100);
    this._buffer.fill('x');

    this.on('data', function() {
      ondataCalled++;
    });
  }

  util.inherits(TestReader, R);

  TestReader.prototype._read = function(n) {
    this.push(this._buffer);
    this._buffer = new Buffer(0);
  };

  var reader = new TestReader();
  t.equal(ondataCalled, 1);
  t.end();
});