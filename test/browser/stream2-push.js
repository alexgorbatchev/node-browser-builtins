
var stream = require('stream');
var Readable = stream.Readable;
var Writable = stream.Writable;
var test = require('tape');
var timers = require('timers');

var EE = require('events').EventEmitter;

test('stream2 - push', function (t) {
  // a mock thing a bit like the net.Socket/tcp_wrap.handle interaction

  var stream = new Readable({
    highWaterMark: 16,
    encoding: 'utf8'
  });

  var source = new EE;

  stream._read = function() {
    readStart();
  };

  var ended = false;
  stream.on('end', function() {
    ended = true;
  });

  source.on('data', function(chunk) {
    var ret = stream.push(chunk);
    if (!ret)
      readStop();
  });

  source.on('end', function() {
    stream.push(null);
  });

  var reading = false;

  function readStart() {
    reading = true;
  }

  function readStop() {
    reading = false;
    timers.setImmediate(function() {
      var r = stream.read();
      if (r !== null)
        writer.write(r);
    });
  }

  var writer = new Writable({
    decodeStrings: false
  });

  var written = [];

  var expectWritten =
    [ 'asdfgasdfgasdfgasdfg',
      'asdfgasdfgasdfgasdfg',
      'asdfgasdfgasdfgasdfg',
      'asdfgasdfgasdfgasdfg',
      'asdfgasdfgasdfgasdfg',
      'asdfgasdfgasdfgasdfg' ];

  writer._write = function(chunk, encoding, cb) {
    written.push(chunk);
    timers.setImmediate(cb);
  };

  writer.on('finish', finish);


  // now emit some chunks.

  var chunk = "asdfg";

  var set = 0;
  readStart();
  data();
  function data() {
    t.ok(reading, 'reading 1');
    source.emit('data', chunk);
    t.ok(reading, 'reading 2');
    source.emit('data', chunk);
    t.ok(reading, 'reading 3');
    source.emit('data', chunk);
    t.ok(reading, 'reading 4');
    source.emit('data', chunk);
    t.ok(!reading, 'not reading 5');
    if (set++ < 5)
      setTimeout(data, 100);
    else
      end();
  }

  function finish() {
    t.deepEqual(written, expectWritten);
  }

  function end() {
    source.emit('end');
    t.ok(!reading, 'not reading end');
    writer.end(stream.read());
    setTimeout(function() {
      t.ok(ended, 'end emitted');
      t.end();
    });
  }
});