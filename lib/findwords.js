require("6to5/register");

var loadBigramCounts = require('./words-data').loadBigramCounts;
var sonnet = require('../data/sonnet').sonnet18

var lines = sonnet.split('\n')
var words = Array.prototype.concat(...lines.map(line => line.split(' ')))
var firstletters = words.map(word => word[0].toLowerCase()).join('')

console.log(firstletters)

//console.log(loadBigramCounts().then(b => b.toString()))

loadBigramCounts().then(data => {
  console.log(data);
});

