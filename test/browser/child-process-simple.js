
var test = require('tape');

test('require child_process should throw', function (t) {
  try {
    require('child_process');
    t.ok(false, 'child_process did not throw');
  } catch (e) {
    t.ok(true, 'child_process did throw');
  }
  t.end();
});
