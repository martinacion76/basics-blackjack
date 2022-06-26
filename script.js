// v1. two players with two cards each, compare
// v2. add player hit or stand
// v3. add dealer hit or stand
// v4. add variable ace values

var makeDeck = function () {
  var deck = [];
  var suitIndex = 0;
  var suitList = ["Hearts", "Diamonds", "Clubs", "Spades"];
  // var suitList = ["♥️", "♦", "♣️", "♠️"];
  while (suitIndex < 4) {
    var currentSuit = suitList[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (rankCounter == 1) {
        cardName = "Ace";
      } else if (rankCounter == 10) {
        cardName = "Jack";
      } else if (rankCounter == 10) {
        cardName = "Queen";
      } else if (rankCounter == 10) {
        cardName = "King";
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
    cardSet[currentCardCount] = shuffledDeck.pop();
    // console.log(`new card: ${cardSet[currentCardCount].name} of ${cardSet[currentCardCount].suit}`);
    // console.log('current card set: ', cardSet)
    currentCardCount += 1;
  }
  // console.log('final card set: ', cardSet)
  // console.log('object type of cardSet: ', typeof cardSet)
  return cardSet;
};

var startGame = function () {
  var playerCards = [];
  var dealerCards = [];
  var playerSum = 0;
  var dealerSum = 0;

  playerCards = getCards(2);
  dealerCards = getCards(2);

  var playerOutputValue = 'Player hand: ';
  for (let p = 0; p < playerCards.length; p += 1) {
    playerSum += playerCards[p].rank;
    playerOutputValue += "<br>" + playerCards[p].name + " of " + playerCards[p].suit;
  }
  console.log('final player sum: ', playerSum)
  
  var dealerOutputValue = 'Dealer hand: '
  for (let d = 0; d < dealerCards.length; d += 1) {
    dealerSum += dealerCards[d].rank;
    dealerOutputValue += "<br>" + dealerCards[d].name + " of " + dealerCards[d].suit;
  }
  console.log('final dealer sum: ', dealerSum)

  return [playerCards, dealerCards, playerOutputValue, dealerOutputValue, playerSum, dealerSum]
}

var gameStateStart = 'game state: start (give two start cards)';
var gameStateHit = 'game state: hit';
var gameStateStand = 'game state: stand';
var gameState = gameStateStart;

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var gameMode = 'stand';
var currentPlayer = 'player';

var resetGame = function () {
  currentPlayer = 'player';
  gameState = gameStateStart;
  allPlayersScore = [];
  playerCards = [];
  dealerCards = [];
  deck = makeDeck();
}

var main = function (input) {
  // console.log('checking game state on submit click: ' + gameState);
  // console.log('checking currentPlayer on submit click: ' + currentPlayer);
  var myOutputValue = '';

  var start = startGame();
  const playerCardSet = start[0];
  const dealerCardSet = start[1];
  const playerMessage = start[2];
  const dealerMessage = start[3];
  const playerCurrentSum = start[4];
  const dealerCurrentSum = start[5];
  
  console.log('player card set: ', playerCardSet);
  console.log('dealer card set: ', dealerCardSet);

  myOutputValue = playerMessage + '<br>Sum: ' + playerCurrentSum + '<br><br>' + dealerMessage + '<br>Sum: ' + dealerCurrentSum;

  if (playerCurrentSum > 21 && dealerCurrentSum < 21) {
    myOutputValue += '<br><br>Player went over 21. Dealer did not. <br><br>Dealer wins!' 
  }
  else if (playerCurrentSum < 21 && dealerCurrentSum > 21) {
    myOutputValue += '<br><br>Dealer went over 21. Player did not. <br><br>Player wins!' 
  }
  else if (playerCurrentSum > 21 && dealerCurrentSum > 21) {
    myOutputValue += '<br><br>Both player and dealer went over 21. <br><br>Draw.'
  }
  else {
    if (playerCurrentSum > dealerCurrentSum) {
      if (playerCurrentSum == 21) {
        myOutputValue += '<br><br>Player had 21. <br><br>Player wins by black jack!'
      }
      else {
        myOutputValue += '<br><br>Player was closer to 21. <br><br>Player wins!'
      }
    }
    else if (playerCurrentSum < dealerCurrentSum) {
      if (dealerCurrentSum == 21) {
        myOutputValue += '<br><br>Dealer had 21. <br><br>Dealer wins by black jack!'
      }
      else {
        myOutputValue += '<br><br>Dealer was closer to 21. <br><br>Dealer wins!'
      }
    }
    else {
      myOutputValue += '<br><br> Both dealer and player have the same total. <br><br>Draw.'
    }
  }

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
