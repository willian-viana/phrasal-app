var mongojs = require('mongojs');
var db = mongojs('phrasalDB', ['phrasalCollection']);

exports.update = function(options, fn){

    db.phrasalCollection.findAndModify({
         query: {
             verb : options.data.verb
        },
        update: { 
            $push : { 
                suggestions : options.data.suggestion
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

