/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Make an array for cards and shuffle the cards
let cardList = [
  'fa fa-diamond',
  'fa fa-paper-plane-o',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-cube',
  'fa fa-anchor',
  'fa fa-leaf',
  'fa fa-bicycle',
  'fa fa-diamond',
  'fa fa-bomb',
  'fa fa-leaf',
  'fa fa-bomb',
  'fa fa-bolt',
  'fa fa-bicycle',
  'fa fa-paper-plane-o',
  'fa fa-cube'
]
let shuffleCards = shuffle(cardList);
let decks = document.querySelector(".deck");
let cards = document.querySelector(".card");
let openCardList = [];
let matchedCardList = [];
let nums;
const moves = document.querySelector(".moves");
let numMoves = moves.textContent;
const stars = document.querySelector(".stars");
let numStars = 0;
const containers = document.querySelector(".container");
const gameOvers = document.querySelector(".gameOver");
const refreshGame = document.querySelector('.restart')
const gameWons = document.querySelector(".gameWon");
let movesStars = document.querySelector(".movesStars");
let totalSeconds = 0;
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let timer = document.getElementById("timer");
let isTimerRunning = false;


//Display cards
function displayCard() {
  for (let c = 0; c < shuffleCards.length; c++) {
    let createLi = document.createElement('li');
    createLi.className = 'card';
    let createIi = document.createElement('i');
    createIi.className = shuffleCards[c];
    createLi.appendChild(createIi);
    decks.appendChild(createLi);
    createLi.addEventListener("click", handleCardOnClick, false);
  };
};


//compare the cards (match and unmatch)
function handleCardOnClick() {
    console.log(this);
    const thisCard = this;
    if (isTimerRunning === false) {
      setTimer();
      isTimerRunning = true;
    };
    if (!(thisCard.classList.contains("open", "show"))) {
      thisCard.classList.add("open", "show");
      openCardList.push(thisCard);
      nums = openCardList.length;
      if (nums === 2) {
        countMoves();
        decks.setAttribute('style', 'pointer-events: none');
        if (openCardList[0].innerHTML === openCardList[1].innerHTML) {
          removeElementClasses(openCardList, ["show", "open"]);
          addElementClasses(openCardList, ["match"]);
          matchedCardList.push(openCardList[0]);
          matchedCardList.push(openCardList[1]);
          openCardList = [];
          winGame();
          decks.setAttribute('style', 'pointer-events: auto');
        } else {
          setTimeout(function() {
            openCardList[0].classList.remove("open", "show");
            openCardList[1].classList.remove("open", "show");
            openCardList = [];
            decks.setAttribute('style', 'pointer-events: auto');
          }, 260);
        };
      };
    };
};


//Refresh the game
refreshGame.addEventListener('click', restartGame, false);


/**
* elements = array
* classes = array
*/
function removeElementClasses(elements, classes) {
  elements.forEach(function(el) {
    el.classList.remove(...classes);
  });
};

function addElementClasses(elements, classes) {
  elements.forEach(function(el) {
    el.classList.add(...classes);
  });
};


//Count moves
function countMoves () {
  numMoves++;
  moves.innerHTML = numMoves;
  starRemove();
};


//Timer
function pad (val) {
  return val > 9 ? val : "0" + val;
};


//Start timer
function setTimer() {
  myTime = setInterval(function() {
    seconds.innerHTML = pad(++totalSeconds % 60);
    minutes.innerHTML = pad(parseInt(totalSeconds / 60, 10));
  }, 1000);
};


//Stop timer
function stopTimer() {
  clearInterval(myTime);
};


//deduct stars when
//1 star will be deducted when move 10 times
//2 star will be deducted when move 20 times
//3 star will be deducted when move 30 times
//The game will be over after 30 times.
function starRemove () {
  if (numMoves < 0) {
    numStars = 3;
  };
  if (numMoves > 9 && numMoves < 11) {
    stars.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
    numStars = 2;
  };
  if (numMoves > 19 && numMoves < 21) {
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>';
    numStars = 1;
  };
  if (numMoves > 29 && numMoves < 31) {
    stars.innerHTML = '';
    numStars = 0;
    setTimeout(function() {
      gameOver();
    }, 1500);
  };
};


//Congratulations Popup
function winGame() {
  if (matchedCardList.length === 16) {
    stopTimer();
    let messageForWinner = document.createTextNode("With " + numMoves + " Moves and " + numStars + " Stars." + " It takes " + minutes.innerText + ":" + seconds.innerText + ".");
    movesStars.appendChild(messageForWinner);
    containers.style.display = "none";
    gameOvers.style.display = "none";
    gameWons.style.display = "block"
  };
};


//The game is over
function gameOver() {
  containers.style.display = "none";
  gameOvers.style.display = "block";
};


//restart game
function restartGame() {
  containers.style.display ="flex";
  gameOvers.style.display = "none";
  gameWons.style.display = "none";
  stars.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
  numMoves = 0;
  moves.innerText = numMoves;
  location.reload();
  displayCard();
  setTimer();
  removeElementClasses(openCardList, ["show", "open"]);
  removeElementClasses(matchedCardList, ["match"]);
  openCardList = [];
  marchedCardList =[];
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
