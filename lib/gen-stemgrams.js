require("6to5/register");

var loadDictionary = require('./words-data').loadDictionary;

loadDictionary().then(dictionary => {

  let stemCounts = {};
  
  for (let word in dictionary) {
    let firstLetter = word[0];
    if (firstLetter === firstLetter.toLowerCase()) {
      
      for (let length = 1; length <= word.length; length++) {
        let stem = word.slice(0, length);
        if (!(stem in stemCounts)) {
          stemCounts[stem] = 0;
        }
        stemCounts[stem]++;
      }
    }
  }
  
  for (let stem in stemCounts) {
    let str = stem + "\t" + stemCounts[stem];
    
    if (stem in dictionary) {
      str += "\t1"
    }
    console.log(str);
  }
    
}).catch(function (ex) {
  /* In IO.js, promises silently swallow exceptions unless you do the following:
   * (https://github.com/iojs/io.js/issues/600, oddly this seems to be by design)
   */
  setTimeout(function () {throw ex;}, 0);
});
