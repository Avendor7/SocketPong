//initialize all the things
function init() {

    //game pieces 
    leftPaddle = new paddle(20, 120, "white", 60, 120, "paddle", 0, 0);
    rightPaddle = new paddle(20, 120, "white", 1200, 120, "paddle", 0, 0);
    ball = new ball(10, 10, "white", 300, 300, 5, 5);
    leftScore = new scoreNumbers(0, 320, 80);
    rightScore = new scoreNumbers(0, 960, 80);

    socket = io();
    

    //start the game
    game.start();
    
}

//main game object
var game = {
    canvas : document.getElementById("pong"),
    start : function() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
        //this.canvas.style.cursor = "none"; //hide cursor
        this.context = this.canvas.getContext("2d");
        //glorious 60fps (16ms)
        this.interval = setInterval(update, 16);
        //background
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //Keyboard
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            game.keys = (game.keys || []);
            game.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            game.keys[e.keyCode] = (e.type == "keydown");
        });
        //mouse
        window.addEventListener('mousemove', function (e) {
            game.x = e.pageX;
            game.y = e.pageY;
        });

        
        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//drawing the scores
function scoreNumbers(score, x, y){
    context = game.context;
    this.x = x;
    this.y = y;
    this.score = score;
    
    this.update = function(score) {
        context.fillStyle = "white";
        context.font = "bold 80px Arial";
        context.fillText(this.score, this.x, this.y);
    }
}

function net(){
    context = game.context;
    //broken centre line 
    context.beginPath();
    context.strokeStyle = 'white';
    context.lineWidth = 6;
    context.setLineDash([20, 20]);
    context.moveTo(637, 10);
    context.lineTo(637, 720);
    context.stroke();
}
//crash detection done on the ball, not the paddle
//paddle object
function paddle(width, height, color, x, y) {
    //object attributes
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; 
    this.x = x;
    this.y = y;

    //functions called by update loop
    //update draws the object to the screen,
    this.update = function() {
        context = game.context;
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    // newPos gives it a new x and y position on each redraw
    this.newPos = function() {
        this.y += this.speedY;
        this.x += this.speedX;  
    }

    //check for out of bounds on paddle and ball
    this.outOfBounds = function(){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        //check top and bottom boundaries
        if (mybottom > 720){this.y = 720 - this.height;}
        if (mytop < 0){this.y = 0}    
    }
}

//ball object
function ball(width, height, color, x, y, speedX, speedY) {
    //object attributes
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY; 
    this.x = x;
    this.y = y;

    //functions called by update loop
    this.update = function() {
        context = game.context;
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.y += this.speedY;
        this.x += this.speedX;
        //send ball information to server

    }

    //check for collison with another object 
    this.crashWith = function(otherobj) {
        
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);

        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        
        
        // if (myleft == 80 && myleft >= otherright){
        //     this.speedX = 5;
        //     console.log("hit 80");
        // }
        // if (myright == 1200 && myright >= otherleft){
        //     this.speedX = -5;
        //     console.log("hit 1200");
        // }

       if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
            //console.log("didnt hit");
        }else{
            if (myright == 1200){
                this.speedX = -5;
                console.log("hit right");
            }else if(myleft == 60){
                this.speedX = 5;
                console.log("hit left");
            }
        }
        
    }
    this.outOfBounds = function(){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);

        //check for collision with outer walls and also scoring
        var collision = false

        if (mybottom > 720){ball.speedY = -5;}
        if (mytop < 0){ball.speedY = 5;}
        //if (myright > 1210){} //check to see if it went past the right paddle
        //if (myleft < 0){} //check for left paddle
    }
}

//update loop
function update(){
    game.clear();

    rightPaddle.speedY = 0;
    leftPaddle.speedY = 0;
    
    //keyboard movement
    if (game.keys && game.keys[38]) {leftPaddle.speedY = -10; }
    if (game.keys && game.keys[40]) {leftPaddle.speedY = 10; }

    if (game.keys && game.keys[38]) {rightPaddle.speedY = -10; }
    if (game.keys && game.keys[40]) {rightPaddle.speedY = 10; }
    //mouse movement, y axis only
    if (game.y) {
        //DISABLED FOR NOW, testing is easier with the keyboard
        //rightPaddle.y = game.y; 
    }


    if (rightPaddle.outOfBounds()){}
    if (leftPaddle.outOfBounds()){}

    ball.outOfBounds();
    ball.crashWith(rightPaddle);
    ball.crashWith(leftPaddle);
    //send socket information

    socket.emit('ballPos', {x:ball.x, y:ball.y});
        //socket.emit('scores', {player1: , player2: });
    socket.on('scores', function(scores){
        leftScore.score = scores.p2;
        rightScore.score = scores.p1;
    });

    //draw / update game objects
    net();
    
    
    rightScore.update();
    leftScore.update();
    
    
    ball.newPos();
    ball.update();
    
    
    leftPaddle.newPos();
    leftPaddle.update();
    rightPaddle.newPos();
    rightPaddle.update();
}
    

