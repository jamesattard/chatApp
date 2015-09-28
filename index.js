var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socketz){
  var nickname = 'guest' + Math.floor(Math.random() * 6) + 1;
  io.emit('chat message', nickname + ' connected');
  socketz.on('disconnect', function(){
    io.emit('chat message', nickname + ' disconnected');
  });
  socketz.on('chat message', function(msg){
    io.emit('chat message', nickname + ': ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
