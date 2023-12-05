//This array contains the three possible HANDs
const HAND = ['rock', 'paper', 'scissors'];
let computerScore = 0;
let playerScore = 0;

function getComputerChoice () {
    let randomN = Math.floor(Math.random() * 3);
    return randomN;
    //returns the position in the HAND array to compare more easily
}

function getPlayerChoice() {

    let computerChoice;
    let buttons = document.querySelectorAll(".playBtn");

    buttons[0].addEventListener("click", () => {
        computerChoice = getComputerChoice();
        playRound(computerChoice, "0");
    });
    buttons[1].addEventListener("click", () => {
        computerChoice = getComputerChoice();
        playRound(computerChoice, "1");
    });
    buttons[2].addEventListener("click", () => {
        computerChoice = getComputerChoice();
        playRound(computerChoice, "2");
    });
}

//This plays RPS with the user until there is a winner
//If the player and computer tie, the round is not over
function playRound (computer, player) {
    if (computer == player) {
        displayScore("tie", computer, player);
    } else if (computer - player == -1 || computer - player == 2) {
        playerScore++;
        displayScore("player", computer, player);
    } else if (player - computer == -1 || player - computer == 2) {
        computerScore++;
        displayScore("computer", computer, player);
    }
    if (gameOver()) {
        console.log("Game OveR!");
        endGame();
    }
}

function displayScore(roundWinner = "newRound", computer = 3, player = 3) {

    let cScore = document.querySelector("#computerScore");
    cScore.textContent = "Computer: " + computerScore;
    let hScore = document.querySelector("#playerScore");
    hScore.textContent = playerScore + " : Player";

    if (roundWinner == "tie") {     
        console.log("You and the computer both chose " +
            HAND[player][0].toUpperCase() +
            HAND[player].slice(1) + "! It's a tie!");
    }
    else if (roundWinner == "player") {
        console.log("You win this round! " +
            HAND[player][0].toUpperCase() +
            HAND[player].slice(1) + " beats " + HAND[computer] + "!");
    }
    else if (roundWinner == "computer") {
        console.log("You lose this round! " +
            HAND[computer][0].toLocaleUpperCase() +
            HAND[computer].slice(1) + " beats " + HAND[player] + "!");
    }
    console.log("Computer: " + computerScore);
    console.log("Player: " + playerScore);
}

function gameOver() {
    return (computerScore == 5 || playerScore == 5);
}

//This plays a round, asks for a winner from playRound() and displays a winner
//Should it be broken into three functions?
function playGame() {
    getPlayerChoice();
}

function resetScore() {
    playerScore = 0;
    computerScore = 0;
}

function removeButtons() {
    let buttons = document.querySelectorAll(".playBtn");

    buttons[0].style.visibility = "hidden";
    buttons[1].style.visibility = "hidden";
    buttons[2].style.visibility = "hidden";
}

function turnOffButtons () {
    let buttons = document.querySelectorAll(".playBtn");

    buttons[0].disabled = true;
    buttons[1].disabled = true;
    buttons[2].disabled = true;
}

function turnOnButtons() {
    let buttons = document.querySelectorAll(".playBtn");

    buttons[0].disabled = false;
    buttons[1].disabled = false;
    buttons[2].disabled = false;
}

function playAgain() {
    let rematch = document.querySelector(".offerRematch");

    const rematchBtn = document.createElement("button");
    const declineBtn = document.createElement("button");

    rematchBtn.textContent = "Play Again!";
    declineBtn.textContent = "No thanks!";

    rematch.appendChild(rematchBtn);
    rematch.appendChild(declineBtn);

    rematchBtn.addEventListener("click", () => {
        resetScore();
        displayScore();
        turnOnButtons();
        rematch.removeChild(rematchBtn);
        rematch.removeChild(declineBtn);

    })
    declineBtn.addEventListener("click", () => {
        rematch.removeChild(rematchBtn);
        rematch.removeChild(declineBtn);
        removeButtons();
    })
}

//This ends the game and offers a rematch
function endGame() {
    turnOffButtons();
    if (playerScore == 5) {
        console.log("You have won the match " +
            playerScore + " to " + computerScore + ". Congratulations!!");
        resetScore();
        playAgain();
    } else {
        console.log("You have lost the match " +
            computerScore + " to " + playerScore + ". Better luck next time!");
        resetScore();
        playAgain();
    }
}

playGame();