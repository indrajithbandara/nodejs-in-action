// 简单静态服务器
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;
var server = http.createServer(function(req, res){
  var url = parse(req.url);
  var path = join(root, url.pathname);
  var stream = fs.createReadStream(path);
  // res.end() 会在stream.pipe()内部调用
  stream.pipe(res);
  // stream.on('data', function(chunk){
  //   res.write(chunk);
  // });
  // stream.on('end', function(){
  //   res.end();
  // });
});
server.listen(3000);
