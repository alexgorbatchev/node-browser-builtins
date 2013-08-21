
var test = require('tape');
var Stream = require('stream').Stream;

test('stream - pipe error handling - error listener catches', function (t) {
  var source = new Stream();
  var dest = new Stream();

  source.pipe(dest);

  var gotErr = null;
  source.on('error', function(err) {
    gotErr = err;
  });

  var err = new Error('This stream turned into bacon.');
  source.emit('error', err);
  t.strictEqual(gotErr, err);
  t.end();
});

test('stream - pipe erro handling - error without listener throws', function (t) {
  var source = new Stream();
  var dest = new Stream();

  source.pipe(dest);

  var err = new Error('This stream turned into bacon.');

  var gotErr = null;
  try {
    source.emit('error', err);
  } catch (e) {
    gotErr = e;
  }

  t.strictEqual(gotErr, err);
  t.end();
});
