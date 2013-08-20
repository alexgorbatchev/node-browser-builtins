
var test = require('tape');

test('require dns should throw', function (t) {
  try {
    require('dns');
    t.ok(false, 'dns did not throw');
  } catch (e) {
    t.ok(true, 'dns did throw');
  }
  t.end();
});
