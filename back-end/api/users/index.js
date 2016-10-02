
var userCreate = require('../../services/users/create.js');
var userFindAll = require('../../services/users/findAll.js');
var userFindById = require('../../services/users/findById.js');
var updateById = require('../../services/users/updateById.js');
var userdeleteById = require('../../services/users/deleteById.js');

exports.init = function(router){
    
    
    /*  "/users"
    *    POST: Add a new user
    *    GET: Find all users 
    *    GET: Find a single user by ID
    *    PUT: Update user document
    *    DELETE: Delete user by ID
    */

    // Add a new user
    router.post('/users/', function(req, res){
        userCreate.register({
            data : {name : req.body.name, email : req.body.email}
        }, callbackRoutes(req, res));
    });

    // Find all users
    router.get('/users/', function(req, res){
       userFindAll.find(callbackRoutes(req, res));
    });

    //Find a single user by ID
    router.get('/users/:id', function(req, res){
       userFindById.find(req.params.id, callbackRoutes(req, res));

    });

    //Update user document
    router.put('/users/:id', function(req, res){
        updateById.update({
            data : {id: req.params.id , name : req.body.name, email : req.body.email}
        }, callbackRoutes(req, res));
    });

    //Delete user by ID
    router.delete('/users/:id', function(req, res){
       userdeleteById.delete(req.params.id, callbackRoutes(req, res));

    });


    // Callback for routes 
    function callbackRoutes(req, res){
        return function(err, data){
            if(err){
                res.status(data || 500).send({error : err.message});
            }else if(data){
                res.status(200).send(data);
            }
        };
    }





}
