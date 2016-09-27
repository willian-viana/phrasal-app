
var userCreate = require('../../services/users/create.js');
var userFindbyId = require('../../services/users/find.js');

exports.init = function(app){
    /*  "/users"
    *    POST: Add a new user
    *    GET: Find all users 
    */

    // Add a new user
    app.post('/api/v1/users/', function(req, res){
        userCreate.register({
            data : {name : req.body.name, email : req.body.name}
        }, function(err, data){
            if(err){
                res.status(data || 500).send(err);
            }else if(data){
                res.status(200).send(data);
            }
        });
    });

    // Find all users
    app.get('/api/v1/users/', function(req, res){
       userFindbyId.find(req.param.id, function(err, data){
           if(err){
                res.status(data || 500).send(err);
            }else if(data){
                res.status(200).send(data);
            }
       });
    });


    /*  "/users"
    *    GET: Find a single user by ID
    *    PUT: Update user document
    *    DELETE: Delete user by ID
    */

    //Find a single user by ID
    app.get('/api/v1/users/:id', function(req, res){
       userFindbyId.find(req.param.id);

    });

    //Update user document
    app.put('/api/v1/users/:id', function(req, res){
       userFindbyId.find(req.param.id);

    });

    //Delete user by ID
    app.delete('/api/v1/users/:id', function(req, res){
       userFindbyId.find(req.param.id);

    });


}
