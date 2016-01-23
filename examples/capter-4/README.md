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
- 特殊变量 **__dirname**，返回当前目录路径
读取一个文件，并把内容写到另一个内容中
```javascript
var readStream = fs.createReadStream('./test.txt');
var writeStream = fs.createWriteStream('./copy.txt');
readStream.pipe(writeStream);
```
所有ReadableStream都能接入任何一个 WritableStream 。http请求对象就是ReadableStream，可以如下方式流入到文件中
```javascript
res.pipe(fs.createWriteStream('./res.txt'));
```
关于stream流介绍：[stream-handhook](https://github.com/substack/stream-handbook);
- 所有继承了 EventEmitter 的类都可能发出error事件。默认情况下，如果没有监听器，error事件会被抛出，会搞垮服务器。可以添加以下代码让前端更好的显示。
```javascript
stream.pipe(res);
stream.on('error', function(){
  res.statusCode = 500;
  res.end('服务器错误');
})
```
- 使用fs.stat(path, callback) 得到文件信息，如果找不到文件，<code>error.code</code> 会为 <code>"ENOENT"</code> 提前处理，代码 [stat.js](./stat.js)
- 接受表单输入
提交表单的 <code>Content-Type</code> 有两个值：    
**application/x-www-form-urlencoded** :HTML表单默认值    
**multipart/form-data** :表单中含有文件或非ASCII或二进制数据时使用，如type='file'类型   
- <code>querystring</code> 模块
```javascript
var qs = require('querystring');
qs.parse('a=test');
// {a: "test"};
```
- 使用formidable 处理文件上传 ,[formidable](./formidable/formidable.js)
```javascript
// 实例化form
var form = new formidable.IncomingForm();
```
计算文件上传进度 <code>form.on('progress', function(bytesReceived, bytesExpected))</code>
```javascript
form.on('progress', function(bytesReceived,bytesExpected){
  var percent = Math.floor(bytesReceived/bytesExpected*100);
  console.log(percent);
});
```
插件地址：[formidable](https://github.com/felixge/node-formidable)

### 用HTTPS加强程序的安全性
https将http与TLS/SSL传输层结合在一起。    
- 概念介绍
**密钥**：密钥存放在服务器的文件内    
**证书**：证书可以全世界分享，它包含了公钥和证书所有者信息    
**公钥**：用来加密从客户端发往服务器的数据    
- 生成名为 <code>key.pem</code> 私钥,私钥一般放在~/.ssh目录中
```javascript
openssl genrsa 1024 > key.pem
```
- 创建证书需要私钥，下面生成名为 <code>key-cert.pem</code> 的证书
```javascript
openssl req -x509 -new -key key.pem > key-cert.pem
```
- 创建https服务器 [https](./https/index.js)
```javascript
var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('./tmp/key.pem'),
  cert: fs.readFileSync('./tmp/key-cert.pem')
}
https.createServer(function(req, res){
  res.writeHead('200');
  res.end('hello https');
}).listen(3000);
```
