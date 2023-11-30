//This array contains the three possible hands
const hand = ['rock', 'paper', 'scissors'];

//The computer randomly determines a hand to play
function getComputerChoice () {
    let randomN = Math.floor(Math.random() * 3);
    return randomN;
    //returns the position in the hand array to compare more easily
}

//The player is prompted to choose one of three hands
//The answer is processed to have the same format as 
//the hand array: Capital First Letter
function getPlayerChoice () {
    let correctInput = false;
    let playerSelection = "";

    while (!correctInput) {
        playerSelection = prompt("Please choose 'Rock', 'Paper', or 'Scissors'");
        playerSelection = playerSelection.toLowerCase();
        correctInput = validateChoice(playerSelection);
    }
    for (let i = 0; i < 3; i++) {
        if (hand[i] == playerSelection) {
            return i;
            //returns the position in the array to compare
            //values (0, 1, or 2) more easily (than words)
        }
    }
}

//This checks if the input from the user matches any
//of the possibilities (RoCK is a match, but rockk isn't)
function validateChoice(choice) {
    let correctInput = false;
    for (let i = 0; i < 3; i++) {
        if (hand[i] == choice) {
            correctInput = true;
        }
    }
    return correctInput;
}

//This plays RPS with the user until there is a winner
//If the player and computer tie, the round is not over
function playRound (computer, human) {
    //console.log(computer + " " + human);
    if (computer == human) {
        console.log("It's a tie! Keep playing!");
        return undefined;
    } else if (computer - human == -1 || computer - human == 2) {
        return "human";
    } else if (human - computer == -1 || human - computer == 2) {
        return "computer";
    }
}

//This code plays a round and finds a winner

function playGame() {
    let computerScore = 0;
    let humanScore = 0;
    
    while (computerScore < 5 && humanScore < 5) {
        let roundWinner = undefined;
        while (roundWinner === undefined) {
            let computer = getComputerChoice();
            let human = getPlayerChoice();
            roundWinner = playRound(computer, human);
            if (roundWinner == "human") {
                let sentence = "You win this round! " + hand[human][0].toUpperCase() + hand[human].slice(1) + " beats " + hand[computer] + "!";
                //The difference here is just to practice backticks and quotation marks
                console.log(sentence);
                humanScore++;
            } else if (roundWinner == "computer") {
                //The difference here is just to practice backticks and quotation marks
                console.log(`You lose this round! ${hand[computer][0].toUpperCase()}${hand[computer].slice(1)} beats ${hand[human]}!`);
                computerScore++;
            }
        }
    }
    if (humanScore == 5) {
        endGame("human", computerScore, humanScore);
    } else {
        endGame("computer", computerScore, humanScore);
    }
}

//This function resets the score of both players in case
//the user wants to play again
function resetScore() {
    humanScore = 0;
    computerScore = 0;
}

//This function checks if the user wants to play again
//It doesn't force the user to play again
function playAgain() {
    let answer = "place holder value";
    
    //asks until the answer is either 'y' or 'n'
    //if the user hits the cancel button from the 
    //prompt box, the value of answer becomes null
    while (answer != null && answer != "y" && answer != "n") {
        answer = prompt("Would you like to play again? Enter 'y' for yes or 'n' for no.");
        if (answer == "y") {
            console.clear();
            playGame();
        } else if (answer == "n") {
            console.log("Have a good one!");
            return;
        }
    }
}

//This function displays a result message (victory or defeat)
//It calls resetScore() and playAgain() to check if the user wants to play
function endGame(winner, computerScore, humanScore) {
    if (winner == "human") {
        console.log(`You have won the match ${humanScore} to ${computerScore}! Congratulations!! Cntl + R to play again.`);
        resetScore();
        playAgain();
    } else {
        console.log(`You have lost the match ${computerScore} to ${humanScore}. Better luck next time! Cntl + R to play again.`);
        resetScore();
        playAgain();
    }
}

playGame();