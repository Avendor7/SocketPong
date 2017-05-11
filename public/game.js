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
    canvas : document.createElement("canvas"),
    start : function() {
        //set width to the container width
        this.canvas.style.width = '100%';
        //set height to the window height
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(update, 20);

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
