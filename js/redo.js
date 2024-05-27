'use strict';
const log = console.log;
const HAND = ['rock', 'paper', 'scissors'];
const scores = [0, 0];
const humanScore = document.querySelector('.p1-score');
const computerScore = document.querySelector('.p2-score');

const getComputerChoice = function () {
  return HAND[Math.floor(Math.random() * 3)];
};

const processInput = function (userInput) {
  const cleanInput = userInput.toLowerCase().trim();
  if (
    cleanInput === 'rock' ||
    cleanInput === 'paper' ||
    cleanInput === 'scissors'
  ) {
    return cleanInput;
  }
  return false;
};

const getHumanChoice = function () {
  let humanChoice;
  do {
    humanChoice = prompt('Rock, Paper, Scissors! What say you?');
    humanChoice = processInput(humanChoice);
  } while (!humanChoice);
  return humanChoice;
};

const determineWinner = function (humanHand, computerHand) {
  if (computerHand === 'paper') {
    if (humanHand === 'scissors') {
      scores[0]++;
    }
    if (humanHand === 'rock') {
      scores[1]++;
    }
  }

  if (computerHand === 'scissors') {
    if (humanHand === 'rock') {
      scores[0]++;
    }
    if (humanHand === 'paper') {
      scores[1]++;
    }
  }

  if (computerHand === 'rock') {
    if (humanHand === 'paper') {
      scores[0]++;
    }
    if (humanHand === 'scissors') {
      scores[1]++;
    }
  }
  humanScore.textContent = scores[0];
  computerScore.textContent = scores[1];
  log(scores);
};

const checkGameOver = function () {
  if (scores[0] === 5 || scores[1] === 5) {
    log(`Game Over! ${scores[0] === 5 ? 'Player 1' : 'Player 2'} wins!`);
    return true;
  }
  return false;
};

const playRound = function () {
  log('********************');
  const humanChoice = getHumanChoice();
  const computerChoice = getComputerChoice();
  log('Player : ', humanChoice);
  log('Computer : ', computerChoice);
  determineWinner(humanChoice, computerChoice);
};

const startGame = function () {
  do {
    playRound();
  } while (!checkGameOver());

  log('Would you like to play again?');
};

window.addEventListener('load', () => {
  startGame();
});
