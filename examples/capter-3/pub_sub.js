var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();
channel.on('join', function(){
  console.log('welcome!');
});
// 激活
channel.emit('join');
