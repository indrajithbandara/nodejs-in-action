var http = require('http');
var server = http.createServer(function(req, res){
  var body = 'hello tt';
    res.setHeader('Set-cookie', ['user=tt', 'islogin=1']);
    res.setHeader('Set-cookie', 'age=14');
    res.end('hello tt');
});
server.listen(3000);
