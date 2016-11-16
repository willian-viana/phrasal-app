const mongojs = require('mongojs'),
db = mongojs('phrasalDB', ['phrasalCollection']);

exports.find = function(options, fn){

    db.phrasalCollection.find({
        verb : { $regex: '^' + options + '.*', $options: 'i' } 
    }, {verb : 1, suggestions : 1, descriptions: 1}, function(err, doc){
        if(err){
            if(typeof fn === "function") fn(err, 500);  
        }else if(doc){
            if(typeof fn === "function") fn(err, doc);
        }else{
            if(typeof fn === "function") fn(new Error("There are no phrasal verbs with this verb"), 404);
        }
    });

}