var http = require('http');
var server = http.createServer(function(req, res){
  var body = 'hello tt';
    // res.setHeader('Content-Length', body.length);
    res.setHeader('Content-type', 'text/html');
    res.end('hello tt');
});
server.listen(3000);
