var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickName = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
  io = socketio.listen(server);
  io.set('long level', 1);
  io.socket.on('connection', function(socket){
    guestNumber = assignGuestName(socket, guestNumber, nickName, namesUsed);
    joinRoom(socket, 'Lobby');
    handleMessagebroadcasting(socket, nickName);
    handleNameChangeAttempts(socket, nickName, namesUsed);
    handleRomeJoining(socket);

    socket.on('rooms', function(){
      socket.emit('rooms', io.sockets.manager.rooms);
    });
    handleClientDisconnection(socket, nickName, namesUsed);
  });
}
