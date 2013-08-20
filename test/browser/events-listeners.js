
var test = require('tape');

var events = require('events');

function listener() {}
function listener2() {}

test('listeners with only one item', function (t) {
  var e1 = new events.EventEmitter();

  e1.on('foo', listener);
  var fooListeners = e1.listeners('foo');
  t.deepEqual(e1.listeners('foo'), [listener]);

  e1.removeAllListeners('foo');
  t.deepEqual(e1.listeners('foo'), []);
  t.deepEqual(fooListeners, [listener]);

  t.end();
});

test('listeners is a copy', function (t) {
  var e2 = new events.EventEmitter();

  e2.on('foo', listener);
  var e2ListenersCopy = e2.listeners('foo');
  t.deepEqual(e2ListenersCopy, [listener]);
  t.deepEqual(e2.listeners('foo'), [listener]);

  e2ListenersCopy.push(listener2);
  t.deepEqual(e2.listeners('foo'), [listener]);
  t.deepEqual(e2ListenersCopy, [listener, listener2]);

  t.end();
});

test('listeners with two items', function (t) {
  var e3 = new events.EventEmitter();

  e3.on('foo', listener);
  var e3ListenersCopy = e3.listeners('foo');
  e3.on('foo', listener2);
  t.deepEqual(e3.listeners('foo'), [listener, listener2]);
  t.deepEqual(e3ListenersCopy, [listener]);

  t.end();
});