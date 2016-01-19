var http = require('http');
var server = http.createServer(function(req, res){
  var body = '<p>Redirectiing to <a href="' + url + '">' + url + '</a></p>';
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-type', 'text/html');
    var url = 'http://tt-ghost.github.io';
    res.setHeader('Location', url);
    // 取消注释或报错
    // res.write(body);
    res.statusCode=302;
    res.end('hello tt');
});
server.listen(3000);
