module.exports = function(allOptionsArray, combination){
  if(typeof combination == 'undefined'){
    var combination = {codes : [], result : [], counter : 0};
  }
  if(allOptionsArray.length > 0){
    for(var i = 0; i < allOptionsArray[0].length; i++){
      var tmp = allOptionsArray.slice(0);
      combination.codes[combination.counter] = allOptionsArray[0][i];
      tmp.shift();
      combination.counter++;
      getCombination(tmp, combination);
    }
  }else{
    var combi = combination.codes.slice(0).toString().replace(/(,)/gim,'');
    combination.result.push(combi);
  }
  combination.counter--;
  return combination;
}
