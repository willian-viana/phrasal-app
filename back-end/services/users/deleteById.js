var mongojs = require('mongojs');
var db = mongojs('phrasalDB', ['users']);


exports.delete = function(options, fn){
    db.users.remove({
        _id: mongojs.ObjectId(options)
    }, true, function(err, doc){
        if(err){
            if(typeof fn === "function") fn(err, 500);  
        }else{
            if(typeof fn === "function") fn(err, { msg : "Usuário deletado com sucesso"});
        }
    });

}