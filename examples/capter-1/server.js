var http = require('http');
var fs = require('fs');
var server = http.createServer();
var PORT = 3000;
server.on('request', function(req, res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('hello world');
});
server.listen(PORT);
console.log('server is started at %s',PORT);
