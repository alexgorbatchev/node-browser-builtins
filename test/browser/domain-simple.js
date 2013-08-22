
var test = require('tape');

test('require domain should throw', function (t) {
  try {
    require('domain');
    t.ok(false, 'domain did not throw');
  } catch (e) {
    t.ok(true, 'domain did throw');
  }
  t.end();
});
