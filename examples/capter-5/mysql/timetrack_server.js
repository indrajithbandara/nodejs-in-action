// 启动程序
var http = require('http');
var work = require('./timetrack');
var mysql = require('mysql');
var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'myuser',
  password: 'myuser',
  database: 'timetrack'
});
var server = http.createServer(function(req, res){

});
