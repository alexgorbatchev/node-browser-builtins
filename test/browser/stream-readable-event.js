
var test = require('tape');
var Buffer = require('buffer').Buffer;

var Readable = require('stream').Readable;

test('stream.Readable - readable event - first', function (t) {
  // First test, not reading when the readable is added.
  // make sure that on('readable', ...) triggers a readable event.
  var r = new Readable({
    highWaterMark: 3
  });

  var _readCalled = false;
  r._read = function(n) {
    _readCalled = true;
  };

  // This triggers a 'readable' event, which is lost.
  r.push(new Buffer('blerg'));

  var caughtReadable = false;
  setTimeout(function() {
    // we're testing what we think we are
    t.ok(!r._readableState.reading);
    r.on('readable', function() {
      caughtReadable = true;
      done();
    });
  });

  function done() {
    // we're testing what we think we are
    t.ok(!_readCalled);

    t.ok(caughtReadable);
    t.end();
  }
});

test('stream.Readable - readable event - second', function (t) {
  // second test, make sure that readable is re-emitted if there's
  // already a length, while it IS reading.

  var r = new Readable({
    highWaterMark: 3
  });

  var _readCalled = false;
  r._read = function(n) {
    _readCalled = true;
    if (_readCalled && caughtReadable) t.end();
  };

  // This triggers a 'readable' event, which is lost.
  r.push(new Buffer('bl'));

  var caughtReadable = false;
  setTimeout(function() {
    // assert we're testing what we think we are
    t.ok(r._readableState.reading);
    r.on('readable', function() {
      caughtReadable = true;
      if (_readCalled && caughtReadable) t.end();
    });
  });
});

test('stream.Readable - readable event - third', function (t) {
  // Third test, not reading when the stream has not passed
  // the highWaterMark but *has* reached EOF.
  var r = new Readable({
    highWaterMark: 30
  });

  var _readCalled = false;
  r._read = function(n) {
    _readCalled = true;
  };

  // This triggers a 'readable' event, which is lost.
  r.push(new Buffer('blerg'));
  r.push(null);

  var caughtReadable = false;
  setTimeout(function() {
    // assert we're testing what we think we are
    t.ok(!r._readableState.reading);
    r.on('readable', function() {
      caughtReadable = true;
      done();
    });
  });

  function done() {
    // we're testing what we think we are
    t.ok(!_readCalled);

    t.ok(caughtReadable);
    t.end();
  }
});
