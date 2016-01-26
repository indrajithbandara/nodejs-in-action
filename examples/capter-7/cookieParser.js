// cookie parser
var connect = require('connect');
var cookieParser = require('cookie-parser');
var app = connect()
  .use(cookieParser('test cookie key'))
  .use(function(req, res){
    console.log(req);
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.end('end cookie test');
  }).listen(3000);
