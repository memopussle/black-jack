//Keep track of total point values for the dealer & user
let dealerSum = 0;
let yourSum = 0;

//keep track of the amount of Ace that user and dealer has
let dealerAceCount = 0;
let yourAceCount = 0; // A (can be 1 or 11)

var hidden;
var deck;

var canHit = true; //allows the user to draw while yourSum < 21

//when the window load
window.onload = function () {
  buildDeck();

  //shuffle the deck out of order
  shuffleDeck();

  startGame();
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];

  //use for loops to loop through this array to push the format types + values
  //we will have arrayof 52 cards
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]); // A-C -> K-C, A-D -> K->D ...
    }
  }

  //   console.log(deck);
}

//shuffle the order of card in deck every refresh
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); // math random: 0-1 * 52 = give a number between 0 -51.9999.

    //when i = 0 => j will shuffle for i
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function startGame() {
  hidden = deck.pop(); //remove a card from the end of array
  //move that hidden value to dealerSum
  dealerSum += getValue(hidden);
}

function getValue(card) {
  let data = card.split("-"); // "4-C" -> splitting value into 2 parts; 4 & C -> [4,C]
  let value = data[0];


}
