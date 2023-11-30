//This array contains the three possible hands
const hand = ['Rock', 'Paper', 'Scissors'];

//The computer randomly determines a hand to play
function getComputerChoice () {
    let randomN = Math.floor(Math.random() * 3);
    return hand[randomN];
}

//The player is prompted to choose one of three hands
//The answer is processed to have the same format as 
//the hand array: Capital First Letter
function getPlayerChoice () {
    let correctInput = false;
    let playerSelection = "";
    let playerInput = "";

    //the loop prompts the user until the input is correct
    //ie, input is rock, paper, or scissors
    while (!correctInput) {
        playerInput = prompt("Please choose 'Rock', 'Paper', or 'Scissors'");
        playerInput = playerInput.toLowerCase();

        //It is not necessary to format the input this way
        //but I wanted to learn about Strings
        playerSelection = playerInput[0].toUpperCase() + playerInput.slice(1);
        correctInput = validateChoice(playerSelection);
    }
    return playerSelection;
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
    console.log("This does nothing yet.");
    console.log(computer, human);
}

playRound(getComputerChoice(), getPlayerChoice());