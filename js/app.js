/*
 * Create a list that holds all of your cards
 */
const myDeck = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube",
    "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb",
    "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o",
    "fa-cube"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Clear any timer html
document.querySelectorAll(".elapsed").innerHTML = 0;

//Define global variable for setInterval function for timer
let elapsedTime;

// Set Up The Game

const shuffling = function() {
    const counter = document.querySelector(".moves");
    counter.innerHTML = "0";
    shuffle(myDeck);
    const deck = document.querySelector(".deck");
    deck.innerHTML = "";
    for (let n = 0; n < myDeck.length; n++) {
        const newCard = document.createElement('li');
        newCard.setAttribute("class", "card");
        newCard.innerHTML = innerHTML(myDeck[n]);
        deck.appendChild(newCard);
    }
};

let innerHTML = function(whichCard) {
    return "<i class= \"fa " + whichCard + "\"></i>";
};

//Restart Button
const restart = document.querySelectorAll(".restart");
restart.forEach(function(button) {
    button.addEventListener("click", function() {
        clearInterval(elapsedTime);
        usedTime = 0;
        const timeDisplay = document.querySelectorAll(".elapsed");
        timeDisplay.forEach(function(timer) {
            timer.innerHTML = "0";
        });
        shuffling();
        const cards = document.querySelectorAll(".card");
        flippedCards = [];
        count = 0;
        pairsMatched = 0;
        const starsDisplay = document.querySelector(".stars");
        starsDisplay.innerHTML = "<li><i class=\"fa fa-star\"></i><li><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i>";
        cards.forEach(function(card) {
            card.addEventListener("click", function() {

                      if (document.querySelector(".moves").innerHTML < 1 && flippedCards.length < 1) {

                          let usedTime = 0;
                          elapsedTime = setInterval(calcTime, 1000);
                          function calcTime() {
                              usedTime = usedTime + 1;
                              const timeDisplay = document.querySelectorAll(".elapsed");
                              timeDisplay.forEach(function(timer) {
                                  timer.innerHTML = usedTime;
                              });
                            }
                        };

                if (flippedCards.length < 2) {
                    if (!card.classList.contains("open")) {
                        card.classList.add("open", "show");
                        addToList(card);
                    }
                }
            });
        });
    });
});

const container = document.querySelector(".container");
container.onload = shuffling();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that
 *    you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in
 *    another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this
 *    functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the
 *    card's symbol (put this functionality in another function that you call
 *    from this one)
 *    + increment the move counter and display it on the page (put this
 *    functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put
 *    this functionality in another function that you call from this one)
 */

const cards = document.querySelectorAll(".card");
let flippedCards = [];
let count = 0;
let pairsMatched = 0;

cards.forEach(function(card) {
    card.addEventListener("click", function() {

        if (document.querySelector(".moves").innerHTML < 1 && flippedCards.length < 1) {
              let usedTime = 0;
              elapsedTime = setInterval(calcTime, 1000);
              function calcTime() {
                  usedTime = usedTime + 1;
                  const timeDisplay = document.querySelectorAll(".elapsed");
                  timeDisplay.forEach(function(timer) {
                      timer.innerHTML = usedTime;
                  });
                }
            };
        if (flippedCards.length < 2) {
            if (!card.classList.contains("open")) {
                card.classList.add("open", "show");
                addToList(card);
            }
        }
    });
});

const addToList = function(card) {
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
            theyMatch();
        } else {
            setTimeout(closeCards, 500);
        }
        increaseCount();
        displayStars();
        if (pairsMatched === 8) {
            clearInterval(elapsedTime);
            setTimeout(youWinModal, 600);
        }
    }
};

const theyMatch = function() {
    flippedCards[0].className = "card match";
    flippedCards[1].className = "card match";
    flippedCards = [];
    pairsMatched += 1;
};

const closeCards = function() {
    flippedCards[0].classList.remove("open", "show");
    flippedCards[1].classList.remove("open", "show");
    flippedCards = [];
};

const increaseCount = function() {
    const counter = document.querySelector(".moves");
    count += 1;
    counter.innerHTML = count;
};

const calculateStars = function() {
    const counter = document.querySelector(".moves").innerHTML;
    if (counter <= 10) {
        return "<li><i class=\"fa fa-star\"></i><li><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i>";
    } else if (counter > 10 && counter <= 20) {
        return "<i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i>";
    } else {
        return "<i class=\"fa fa-star\"></i>";
    }
};

const displayStars = function() {
    const starsDisplay = document.querySelector(".stars");
    starsDisplay.innerHTML = calculateStars();
};



/*
 * Open and control the modal
 * Based on https://www.w3schools.com/howto/howto_css_modals.asp
 */

const youWinModal = function() {

    // Get the modal
    var modal = document.getElementById("myModal");

    // Add stars to the Modal
    modalDisplayStars();

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // Get the modal <span> element that restarts the game
    const closeModal = document.querySelector(".modalRestart");

    // When the user clicks on restart close the modal
    closeModal.onclick = function() {
            modal.style.display = "none";
        //location.reload();
    };
};

/*
 * Calculating Modal stars
 */

const modalCalculateStars = function() {
    const counter = document.querySelector(".moves").innerHTML;
    if (counter <= 10) {
        return "<i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i>";
    } else if (counter > 10 && counter <= 20) {
        return "<i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i>";
    } else {
        return "<i class=\"fa fa-star\"></i>";
    }
};

const modalDisplayStars = function() {

    const starsDisplay = document.querySelector(".modal-stars");
    starsDisplay.innerHTML = modalCalculateStars();
};
