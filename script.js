console.log("Hello World");


function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3); // 0, 1, or 2

  if (randomNumber === 0) {
    return "rock";
  } else if (randomNumber === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}


function getHumanChoice() {
  const humanInput = prompt("Choose rock, paper, or scissors:");
  return humanInput.toLowerCase(); // normalize so "ROCK", "Rock", etc. all work
}


function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();

  if (humanChoice === computerChoice) {
    console.log(`It's a tie! Both chose ${humanChoice}.`);
    return "tie";

  } else if (
    (humanChoice === "rock"     && computerChoice === "scissors") ||
    (humanChoice === "paper"    && computerChoice === "rock")     ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    
    console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
    return "human";

  } else {
    
    console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
    return "computer";
  }
}


function playGame() {
  // Scores are local so they reset cleanly each time playGame() is called
  let humanScore    = 0;
  let computerScore = 0;

  const TOTAL_ROUNDS = 5;

  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    console.log(`\n--- Round ${round} of ${TOTAL_ROUNDS} ---`);

    const humanSelection    = getHumanChoice();
    const computerSelection = getComputerChoice();

    const winner = playRound(humanSelection, computerSelection);

    if (winner === "human")    humanScore++;
    if (winner === "computer") computerScore++;

    console.log(`Score → You: ${humanScore} | Computer: ${computerScore}`);
  }

  console.log("\n========== GAME OVER ==========");
  console.log(`Final Score → You: ${humanScore} | Computer: ${computerScore}`);

  if (humanScore > computerScore) {
    console.log("You win the game!");
  } else if (computerScore > humanScore) {
    console.log("Computer wins the game!");
  } else {
    console.log("The game is a tie!");
  }
}


playGame();
