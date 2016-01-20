// 通过 fs.stat 提前获取文件信息
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;
var server = http.createServer(function(req, res){
  var url = parse(req.url);
  // 构造绝对路径为读文件做准备
  var path = join(root, url.pathname);
  fs.stat(path, function(err, stat){
    if(err) {
      // 表示文件不存在
      if(err.code === 'ENOENT'){
        res.statusCode = 404;
        res.end('not found');
      } else {
        res.statusCode = 500;
        res.end('Internal error');
      }
    } else {
      // stat.size 获取 Content-Length
      res.setHeader('Content-Length', stat.size);
      var stream = fs.createReadStream(path);
      stream.pipe(res);
      res.on('err', function(){
        res.statusCode = 500;
        res.end('Internal error');
      });
    }
  })
});
server.listen(3000);
