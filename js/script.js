//This array contains the three possible HANDs
const HAND = ['rock', 'paper', 'scissors'];
let computerScore = 0;
let humanScore = 0;

function getComputerChoice () {
    let randomN = Math.floor(Math.random() * 3);
    console.log("The PC made up its mind.");
    return randomN;
    //returns the position in the HAND array to compare more easily
}

function getPlayerChoice() {
    let buttons = document.querySelectorAll(".playBtn");
    buttons[0].addEventListener("click", () => console.log("Rock!"));
    buttons[1].addEventListener("click", () => console.log("Paper!"));
    buttons[2].addEventListener("click", () => console.log("Scissors!"));
}

/*I want to keep this code because it was part of the first RPS project.
function getPlayerChoice () {
    let correctInput = false;
    let playerSelection = "";

    while (!correctInput) {
        playerSelection = prompt("Please input 'Rock', 'Paper', or 'Scissors'");
        playerSelection = playerSelection.toLowerCase();
        correctInput = validateChoice(playerSelection);
    }
    for (let i = 0; i < 3; i++) {
        if (HAND[i] == playerSelection) {
            return i;
            //returns the position in the array to compare
            //values (0, 1, or 2) more easily (than words)
        }
    }
}

function validateChoice(choice) {
    let correctInput = false;
    for (let i = 0; i < 3; i++) {
        if (HAND[i] == choice) {
            correctInput = true;
        }
    }
    return correctInput;
}
*/

//This plays RPS with the user until there is a winner
//If the player and computer tie, the round is not over
function playRound (computer, human) {
    //console.log(computer + " " + human);
    if (computer == human) {
        console.log("It's a tie! Keep playing!");
        return undefined;
    } else if (computer - human == -1 || computer - human == 2) {
        return ["human", computer, human];
    } else if (human - computer == -1 || human - computer == 2) {
        return ["computer", computer, human];
    }
}

//This plays a round, asks for a winner from playRound() and displays a winner
//Should it be broken into three functions?
function playGame() {
    
    console.log("Hi");
    getComputerChoice();
    getPlayerChoice();
    // while (computerScore < 5 && humanScore < 5) {
    //     let roundWinner = undefined;
    //     while (roundWinner === undefined) {
    //         let computer = getComputerChoice();
    //         let human = getPlayerChoice();
    //         roundWinner = playRound(computer, human);
    //         if (roundWinner == "human") {
    //             console.log("You win this round! " +
    //                 HAND[human][0].toUpperCase() +
    //                 HAND[human].slice(1) + " beats " + HAND[computer] + "!");
    //             humanScore++;
    //         } else if (roundWinner == "computer") {
    //             console.log("You lose this round! " +
    //                 HAND[computer][0].toLocaleUpperCase() +
    //                 HAND[computer].slice(1) + "beats " + HAND[human] + "!");
    //             computerScore++;
    //         }
    //         console.log("The score is: Computer " + computerScore +
    //             " to " + humanScore + " Human");
    //     }
    // }
    // if (humanScore == 5) {
    //     endGame("human", computerScore, humanScore);
    // } else {
    //     endGame("computer", computerScore, humanScore);
    // }
}

function resetScore() {
    humanScore = 0;
    computerScore = 0;
}

function playAgain() {
    let answer = "place holder value";
    
    //asks until the answer is either 'y' or 'n' CANCEL button returns null
    while (answer != null && answer != "y" && answer != "n") {
        answer = prompt("Would you like to play again? Enter 'y' or 'n'.");
        if (answer == "y") {
            console.clear();
            playGame();
        } else if (answer == "n") {
            console.log("Have a good one!");
            return;
        }
    }
}

//This ends the game and offers a rematch
function endGame(winner, computerScore, humanScore) {
    if (winner == "human") {
        console.log("You have won the match " +
            humanScore + " to " + computerScore + ". Congratulations!!");
        resetScore();
        playAgain();
    } else {
        console.log("You have lost the match " +
            computerScore + " to " + humanScore + ". Better luck next time!");
        resetScore();
        playAgain();
    }
}

playGame();