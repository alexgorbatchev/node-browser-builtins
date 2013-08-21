
var test = require('tape');
var Readable = require('stream').Readable;
var Buffer = require('buffer').Buffer;

// this test verifies that passing a huge number to read(size)
// will push up the highWaterMark, and cause the stream to read
// more data continuously, but without triggering a nextTick
// warning or RangeError.

test('stream - readable flow recursion', function (t) {

  var stream = new Readable({ highWaterMark: 2 });
  var reads = 0;
  var total = 5000;
  stream._read = function(size) {
    reads++;
    size = Math.min(size, total);
    total -= size;
    if (size === 0)
      stream.push(null);
    else
      stream.push(new Buffer(size));
  };

  var depth = 0;

  function flow(stream, size, callback) {
    depth += 1;
    var chunk = stream.read(size);

    if (!chunk)
      stream.once('readable', flow.bind(null, stream, size, callback));
    else
      callback(chunk);

    depth -= 1;
  }

  flow(stream, 5000, function() { });

  stream.on('end', function() {
    t.equal(reads, 2);
    // we pushed up the high water mark
    t.equal(stream._readableState.highWaterMark, 8192);
    // length is 0 right now, because we pulled it all out.
    t.equal(stream._readableState.length, 0);
    t.equal(depth, 0);
    t.end();
  });
});
