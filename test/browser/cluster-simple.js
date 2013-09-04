
var test = require('tape');

test('require cluster should throw', function (t) {
  try {
    require('cluster');
    t.ok(false, 'cluster did not throw');
  } catch (e) {
    t.ok(true, 'cluster did throw');
  }
  t.end();
});
