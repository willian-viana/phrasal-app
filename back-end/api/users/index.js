
var userInsertModifyService = require('../../services/users/insertModify.js');


exports.init = function(app){

    app.post('/user/', function(){

    });

    app.get('/user/:id', function(req, res){
        userInsertModifyService.cadastrar({
            data : {name : 'Xpto', id : 1, email : 'xpto@xpto.com.br'}
        });

        res.send('XPTO');
    });


}
