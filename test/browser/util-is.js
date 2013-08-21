
var test = require('tape');

var util = require('util');
var shims = require('../../builtin/_shims.js');

test('util.isArray', function (t) {
  t.equal(true, util.isArray([]));
  t.equal(true, util.isArray(Array()));
  t.equal(true, util.isArray(new Array()));
  t.equal(true, util.isArray(new Array(5)));
  t.equal(true, util.isArray(new Array('with', 'some', 'entries')));
  t.equal(false, util.isArray({}));
  t.equal(false, util.isArray({ push: function() {} }));
  t.equal(false, util.isArray(/regexp/));
  t.equal(false, util.isArray(new Error()));
  t.equal(false, util.isArray(shims.create(Array.prototype)));
  t.end();
});

test('util.isRegExp', function (t) {
  t.equal(true, util.isRegExp(/regexp/));
  t.equal(true, util.isRegExp(RegExp()));
  t.equal(true, util.isRegExp(new RegExp()));
  t.equal(false, util.isRegExp({}));
  t.equal(false, util.isRegExp([]));
  t.equal(false, util.isRegExp(new Date()));
  t.equal(false, util.isRegExp(shims.create(RegExp.prototype)));
  t.end();
});

test('util.isDate', function (t) {
  t.equal(true, util.isDate(new Date()));
  t.equal(true, util.isDate(new Date(0)));
  t.equal(false, util.isDate(Date()));
  t.equal(false, util.isDate({}));
  t.equal(false, util.isDate([]));
  t.equal(false, util.isDate(new Error()));
  t.equal(false, util.isDate(shims.create(Date.prototype)));
  t.end();
});

test('util.isError', function (t) {
  t.equal(true, util.isError(new Error()));
  t.equal(true, util.isError(new TypeError()));
  t.equal(true, util.isError(new SyntaxError()));
  t.equal(false, util.isError({}));
  t.equal(false, util.isError({ name: 'Error', message: '' }));
  t.equal(false, util.isError([]));
  t.equal(false, util.isError(shims.create(Error.prototype)));
  t.end();
});

test('util._extend', function (t) {
  t.deepEqual(util._extend({a:1}),             {a:1});
  t.deepEqual(util._extend({a:1}, []),         {a:1});
  t.deepEqual(util._extend({a:1}, null),       {a:1});
  t.deepEqual(util._extend({a:1}, true),       {a:1});
  t.deepEqual(util._extend({a:1}, false),      {a:1});
  t.deepEqual(util._extend({a:1}, {b:2}),      {a:1, b:2});
  t.deepEqual(util._extend({a:1, b:2}, {b:3}), {a:1, b:3});
  t.end();
});
