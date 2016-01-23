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
- <code>MYSQL</code> 数据库，需要引入node的一个mysql模块 <code>node-mysql</code>，安装
```linux
npm install mysql
```
