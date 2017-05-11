//game objects
var paddle1;
var paddle2;
var ball;
var divider;
var player1Score;
var player2Score;

//initialize all the things
function init() {
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

        this.context.fillStyle= 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //input
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            game.keys = (game.keys || []);
            game.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            game.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//update loop
function update(){

}
