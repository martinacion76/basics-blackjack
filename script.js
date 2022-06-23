var makeDeck = function () {
  var deck = [];
  var suitIndex = 0;
  var suitList = ["hearts", "diamonds", "clubs", "spades"];
  // var suitList = ["♥️", "♦", "♣️", "♠️"];
  while (suitIndex < 4) {
    var currentSuit = suitList[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (rankCounter == 1) {
        cardName = "ace";
      } else if (rankCounter == 11) {
        cardName = "jack";
      } else if (rankCounter == 12) {
        cardName = "queen";
      } else if (rankCounter == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var getCards = function (amount) {
  var currentCardCount = 0;
  var cardSet = [];
  while(currentCardCount < amount) {
    var newCard = shuffledDeck.pop();
    cardSet[currentCardCount] = newCard;
    console.log(`new card: ${newCard.name} of ${newCard.suit}`);
    console.log('current card set: ', cardSet)
    currentCardCount += 1;
  }
  console.log('final card set: ', cardSet)
  return cardSet;
};



// var playerIndex = 0;
// var playerCards = [];
// while (playerIndex < input) {
//   playerCards[playerIndex] = shuffledDeck.pop();
//   console.log("PlayercardsIndiv:", playerCards[playerIndex]);
//   playerIndex += 1;
// }
// console.log("Playercards:", playerCards);



var gameStateStart = 'game state: start (give two start cards)';
var gameStateHit = 'game state: hit';
var gameStateStand = 'game state: stand';
var gameState = gameStateStart;

// var resetGame = function () {
//   currentPlayer = 'player';
//   gameState = game;
//   allPlayersScore = [];
// }

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var gameMode = 'stand';
var currentPlayer = 'player';
var playerCards = [];
var dealerCards = [];

var main = function (input) {
  // console.log('checking game state on submit click: ' + gameState);
  // console.log('checking currentPlayer on submit click: ' + currentPlayer);
  var myOutputValue = 'yes';

  // makeDeck();
  // var playerCards.push
  // var chosenCard = shuffledDeck.pop();

  // myOutputValue = `card drawn is ${chosenCard.name} of ${chosenCard.suit}`;
  getCards(4);
  myOutputValue = 'player cards are'

  return myOutputValue;
};

// //////////////////////////////////////////////////
// input (either hit or stand); so need input validation
// if(!input || input != 'hit' || input != 'stand')
// playerCards = [] -> name, rank, suit
// computerCards = [] -> name, rank, suit
// // 1. Deck is shuffled. (shuffleDeck function)
// // 2. User clicks Submit to deal cards. (.pop)
// // 3. The cards are analysed for game winning conditions, e.g. Blackjack.
// // The cards are displayed to the user. (output the cards), push both cards at the start 
// playerCd = generateCards(2)
// computerCd = generateCards(2)
// function generateCards(numCards)

  
// gameMode = stand;
// currentplayer = player
// currentplayer == player;
// if user decides to hit, gameMode == hit, pick a card. (push a card again)
// if use decides to stand, gameMode == stand, continue to dealer, currentplayer = dealer
// // The user decides whether to hit or stand, using the submit button to submit their choice. (sum the cards, then decide to hit or stand)
// currentplayer == dealer
// If dealer < 17, has to hit. Hit means to get another card (pop again), push a card again, (generateCards(1))
// gameMode == hit
// else, gameMode == stand
// if gameMode == stand and currentPlayer == dealer,
// game will end
// // Aces could be 1 or 11. 
// if (10 (jack/queen/king)) + ace = blackjack
// if sum(all the players cards) > 21, and sum(all the dealer cards) > 21, they all lose.
// if sum(all the player cards) > 21 and sum(all the dealer cards) <= 21, dealer Wins
// if sum(all the player cards) <= 21 and sum(all the dealer cards) > 21, player Wins
// if sum(all the player cards) <= 21 and sum(all the dealer cards) <= 21, compare the cards, whichever is higher wins. 
// // The user's cards are analysed for winning or losing conditions.
// // The computer decides to hit or stand automatically based on game rules.
// // The game either ends or continues.
