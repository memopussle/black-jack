
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
window.onload = function() {
    buildDeck();
}

function builDeck() {
    let values = ['A', '2', '3', '4', '5','6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let types = ['C', 'D', 'H', 'S'];
    deck = [];
 
    //use for loops to loop through this array
    for (let i = 0;  i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            
        }
    }

}