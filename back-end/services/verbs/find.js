const mongojs = require('mongojs'),
db = mongojs('phrasalDB', ['users']);

exports.find = function(options, fn){
    db.users.find({}, function(err, docs){
        if(err){
            fn(err, 500);
        } else if(!docs){
            fn(err, 400);
        } else{
            fn(err, docs);
        }
    });
};



// t.i@manole.com.br