var mongojs = require('mongojs');
var db = mongojs('phrasalDB', ['users']);


exports.update = function(options, fn){
     db.users.update({
         _id: mongojs.ObjectId(options.data.id)
        },
        {name : options.data.name, email : options.data.email},
     function(err, doc){
        if(err){
            if(typeof fn === "function") fn(err, 500);  
        }else{
            if(typeof fn === "function") fn(err, doc);  
        }
    });




}
