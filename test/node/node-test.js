
var test = require('tap').test;
var builtins = require('../../index.js');

test('test that all the modules are set', function (t) {
  t.deepEqual(Object.keys(builtins).sort(), [
    'assert',
    'buffer',
    'child_process',
    'console',
    'constants',
    'crypto',
    'dgram',
    'events',
    'fs',
    'http',
    'https',
    'net',
    'path',
    'process',
    'punycode',
    'querystring',
    'stream',
    'string_decoder',
    'sys',
    'timers',
    'tls',
    'tty',
    'url',
    'util',
    'vm',
    'zlib'
  ]);
  t.end();
});
