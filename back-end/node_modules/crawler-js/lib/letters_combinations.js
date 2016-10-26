var getCombination = require('./get_combinations');

module.exports = function(size){
  var vowels = ['a','e','i','o','u'];
  var consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  var arrays = [];
  if(size == 1){
    return alphabet;
  }else{
    for(var i=0; i < size; i++){
      if(i % 2 === 0){
        arrays[i] = consonants;
      }else{
        arrays[i] = vowels;
      }
    }
    var combination = getCombination(arrays, combination);
    return combination.result;
  }
}
