
var test = require('tape');

test('require fs should throw', function (t) {
  try {
    require('fs');
    t.ok(false, 'fs did not throw');
  } catch (e) {
    t.ok(true, 'fs did throw');
  }
  t.end();
});
