# Rock Paper Scissors — Pseudocode

---

## Verify the script loads
- Log a test message to confirm HTML and JS are connected

---

## Get the computer's choice
- Pick a random number mapped to rock, paper, or scissors
- Return the result

---

## Get the human's choice
- Prompt the player to type their choice
- Return the result

---

## Play one round
- Compare the human and computer choices
- If they match → tie
- If human wins → add 1 to human score, announce winner
- If computer wins → add 1 to computer score, announce winner

---

## Play the full game
- Reset both scores to zero
- Repeat for 5 rounds:
  - Get human choice
  - Get computer choice
  - Play the round
  - Display running score
- After 5 rounds, compare scores and declare the overall winner

---

## Start the game
- Call playGame to run everything
