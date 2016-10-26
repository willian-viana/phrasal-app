var utils = require('./utils');
  get_html = require('./get_html'),
  lettersCombinations = require('./letters_combinations.js'),
  querystring = require('querystring'),
  mongoq = require('mongoq');

var getAttributes = function(entry,config){
  var csv = /\[csv:[^:]{0,}:[^:]{0,}:(.[0-9]{0,10}?):(.[0-9]{0,10}?)\]/gim;
  var mongodb = /\[mongodb:[^:]{0,}:[^:]{0,}:[^:]{0,}\]/gim;
  var words = /\[words:\[[^\]]{0,}\]\]/gim;
  var numbers = /\[numbers:(.[0-9]{0,10}?):(.[0-9]{0,10}?):(.[0-9]{0,10}?)\]/gim;
  var letters = /\[letters:(.[0-9]{0,}?)\]/gim;
  var types = [];

  if(words.test(entry) == true){
    var types = types.concat(entry.match(words));
  }
  if(numbers.test(entry) == true){
    var types = types.concat(entry.match(numbers));
  }
  if(letters.test(entry) == true){
    var types = types.concat(entry.match(letters));
  }
  if(mongodb.test(entry) == true){
    var types = types.concat(entry.match(mongodb));
  }
  if(csv.test(entry) == true){
    var types = types.concat(entry.match(csv));
  }
  var allAttributes = [];
  for(n in types){
    var url = types[n].replace(/(\[|\])/gim,'');
    var attribute = url.split(':');

    var attributes = [];
    attributes['name'] = attribute[0];
    attributes['parameter'] = types[n];

    if(attribute[0] == 'words'){
      attribute = attribute.splice(1);
      attributes['init'] = 0;
      attributes['words'] = attribute;
      attributes['total'] = attribute.length-1;
    }
    else if(attribute[0] == 'numbers'){
      attributes['init'] = parseInt(attribute[1]);
      attributes['size'] = parseInt(attribute[2]);
      attributes['diff'] = parseInt(attribute[3]);
      attributes['total'] = parseInt((attributes['size']-attributes['init'])/attributes['diff']);
    }
    else if(attribute[0] == 'letters'){
      attributes['init'] = 0;
      attributes['letters'] = lettersCombinations(parseInt(attribute[1]));
      attributes['total'] = attributes['letters'].length-1;
    }
    else if(attribute[0] == 'mongodb'){
      attributes['collection'] = attribute[1];
      attributes['key'] = attribute[2];
      attributes['id'] = attribute[3];
      if(typeof dbUrls == 'undefined'){
        dbUrls = mongoq(config.mongoDB, {auto_reconect:false, safe:false, timeout: 1, host:config.mongoDBHost, port:config.mongoDBPort});
      }
    }
    else if(attribute[0] == 'csv'){
      attributes['file'] = attribute[1];
      attributes['delimiter'] = attribute[2];
      attributes['data'] = attribute[3];
      attributes['csvId'] = attribute[4];
      attributes['total'] = 0;
    }
    if(attributes['total'] == 0){attributes['total']=1;}
    attributes['first']=1;
    allAttributes[n] = attributes;
  }
  return allAttributes;
}

var getEntry = function(font,url,config){
  if(typeof font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']] !== 'undefined'){
    for(var c = font[font['type']+'Attributes'].length-1; c>=0; c--){
      if(c == font[font['type']+'Attributes'].length-1){
        font[font['type']+'Attributes'][c]['interval'] = font.interval;
      }else{
        font[font['type']+'Attributes'][c]['interval'] = font[font['type']+'Attributes'][c+1]['interval']*(font[font['type']+'Attributes'][c+1]['total']+1);
      }
    }
    var count = 0;
    if(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['first'] == 1){
      font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['first'] = 0;
      getTypeUrl(font,url,config);
      count++;
    }
    if(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['name'] != 'csv'){
      var i = setInterval(function(){
        getTypeUrl(font,url,config);
        count++;
        if(count > font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['total']){
          clearInterval(i);
        }
      }, font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['interval']);
    }
  }else{
    if(font[font['type']+'Attributes'].length == 0){
      if(font.preview > 1){
        url['get'] = font['getSample'];
        if(font['postSample'] != ''){
          url['post'] = font['postSample'];
        }
      }else{
        url['get'] = font['get'];
        if(font['post'] != ''){
          url['post'] = font['post'];
        }
      }
    }
    putItem(font,url,config);
  }
}

var getTypeUrl = function(font,url,config){
  if(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['name'] == 'words'){
    words(font,url,config);
  }
  else if(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['name'] == 'numbers'){
    numbers(font,url,config);
  }
  else if(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['name'] == 'letters'){
    letters(font,url,config);
  }
  else if(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['name'] == 'mongodb'){
    readMongoDb(font,url,config);
  }
  else if(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['name'] == 'csv'){
    readCsv(font,url,config);
  }
}

var numbers = function(font,url,config){
  url[font['type']] = font[font['type']].replace(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['parameter'],font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init']);
  font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init'] = font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init']+font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['diff'];
  var fontTemp = utils.clone(font);
  fontTemp[font['type']+'CurrentEntry']++;
  fontTemp[font['type']] = url[font['type']];
  getEntry(fontTemp,url,config);
}

var letters = function(font,url,config){
  url[font['type']] = font[font['type']].replace(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['parameter'],font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['letters'][font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init']]);
  font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init'] = font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init']+1;
  var fontTemp = utils.clone(font);
  fontTemp[font['type']+'CurrentEntry']++;
  fontTemp[font['type']] = url[font['type']];
  getEntry(fontTemp,url,config);
}

var words = function(font,url,config){
  if((typeof font['encode'+font['type']] != 'undefined' && font['encode'+font['type']] == true) || (typeof font['encode'+font['type']] == 'undefined' && font['type'] == 'get')){
    var urlTemp = encodeURIComponent(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['words'][font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init']]);
  }else{
    var urlTemp = font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['words'][font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init']];
  }
  url[font['type']] = font[font['type']].replace(font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['parameter'],urlTemp);
  font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init'] = font[font['type']+'Attributes'][font[font['type']+'CurrentEntry']]['init']+1;
  var fontTemp = utils.clone(font);
  fontTemp[font['type']+'CurrentEntry']++;
  fontTemp[font['type']] = url[font['type']];
  getEntry(fontTemp,url,config);
}

var putItem = function (font,url,config){
  if((font['get'] != '' && font['post'] == '') || (font['get'] != '' && font['post'] != '' && font['type'] == 'post')){
    if(font.preview === 1){
      console.log(JSON.stringify(url));
    }else{
      var font = utils.clone(font);
      var url = utils.clone(url);
      get_html.getHtml(font,url,config);
    }
  }else{
    font['type'] = "post";
    var fontTemp = utils.clone(font);
    fontTemp[font['type']+'CurrentEntry']=0;
    getEntry(fontTemp,url,config);
    font['type'] = "get";
  }
}

module.exports = {
  getAttributes: getAttributes,
  getEntry: getEntry
};
