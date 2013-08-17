'use strict';

// demonstrates how to split up generated values into three times as many via async-through
var nestStream = require('../')
  , asyncThru = require('async-through')
  , from = require('from')
  , sep = '';

var stream = nestStream(getInnerStream, sep);

function getInnerStream (outerVal) {
  return from([1 + outerVal, 3 + outerVal, 4 + outerVal, 5 + outerVal])
}

function transform (data) {
  // ignore queued separators, but queue non-null value to keep stream going
  if (data === sep) return this.queue(sep);

  setTimeout(function () {
    this.queue('\nn    : ' + data, true);
    this.queue('\nn * 2: ' + data * 2, true);
    this.queue('\nn / 2: ' + data / 2 + '\n');
  }.bind(this), 100);
}


from([10, 20, 30, 40])
  .pipe(stream)
  .pipe(asyncThru(transform))
  .on('end', function () { console.error('ended') })
  .pipe(process.stdout);

/* =>
 *  n    : 11
 *  n * 2: 22
 *  n / 2: 5.5
 *
 *  n    : 13
 *  n * 2: 26
 *  n / 2: 6.5
 *
 *  n    : 14
 *  n * 2: 28
 *  n / 2: 7
 *  
 *  [ ... ]
 *
 *  n    : 44
 *  n * 2: 88
 *  n / 2: 22
 *
 *  n    : 45
 *  n * 2: 90
 *  n / 2: 22.5
 *  ended
 */
 
 
 
 
 
 
 
 
 
 
