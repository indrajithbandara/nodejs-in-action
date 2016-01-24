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
