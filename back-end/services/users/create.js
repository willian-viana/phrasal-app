var mongojs = require('mongojs');
var db = mongojs('phrasalDB', ['users']);

exports.register = function(options, fn){
    db.users.find({
        email: options.data.email
    }, function(err, docs){
        if(err){
            if(typeof fn === "function") fn(err, 500);  
        }else if(!docs.length){
            db.users.insert(
                options.data,
                function(err, doc){
                    if(typeof fn === "function") fn(err, doc);  
                }
            );
        }else{
            if(typeof fn === "function") fn(new Error("There is already a user with this mail"), 400);  
        }
    });    
};