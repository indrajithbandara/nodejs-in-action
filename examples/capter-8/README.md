## express
### 配置express
<code>app.configure()</code>
<code>app.set()</code>
<code>app.get()</code>
<code>app.enable()</code>
<code>app.disable()</code>     
- UNIX环境
```javascript
$ NODE_ENV= production node app
```
- Windows环境
```javascript
$ set NODE_ENV=production
```
#### app.configure()
app.configure()方法接受一个表示环境的可选字符串，以及一个函数。当系统环境变量与传入的字符串匹配时，回调函数会被立即调用；当只给函数时，所有环境都会运行。也可使用 <code>if('development' == process.env.NODE_DEV)</code>
```javascript
// 所有环境都会运行
app.configure(function（){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
});
```
```javascript
// 仅开发环境，系统环境变量 NODE_DEV为development时运行
app.configure('development', function（){
  app.use(express.errorHandler());
});
```
#### app.set(),app.enable(setting)等同于app.set(setting, true)...
### 视图渲染
#### 视图系统渲染
- 更改视图目录
```javascript
app.set('views', __dirname + '/views');
```
- 设置模板引擎
```javascript
app.set('view engine', 'jade');
```
- 视图缓存，开发环境禁用。view cache启用时，每个模板只会地区一次硬盘.
