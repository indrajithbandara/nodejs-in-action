var connect = require('connect');
var app = connect();
app.use(logger)
.use(hello)
.listen(3000);

function logger(req, res, next){
  console.log('%s %s', req.method,req.url);
  next();
}
function hello(req, res){
  res.setHeader('Content-Type', 'text/plain');
  console.log('hello');
  res.end('Hello world');
}
