var verbFindAll = require('../../services/verbs/findAll.js');
var updateByVerb = require('../../services/verbs/updateByVerb.js');

var cors = require('cors');

exports.init = function(router){


    // CROSS DOMAIN
    // ================== //
    router.options('*', cors());
    
    /*  "/verbs"
    *    GET: Find all phrasal verbs that complete a phrasal verb with the param
    *    PUT: Update phrasal verbs with suggestions
    */

    // Find all verbs that complete a phrasal verb with the param
    router.get('/verbs/:verb', cors(), function(req, res){
        verbFindAll.find(req.params.verb, callbackRoutes(req, res));  
    });

    router.get('/verbs/', cors(), function(req, res){
        verbFindAll.find('', callbackRoutes(req, res));  
    });

    //Update phrasal verbs with suggestions
    router.put('/verbs/',cors(), function(req, res){
        updateByVerb.update({
            data : {
                verb : req.body.verb, 
                suggestion : req.body.suggestion
            }            
        }, callbackRoutes(req, res));
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