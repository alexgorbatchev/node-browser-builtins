[ 'log',
  'info',
  'warn',
  'error',
  'dir',
  'time',
  'timeEnd',
  'trace',
  'assert',
  'Console' ]
.forEach(function(name){
	exports[name] = console && typeof console[name] === "function" ? console[name] : noop;
});

function noop(){}
