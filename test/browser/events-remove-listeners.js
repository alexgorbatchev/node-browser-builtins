
var test = require('tape');

var events = require('events');

var count = 0;

function listener1() {
  console.log('listener1');
  count++;
}

function listener2() {
  console.log('listener2');
  count++;
}

function listener3() {
  console.log('listener3');
  count++;
}

test('removeListener emits and listeners array becomes empty', function (t) {
  var e1 = new events.EventEmitter();

  var emitted = false;
  e1.on('hello', listener1);
  e1.on('removeListener', function(name, cb) {
    t.equal(name, 'hello');
    t.equal(cb, listener1);
    emitted = true;
  });

  e1.removeListener('hello', listener1);
  t.deepEqual([], e1.listeners('hello'));

  t.ok(emitted, 'removeListener did fire');
  t.end();
});

test('removeing inactive handler dose nothing', function (t) {
  var e2 = new events.EventEmitter();

  var emitted = false;
  e2.on('hello', listener1);
  e2.on('removeListener', function () {
    emitted = true;
  });
  e2.removeListener('hello', listener2);
  t.deepEqual([listener1], e2.listeners('hello'));

  t.ok(!emitted, 'removeListener did not fire');
  t.end();
});

test('removeListener only removes one handler', function (t) {
  var e3 = new events.EventEmitter();

  var emitted = false;
  e3.on('hello', listener1);
  e3.on('hello', listener2);
  e3.on('removeListener', function(name, cb) {
    emitted = true;
    t.equal(name, 'hello');
    t.equal(cb, listener1);
  });
  e3.removeListener('hello', listener1);
  t.deepEqual([listener2], e3.listeners('hello'));

  t.ok(emitted, 'removeListener did fired');
  t.end();
});

test('regression: removing listener with in removeListener', function (t) {
  var e4 = new events.EventEmitter();

  function remove1() { t.ok(false); }
  function remove2() { t.ok(false); }

  var fired = 0;
  e4.on('removeListener', function(name, cb) {
    fired += 1;
    if (cb !== remove1) return;
    this.removeListener('quux', remove2);
    this.emit('quux');
  });
  e4.on('quux', remove1);
  e4.on('quux', remove2);
  e4.removeListener('quux', remove1);

  t.equal(fired, 2);
  t.end();
});
