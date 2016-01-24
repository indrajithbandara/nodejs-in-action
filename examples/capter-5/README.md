## 储存Node程序中的数据
### 三种储存类型
- 储存数据而无需安装和配置DBMS；
- 用关系型数据库储存数据；如MYSQL和PostgreSQL;
- 用NoSQL数据库储存数据；如Redis、MongoDB和Mongoose
#### 储存数据而无需安装和配置DBMS
- 基于文件的储存 [cli_task.js](./cli_task.js)
```linux
$ node cli_task.js add test infomation
saved
$ node cli_task.js list
test infomation
$ node cli_task.js add test2
saved
$ node cli_task.js list
test infomation
test2
```
#### 关系型数据库管理系统
- <code>MYSQL</code> [node-mysql](https://github.com/felixge/node-mysql) 数据库，需要引入node的一个mysql模块 <code>node-mysql</code>，安装
```linux
npm install mysql
```
具体使用及示例代码参考书本
- <code>PostgreSQL</code> [node-postgres](https://github.com/brianc/node-postgres) ,支持递归查询，同步复制，这种复制会在每次数据操作后对复制进行校验。防止数据丢失。安装
```linux
npm install pg
```
1、连接
```javascript
var pg = require('pg');
var conString = "tcp://myuser:mypassword@localhost:5432/mydatabase";
var client = new pg.Client(conString);
client.connect();
```
2、插入单条数据    
2.1、简单插入
```javascript
client.query(
  'INSERT INTO users ' +
  "(name) VALUES ('Mike')"
);
```
2.2、添加多个字段值，$1,$2为参数需要放的位置
```javascript
client.query(
  'INSERT INTO users ' +
  "(name, age) VALUES ($1, $2)",
  ["Mike", 20]
);
```
2.3、建立主键并查看
```javascript
client.query(
  'INSERT INTO users ' +
  "(name, age) VALUES ($1, $2) " +
  'RETURNING id',
  ["Mike", 20],
  function(err, result){
    if(err) throw err;
    console.log(result.rows[0].id);
  }
);
```
3.4、创建返回结果的查询，query方法返回的是一个继承了<code>EventEmitter</code> 的行为的对象。这个对象每取回一条数据都会发出一个 <code>row</code> 事件
```javascript
client.query(
  "SELECT * FROM users WHERE age > $1",
  [23]
);
query.on('row', function(row){
  console.log(row.name);
});
// 取回最后一条数据后关闭数据库
query.on('end', function(){
  client.end();
});
```
#### NoSQL数据库
##### <code>Redis</code>介绍
非常适合处理那些不需要长期访问的简单数据储存。Redis把数据存在RAM中，并在磁盘中记录数据的变化；Redis还支持set集合。安装
```linux
npm install redis
```
文档：[官网](http://redis.io/commands)，[node_redis](https://github.com/NodeRedis/node_redis)    
1.1 连接Redis服务器，继承了EventEmitter。
```javascript
var redis = require('redis');
var client = redis.createClient(6479, '127.0.0.1');
client.on('error', function(err){
  console.log(err);
})
```
1.2、操作
```javascript
// print函数输出操作结果，err时也输出
client.set('color', 'red', redis.print)
client.get('color', function(err, value){
  if(err) throw err;
  console.log(color);
});
```
1.3、用哈希表储存和获取数据。hmset设定哈希表的元素，hkeys列出哈希表中的所有元素的键。
```javascript
client.hmset('person', {
  'name': 'tt',
  'age': 23,
  'location': 'beijing'
}, redis.print);
client.hget('person', 'name', function(err, value){
  if(err) throw err;
  console.log(value); // tt
});
client.hkeys('person', function(err, keys){
  if(err) throw err;
  keys.forEach(function(key, i){
    console.log(key, i);
  });
});
```
1.4、用链表储存和获取数据，lpush向链表中添加数据，lrange获取start和end之间的链表元素。一种算法[大O表示法](http://baike.baidu.com/link?url=ml-Y8_rcysuEl3rvqVwqsTjryOxGMftfkmkCbDguKQQ-OmT8apUle4tHDbQPcGKOFPa6_JTmq3jQfYBZsDzc6a)    
1.5、用集合储存和获取数据    
1.6、用信道传递数据    
1.7、NODE_REDIS性能最大化，安装 [hiredis](https://github.com/pietern/hiredis-node) 模块。
```linux
npm install hiredis
# 重新构建
npm rebuild hiredis
```
##### MongoDB 安装
```linux
npm install mongodb
```
- 连接
```javascript
var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('mydatabase', server, {w: 1});
```
- 访问
```javascript
client.open(function(err){
  if(err) throw err;
  client.collection('test_insert', function(err, collection){
    if(err) throw err;
    console.log('opened');
  });
});
```
- 将文档插入到集合。<code>{safe: true}</code> ，MongoDB的文档标识符是二进制JSON(BSON) 安全模式表示数据库操作应该在回调执行之前完成，如果回调对即将的数据库操作有依赖，需要这么申明；如果回调逻辑不依赖数据库操作，可以使用 <code>{}</code> 关闭全模式.
```javascript
collection.insert({
  'title': 'my test',
  'body': 'its body'
},
{safe: true},
function(err, documents){
  if(err) throw err;
  console.log('document id is :' + document[0]._id);
}
)
```
- 用文档ID更新数据
```javascript
var _id = new client.bson_serializer.ObjectID('n45n3455555555555543n45');
collection.update(
  {_id: _id},
  {$set: {"title": 'my test 2'}},
  {safe: true},
  function(err){
    if(err) throw err;
  }
);
```
- 搜索
```javascript
collection.find({"title": "test"}).toArray(function(err, results){
  if(err) throw err;
  console.log(results);
});
```
- 删除
```javascript
var _id = new client.bson_serializer.ObjectID('n45n3455555555555543n45');
collection.remove(
  {_id: _id},
  {safe: true},
  function(err){
    if(err) throw err;
  }
);
```
##### Mongoose 安装  [官网](http://mongoosejs.com/)
```linux
npm install mongoose
```
- 连接打开关闭
```javascript
// 建立连接
var mongoose = require('mongoose');
var db = mongoose.connect('mongoose://localhost/tasks')
// 关闭连接
mongoose.disconnect();
```
- 注册schema，定义数据结构，设置默认值，处理输入，校验等，[官方文档](http://mongoosejs.com/docs/schematypes.html)
```javascript
var Schema = mongoose.schema;
var Tasks = new Schema({
  project: String,
  description: String
});
mongoose.model('Task', Tasks);
```
- 添加任务
```javascript
var Task = mongoose.model('Task');
var task = Task();
task.project = 'test';
task.description = 'my test mongose';
task.save(function(err){
  if(err) throw err;
  console.log('saved');
})
```
- 搜索文档
```javascript
var Task = mongoose.model('Task');
Task.find({'project': 'test'},function(err, tasks){
  if(err) throw err;
  for(var i = 0;i < tasks.length;i++) {
    console.log('id is :' + tasks[0]._id);
    console.log('description :' + tasks[0].description);
  }
});
```
- 更新文档
```javascript
var Task = mongoose.model('Task');
Task.update(
  {_id: '23o4o23423j2k34444'},
  {description: 'my test 2'},
  // false 代表只更新一个文档
  {multi: false},
  function(err, rows_update){
    if(err) throw err;
    console.log('updated');
  }
)
```
- 删除文档
```javascript
var Task = mongoose.model('Task');
Task.findById('23o4o23423j2k34444', function(err, task){
  if(err) throw err;
  task.remove();
});
```
