var mongojs = require('mongojs');
var db = mongojs('phrasalDB', ['phrasalCollection']);

exports.update = function(options, fn){

    console.log(options.data.verb + '' + options.data.suggestions);

    db.phrasalCollection.findAndModify({
         query: {
             verb : options.data.verb
        },
        update: { 
            $set : {
                suggestions: options.data.suggestions
            }
        },
        new : true  
    }, function(err, doc){
        if(err){
            if(typeof fn === "function") fn(err, 500);  
        }else{
            if(typeof fn === "function") fn(err, doc);  
        }
    });

}