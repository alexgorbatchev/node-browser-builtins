# Browser altenatives to built-in node.js modules

This is used by `browserify` module. Initially these files were in `node-browser-resolve`
but [disappeared in v1.0.1](https://github.com/shtylman/node-browser-resolve/commit/2799bcc316052a53fdafecd39576e14673a47ab0)
which broke `browserify` dependency. This module is that missing dependency.

[![Dependency status](https://david-dm.org/alexgorbatchev/node-browser-builtins.png)](https://david-dm.org/alexgorbatchev/node-browser-builtins) [![Build status](https://travis-ci.org/alexgorbatchev/node-browser-builtins.png)](https://travis-ci.org/alexgorbatchev/node-browser-builtins)

## Browser support

* Safari: latest
* Chrome: latest
* Firefox: latest
* Opera: latest
* Internet Explore: 10, 11

#### Legacy browsers

This decision behind not supporting legacy browsers was made to reduce the
maintenance and allow usage of more advanced browser features such as
TypedArrays. Please do not supply pull requests there adds support for
legacy browsers. Instead we recommend that you use the necessary polyfills
for legacy browser support. Should you be willing to start your own complete
browser-builtins polyfills project, then feel free to contact us for tips
and hints.

## Documentation

Requireing this module gives you a simple map between the modulename and a
filepath to the module containing the shim. You can then point to these files
in your pseudo-node implementation. Note that beyond the nodecore modules
there is also a process module, there mimics `global.process` in node.

```javascript
require('browser-builtins');
```

```javascript
{
  assert: '/user/node_modules/browser-builtins/builtin/assert.js',
  child_process: '/user/node_modules/browser-builtins/builtin/child_process.js',
  cluster: '/user/node_modules/browser-builtins/builtin/cluster.js',
  dgram: '/user/node_modules/browser-builtins/builtin/dgram.js',
  dns: '/user/node_modules/browser-builtins/builtin/dns.js',
  domain: '/user/node_modules/browser-builtins/builtin/domain.js',
  events: '/user/node_modules/browser-builtins/builtin/events.js',
  fs: '/user/node_modules/browser-builtins/builtin/fs.js',
  https: '/user/node_modules/browser-builtins/builtin/https.js',
  net: '/user/node_modules/browser-builtins/builtin/net.js',
  path: '/user/node_modules/browser-builtins/builtin/path.js',
  process: '/user/node_modules/browser-builtins/builtin/process.js',
  querystring: '/user/node_modules/browser-builtins/builtin/querystring.js',
  readline: '/user/node_modules/browser-builtins/builtin/readline.js',
  repl: '/user/node_modules/browser-builtins/builtin/repl.js',
  stream: '/user/node_modules/browser-builtins/builtin/stream.js',
  string_decoder: '/user/node_modules/browser-builtins/builtin/string_decoder.js',
  sys: '/user/node_modules/browser-builtins/builtin/sys.js',
  timers: '/user/node_modules/browser-builtins/builtin/timers.js',
  tls: '/user/node_modules/browser-builtins/builtin/tls.js',
  tty: '/user/node_modules/browser-builtins/builtin/tty.js',
  url: '/user/node_modules/browser-builtins/builtin/url.js',
  util: '/user/node_modules/browser-builtins/builtin/util.js',
  punycode: '/user/node_modules/browser-builtins/node_modules/punycode/punycode.js',
  http: '/user/node_modules/browser-builtins/node_modules/http-browserify/index.js',
  vm: '/user/node_modules/browser-builtins/node_modules/vm-browserify/index.js',
  crypto: '/user/node_modules/browser-builtins/node_modules/crypto-browserify/index.js',
  console: '/user/node_modules/browser-builtins/node_modules/console-browserify/index.js',
  zlib: '/user/node_modules/browser-builtins/node_modules/zlib-browserify/index.js',
  buffer: '/user/node_modules/browser-builtins/node_modules/buffer/index.js',
  constants: '/user/node_modules/browser-builtins/node_modules/constants-browserify/constants.json',
  os: '/user/node_modules/browser-builtins/node_modules/os-browserify/browser.js'
}
```

## Contribute

When fixing a bug please check the following:

1. Check that the bug do not exist in node and fix it there first
2. Check that updating the code from the node source dosn't fix it
3. It must be a browser issue, fix it here. But do please link to the browser bug report

## Testing

`node-browser-builtins` uses [zuul](https://github.com/defunctzombie/zuul) for client side testing. In summary, all you will need is a [Saucelabs](https://saucelabs.com) account (free one will work just fine). To get up and running with it, please follow [zuul instructions](https://github.com/defunctzombie/zuul/wiki/Cloud-testing).

Finally, just run:

    npm test

## History

1. "Forked" from `node-browser-resolve`, originally written by Roman Shtylman (@shtylman).
2. Major update to node v0.10 and tests (@AndreasMadsen)
3. no legacy browser support (IE10+)
