//game objects
var paddle1;
var paddle2;
var ball;
var divider;
var player1Score;
var player2Score;

//initialize all the things
function init() {

    //game pieces
    leftPaddle = new component(20, 100, "white", 60, 120);
    rightPaddle = new component(20, 100, "white", 1200, 120);

    player1Score = new scoreNumbers(30, 30, "green", 10, 120);
    player2Score = new scoreNumbers(30, 30, "green", 10, 120);
    
    //start the game
    game.start();
}

//main game object
var game = {
    canvas : document.getElementById("pong"),
    start : function() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(update, 20);
        //background
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //input
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            game.keys = (game.keys || []);
            game.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            game.keys[e.keyCode] = (e.type == "keydown");
        });
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function scoreNumbers(score,x,y){

}

//game object
function component(width, height, color, x, y) {
    //object attributes
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; 
    this.x = x;
    this.y = y;

    //functions called by update loop
    this.update = function() {
        context = game.context;
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.y += this.speed; 
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

        //should maybe re-write this to assume false, rather than assume true and prove wrong - may reduce any possible false positives
        var crash = true;
        
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }

        return crash;
    }
}

//update loop
function update(){
    //if collision, stop the game, else, update all the things
    // if (myGamePiece.crashWith(myObstacle)) {
    //     mygame.stop();
    // } else {
    //     mygame.clear();
    //     myObstacle.update();
    //     myGamePiece.newPos(); 
    //     myGamePiece.update();
    // }
    game.clear();

    rightPaddle.speed = 0;
    leftPaddle.speed = 0;
    
    if (game.keys && game.keys[38]) {rightPaddle.speed = -10; }
    if (game.keys && game.keys[40]) {rightPaddle.speed = 10; }

    leftPaddle.newPos();
    leftPaddle.update();

    rightPaddle.newPos();
    rightPaddle.update();
}
