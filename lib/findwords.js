"use strict";
require("6to5/register");

var loadBigramCounts = require('./words-data').loadBigramCounts;
var loadDictionary = require('./words-data').loadDictionary;
var sonnet = require('../data/sonnet').sonnet18

var lines = sonnet.split('\n')
var words = Array.prototype.concat(...lines.map(line => line.split(' ')))
var firstletters = words.map(word => word[0].toLowerCase()).join('')

firstletters = "madfneasaavegweewfd";

console.log(firstletters)

//console.log(loadBigramCounts().then(b => b.toString()))



function selectPossibleStart(possStarts) {
  if (possStarts.length === 0) {
    return -1;
  }
  
  return 0;
}

function isWord(letters) {
  
}

loadBigramCounts().then(bigramScores => {
  //console.log(bigramScores);
  
  
  loadDictionary().then(dictionary => {
    
    //console.log(dictionary);
  
    var possibleStarts = [{
      letters: firstletters[0] + "",
      indices: [0],
      score: 0
    }];
    var baseIndex = 0;
    
    
    while (baseIndex !== -1) {
      
      var base = possibleStarts[baseIndex];
      
      possibleStarts.splice(baseIndex, 1);
      
      for (var lookAhead = 1; lookAhead <= 10; lookAhead++) {
        
        var i = base.indices[base.indices.length - 1] + lookAhead;
        
        if (i < firstletters.length) {
        
          var newPossibility = {
            letters: base.letters + firstletters[i],
            indices: base.indices.slice(),
            score: base.score + 1
          };        
          newPossibility.indices.push(i);
          
          if ((newPossibility.letters in dictionary) || (newPossibility.letters.length <= 8)) {
            possibleStarts.splice(0, 0, newPossibility);
          }
          if (newPossibility.letters in dictionary) {
            console.log("in dict: " + newPossibility.letters);
          }
        }
      }
      
      baseIndex = selectPossibleStart(possibleStarts);
    }
    
    console.log("finished");

  }).catch(function (ex) {
    /* In IO.js, promises silently swallow exceptions unless you do the following:
     * (https://github.com/iojs/io.js/issues/600, oddly this seems to be by design)
     */
    setTimeout(function () {throw ex;}, 0);
  });
}).catch(function (ex) {
  setTimeout(function () {throw ex;}, 0);
});


