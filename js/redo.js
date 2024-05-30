'use strict';
const log = console.log;
const HAND = ['rock', 'paper', 'scissors'];
const scores = [0, 0];
const header = document.querySelector('.header');
const mainNavLinks = document.querySelectorAll('.main-nav-link');
const btnMobileNav = document.querySelector('.btn-mobile-nav');
const humanScore = document.querySelector('.p1-score');
const computerScore = document.querySelector('.p2-score');
const playButtonContainer = document.querySelector('.button-container');
const playButtons = document.querySelectorAll('.btn--play');
const playAgainButton = document.querySelector('.btn--play-again');
const archive = document.querySelector('.archive');
const humanIcon = document.querySelector('.human');
const computerIcon = document.querySelector('.computer');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const victoryText = document.querySelector('.victory');

const getComputerChoice = function () {
  return HAND[Math.floor(Math.random() * 3)];
};

// Used in the no-GUI version
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
};

const displayScores = function () {
  log(`Human: ${scores[0]}\nComputer: ${scores[1]}\n*****`);
};

const determineWinner = function (humanHand) {
  let computerHand = getComputerChoice();
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
  if (scores[0] !== 5 && scores[1] !== 5) return;

  log(
    `Game Over! ${
      scores[0] === 5 ? 'The Resourceful Human' : 'The Almighty Computer'
    } wins!`
  );

  suspendPlayButtons();
  activateModal();

  if (scores[0] === 5) {
    humanIcon.style.fill = '#d62828';
    humanScore.style.color = '#d62828';
    victoryText.textContent = 'You win!';
    return;
  }
  computerIcon.style.fill = '#d62828';
  computerScore.style.color = '#d62828';
  victoryText.textContent = 'You lose!';
};

const startNewGame = function () {
  humanIcon.style.fill = '#003049';
  humanScore.style.color = '#003049';
  humanScore.textContent = '0';
  scores[0] = 0;

  computerIcon.style.fill = '#003049';
  computerScore.style.color = '#003049';
  computerScore.textContent = '0';
  scores[1] = 0;

  archive.textContent = '';
  reactivatePlayButtons();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
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

const closeWithEsc = function () {
  deactivateModal();
};

const activateModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  window.addEventListener('keydown', closeWithEsc);
};

const deactivateModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  window.removeEventListener('keydown', closeWithEsc);
};

const playRock = function () {
  determineWinner('rock');
};
const playPaper = function () {
  determineWinner('paper');
};
const playScissors = function () {
  determineWinner('scissors');
};

const activatePlayButtons = function () {
  playButtons[0].addEventListener('click', playRock);
  playButtons[1].addEventListener('click', playPaper);
  playButtons[2].addEventListener('click', playScissors);
};
const reactivatePlayButtons = function () {
  playButtons[0].removeEventListener('click', activateModal);
  playButtons[1].removeEventListener('click', activateModal);
  playButtons[2].removeEventListener('click', activateModal);
  activatePlayButtons();
};

const suspendPlayButtons = function () {
  playButtons[0].removeEventListener('click', playRock);
  playButtons[1].removeEventListener('click', playPaper);
  playButtons[2].removeEventListener('click', playScissors);

  playButtons[0].addEventListener('click', activateModal);
  playButtons[1].addEventListener('click', activateModal);
  playButtons[2].addEventListener('click', activateModal);
};

window.addEventListener('load', () => {
  activatePlayButtons();
  playAgainButton.addEventListener('click', () => {
    startNewGame();
  });
  overlay.addEventListener('click', () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  });
  btnMobileNav.addEventListener('click', () => {
    header.classList.toggle('nav-open');
  });
  mainNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
    });
  });

  // startGame();
});
