//initialize all the things
function init() {

    //game pieces
    leftPaddle = new component(20, 100, "white", 60, 120);
    rightPaddle = new component(20, 100, "white", 1200, 120);
    ball = new component(10, 10, "white", 300, 300);
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

function scoreNumbers(score,x,y){

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
        this.y += this.speedY;
        this.x += this.speedX;  
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
    if (rightPaddle.crashWith(ball)) {
        game.stop();
    } else {
        game.clear();
        

        rightPaddle.speedY = 0;
        leftPaddle.speedY = 0;
        ball.speedX = 5;
        ball.speedY = 5;
        
        //keyboard movement
        if (game.keys && game.keys[38]) {rightPaddle.speedY = -10; }
        if (game.keys && game.keys[40]) {rightPaddle.speedY = 10; }

        //mouse movement, y axis only
        if (game.y) {
            //DISABLED FOR NOW, testing is easier with the keyboard
            //rightPaddle.y = game.y; 
        }
        net();

        ball.newPos();
        ball.update();

        leftPaddle.newPos();
        leftPaddle.update();

        rightPaddle.newPos();
        rightPaddle.update();
    }
    
}
