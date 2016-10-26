var fs = require("fs");

getProxies = function(){
  var file = './proxies.txt';
  fs.exists(file, function(exists){
    if(exists){
      var csvConverter=new Converter({constructResult:false});
      var readStream=fs.createReadStream(file);
      var started = false;
      proxies = [];
      csvConverter.on("record_parsed",function(row){
        rowTemp = [];
        if(started == false){
          for(i in row){
            rowTemp.push(i);
          }
          started = true;
        }else{
          for(i in row){
            rowTemp.push(row[i]);
          }
        }
        proxies.push(rowTemp);
      });
      csvConverter.pipe(readStream);
    }
  });
}

getRandomProxy = function(){
  if(typeof proxies != 'undefined'){
    var proxy = proxies[Math.floor(Math.random() * proxies.length)];
    return proxy[0];
  }else{
    return false;
  }
}

getProxies();
