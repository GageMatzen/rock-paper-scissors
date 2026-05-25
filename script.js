// Grab DOM elements
const humanScoreEl   = document.getElementById("human-score");
const computerScoreEl = document.getElementById("computer-score");
const resultRoundEl  = document.getElementById("result-round");
const resultMessageEl = document.getElementById("result-message");
const gameOverEl     = document.getElementById("game-over");
const gameOverTitle  = document.getElementById("game-over-title");
const gameOverSub    = document.getElementById("game-over-sub");
const playAgainBtn   = document.getElementById("play-again");
const buttons        = document.querySelectorAll(".choice-btn");

// Track scores and round count
let humanScore    = 0;
let computerScore = 0;
let round         = 0;
const WINNING_SCORE = 5;


function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3); // 0, 1, or 2
  if (randomNumber === 0) return "rock";
  if (randomNumber === 1) return "paper";
  return "scissors";
}


function playRound(humanChoice) {
  const computerChoice = getComputerChoice();
  round++;

  // Update round counter in the UI
  resultRoundEl.textContent = `Round ${round}`;

  // Compare choices and update score + result message
  if (humanChoice === computerChoice) {
    showResult("tie", `Tie — both chose ${humanChoice}`);

  } else if (
    (humanChoice === "rock"     && computerChoice === "scissors") ||
    (humanChoice === "paper"    && computerChoice === "rock")     ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    humanScoreEl.textContent = humanScore;
    showResult("win", `You win! ${capitalize(humanChoice)} beats ${computerChoice}`);

  } else {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    showResult("lose", `You lose! ${capitalize(computerChoice)} beats ${humanChoice}`);
  }

  // Check if anyone has reached the winning score
  if (humanScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
    endGame();
  }
}


function showResult(outcome, message) {
  // Remove previous outcome classes, apply the new one
  resultMessageEl.className = "result-message";
  resultMessageEl.classList.add(outcome);
  resultMessageEl.textContent = message;
}


function endGame() {
  // Disable buttons so no more moves can be made
  buttons.forEach(btn => btn.disabled = true);

  // Show the game over panel with the correct winner message
  if (humanScore > computerScore) {
    gameOverTitle.textContent = "You Win!";
    gameOverSub.textContent   = `Final score — You ${humanScore} · CPU ${computerScore}`;
  } else {
    gameOverTitle.textContent = "CPU Wins!";
    gameOverSub.textContent   = `Final score — CPU ${computerScore} · You ${humanScore}`;
  }

  gameOverEl.classList.add("visible");
}


function resetGame() {
  // Reset all state
  humanScore    = 0;
  computerScore = 0;
  round         = 0;

  // Reset score display
  humanScoreEl.textContent    = "0";
  computerScoreEl.textContent = "0";

  // Reset result display
  resultRoundEl.textContent   = "First to 5 wins";
  resultMessageEl.textContent = "Make your move";
  resultMessageEl.className   = "result-message";

  // Re-enable buttons and hide game over panel
  buttons.forEach(btn => btn.disabled = false);
  gameOverEl.classList.remove("visible");
}


// Attach a click listener to each choice button
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    playRound(btn.dataset.choice); // passes "rock", "paper", or "scissors"
  });
});

// Play again resets everything
playAgainBtn.addEventListener("click", resetGame);


// Helper — capitalizes the first letter of a word
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
