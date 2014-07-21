
var test = require('tape');
var process = require('process');

test('process.nextTick works', function (t) {
  process.nextTick(function () {
    t.end();
  });
});

test('process.title is browser', function (t) {
  t.equal(process.title, 'browser');
  t.end();
});

test('process.env is an empty object', function (t) {
  t.deepEqual(process.env, {});
  t.end();
});

test('process.argv is an empty array', function (t) {
  t.deepEqual(process.argv, []);
  t.end();
});

test('process.cwd returns /', function (t) {
  t.equal(process.cwd(), '/');
  t.end();
});
