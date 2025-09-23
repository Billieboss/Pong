const canvas = document.getElementById("zoneJeu");
const ctx = canvas.getContext("2d");

const cursorWidth = canvas.width*0.15;
const ballRadius = canvas.width*0.015;

let ballX = canvas.width/2;
let ballY = canvas.height - 20;
let baseSpeed = 2;
let speedX;
let speedY;
let rafId;

let cursorX = canvas.width/2  - cursorWidth/2; // coordonnée de la raquette

function drawBall(){
    
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

function drawCursor(){

    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.rect(cursorX, canvas.height-10, cursorWidth , 5);
    ctx.fill();
}

function initBallDir(){
    let angle = (Math.random() * 120 + 30) * Math.PI /180;
    speedX = baseSpeed * Math.cos(angle);
    speedY = -baseSpeed * Math.sin(angle);
}

function update(){
    ballX += speedX;
    ballY += speedY;
    if ((ballY - ballRadius/2<=0)||(ballY + ballRadius/2 >= canvas.height)||(ballY == canvas.height-10 && (ballX < cursorX-cursorWidth/2 && ballX > cursorX-cursorWidth/2))){
        speedY = - speedY;
    }
    if((ballX - ballRadius/2<=0)||(ballX + ballRadius/2 >= canvas.width)){
        speedX = - speedX;
    }
}

function loop(){
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawCursor();
    rafId = requestAnimationFrame(loop);
}

initBallDir();
loop();