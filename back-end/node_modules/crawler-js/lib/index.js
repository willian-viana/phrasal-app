var map_urls = require('./map_urls');

module.exports = function(font,config){
  if(typeof config == 'undefined'){var config = {};}
  if(typeof font.preview == 'undefined'){font.preview = 0;}
  if(typeof font.tryAgain == 'undefined'){font.tryAgain = 0;}

  font.type = 'get',
  font.getAttributes = [],
  font.getCurrentEntry = 0,
  font.postAttributes = [],
  font.postCurrentEntry = 0;

  if(font.preview < 2){
    font.getAttributes = map_urls.getAttributes(font.get,config);
    font.postAttributes = map_urls.getAttributes(font.post,config);
    map_urls.getEntry(font,{get:font['get']},config);
  }else{
    map_urls.getEntry(font,{get:font['getSample']},config);
  }
};
