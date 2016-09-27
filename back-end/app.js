var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


// ROUTES FOR OUR API
// ================== //
var router = express.Router();     


// REQUIRES APIs
// ================== //
require('./api/users/index.js').init(app);
require('./api/verbs/index.js').init(app);

// TEST
// ================== //
app.get('/', function(req,res){
    res.send('Testando Express');
});

// REGISTER OUR ROUTES
// ================== //
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============== //
app.listen(3000, function () {
  console.log('Escutando na porta 3000');
});

