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
    console.log(computer + " " + human);
    if (computer == human) {
        console.log("It's a tie! Keep playing!");
        return undefined;
    } else if (computer - human == -1 || computer - human == 2) {
        return "human";
    } else if (human - computer == -1 || human - computer == 2) {
        return "computer";
    }
}

//
let roundWinner = undefined;
while (roundWinner === undefined) {
    roundWinner = playRound(getComputerChoice(), getPlayerChoice());
}
console.log(roundWinner);