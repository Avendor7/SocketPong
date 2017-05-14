var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//routes - serves static files, should probably be more dynamic
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/game', function(req, res){
  res.sendFile(__dirname + '/public/game.html');
});
app.get('/game.js', function(req, res){
  res.sendFile(__dirname + '/public/game.js');
});

//server side socket.io connections 
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.emit('scores', {p1:4, p2:3})
});

//listen on port 3000
http.listen(3000, function(){
  console.log('listening on http://localhost:3000');
});
