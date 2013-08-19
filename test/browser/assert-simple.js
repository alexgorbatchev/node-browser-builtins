
var test = require('tape');

var assert = require('assert');

test('assert and assert.ok is the same', function (t) {
  t.equal(assert, assert.ok);
  t.end();
});

test('assert.ok - throw', function (t) {
  try {
    assert.ok(false);
    t.ok(false, 'catch not reached');
  } catch (e) {
    t.ok(true, 'catch reached');
  }
  t.end();
});

test('assert.ok - pass', function (t) {
  try {
    assert.ok(true);
    t.ok(true, 'catch not reached');
  } catch (e) {
    t.ok(false, 'catch reached');
  }
  t.end();
});
