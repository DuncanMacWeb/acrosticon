"use strict";
var fs = require('fs');


export function loadBigramCounts() {

  var bigrams = {};
  
  return new Promise(
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
}


export function loadStemgrams() {

  var stemgrams = {};
  
  return new Promise(
    (resolve, reject) => {
      
      var readable = fs.createReadStream('./data/stemgrams');
      readable.setEncoding('utf8');

      readable.on('data', function(chunk) {
        
        var lines = chunk.split('\n');
        
        lines.forEach(function (line) {
            line = line.trim();
            
            var tokens = line.split('\t')
            var stem = tokens[0].trim();
            
            if (stem.length > 0) {
              var score = parseInt(tokens[1]);
              
              var inDic = false;
              if (tokens.length > 1) {
                inDic = parseInt(tokens[2]) == 1;
              }
            
              stemgrams[stem] = score;
            }
        });
      });

      readable.on('end', function() {
       
       resolve(stemgrams);
      });
     }
  );
}


export function loadDictionary() {

  var dict = {};
  
  return new Promise(
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
}
/*
loadBigramCounts().then(function(bigrams) {
  for (var bg in bigrams) {
    console.log(bg + " : " + bigrams[bg].toString());
  }
});
*/
