var atom = new Image();
var elec = new Image();
var elec2 = new Image();

function init(){
    atom.src = 'http://i.imgur.com/94PggaX.jpg';
    elec.src = 'http://i.imgur.com/9z4b45y.png';
    elec2.src = 'http://i.imgur.com/9z4b45y.png';
    window.requestAnimationFrame(draw);
}

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 300, 300); // clear canvas

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.save();
    ctx.translate(150,150);

    // Electron 1
    var time = new Date();
    ctx.scale(2.5,1);
    ctx.rotate(((Math.PI)/500)*time.getMilliseconds());
    ctx.translate(60,0);
    ctx.drawImage(elec2,-22,-22,10,10);

    ctx.restore();

    ctx.save();
    ctx.translate(150,150);

    // Electron 2
    ctx.scale(1,2.5);
    ctx.rotate(((Math.PI)/500)*time.getMilliseconds());
    ctx.translate(60,0);
    ctx.drawImage(elec2,-22,-22,10,10);

    ctx.restore();





    // // Electron 1 orbit
    ctx.save();
    ctx.scale(3, 1);
    ctx.beginPath();
    ctx.arc(50, 150, 40, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // Electron 2 orbit
    ctx.save();
    ctx.scale(1, 3);
    ctx.beginPath();
    ctx.arc(150, 50, 40, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // Electron 3 orbit
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(150, 140, 130, 40, 45 * Math.PI/4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // Electron 4 orbit
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(150,140, 130, 40, 45 * Math.PI/12, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    ctx.drawImage(atom,0,40,300,200);

    window.requestAnimationFrame(draw);
}

init();