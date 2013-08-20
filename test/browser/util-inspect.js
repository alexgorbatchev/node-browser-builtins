
var test = require('tape');

var util = require('util');

test('util.inspect - test for sparse array', function (t) {
  var a = ['foo', 'bar', 'baz'];
  t.equal(util.inspect(a), '[ \'foo\', \'bar\', \'baz\' ]');
  delete a[1];
  t.equal(util.inspect(a), '[ \'foo\', , \'baz\' ]');
  t.equal(util.inspect(a, true), '[ \'foo\', , \'baz\', [length]: 3 ]');
  t.equal(util.inspect(new Array(5)), '[ , , , ,  ]');
  t.end();
});

test('util.inspect -  exceptions should print the error message, not \'{}\'', function (t) {
  t.equal(util.inspect(new Error()), '[Error]');
  t.equal(util.inspect(new Error('FAIL')), '[Error: FAIL]');
  t.equal(util.inspect(new TypeError('FAIL')), '[TypeError: FAIL]');
  t.equal(util.inspect(new SyntaxError('FAIL')), '[SyntaxError: FAIL]');
  t.end();
});
