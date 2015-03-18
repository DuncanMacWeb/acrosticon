require("babel/register");

import {loadBigramCounts, loadDictionary, loadStemgrams} from './words-data'

var fs = require('fs');

loadBigramCounts().then(bigramScores => {  
  
  loadDictionary().then(dictionary => {
    
    loadStemgrams().then(stemgrams => {
      
      fs.writeFileSync('data/dictionary.json', JSON.stringify(dictionary), {encoding:'utf8'});

      fs.writeFileSync('data/stemgrams.json', JSON.stringify(stemgrams), {encoding:'utf8'});

      fs.writeFileSync('data/bigramScores.json', JSON.stringify(stemgrams), {encoding:'utf8'});

   
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

