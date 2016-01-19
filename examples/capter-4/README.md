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
### 构建RESTful web 服务
- 读取新数据会触发 <code>data</code> 事件，数据全部读取完之后出发 <code>end</code> 事件。
```javascript
req.setEncoding('utf8');
req.on('data', function(chunk){
  // 数据chunk默认为Buffer对象，通过前一行setEncoding('utf8')转码;
  console.log('parsed', chunk);
});
req.on('end', function(){
  // 数据全部读取完出发end事件
  console.log('done');
  res.end();
});
```
- 查看请求的方法 <code>req.method</code>，设置编码 <code>req.setEncoding('utf8')</code>;
- 注意 <code>Content-Length</code> 返回的应该是字节数，非字符串长度，因此不能使用body.length，使用 <code>Buffer.byteLength</code>
- 通过 <code>curl</code> 命令测试post、get、delete、put [tasklist.js](./tasklist.js)
### 静态文件服务器

参考：[目录遍历攻击](http://en.wikipedia.org/wiki/Directory_traversal_attack)
