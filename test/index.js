
'use strict';
/*jshint asi: true */

var test = require('tape')

var nestStream = require('../')
  , concatStream = require('concat-stream')
  , from = require('from');


test('\ndefault separator', function (t) {

  var stream = nestStream(getInnerStream);
  function getInnerStream (outerVal) {
    return from([1 + outerVal, 3 + outerVal, 4 + outerVal, 5 + outerVal])
  }

  var ended;
  from([10, 20, 30, 40])
    .pipe(stream)
    .on('end', function () { ended = true })
    .pipe(concatStream(function (data) {
      t.ok(ended, 'ended')
      t.deepEqual(data, [ 11, 13, 14, 15, '', 21, 23, 24, 25, '', 31, 33, 34, 35, '', 41, 43, 44, 45, '' ], 'data')
      t.end()
    }))
})

test('\ncustom separator', function (t) {

  var sep = 'o/';
  var stream = nestStream(getInnerStream, sep);
  function getInnerStream (outerVal) {
    return from([1 + outerVal, 3 + outerVal, 4 + outerVal, 5 + outerVal])
  }

  var ended;
  from([10, 20, 30 ])
    .pipe(stream)
    .on('end', function () { ended = true })
    .pipe(concatStream(function (data) {
      t.ok(ended, 'ended')
      t.deepEqual(data, [ 11, 13, 14, 15, 'o/', 21, 23, 24, 25, 'o/', 31, 33, 34, 35, 'o/' ], 'data')
      t.end()
    }))
})
