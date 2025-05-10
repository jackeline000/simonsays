// Define the available colors for the game
const colors = ["blue", "purple", "magenta", "pink"];
let sequence = [];
let playerSequence = [];
let score = 0;
let highScore = localStorage.getItem("simonHighScore") || 0;
let waitingForInput = false; //check if the game is ready for player input

const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const buttons = document.querySelectorAll(".btn");

// Set initial high score display
if (highScoreDisplay) {
  highScoreDisplay.textContent = highScore;
}

// Flash effect for a color
function flashColor(color) {
  const btn = document.querySelector(`.btn.${color}`);
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 500);
}

// Play the full sequence to the player
function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashColor(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      waitingForInput = true;
    }
  }, 800);
}

// Generate next color and play sequence
function nextRound() {
  const nextColor = colors[Math.floor(Math.random() * 4)];
  sequence.push(nextColor);
  playerSequence = [];
  scoreDisplay.textContent = score;
  playSequence();
}

// Handle player input
function handlePlayerClick(e) {
  if (!waitingForInput) return;

  const clickedColor = e.target.dataset.color;
  playerSequence.push(clickedColor);
  flashColor(clickedColor);

  const currentIndex = playerSequence.length - 1;
  if (playerSequence[currentIndex] !== sequence[currentIndex]) { // Check if the clicked color matches the sequence
    alert(" Game Over. Your score was: " + score);
    resetGame();
    return;
  }

  if (playerSequence.length === sequence.length) { // check if player finished the current sequence correctly
    score++;
    waitingForInput = false;

    // Check and update high score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("simonHighScore", highScore);
      if (highScoreDisplay) {
        highScoreDisplay.textContent = highScore;
      }
    }

    setTimeout(nextRound, 1000); // Start the next round after a short delay
  }
}

// Reset the game state
function resetGame() {
  sequence = [];
  playerSequence = [];
  score = 0;
  scoreDisplay.textContent = score;
}

// Add event listeners to each color button to handle player input
startBtn.addEventListener("click", () => {  // Start the game when the player clicks the start button
  resetGame();
  nextRound();
});
buttons.forEach(btn => btn.addEventListener("click", handlePlayerClick));
