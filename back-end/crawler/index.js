var Crawler = require("js-crawler");
var cheerio = require('cheerio');
var mongojs = require('mongojs');
var db = mongojs('phrasalDB', ['phrasalCollection']);


db.on('connect', function() {
    console.log('database connected');
});


var objectPhrase = {};


new Crawler().configure({depth: 2})
  .crawl("https://www.englishclub.com/ref/Phrasal_Verbs", function onSuccess(page) {

    var $;

    $ = cheerio.load(page.content.toString('utf-8'));
    var items = $('.linklisting');

    items.each(function(){
      var verb; 
      var description;
      
      verb = $(this).find('h3.linktitle a').text();
      description = $(this).find('div.linkdescription').text();
    

      if(verb){
        verb = verb.replace(/\(.*\)/, '').trim();

        var v = objectPhrase[verb] || {descriptions : []};

        objectPhrase[verb] = v;

        v.verb = verb;

        var found = false;

        for(var i in v.descriptions){
          if(v.descriptions[i] == description){
            found = true;
            break;
          }
        }

        if (!found)
          v.descriptions.push(description);

        } 
    });
    
  }, null, function(){
    
    var count = 0;
    for(attr in objectPhrase){

      insertData({
        data : objectPhrase[attr],
        attr : attr
      }, function(){
        var length = Object.keys(objectPhrase).length;
        count++;
        if(count == length){
          db.close();
        }
      });
      
    }
       
  });


function insertData(options, fn){

  db.phrasalCollection.find({verb:options.attr},{verb : 1}, function(err, docs){
      console.log(options.attr);
      if(!docs || docs == undefined || docs == null || docs.length == 0){
        
        db.phrasalCollection.insert(options.data, function(err){
        });
        
      }else{
        console.log(docs);
      }

      if(typeof fn === "function"){
        fn();
      }                        
  });


}
