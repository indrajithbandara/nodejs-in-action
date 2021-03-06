## Connect
Connect 是一个框架，它使用被称为中间件的模块化组件，以可重用的方式实现web程序中的逻辑。
### 搭建Connect程序 ，安装
```javascript
npm install connect
```
最小connect程序
```javascript
var connect = require('connect');
var app = connect();
app.listen(3000);
```
### Connect 工作机制
中间件接受三个参数:请求对象;响应对象;next回调
#### 日志中间件
```javascript
function logger(req, res, next){
  console.log('%s %s', req.method,req.url);
}
```
在程序中使用中间件可以用.use()方法调用，把中间件传给它
```javascript
var connect = require('connect');
var app = connect();
app.use(logger);
app.listen(3000);
```
### 中间件顺序
### 挂载中间件及服务器
当.use()的第一个参数是字符串时，只有URL前缀与其匹配，Connect才会调用后面的中间件
```javascript
var connect = require('connect');
connect()
.use(logger)
.use('/admin', redirect)
.use('/admin', admin)
.use(hello)
.listen(3000);
```
[Basic认证](http://wikipedia.org/wiki/Basic_access_authentication)
```javascript
var authorization = req.headers.authorization;
if(!authorization) return next(new Error('Unauthorized'))
```
用error做参数调用next，告诉Connect你的中间件结束了，并且出现了一个错误
### 创建可配置中间件
```javascript
function setup(options){
  // 设置逻辑
  return function (req, res, next) {
    // 中间件逻辑
  }
}
app.use(setup({some: 'options'}));
```
#### 创建可配置的logger中间件
```javascript
function setup(format){
  var regexp = /:(\w+)/g;
  return function logger(req, res, next){
    var str = format.replace(regexp, function (match, property) {
      return req[property];
    });
    log(str);
    next();
  }
}
module.exports = setup;
```
#### 构建路由中间件
简单路由过程参见书本 [index.js](./router/index.js) [router.js](./router/router.js)

### 使用错误处理中间件
错误处理中间件函数必须接受四个参数：err, req, res, next
```javascript
function errHandler(){
  var env = process.env.NODE_ENV || 'development';
  return function(err, req, res, next){
    res.statusCode = 500;
    switch(env){
      case 'development':
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(err));
        break;
      default:
        res.end('Server Error');
    }
  }
}
```
<code>NODE_ENV</code> 通常作为环境变量
- 挂载中间件 api 挂载到 <code>/api</code> 目录下
```javascript
var api = connect()
  .use(users)
  .use(pets)
  .use(errHandler)
var app = conect()
  .use(hello)
  .use('/api', api)
  .use(errorPage)
  .listen(3000)
```
