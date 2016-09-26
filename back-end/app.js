var express = require('express');
var app = express();

require('./api/users/index.js').init(app);

app.get('/', function(req,res){
    res.send('Testando Express');
});


app.listen(3000, function () {
  console.log('Escutando na porta 3000');
});

