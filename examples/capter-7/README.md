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
**注意：** 最新API方法有变化，详情参考[connect](https://github.com/senchalabs/connect)    
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
#### 用法
```javascript
app.use(connect.static('public'));
// 如当前目录public中有文件 foo.js 访问url：localhost/foo.js
```
#### 挂载,指定
```javascript
app.use('/app/files', connect.static('public'));
// 相当于把第一个参数挂载到public下，访问url：localhost/app/files/foo.js
// 其实public被解析为: process.cwd() + '/public'
```
#### 使用相对、绝对路径
```jvascript
app.use('/app/files', connect.static(__dirname + '/public'));
// static中的路径都是相对当前路径,如果使用绝对路径时用 __dirname
```
#### compress() 压缩静态文件
compress()自动通过请求头域Accept-Encoding 自动检测客户端可接受的编码。如果请求头中包含gzip或deflate或两者，则响应会压缩
- 用法 [compress-base.js](./compress/compress-base.js)
```javascript
var connect = require('connect');
var compression = require('compression');
var serveStatic = require('serve-static');
var app = connect()
    .use(compression())
    .use(serveStatic('public'))
    .listen(3000);
```
- 使用定制过滤器 [compression-filter.js](./compress/compression-filter.js)
```javascript
var connect = require('connect');
var compression = require('compression');
var serveStatic = require('serve-static');
function filter(req, res){
    var type = req.headers('Content-Type') || '';
    return 0 === type.indexOf('text/plain');
}
var app = connect()
    .use(compression({filter: filter}))
    .use(serveStatic('public'))
    .listen(3000);

```
- 指定压缩及内存水平
```javascript
connect()
    .use(compression({level:3, memlevel:8}))
// level:3 代表压缩水平更低，但更快，memlevel:8表示使用更多的内存
```
#### directory()目录列表，配合static使用，新版改为 [serve-index](https://www.npmjs.com/package/serve-index)
- 用法
```javascript
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
```
- 使用挂载,可以添加任意的路径前缀
```javascript
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var app = connect()
    .use('/files', serveIndex('public', {icons: true, hidden: true}))
    .use('/files', serveStatic('public', { hidden: true}))
    .listen(3000);
// icons用来启用图标,hidden 表明两个组件都可以查看并返回隐藏文件
```
