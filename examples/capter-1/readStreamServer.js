var http = require('http');
var fs = require('fs');
var PORT = 3000;
var server = http.createServer();
server.on('request',function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    fs.createReadStream('./src/test.json').pipe(res);
});
server.listen(PORT);

console.log('server is started at %s',PORT);
