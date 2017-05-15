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
    //someone has connected
    console.log('a user connected');
    //receive ball position from client
    socket.on('ballPos', function(position){
        console.log("X: " + position.x + " Y: " + position.y)
        socket.emit('scores', {p1:6, p2:1});
    });

    socket.on('disconnect', function(){
        //reset all variables for next user
        console.log('user disconnected');
    });

    

    socket.emit('ballLocation',{x:200,y:300});
});

//listen on port 3000
http.listen(3000, function(){
  console.log('listening on http://localhost:3000');
});
