## Connect 自带的中间件
connect 中间件：
<code>cookieParser</code>
<code>bodyParser()</code>
<code>limit()</code>
<code>query()</code>
<code>logger()</code>
<code>favicon()</code>
<code>methodOverride()</code>
<code>vhost()</code>
<code>session()</code>
<code>basicAuth()</code>
<code>csrf()</code>
<code>errorHandler()</code>
<code>static()</code>
<code>compress()</code>
<code>directory()</code>
### 解析cookie、请求主体和查询字符串的中间件
#### cookieParser(): 解析HTTP cookie
- 基本 [cookieParser.js](./cookieParser.js)
```javascript
var connect = require('connect');
// 现在cookieParser 直接require，不是 connect.cookieParser
var cookieParser = require('cookie-parser');
var app = connect()
// 自定义加密KEY
  .use(cookieParser('test cookie key'))
  .use(function(req, res){
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.end('end cookie test');
  }).listen(3000);
```
- 常规cookie，可以通过一下命令测试
```linux
$ curl localhost:3000 -H 'Cookie: name=tt; location: china'
// -> {name: 'tt', location: 'china'}
```
- 签名 cookie，有效的签名 cookie 放在req.signedCookies对象中
- JSON cookie
- 设定出站 cookie，connect可以通过 <code>req.setHeader()</code> 函数写入多个 <code>Set-Cookie</code>
```javascript
var connect = require('connect');
var app = connect()
  .use(function(req, res){
    res.setHeader('Set-Cookie', 'name=tt');
    // 设置cookie过期时间，经过测试，第二次设置Set-Cookie后，第一次的设置的cookie丢失
    res.setHeader('Set-Cookie', 'location=china; Expires=Tue, 08 Jun 2021 10:10:10 GMT');
    res.end();
  }).listen(3000);
```
以下测试请求header
```linux
$ curl localhost:3000 --head
```
#### bodyParser(): 解析请求主体
- 基本用法
```javascript
var app = connect()
  .use(connect.bodyParser())
  .use(function(req, res){
    res.end('new user: ' + req.body.username);
  })
  .listen(3000);
```
运行一下测试
```linux
$ curl username=tt localhost:3000
// 或者
$ curl '{"username": "tt"}' localhost:3000
```
#### limit(): 请求主体的限制
- 在bodyParser() 解析之前加上limit();
- 基本用法，表示方式：1gb、2mb、4kb
```javascript
var http = require('http');
var connect = require('connect');
var app = connect()
  // 主要在bodyParser 之前
  .use(connect.limit('20kb'))
  .use(connect.bodyParser());
http.createServer(app).listen(3000);
```
- 根据请求 Content-Type 不同，响应不同的limit
```javascript
function type(type, fn) {
  return function(req, res, next){
    var ct = req.headers['content-type'] || '';
    if(0 != ct.indexOf(type)) {
      return next();
    }
    fn(req, res, next);
  }
}
var app = connect()
  .use(type('application/x-www-form-urlencoded', connect.limit('64kb')))
  .use(type('application/json', connect.limit('32kb')))
  .use(type('image', connect.limit('2mb')))
  .use(type('video', connect.limit('200mb')))
  .use(connect.bodyParser())
```
#### query(): 查询字符串解析
### 实现 Web 程序核心功能的中间件
logger(),favicon(),methodOverride(),vhost(),session()
#### logger() 日志 ，现在为morgan()
### 实现 Web 程序安全的中间件
basicAuth(),csrf(),errorHandler()
### 静态文件服务器中间件
static(),compress(),directory()
