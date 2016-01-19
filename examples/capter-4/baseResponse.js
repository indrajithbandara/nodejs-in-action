var http = require('http');
var server = http.createServer(function(req, res){
    res.write("hello ");
    setTimeout(function(){
        res.write("world");
    res.end('aa');
    }, 2000);
});
server.listen(3000);
