
var test = require('tape');

test('require readline should throw', function (t) {
  try {
    require('readline');
    t.ok(false, 'readline did not throw');
  } catch (e) {
    t.ok(true, 'readline did throw');
  }
  t.end();
});
