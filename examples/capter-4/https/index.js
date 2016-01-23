var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('./tmp/key.pem'),
  cert: fs.readFileSync('./tmp/key-cert.pem')
}
https.createServer(options, function(req, res){
  res.writeHead('200');
  res.end('hello https');
}).listen(3000);
