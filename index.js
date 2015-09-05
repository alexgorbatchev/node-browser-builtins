
var path = require('path');

// load core modules from builtin dir
function localModule(name) {
    return path.resolve(__dirname, 'builtin', name + '.js');
}

// manually add core which are provided by modules
module.exports = {
    "console": require.resolve('console-browserify/'),
    "constants": require.resolve('constants-browserify/'),
    "crypto": require.resolve('crypto-browserify/'),
    "http": require.resolve('http-browserify/'),
    "buffer": require.resolve('buffer/'),
    "os": path.resolve(require.resolve('os-browserify'), '..', 'browser.js'),
    "vm": require.resolve('vm-browserify/'),
    "zlib": require.resolve('zlib-browserify/'),
    "assert": require.resolve('assert/'),
    "child_process": localModule('child_process'),
    "cluster": localModule('child_process'),
    "dgram": localModule('dgram'),
    "dns": localModule('dns'),
    "domain": require.resolve('domain-browser/'),
    "events": require.resolve('events/'),
    "fs": localModule('fs'),
    "https": localModule('https'),
    "module": localModule('module'),
    "net": localModule('net'),
    "path": require.resolve('path-browserify/'),
    "process": path.resolve(require.resolve('process/'), '..', 'browser.js'),
    "punycode":  require.resolve('punycode/'),
    "querystring": localModule('querystring'),
    "readline": localModule('readline'),
    "repl": localModule('repl'),
    "stream": localModule('stream'),
    "string_decoder": require.resolve('string_decoder/'),
    "sys": localModule('sys'),
    "timers": localModule('timers'),
    "tls": localModule('tls'),
    "tty": require.resolve('tty-browserify/'),
    "url": localModule('url'),
    "util": localModule('util'),
    "_shims": localModule('_shims'),
    "_stream_duplex": localModule('_stream_duplex'),
    "_stream_readable": localModule('_stream_readable'),
    "_stream_writable": localModule('_stream_writable'),
    "_stream_transform": localModule('_stream_transform'),
    "_stream_passthrough": localModule('_stream_passthrough')
};
