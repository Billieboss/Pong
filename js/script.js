const canvas = document.getElementById("zoneJeu");
const ctx = canvas.getContext("2d");
const initButton = document.getElementById("newGame-btn");
const scoreDisplay = document.getElementById("score");

const cursorWidth = canvas.width*0.15;
const ballRadius = canvas.width*0.015;

let ballX = canvas.width/2;
let ballY = canvas.height - 20;
let baseSpeed = 2;
let speedX;
let speedY;
let rafId;

let score = 0;
let intervalScore;


const cursorY = canvas.height -10;
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
    ctx.rect(cursorX, cursorY, cursorWidth , 5);
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
    if ((ballY - ballRadius/2<=0)||(ballY == canvas.height-10 && (ballX < cursorX-cursorWidth/2 && ballX > cursorX+cursorWidth/2))){
        speedY = - 1.01*speedY;
    }
    if((ballX - ballRadius/2<=0)||(ballX + ballRadius/2 >= canvas.width)){
        speedX = - 1.01*speedX;
    }
    if(ballY + ballRadius/2 >= canvas.height){
        gameOver();
        exit;
    }
    
}

function loop(){
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawCursor();
    rafId = requestAnimationFrame(loop);

}

function updateScore(){
    scoreDisplay.textContent = "Score : "+score+" s";
    score++;
}

initButton.addEventListener('click', () =>{
    clearInterval(intervalScore);
    score = 0;
    updateScore();
    intervalScore = setInterval(updateScore, 1000);
    ballX = canvas.width/2;
    ballY = canvas.height - 20;
    speedX = 0;
    speedY = 0;
    initBallDir();
    loop();   
});

function gameOver(){
    clearInterval(intervalScore);
    ctx.font = 'bold 20px Verdana, Arial, serif';
    ctx.fillStyle = 'pink';
    ctx.textAlign = 'center'; 
    ctx.fillText('Perdu :(', canvas.width/2, canvas.height/2);
    ctx.font = 'bold 10px Verdana, Arial, serif';
    ctx.fillStyle = 'pink';
    ctx.textAlign = 'center'; 
    score -= 1;
    ctx.fillText('Votre score : '+ score , canvas.width/2, canvas.height/1.5);
}

