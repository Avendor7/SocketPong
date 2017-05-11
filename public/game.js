var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.height = clientheight;
canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
