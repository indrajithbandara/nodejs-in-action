// 构建中间件
var connect = require('connect');
var router = require('./router.js');
var routes = {
    GET: {
        '/users': function(req, res) {
            console.log(res); 
            res.end("users");
        },
        '/user/:id': function(req, res, id) {
            console.log(res); 
            res.end("user id : " + id);
        },
    },
    DELETE: {
         '/user/:id': function(req, res, id) {
             console.log('delete method');
             res.end('delete id:' + id);
         }
    }
}
connect()
.use(router(routes))
.listen(3000);
