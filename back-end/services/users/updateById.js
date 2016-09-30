var mongojs = require('mongojs');
var db = mongojs('phrasalDB', ['users']);


exports.update = function(options, fn){
    db.users.findOne({
        _id: mongojs.ObjectId(options)
    }, function(err, doc){
        if(err){
            if(typeof fn === "function") fn(err, 500);  
        }else{
            db.users.update({}, function(err, doc){
                if(typeof fn === "function") fn(err, doc);
            });
        }
    });




}
