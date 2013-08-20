
var test = require('tape');

test('require tls should throw', function (t) {
  try {
    require('tls');
    t.ok(false, 'tls did not throw');
  } catch (e) {
    t.ok(true, 'tls did throw');
  }
  t.end();
});
