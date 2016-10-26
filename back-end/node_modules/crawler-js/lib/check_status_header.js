module.exports = function(code, permitted){
  var authorized = false;
  for(var i=0; i < permitted.length; i++){
    if(permitted[i] === code){
      var authorized = true;
    }
  }
  return authorized;
}
