var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
  path: '/flights'
});
users = [];
connections = [];

server.listen(3000);
console.log('Server running...');
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected : %s sockets connected', connections.length);

  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  // Send Message
  socket.on('POSITION', function(data){
    console.log(data);
    io.sockets.emit('POSITION', {msg: data});
  });

});
