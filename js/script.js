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
let cursorX = canvas.width/2  - cursorWidth/2; 

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

function redrawAll(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawCursor();
}

function initBall(){
    ballX = canvas.width/2;
    ballY = canvas.height - 20;
    speedX = 0;
    speedY = 0;
    let angle = (Math.random() * 120 + 30) * Math.PI /180;
    speedX = baseSpeed * Math.cos(angle);
    speedY = -baseSpeed * Math.sin(angle);
}

function update(){
    ballX += speedX;
    ballY += speedY;
    if (ballY - ballRadius<=0){
        speedY = - speedY;
    }
    
    if( (ballX - ballRadius<=0)
        ||(ballX + ballRadius >= canvas.width)){
            speedX = - speedX;
    }

    if(
        ballY + ballRadius >= cursorY + 2.5 &&
        ballX + ballRadius >= cursorX &&
        ballX <= cursorX + cursorWidth){
            speedY = -speedY;
        }


    if(ballY + ballRadius >= canvas.height){
        gameOver();
        exit;
    }
    
}

function loop(){
    update();
    redrawAll();
    rafId = requestAnimationFrame(loop);

}

function updateScore(){
    scoreDisplay.textContent = "Score : "+score+" s";
    score++;
}
 
document.addEventListener('keydown', (e) =>{
    switch(e.key){
        case "ArrowLeft":
            if(cursorX > 0) cursorX -= 15;
            break;

        case "ArrowRight":
            if(cursorX + cursorWidth < canvas.width) cursorX += 15;
            break;
        
        default:
            break;
    }
    redrawAll();
})

initButton.addEventListener('click', () =>{
    rafId = 0;
    clearInterval(intervalScore);
    score = 0;
    updateScore();
    intervalScore = setInterval(updateScore, 1000);
    initBall();
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

redrawAll();

