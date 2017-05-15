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
    var player1Score = 0;
    var player2Score = 0;
    var leftPaddlePosX = 60;
    var leftPaddlePosY = 300;
    var paddleSpeed = 7;
    var player1Goal = false; //true of someone scores
    var player2Goal = false; //true of someone scores

    socket.on('ballPos', function(position){
        player1Goal = false;
        player2Goal = false;
        //determine scores and reset the board
        if (position.x < 0){
            player1Score ++;
            player1Goal=true;
        }

        if (position.x > 1280){
            player2Score ++;
            player2Goal=true;
        }
        //paddle "AI"
        if (leftPaddlePosY < 0 ){
            paddleSpeed = 7;
        }else if (leftPaddlePosY > 600 ){
            paddleSpeed = - 7;
        }
        leftPaddlePosY += paddleSpeed;
        //send all the data back to the client
        socket.emit('resetBall', {player1Goal:player1Goal, player2Goal:player2Goal});

        socket.emit('leftPaddlePos',{x:leftPaddlePosX, y:leftPaddlePosY});

        socket.emit('scores', {p1:player1Score, p2:player2Score});
    });

    socket.on('disconnect', function(){
        //reset all variables for next user
        console.log('user disconnected');
    });
});

//listen on port 3000
http.listen(3000, function(){
  console.log('listening on http://localhost:3000');
});
