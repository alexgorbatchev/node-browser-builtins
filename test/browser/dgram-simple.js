
var test = require('tape');

test('require dgram should throw', function (t) {
  try {
    require('dgram');
    t.ok(false, 'dgram did not throw');
  } catch (e) {
    t.ok(true, 'dgram did throw');
  }
  t.end();
});
