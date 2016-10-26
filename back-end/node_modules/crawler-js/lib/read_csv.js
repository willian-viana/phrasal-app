readCsv = function(font,url,config){
  var file = './' + font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['file'];
  var stream = fs.createReadStream(file);
  var first = 0;
  stream.on('data', onData).buffer = '';

  function onData(chunk){
    var i, hasData = Buffer.isBuffer(chunk);
    if(hasData){
      stream.buffer += chunk.toString('utf8');
      if(stream.paused)
        return;
    }
    if ((i = stream.buffer.indexOf('\n')) > -1) {
      var line = stream.buffer.substring(0, i);
      stream.buffer = stream.buffer.substring(i + 1);
      stream.pause();
      stream.paused = true;
      onLine(font, url, config, line, onData, first);
    } else if (!hasData) {
      stream.resume();
      stream.paused = false;
    }
  }
  function onLine(font, url, config, line, cb, first){
    if(first == 1){
      first = 0;
      var interval = 0;
    }else{
      var interval = font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['interval'];
    }
    setTimeout(function(){
      line = line.replace('\r','').replace(/^"(.+(?="$))"$/, '$1');
      data = line.split('"'+font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['delimiter']+'"');
      if(data.length == 1){
        data = data[0].split(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['delimiter']);
      }
      toJson(font,url,data,config);
      cb();
    }, interval);
  }
}

var toJson = function(font,url,row,config){
  var data = font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['data'];
  var csvId = font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['csvId'];

  if(typeof row[data] !=='undefined' && row[data] !=''){
    if(typeof row[csvId] !=='undefined' && row[csvId] !=''){
      url.csvId = row[csvId];
    }
    if((typeof font['encode'+font['type']] != 'undefined' && font['encode'+font['type']] == true) || (typeof font['encode'+font['type']] == 'undefined' && font['type'] == 'get')){
      row[data] = encodeURIComponent(row[data].trim());
    }
    url[font['type']] = font[font['type']].replace(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['parameter'], row[data]);
    var fontTemp = clone(font);
    fontTemp[font['type']+'CurrentEntry']++;
    fontTemp[font['type']] = url[font['type']];
    getEntry(fontTemp,url,config);
  }
}
