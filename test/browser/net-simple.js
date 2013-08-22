
var test = require('tape');

test('require net should throw', function (t) {
  try {
    require('net');
    t.ok(false, 'net did not throw');
  } catch (e) {
    t.ok(true, 'net did throw');
  }
  t.end();
});
