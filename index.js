'use strict';

var asyncThru = require('async-through');

/**
 * Streams values resulting from all the inner streams generated from the values of the outer stream.
 * 
 * @name exports
 * @function
 * @param getInnerStream {Function} function (outerValue) { .. } that returns a stream generated from the provided value
 * @return {Stream} that emits a value for each value provided by either of the inner streams
 */
var go = module.exports = function (getInnerStream) {
  var outerStream = asyncThru(onouter);

  var ondata = function (data) { outerStream.queue(data, true); };
  var onend  = function () { outerStream.queue(null); }

  function onouter (data) {
    getInnerStream(data)
      .on('data', function (data) { ondata.call(outerStream, data) })
      .on('end', onend);
  }

  return outerStream;
};
