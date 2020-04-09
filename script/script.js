const cards = document.querySelectorAll(".card");

let hasTurnedCard = false;
let boardLock = false;
let cardOne, cardTwo;

const turnCard = e => {
    if (boardLock) return;

    const target = e.target.parentElement;

    if (target === cardOne) return;

    target.classList.add("turn");

    if (!hasTurnedCard) {
        // First Click

        hasTurnedCard = true;
        cardOne = target;
    } else {
        // Second click

        hasTurnedCard = false;
        cardTwo = target;

        checkForBingo();
    }
};

// Check for same cards

const checkForBingo = () => {
    const isEqual = cardOne.dataset.framework === cardTwo.dataset.framework

    //if (cardOne.dataset.framework === cardTwo.dataset.framework) {
    //    disableCards();
    //} else {
    //    unturnCards();
    //}

    isEqual ? disableCards() : unturnCards();
};


const disableCards = () => {
    cardOne.removeEventListener("click", turnCard);
    cardTwo.removeEventListener("click", turnCard);
};

const unturnCards = () => {
    boardLock = true;

        setTimeout(() => {
            cardOne.classList.remove("turn");
            cardTwo.classList.remove("turn");

        boardLock = false;
        }, 1000);
};

/* Randomising the card Pairs */

(function randomise() {
    cards.forEach(card => {
        const secretLocation = Math.floor(Math.random() * cards.length);
        card.style.order = secretLocation;
    });
})();

cards.forEach(card => card.addEventListener("click", turnCard));