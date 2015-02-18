require("6to5/register");

var loadBigramCounts = require('./words-data').loadBigramCounts;
var loadDictionary = require('./words-data').loadDictionary;
var loadStemgrams = require('./words-data').loadStemgrams;
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
    return b.score - a.score;
  });
  
  /*
  for (let i = 0; i < possStems.length; ++i) {
    console.log(i + " : " + possStems[i].letters + " : " + possStems[i].score['2']);
  }
  */
  return 0;
}

function copyStem(stem) {
  let newStem = {};
  newStem.letters = stem.letters;
  newStem.indices = stem.indices.slice();
  newStem.words = stem.words.slice();
  newStem.score = stem.score;
  return newStem;
}

const minInterval = 6;
const maxInterval = 10;

const maxWordLength = 8;

    
var findWords = function* (bigramScores, dictionary, stemgrams) {
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
    words: [],
    score: {'2': 0, '3': 0}
  }];
  let stemIndex = 0;
  let wordsFound = {}
  
  do {
    
    let stem = possibleStems[stemIndex];
    
    //console.log("examining stem: " + stem.letters + " (stem.words = " + stem.words.join(" ") + ")");

    // if it's a dictionary word, hurray!
    if ((stem.words.length > 0) && (stem.letters.length == 0) && (stem.indices.slice(-1) >= (firstletters.length - maxInterval))) {
      let sentence = stem.words.join(" ");
      if (!(sentence in wordsFound)) {
        wordsFound[sentence] = true;
        yield {
          sentence: sentence,
          indices: stem.indices
        };
      }
    }
    
    // We are now going to exhaust the next lot of permutations for our previously selected
    // stem, so we remove it from the possibleStems array that keeps track of
    // possible word beginnings that haven't been exhausted yet
    possibleStems.splice(stemIndex, 1);
    
    // Loop through all the next letters which we can add to our incomplete word
    //
    for (let lookAhead = minInterval; lookAhead <= maxInterval; lookAhead++) {
      
      let i = stem.indices[stem.indices.length - 1] + lookAhead;
      
      if (i < firstletters.length) {
      
        // Add an extra letter to create a single new stem
        let newPossibility = copyStem(stem);
        newPossibility.letters += firstletters[i];
        newPossibility.indices.push(i);
        //let bigram = newPossibility.letters[newPossibility.letters.length - 2] + newPossibility.letters[newPossibility.letters.length - 1]
        //newPossibility.score = stem.score['2'] + (bigramScores[bigram] / 1000000000)
        newPossibility.score = (stemgrams[newPossibility.letters] || 0) * newPossibility.letters.length; // Prefer longer words

        
        if (newPossibility.score > 0) {
          
          if (newPossibility.letters in dictionary) {
            
            let currentWord = newPossibility.letters;
            // TODO: with a dictionary word that also is the beginning of a word, split newPossibility into two options
            // one where we use the dictionary word, the other where we aim for the longer word. 
            if (stemgrams[currentWord] > 1) {
              let longerPossibility = copyStem(newPossibility);
              possibleStems.splice(0, 0, longerPossibility);
              newPossibility.score /= 50.0;
            }
            
            newPossibility.words = [...newPossibility.words, newPossibility.letters];
            newPossibility.letters = "";
            
            possibleStems.splice(0, 0, newPossibility);
            
          // If this new stem isn't too long, then add it to the list of stems that we want to exhaust
          } else if (newPossibility.letters.length <= maxWordLength) {
            possibleStems.splice(0, 0, newPossibility);
          }
        }
        
      }
    }
    
    stemIndex = selectPossibleStart(possibleStems);
    
  } while (stemIndex !== -1);
  
  console.log("finished");
};

function printAcrostic(poemWords, indices, sentence) {
  console.log("--------------------\n" + sentence);
  let j = 0;
  let str = "";
  for (let i = 0; i < poemWords.length; ++i) {
    if (indices[j] === i) {
      j++;
      console.log("> " + str);
      str = "";
    }
    str += poemWords[i] + " ";
  }
  console.log("> " + str + "\n");

}

loadBigramCounts().then(bigramScores => {  
  
  loadDictionary().then(dictionary => {
    
    loadStemgrams().then(stemgrams => {


      let generator = findWords(bigramScores, dictionary, stemgrams);
      let n = 1;
      for (let item of generator) {
        printAcrostic(words, item.indices, item.sentence);
        if (n > 100) {
          break;
        }
        n++;
      }

    }).catch(function (ex) {
      setTimeout(function () {throw ex;}, 0);
    });
    
  }).catch(function (ex) {
    /* In IO.js, promises silently swallow exceptions unless you do the following:
     * (https://github.com/iojs/io.js/issues/600, oddly this seems to be by design)
     */
    setTimeout(function () {throw ex;}, 0);
  });
}).catch(function (ex) {
  setTimeout(function () {throw ex;}, 0);
});


