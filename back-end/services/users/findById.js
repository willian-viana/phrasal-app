var mongojs = require('mongojs');
var db = mongojs('phrasalDB', ['users']);


exports.find = function(options, fn){
    db.users.findOne({
        _id: mongojs.ObjectId(options)
    }, function(err, doc){
        if(err){
            if(typeof fn === "function") fn(err, 500);  
        }else if(doc){
            if(typeof fn === "function") fn(err, doc);
        }else{
            if(typeof fn === "function") fn(new Error("There is no user with this Id"), 404);
        }
    });




}