const canvas = document.getElementById("zoneJeu");
const ctx = canvas.getContext("2d");

const cursorWidth = 50

let ballX = canvas.width/2;
let ballY = canvas.height - 20;
let speedX = 2;
let speedY = -2;
let rafId;

let cursorX = canvas.width/2  - cursorWidth/2; // coordonnée de la raquette

function drawBall(){
    
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
    ctx.fill();
}

function drawCursor(){

    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.rect(cursorX, canvas.height-10, cursorWidth , 5);
    ctx.fill();
}

function update(){
    ballX +=  0.5 * speedX;
    ballY +=  speedY;
    if (ballY < 0){
        speedY * -1;
        speedX * -1;
    }
}

function loop(){
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawCursor();
    rafId = requestAnimationFrame(loop);
}

loop();