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
  dealerAceCount += checkAce(hidden);
  // console.log(hidden);
  // console.log(dealerSum);

  //if dealerSum is < 17, we will give dealer a card
  while (dealerSum < 17) {
    //<img src="img/A-C.png">
    // we append the card into while loop until dealer has card with the sum of 17 or greater
    let cardImg = document.createElement("img"); // create an imgcard
    let card= deck.pop(); // got a card from deck
    cardImg.src = "img/" + card + ".png"; // set the src of img card 
    dealerSum += getValue(card);// increment dealerSum
    dealerAceCount += checkAce(card); // count for the dealer's Ace
    document.getElementById("dealer-cards").append(cardImg);
  }
  console.log(dealerSum);

  //give user card
  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img"); // create an imgcard
    let card = deck.pop(); // got a card from deck
    cardImg.src = "img/" + card + ".png"; // set the src of img card
    yourSum += getValue(card); // increment dealerSum
    yourAceCount += checkAce(card); // count for the dealer's Ace
    document.getElementById("your-cards").append(cardImg);
  }
  console.log(yourSum);

  //implement hit button
  document.getElementById("hit").addEventListener("click", hit);
  //implement stand button
   document.getElementById("stand").addEventListener("click", stand);

}

function hit() {
  //if hit is true, give user a card
  if (!canHit) {
    return;
  }
   let cardImg = document.createElement("img");
   let card = deck.pop(); 
   cardImg.src = "img/" + card + ".png";
   yourSum += getValue(card); 
   yourAceCount += checkAce(card); 
   document.getElementById("your-cards").append(cardImg);

   //will check your Sum and take consideration into yourAcecount
   if(reduceAce(yourSum, yourAceCount) > 21) { //A,J, 8 -> 1 + 10 + 8
     canHit = false;
   }
}

function stand() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false; // user is not able to draw card if choose stand
  document.getElementById("hidden").src = "img/" + hidden + ".png";

  let message ="";
  if(yourSum > 21) {
    message = "You loose";
  } else if (dealerSum > 21) {
    message = "You win!";
  }
  //both user and dealer have sum <=21
  else if (yourSum == dealerSum) {
    message ="Tie!";
  }
  else if ( yourSum > dealerSum) {
    message = "You win!";
  }
  else if (yourSum < dealerSum) {
    message = "You loose";
  }

  // populate the message onto #result
  document.getElementById("result").innerText = message;
  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
 
}



function getValue(card) {
  let data = card.split("-"); // "4-C" -> splitting value into 2 parts; 4 & C -> [4,C]
  let value = data[0];

  //check if value contanis a digit
  //if not a number
  if (isNaN(value)) {
    // A J Q K so if it's not A, it will be J Q K
    if (value == "A") {
      return 11;
    }
    return 10;
  }

  return parseInt(value); // will return a value if its a value
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

//reduce Ace if the sume is > 21
function reduceAce(playerSum, playerAceCount) {
  while(playerSum > 21 && playerAceCount > 0) {
      playerSum -= 10;
      playerAceCount -= 1;
  }
  return playerSum;
}