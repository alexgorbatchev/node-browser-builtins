
var test = require('tape');

test('require repl should throw', function (t) {
  try {
    require('repl');
    t.ok(false, 'repl did not throw');
  } catch (e) {
    t.ok(true, 'repl did throw');
  }
  t.end();
});
