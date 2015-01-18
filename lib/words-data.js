var fs = require('fs');


export function loadBigramCounts(then) {
  var readable = fs.createReadStream('./data/count_2l.txt');
  readable.setEncoding('utf8');

  var bigrams = [];

  readable.on('data', function(chunk) {
    //console.log(chunk);
  });

  readable.on('end', function() {
     then(bigrams);
  });
}
