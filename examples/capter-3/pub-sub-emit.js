// 用事件发射器实现简单的发布/预定系统
var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.on('join', function(id, client) {
  // 查看已经连接的用户数  this.listeners
  var welcome = 'Welcom Guest online: ' + this.listeners('broadcast').length;
  client.write(Welcome);
  this.clients[id] = client;
  this.subscriptions[id] = function(senderId, message) {
    if(id !== senderId) {
      this.clients[id].write(message);
    }
  }
  this.on('broadcast', this.subscriptions[id]);
});
// 设置最大连接数
channel.setMaxListeners(50);
channel.on('leave', function(id){
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, id + 'has left');
});
channel.on('shutdown', function(){
  channel.emit('broadcast', '', 'Chat has shut down');
});
var server = net.createServer(function(client){
  var id = client.remoteAddress + ':' + client.remotePort;
  client.on('connet', function(){
    channel.emit('join', id, client);
  });
  client.on('data', function(data){
    data = data.toString();
    if(data == 'shutdown\r\n') {
      channel.emit('shutdown');
    }
    channel.emit('broadcast', id, data);
  });
  client.on('close', function(data){
    channel.emit('leave', id);
  });
});
server.listen(8888);
