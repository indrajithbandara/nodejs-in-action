var http = require('http');
var server = http.createServer(function(req, res){
    res.setHeader('Content-type', 'text/html');
    req.setEncoding('utf8');
    console.log(req.method);
    req.on('data', function(chunk){
      // 数据chunk默认为Buffer对象，通过前一行setEncoding('utf8')转码;
      console.log('parsed', chunk);
    });
    req.on('end', function(){
      // 数据全部读取完出发end事件
      console.log('done');
      res.end();
    });
});
server.listen(3000);
