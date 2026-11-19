const targetButton = document.querySelector(".target-button");

let score = 0;
const scoreDisplay = document.querySelector("#score");
const gameArea = document.querySelector(".game-area");

console.log(gameArea.clientWidth);
console.log(gameArea.clientHeight);
console.log(targetButton.offsetWidth);
console.log(targetButton.offsetHeight);
console.log(Math.floor(Math.random() * 100));
let timeLeft = 20;
let countdownInterval;
const timerBar = document.querySelector("#timer-bar");
let gameOver = false;
const gameOverScreen = document.querySelector("#game-over-screen");
const finalScoreDisplay = document.querySelector("#final-score");
const gameElements = document.querySelectorAll("main > *:not(#game-over-screen)");
const restartButton = document.querySelector("#restart-button");

targetButton.addEventListener("click", function() {
    if (gameOver) return;

    score++;
    clearInterval(countdownInterval);
    timeLeft = 20;
    timerBar.style.transition = "none";
    timerBar.style.width = "100%";
    timerBar.offsetWidth;
    timerBar.style.transition = "width 20s linear";
    timerBar.style.width = "0%";
    countdownInterval = setInterval(countdown, 1000);
    scoreDisplay.textContent = score;
    moveTarget();
});

function moveTarget() {
    const maxX = gameArea.clientWidth - targetButton.offsetWidth;
    const maxY = gameArea.clientHeight - targetButton.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    targetButton.style.left = randomX + "px";
    targetButton.style.top = randomY + "px";

    console.log(randomX, randomY);
}

function countdown() {
    timeLeft--;
    if (timeLeft <= 0) {
        gameOver = true;
        targetButton.disabled = true;
        clearInterval(countdownInterval);
        gameOverScreen.classList.remove("hidden");
        gameElements.forEach(function(element) {
            element.classList.add("hidden");
        });
        finalScoreDisplay.textContent = score;
    }
}

restartButton.addEventListener("click", function() {
    score = 0;
    timeLeft = 20;
    scoreDisplay.textContent = score;
    timerBar.style.width = "100%";
    targetButton.disabled = false;
    gameElements.forEach(function(element) {
        element.classList.remove("hidden");
    });
    gameOverScreen.classList.add("hidden");
    gameOver = false;
    moveTarget();
});

moveTarget();
