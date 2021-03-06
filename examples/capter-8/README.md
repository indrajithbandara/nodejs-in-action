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
- render调用方式 <code>res.render()</code> <code>app.render()</code>，被调用时，express会先检查是否有文件在这个绝对路径上。express会尝试使用index文件
- 数据传入视图，<code>res.render()</code>；app.locals传递程序层面的变量，用res.locals传递请求层面的本地变量。直接传给res.render()的值优先级要高于通过 res.locals 和 app.locals  设定的值
- express 默认只会给视图中输出一个程序级变量 setting，这个对象中包含所有那个app.set()设定的值，比如app.set("title", 'test tt') 会把setting.title输出到模板中

### 处理表单和文件上传
#### 实现照片模型
安装 mongoose
```linux
npm install mongoose --save
```
创建数据库及表
```javascript
var mongoose = require('mongoose');
// 建立在localhost上的以photo_app为数据库
mongoose.connect('mongoose://localhost/photo_app');
var schema = new mongoose.Schema({
  name: String,
  path: String
});
module.exports = mongoose.model('Photo', schema);
```
### 创建资源下载
**express 处理文件传输**：    
- res.sendfile(),浏览器会解析数据，是图片的话会显示图片
- 变体 res.download(),提示用户下载
```javascript
exports.download = function(dir){
  return function(req, res, next){
    var id = req.params.id;
    Photo.findById(id, function(err, photo){
      if(err) return next(err);
      var path = join(dir, photo.path);
      res.sendfile(path);
    })
  }
}
```
