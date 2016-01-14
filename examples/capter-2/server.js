var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

/**
 * 发送404
 * @method send404
 * @param  {Object} response 服务器响应
 * @return {undefined}          无
 */
function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Not Found!');
  response.end();
}

/**
 * 响应静态文件
 * @method sendFile
 * @param  {Object} response     服务器相应
 * @param  {String} filePath     文件路径
 * @param  {String} fileContents 文件内容
 * @return {undefined}              无
 */
function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200, {
      "Content-Type": mime.lookup(path.basename(filePath)),
    }
  );
  response.end(fileContents);
}

/**
 * 静态资源服务
 * @method serveStatic
 * @param  {Object}    response 服务器响应值
 * @param  {Object}    cache    读入到内存的静态文件
 * @param  {String}    abspath  本地绝对路径
 * @return {undefined}             [description]
 */
function serveStatic(response, cache, abspath) {
  if(cache[abspath]) {
    sendFile(response, abspath, cache[abspath]);
  } else {
    fs.exists(abspath, function(exists){
      if (exists) {
        fs.readFile(abspath, function(err, data){
          if (err) {
            send404(response);
          } else {
            cache[abspath] = data;
            sendFile(response, abspath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function(request, response){
  var filePath = false;
  console.log(request.url);
  if(request.url === '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }
  var absPath = './' + filePath;
  serveStatic(response, cache, absPath);
});
server.listen(3000, function(){
  console.log('server is started');
});
