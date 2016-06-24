var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();
ctx.style.left = "100px";
ctx.style.top = "100px";
ctx.style.position = "absolute";


