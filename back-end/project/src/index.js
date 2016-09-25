var Crawler = require("js-crawler");
var cheerio = require('cheerio');
var mongojs = require('mongojs');
var db = mongojs('phrasalDB', ['phrasalcollection']);


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
        for(i in objectPhrase){
            db.phrasalcollection.find({verb:"'" + i + "'"}, function(err, docs){
              // if(!docs) db.phrasalcollection.insert(objectPhrase[i]);
              console.log(docs);
            });
            
           
        }

        
  });


