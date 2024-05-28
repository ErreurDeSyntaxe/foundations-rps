'use strict';
const log = console.log;
const HAND = ['rock', 'paper', 'scissors'];
const scores = [0, 0];
const humanScore = document.querySelector('.p1-score');
const computerScore = document.querySelector('.p2-score');
const playButtons = document.querySelectorAll('.btn--play');
const archive = document.querySelector('.archive');
const humanIcon = document.querySelector('.human');
const computerIcon = document.querySelector('.computer');

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

// Used in the no-GUI version
const getHumanChoice = function () {
  let humanChoice;
  do {
    // humanChoice = prompt('Rock, Paper, Scissors! What say you?');
    humanChoice = getComputerChoice();
    humanChoice = processInput(humanChoice);
  } while (!humanChoice);
  return humanChoice;
};

const displayHands = function (humanHand, computerHand, roundWinner) {
  log(`*****\nHuman: ${humanHand} \nComputer: ${computerHand}`);
  if (roundWinner === 0) {
    archive.innerHTML += `<br/><span>${humanHand}</span> \u2014 ${computerHand}`;
  }
  if (roundWinner === 1) {
    archive.innerHTML += `<br/>${humanHand} \u2014 <span>${computerHand}</span>`;
  }
  if (roundWinner === undefined) {
    archive.innerHTML += `<br/>${humanHand} \u2014 ${computerHand}`;
  }
  log('Round Winner', roundWinner);
};

const displayScores = function () {
  log(`Human: ${scores[0]}\nComputer: ${scores[1]}\n*****`);
};

const determineWinner = function (humanHand, computerHand) {
  let roundWinner = undefined;
  if (computerHand === 'paper') {
    if (humanHand === 'scissors') {
      roundWinner = 0;
    }
    if (humanHand === 'rock') {
      roundWinner = 1;
    }
  }

  if (computerHand === 'scissors') {
    if (humanHand === 'rock') {
      roundWinner = 0;
    }
    if (humanHand === 'paper') {
      roundWinner = 1;
    }
  }

  if (computerHand === 'rock') {
    if (humanHand === 'paper') {
      roundWinner = 0;
    }
    if (humanHand === 'scissors') {
      roundWinner = 1;
    }
  }
  scores[roundWinner]++;
  displayHands(humanHand, computerHand, roundWinner);
  humanScore.textContent = scores[0];
  computerScore.textContent = scores[1];
  displayScores();
  checkGameOver();
};

const checkGameOver = function () {
  if (scores[0] === 5 || scores[1] === 5) {
    log(
      `Game Over! ${
        scores[0] === 5 ? 'The Resourceful Human' : 'The Almighty Computer'
      } wins!`
    );
    playButtons.forEach((button) => (button.disabled = true));
    if (scores[0] === 5) {
      humanIcon.style.fill = '#d62828';
      humanScore.style.color = '#d62828';
    } else {
      computerIcon.style.fill = '#d62828';
      computerScore.style.color = '#d62828';
    }
  }
};

// Used in the no-GUI version
const playRound = function () {
  log('********************');
  const humanChoice = getHumanChoice();
  const computerChoice = getComputerChoice();
  log('Player : ', humanChoice);
  log('Computer : ', computerChoice);
  determineWinner(humanChoice, computerChoice);
};

// Used in the no-GUI version
const startGame = function () {
  do {
    playRound();
  } while (!checkGameOver());

  log('Would you like to play again?');
};

window.addEventListener('load', () => {
  playButtons[0].addEventListener('click', () => {
    determineWinner('rock', getComputerChoice());
  });
  playButtons[1].addEventListener('click', () => {
    determineWinner('paper', getComputerChoice());
  });
  playButtons[2].addEventListener('click', () => {
    determineWinner('scissors', getComputerChoice());
  });

  // startGame();
});
