const canvas = document.getElementById("zoneJeu");
const ctx = canvas.getContext("2d");
const initButton = document.getElementById("newGame-btn");
const scoreDisplay = document.getElementById("score");
const highestScoreDisplay = document.getElementById("highscore");
const left = document.getElementById("gauche");
const right = document.getElementById("droite");
const locStorage = localStorage;
const bgColor = document.getElementById("background-color");
const ballColor = document.getElementById("ball-color");
const cursorColor = document.getElementById("cursor-color");

const rangeSpeed = document.getElementById("speed-slider");


locStorage.setItem("bgColor", bgColor.value);
locStorage.setItem("ballColor", ballColor.value);
locStorage.setItem("cursorColor", cursorColor.value);
locStorage.setItem("baseSpeed", rangeSpeed.value);

canvas.style.backgroundColor = locStorage.getItem("bgColor");



const cursorWidth = canvas.width*0.15;
const ballRadius = canvas.width*0.015;

let ballX = canvas.width/2;
let ballY = canvas.height - 20;
let baseSpeed = localStorage.getItem("baseSpeed");
let speedX;
let speedY;
let rafId;

let moveLeft = false;
let moveRight = false;

let score = 0;
let intervalScore;

if(locStorage.getItem("highestScore") == null) locStorage.setItem("highestScore", 0);



const cursorY = canvas.height -10;
let cursorX = canvas.width/2  - cursorWidth/2; 
highestScoreDisplay.textContent = "Meilleur score : "+locStorage.getItem("highestScore")+" s";



function drawBall(){    
    ctx.beginPath();
    ctx.fillStyle = locStorage.getItem("ballColor");
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

function drawCursor(){

    ctx.beginPath();
    ctx.fillStyle = locStorage.getItem("cursorColor");
    ctx.rect(cursorX, cursorY, cursorWidth , 5);
    ctx.fill();
}

function redrawAll(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawCursor();

}

function init(){
    cursorX = canvas.width/2  - cursorWidth/2;
    ballX = canvas.width/2;
    ballY = canvas.height - 20;
    speedX = 0;
    speedY = 0;
    let angle 
    do {
        angle = (Math.random() * 120 + 30) * Math.PI /180;
    } while (Math.abs(Math.cos(angle)) < 0.2); 
    speedX = baseSpeed * Math.cos(angle);
    speedY = -baseSpeed * Math.sin(angle);
}

function update(){
    ballX += speedX;
    ballY += speedY;
    if (ballY - ballRadius<=0){
            if (speedY <=baseSpeed*5 && speedY >=-baseSpeed*5)speedY = - speedY;
            else speedY = - 1 * speedY;
    }
    
    if( (ballX - ballRadius<=0)
        ||(ballX + ballRadius >= canvas.width)){
            if (speedX <=baseSpeed*5 && speedX >=-baseSpeed*5)speedX = - 1.05 * speedX;
            else speedX = - 1 * speedX;
    }

    if(
        ballY + ballRadius >= cursorY + 2.5 &&
        ballX + ballRadius >= cursorX &&
        ballX <= cursorX + cursorWidth){
            if (speedY <=baseSpeed*5 && speedY >=-baseSpeed*5)speedY = - 1.05 * speedY;
            else speedY = - 1 * speedY;
        }


    if(ballY + ballRadius >= canvas.height){
        gameOver();
        exit;
    }
    
}

function updateCursor(){
    if(moveLeft && cursorX > 0){
        cursorX -= 5;
    }
    if(moveRight&& cursorX + cursorWidth < canvas.width){
        cursorX += 5;
    }
}

function loop(){
    update();
    updateCursor();
    redrawAll();

    rafId = requestAnimationFrame(loop);

}

function updateScore(){
    score++;
    scoreDisplay.textContent = "Score : "+score+" s";
    if(score >= locStorage.getItem("highestScore")){
        highestScoreDisplay.textContent = "Meilleur score : "+score+" s";
    }
}
 
document.addEventListener('keydown', (e) =>{
    switch(e.key){
        case "ArrowLeft":
            moveLeft = true;
            break;

        case "ArrowRight":
            moveRight = true
        break;
        
        default:
            break;
    }
});

document.addEventListener('keyup', (e) =>{
    switch(e.key){
        case "ArrowLeft":
            moveLeft = false;
            break;

        case "ArrowRight":
            moveRight = false;
        break;
        
        default:
            break;
    }
});

initButton.addEventListener('click', () =>{
    cancelAnimationFrame(rafId);
    clearInterval(intervalScore);
    score = 0;
    updateScore();
    intervalScore = setInterval(updateScore, 1000);
    init();
    loop();   
});

left.addEventListener('mousedown', () => moveLeft = true);
left.addEventListener('mouseup', () => moveLeft = false);
right.addEventListener('mousedown', () => moveRight = true);
right.addEventListener('mouseup', () => moveRight = false);

left.addEventListener('touchstart', () => moveLeft = true);
left.addEventListener('touchend', () => moveLeft = false);
right.addEventListener('touchstart', () => moveRight = true);
right.addEventListener('touchend', () => moveRight = false);


function gameOver(){
    cancelAnimationFrame(rafId);
    clearInterval(intervalScore);
    ctx.font = 'bold 20px Verdana, Arial, serif';
    ctx.fillStyle = locStorage.getItem("ballColor");
    ctx.textAlign = 'center'; 
    ctx.fillText('Perdu :(', canvas.width/2, canvas.height/2);
    ctx.font = 'bold 10px Verdana, Arial, serif';
    ctx.fillText('Votre score : '+ score , canvas.width/2, canvas.height/1.5);
    if(score > locStorage.getItem("highestScore")){
        localStorage.setItem("highestScore", score);
        ctx.fillText('Bravo ! Record battu', canvas.width/2, canvas.height/1.25);

    }
}

function ouvrirMiniPage() {
  document.getElementById("option").style.display = "flex";
}
function fermerMiniPage() {
  document.getElementById("option").style.display = "none";
}


bgColor.addEventListener("input", (e) => {
    locStorage.setItem("bgColor", e.target.value);
    canvas.style.backgroundColor = locStorage.getItem("bgColor");
});

ballColor.addEventListener("change", (e) => {
    locStorage.setItem("ballColor",e.target.value);
});

cursorColor.addEventListener("change", (e) => {
    locStorage.setItem("cursorColor",e.target.value);
});

rangeSpeed.addEventListener("input", (e) => {
    baseSpeed = e.target.value;
    locStorage.setItem("baseSpeed",e.target.value);
});



redrawAll();

