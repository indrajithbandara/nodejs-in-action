## 构建Node Web程序
### 设定请求及响应
setTimeout会block住响应
```javascript
var http = require('http');
var server = http.createServer(function(req, res){
    res.write("hello ");
    // block 2s
    setTimeout(function(){
        res.write("world");
    res.end('tt');
    }, 2000);
});
server.listen(3000);
```
### 设定请求头及响应头
- <code>response.setHeader(neme, value)</code> [setHeader.js](./setHeader.js)
```javascript
response.setHeader('Content-type', 'text/plain');
response.end('hello tt')
```
- 多个值时，value用数组 [setHeaderValues.js](./setHeaderValues.js)
```javascript
response.setHeader('Set-Cookie', ['user=tt', 'age=18']);
response.end('hello tt')
```
- 另外有<code>res.getHeader(field)</code>获取某个header字段，<code>res.removeHeader(field)</code>移除某个header字段
- 设置状态码，需要在<code>res.write</code> 或 <code>res.end</code>之前， <code>res.statusCode=302</code> [statusCode](./statusCode.js)
```javascript
response.statusCode=302
```
