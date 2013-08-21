
var test = require('tape');
var Buffer = require('buffer').Buffer;
var Readable = require('stream').Readable;

test('stream2 - large read stall', function (t) {
  // If everything aligns so that you do a read(n) of exactly the
  // remaining buffer, then make sure that 'end' still emits.

  var READSIZE = 100;
  var PUSHSIZE = 20;
  var PUSHCOUNT = 1000;
  var HWM = 50;

  var r = new Readable({
    highWaterMark: HWM
  });
  var rs = r._readableState;

  r._read = push;

  r.on('readable', function() {
    do {
      var ret = r.read(READSIZE);
    } while (ret && ret.length === READSIZE);
  });

  var endEmitted = false;
  r.on('end', function() {
    endEmitted = true;
  });

  var pushes = 0;
  function push() {
    if (pushes > PUSHCOUNT)
      return;

    if (pushes++ === PUSHCOUNT) {
      return r.push(null);
    }

    if (r.push(new Buffer(PUSHSIZE)))
      setTimeout(push);
  }

  // start the flow
  var ret = r.read(0);

  function done() {
    t.equal(pushes, PUSHCOUNT + 1);
    t.ok(endEmitted);
    t.end();
  }
  r.on('end', done);
});
