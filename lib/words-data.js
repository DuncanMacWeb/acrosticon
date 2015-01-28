"use strict";
var fs = require('fs');


export function loadBigramCounts() {

  var bigrams = {};
  
  var p1 = new Promise(
    (resolve, reject) => {
      
      var readable = fs.createReadStream('./data/count_2l.txt');
      readable.setEncoding('utf8');

      readable.on('data', function(chunk) {
        
        var lines = chunk.split('\n');
        
        lines.forEach(function (line) {
            line = line.trim();
            
            var tokens = line.split('\t')
            var bigram = tokens[0].trim();
            
            if (bigram.length > 0) {
              var score = parseInt(tokens[tokens.length - 1]);
            
              bigrams[bigram] = score;
            }
        });
      });

      readable.on('end', function() {
       
       resolve(bigrams);
      });
     }
  );
  
  return p1;
}


export function loadDictionary() {

  var dict = {};
  
  var p1 = new Promise(
    (resolve, reject) => {
      
      //var readable = fs.createReadStream('./data/count_1w.txt');
      var readable = fs.createReadStream('./data/british-english');
      readable.setEncoding('utf8');

      readable.on('data', function(chunk) {
        
        var lines = chunk.split('\n');
        
        lines.forEach(function (line) {
            line = line.trim();
            
            var tokens = line.split('\t')
            var word = tokens[0].trim();
            
            if (word.length > 2) {
              var score = parseInt(tokens[tokens.length - 1]);
            
              dict[word] = score;
            }
        });
      });

      readable.on('end', function() {
       
       resolve(dict);
      });
     }
  );
  
  return p1;
}
/*
loadBigramCounts().then(function(bigrams) {
  for (var bg in bigrams) {
    console.log(bg + " : " + bigrams[bg].toString());
  }
});
*/
