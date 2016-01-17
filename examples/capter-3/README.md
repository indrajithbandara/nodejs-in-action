## 三、Node编程基础
### Node 功能的组织及重用
- 如果模块返回的函数或变量不止一个，那它可以通过设定exports对象的属性来指名它们。如果模块只返回一个函数或变量，则可以设定module.exports属性。
- require 是Node中少有的几个同步I/O操作之一。I/O密集的地方尽量不要用require。
- 如果你创建了一个既有exports又有module.exports的模块，那它会反悔module.exports，而exports会被忽略。（exports不能被重写）
- exports只是对module.exports的一个全局引用，最初被定义为可以添加属性的空对象。所以exports.myFun 只是module.exports.myFun的简写。因此，如果exports设定为别的，就打破了module.exports与exports的引用关系，exports失效。想重新引用的话可以:
```javascript
module.exports = exoprts = myFun;
```
- require 的模块可以是文件夹，文件夹中必须有index.js，或有package.json，且为JSON格式，有main字段指明替换index.js文件的模块入口.

### 异步编程技术
两种响应逻辑管理方式：回调和事件监听
- 回调通常用来定义一次性响应的逻辑。事件监听器本质也是回调，响应重复性事件。
创建一个telnet 连接，新建文件 echo_server.js
```javascript
var net = require('net');
var server = net.createServer(function(socket){
  // 只运行一次可使用socket.once('data', function(data){})
  socket.on('data', function(data){
    socket.write(data);
  });
});
server.listen(8888);
```
新开命令行，运行 <code>telnet 127.0.0.1 8888</code>，
- 创建事件发射器，事件可以为任意字符串，有一个特殊事件<code>error</code>。除了用 <code>on</code>，还可以用<code>addListener</code>，最后监听后需要emit激活
```javascript
var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();
channel.on('join', function(){
  console.log('welcome!');
});
// 激活
channel.emit('join');
```
- 错误处理
可以发出error类型事件发射器
```javascript
var events = require('events');
var myEmitter = new events.EventEmitter();
myEmitter.on('error', function(err){
  console.log('ERROR:' + err.message);
});
myEmitter.emit('error', new Error('error message'));
```
如果发出的error类型事件没有作为第二个参数的error对象，堆栈会报错并停止执行。可以用已经废除的方法处理这个错误。
```javascript
process.on('uncaughtException', function(err){
  console.error(err.stack);
  process.exit(1);
});
```
- 扩展事件监听器：文件监听器
监视目录，并将文件复制到一个单独目录中。分以下三部：
```
(1) 创建类的构造器
(2) 继承事件发射器行为
(3) 扩展这些行为
```
