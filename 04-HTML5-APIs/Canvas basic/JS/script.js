window.onload = draw();


function draw() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    //fillStyle (r, g, b, alpha)
    ctx.fillStyle = 'red';
    //fillRect (X, Y, width, height)
    ctx.fillRect(36,10,100,100);

    ctx.fillStyle = 'blue';
    ctx.fillRect(36,150,100,50);


    //arc (centerX, centerY, Radio, StartAngle, EndAngle, counterclockwise)

    ctx.beginPath();
    ctx.arc(200,50,40,0,2*Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#0044DD';
    ctx.stroke();
    ctx.fillStyle = '#0088FF';
    ctx.fill();

    ctx.font = "40px Calibri";
    ctx.fillStyle = "black";
    ctx.fillText("Globant",380,75);

    ctx.beginPath();
    ctx.moveTo(350,40);
    ctx.lineTo(350,60);
    ctx.lineTo(360,50);
    ctx.closePath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666666';
    ctx.stroke();
    ctx.fillStyle = "#66AA22";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(350,65);
    ctx.lineTo(350,85);
    ctx.lineTo(360,75);
    ctx.closePath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666666';
    ctx.stroke();
    ctx.fillStyle = "#66AA22";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(365,52.5);
    ctx.lineTo(365,72.5);
    ctx.lineTo(375,62.5);
    ctx.closePath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#666666';
    ctx.stroke();
    ctx.fillStyle = "#66AA22";
    ctx.fill();


}


