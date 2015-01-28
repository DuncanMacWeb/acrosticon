"use strict";
require("6to5/register");

var loadBigramCounts = require('./words-data').loadBigramCounts;
var loadDictionary = require('./words-data').loadDictionary;
var sonnet = require('../data/sonnet').sonnet18

var lines = sonnet.split('\n')
var words = Array.prototype.concat(...lines.map(line => line.split(' ')))
var firstletters = words.map(word => word[0].toLowerCase()).join('')

//firstletters = "tmadfhneasaavegweewfd";

console.log(firstletters)

//console.log(loadBigramCounts().then(b => b.toString()))



function selectPossibleStart(possStems) {
  if (possStems.length === 0) {
    return -1;
  }
  
  possStems.sort((a, b) => {
    return (b.score['2']) - (a.score['2']);
  });
  
  /*
  for (let i = 0; i < possStems.length; ++i) {
    console.log(i + " : " + possStems[i].letters + " : " + possStems[i].score['2']);
  }
  */
  return 0;
}


const minInterval = 1;
const maxInterval = 10;

const maxWordLength = 8;


loadBigramCounts().then(bigramScores => {  
  
  loadDictionary().then(dictionary => {
    
    // possibleStems tracks the start-of-word permutations (stems) we want to investigate as
    // possible begininnings of dictionary words. 
    //
    // So we simply start with a single character, "m" from firstletters "madfneasaavegweewfd"
    // This represents that we want to fully investigate all possible acrostics beginning
    // with the stem "m".
    // We will then loop through our stem array, and for each stem create a bunch
    // of new stems with a single extra character e.g. "ma", "md", "mf", etc
    
    let possibleStems = [{
      letters: firstletters[0] + "",
      indices: [0],
      score: {'2': 0, '3': 0}
    }];
    let stemIndex = 0;
    let wordsFound = {}
    
    do {
      
      let stem = possibleStems[stemIndex];
      
      //console.log("examining stem: " + stem.letters);

      // if it's a dictionary word, hurray!
      if (stem.letters in dictionary) {
        if (!(stem.letters in wordsFound)) {
          //console.log("in dict: " + stem.letters);
          wordsFound[stem.letters] = true;
        }
      }
      
      // We are now going to exaust the next lot of permutations for our previously selected
      // stem, so we remove it from the possibleStems array that keeps track of
      // possible word beginnings that haven't been exausted yet
      possibleStems.splice(stemIndex, 1);
      
      // Loop through all the next letters which we can add to our incomplete word
      //
      for (let lookAhead = minInterval; lookAhead <= maxInterval; lookAhead++) {
        
        let i = stem.indices[stem.indices.length - 1] + lookAhead;
        
        if (i < firstletters.length) {
        
          // Add an extra letter to create a single new stem
          let newPossibility = {}
          newPossibility.letters = stem.letters + firstletters[i];
          newPossibility.indices = stem.indices.slice();
          newPossibility.indices.push(i);
          // TODO: set the score for newPossibility.letters based on a smart
          // algorithm that scores incomplete actual word stems highly
          let bigram = newPossibility.letters[newPossibility.letters.length - 2] + newPossibility.letters[newPossibility.letters.length - 1]
          newPossibility.score = {'2': stem.score['2'] + (bigramScores[bigram] / 1000000000), '3': 0}
          
          // If this new stem isn't too long, then add it to the list of stems that we want to exaust
          if ((newPossibility.letters in dictionary) || (newPossibility.letters.length <= maxWordLength)) {
            possibleStems.splice(0, 0, newPossibility);
          }

          if (newPossibility.letters in dictionary) {
            console.log("in dict: " + newPossibility.letters + "\t\t\t[" + newPossibility.indices.join(',') + "]");
          }
        }
      }
      
      stemIndex = selectPossibleStart(possibleStems);
      
    } while (stemIndex !== -1);
    
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


