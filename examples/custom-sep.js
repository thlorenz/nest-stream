'use strict';

var nestStream = require('../')
  , through = require('through')
  , from = require('from');

var stream = nestStream(getInnerStream, '::');

function getInnerStream (outerVal) {
  return from([1 + outerVal, 3 + outerVal, 4 + outerVal, 5 + outerVal])
}

function stringify (data) {
  this.queue(data + ' ');
}

from([10, 20, 30, 40])
  .pipe(stream)
  .pipe(through(stringify))
  .on('end', function () { console.error('ended') })
  .pipe(process.stdout);

// => 11 13 14 15 :: 21 23 24 25 :: 31 33 34 35 :: 41 43 44 45 :: ended
