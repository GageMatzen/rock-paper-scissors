// =============================================================
//  ROCK PAPER SCISSORS — script.js
// =============================================================
// written by Claude.ai

// -------------------------------------------------------------
//  Step 1 - Get the computer's choice
// -------------------------------------------------------------
/*
  FUNCTION getComputerChoice:
    1. Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
       using Math.random().
    2. Multiply that number by 3 to spread it across three buckets:
         [0, 1)  → "rock"
         [1, 2)  → "paper"
         [2, 3)  → "scissors"
    3. Use Math.floor() to round DOWN to 0, 1, or 2.
    4. Use an if / else-if / else to return the matching string.
  END FUNCTION
*/
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

// -------------------------------------------------------------
//  Step 2 - Get the human player's choice
// -------------------------------------------------------------
/*
  FUNCTION getHumanChoice:
    1. Use window.prompt() to show a dialog asking the player
       to type "rock", "paper", or "scissors".
    2. Convert the input to lowercase so "ROCK", "Rock", etc. all work.
       (Case-insensitivity is also handled in playRound, but doing it
        here normalizes the value early.)
    3. Return the lowercase string.
  END FUNCTION

  NOTE: We assume the user always enters a valid choice for now.
        Invalid-input handling will be added in later.
*/
function getHumanChoice() {
  const humanInput = prompt("Choose rock, paper, or scissors:");
  return humanInput.toLowerCase(); // normalize casing
}

// Quick test — uncomment to test manually, then re-comment
// console.log("Human chose:", getHumanChoice());


// -------------------------------------------------------------
//  Step 3 - Declare score variables in the global scope
// -------------------------------------------------------------
/*
  1. Declare a variable humanScore and initialize it to 0.
  2. Declare a variable computerScore and initialize it to 0.
  3. These live in the GLOBAL scope so every function can read
     and update them.

  NOTE: In Step 5 these will move INSIDE playGame() so that
        scores reset with every new game call.
*/
let humanScore = 0;
let computerScore = 0;


// -------------------------------------------------------------
//  STEP 4 — Play a single round
// -------------------------------------------------------------
/*
  FUNCTION playRound(humanChoice, computerChoice):
    1. Normalize humanChoice to lowercase (handles "ROCK", "RocK", etc.).
    2. Determine the round outcome using nested conditions:
         IF humanChoice === computerChoice → it's a TIE
         ELSE IF human wins (rock>scissors, paper>rock, scissors>paper):
           → increment humanScore
           → log "You win! <humanChoice> beats <computerChoice>"
         ELSE (computer wins):
           → increment computerScore
           → log "You lose! <computerChoice> beats <humanChoice>"
    3. Return the result string (useful later for the UI).
  END FUNCTION
*/
function playRound(humanChoice, computerChoice) {
  // Step 1 — normalize casing
  humanChoice = humanChoice.toLowerCase();

  // Step 2 — evaluate the round
  if (humanChoice === computerChoice) {
    console.log(`It's a tie! Both chose ${humanChoice}.`);
    return "tie";

  } else if (
    (humanChoice === "rock"     && computerChoice === "scissors") ||
    (humanChoice === "paper"    && computerChoice === "rock")     ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
    return "human";

  } else {
    computerScore++;
    console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
    return "computer";
  }
}


// -------------------------------------------------------------
//  STEP 5 — Play the full game (5 rounds)
// -------------------------------------------------------------
/*
  FUNCTION playGame:
    1. Move humanScore and computerScore INSIDE this function
       so they reset to 0 each time a new game starts.
    2. Loop 5 times:
         a. Call getHumanChoice()    → get humanSelection
         b. Call getComputerChoice() → get computerSelection
         c. Call playRound(humanSelection, computerSelection)
         d. Log the running score after each round.
    3. After the loop ends:
         IF humanScore > computerScore  → log "You win the game!"
         IF computerScore > humanScore  → log "Computer wins the game!"
         IF scores are equal            → log "The game is a tie!"
  END FUNCTION
*/
function playGame() {
  // Reset scores for a fresh game
  let humanScore    = 0; // shadows global — score is local to this game
  let computerScore = 0;

  const TOTAL_ROUNDS = 5;

  // Play 5 rounds
  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    console.log(`\n--- Round ${round} of ${TOTAL_ROUNDS} ---`);

    const humanSelection    = getHumanChoice();
    const computerSelection = getComputerChoice();

    // playRound uses the closured score variables declared above
    // We update scores directly inside playRound using the outer vars,
    // but since we shadowed them here, we capture the winner and update locally.
    const winner = playRound(humanSelection, computerSelection);

    // Update local scores based on winner returned from playRound
    if (winner === "human")    humanScore++;
    if (winner === "computer") computerScore++;

    console.log(`Score → You: ${humanScore} | Computer: ${computerScore}`);
  }

  // Declare the overall game winner
  console.log("\n========== GAME OVER ==========");
  console.log(`Final Score → You: ${humanScore} | Computer: ${computerScore}`);

  if (humanScore > computerScore) {
    console.log("🎉 You win the game!");
  } else if (computerScore > humanScore) {
    console.log("💻 Computer wins the game!");
  } else {
    console.log("🤝 The game is a tie!");
  }
}


// -------------------------------------------------------------
//  START THE GAME
// -------------------------------------------------------------
/*
  1. Call playGame() to kick everything off.
  2. The player will be prompted 5 times via the browser dialog.
  3. Results print to the browser console (F12 → Console).
*/
playGame();
