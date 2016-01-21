// todo list
var http = require('http');
var qs = require('querystring');
var items = [];
var server = http.createServer(function(req, res){
  if('/' === req.url){
    switch(req.method) {
      case 'GET':
        show(res);
        break;
      case 'POST':
        add(req, res);
        break;
      default:
        badRequest(res);
    }
  } else {
    notFound();
  }
});
function add(req, res){
  var body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end', function(){
    var obj = qs.parse(body);
    items.push(obj.item);
    show(res);
  });
}
function show(res){
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  var body = '';
  res.on('data', function(){
    items.forEach(function(item){
      body += item;
    });
  });
  res.end(body);
}
function badRequest(res){
  res.statusCode=400;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Bad Request');
}
function notFound(res){
  res.statusCode=404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not Found');
}
server.listen(3000);
