var http = require('http');
var url = require('url');
// 缓存数据
var items = [];
var server = http.createServer(function(req, res){
  switch (req.method) {
    case 'POST':
      var item = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk){
        item += chunk;
      });
      req.on('end', function () {
        items.push(item);
        res.end('END\n');
      });
      break;
    case 'GET':
      var body = items.map(function(item, i){
        return i + ") " + item;
      }).join('\n');
      // 设置Content-Length 提前计算好body字节数
      // 注意Content-Length 返回的应该是字节数，非字符串长度，因此不能使用body.length
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
  }
});
server.listen(3000);

/**
 * 运行之后命令行执行以下命令添加信息
 * curl -d 'hello' http://localhost:3000
 * curl -d 'world' http://localhost:3000
 *
 *  执行下面命令获取缓存列表
 *  curl http://localhost:3000
 */
