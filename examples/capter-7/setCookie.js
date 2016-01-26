var connect = require('connect');
var app = connect()
  .use(function(req, res){
    res.setHeader('Set-Cookie', 'name=tt');
    // 设置cookie过期时间
    res.setHeader('Set-Cookie', 'location=china; Expires=Tue, 08 Jun 2021 10:10:10 GMT');
    res.end();
  }).listen(3000);
