# nest-stream [![build status](https://secure.travis-ci.org/thlorenz/nest-stream.png)](http://travis-ci.org/thlorenz/nest-stream)

[![testling badge](https://ci.testling.com/thlorenz/nest-stream.png)](https://ci.testling.com/thlorenz/nest-stream)

Stream that allows nesting another stream for each value of the outer stream and streams the flattened result.

```js
'use strict';

var nestStream = require('nest-stream')
  , through = require('through')
  , from = require('from');

var stream = nestStream(getInnerStream);

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

// => 11 13 14 15  21 23 24 25  31 33 34 35  41 43 44 45  ended
```

[more examples](https://github.com/thlorenz/nest-stream/tree/master/examples)

## Installation

    npm install nest-stream

## API

### *nestStream(getInnerStream[, sep])*

```
/**
 * Streams values resulting from all the inner streams generated from the values of the outer stream.
 * 
 * @name exports
 * @function
 * @param getInnerStream {Function} function (outerValue) { .. } that returns a stream generated from the provided value
 * @param sep {Object} (optional) 
 *  any non-null object to serve as a separator between values queued for one value piped by the outer stream
 *  default: ''
 * @return {Stream} that queues a value for each value provided by either of the inner streams
 */
```

## License

MIT
