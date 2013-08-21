
var test = require('tape');

var Readable = require('_stream_readable');
var EE = require('events').EventEmitter;

test('stream2 - readable wrap empty', function (t) {
  var oldStream = new EE();
  oldStream.pause = function(){};
  oldStream.resume = function(){};

  var newStream = new Readable().wrap(oldStream);

  var ended = false;
  newStream
    .on('readable', function(){})
    .on('end', function(){ ended = true; });

  oldStream.emit('end');

  function done(){
    t.ok(ended);
    t.end();
  }
  newStream.on('end', done);
});