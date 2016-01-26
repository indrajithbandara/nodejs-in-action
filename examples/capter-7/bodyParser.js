var connect = require('connect');
var bodyParser = require('body-parser');
var app = connect()
  .use(bodyParser())
  .use(function(req, res){
    res.end('new user: ' + req.body.username);
  })
  .listen(3000);
