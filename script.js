'use strict';
//selectin elements
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnROle = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//starting condition
let scores;
let currentScore;
let activePlayer;
let playing;

//initial condition
const initial = function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initial();

//swith function variable
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
diceElement.classList.add('hidden');

//if dice is rollled
btnROle.addEventListener('click', function () {
  if (playing) {
    //generating random dice number
    const diceAppear = Math.trunc(Math.random() * 6) + 1;
    console.log('dice roll');

    //display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceAppear}.png`;

    //check for rolled 1
    if (diceAppear !== 1) {
      //add the dice appear to the current score
      currentScore = currentScore + diceAppear;
      console.log(currentScore);
      //display current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //move to the next player
      switchPlayer();
      console.log(currentScore);
    }
  }
});

//hold the score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add the score of active player
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check player has score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      //if yes finish the game

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner .name');
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //if not then switch to next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', initial);
