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
    // cardSet[currentCardCount] = shuffledDeck.pop();
    cardSet.push(shuffledDeck.pop());
    // console.log(`new card: ${cardSet[currentCardCount].name} of ${cardSet[currentCardCount].suit}`);
    // console.log('current card set: ', cardSet)
    currentCardCount += 1;
  }
  // console.log('final card set: ', cardSet)
  // console.log('object type of cardSet: ', typeof cardSet)
  return cardSet;
};

var playerCards = [];
var dealerCards = [];
var playerSum = 0;
var dealerSum = 0;

var startGame = function () {
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

var playerHit = function () {
  playerCards.push(getCards(1)[0]);
  console.log('player cards: ', playerCards);
  return playerCards;
}

// var dealerHit = function () {
//   dealerCards.push(getCards(1)[0]);
//   console.log('dealer cards: ', dealerCards);
//   return dealerCards;
// }

var resetGame = function () {
  currentPlayer = 'player';
  gameState = gameStateStart;
  allPlayersScore = [];
  playerCards = [];
  dealerCards = [];
  deck = makeDeck();
}

var gameStateStart = 'game state start (give two start cards)';
var gameStateChoose = 'game state choosing';
var gameStateHit = 'game state hit';
var gameStateStand = 'game state stand';
var gameState = gameStateStart;

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var currentPlayer = 'Player';

var playerCurrentSum = 0;
var dealerCurrentSum = 0;

var main = function (input) {
  console.log('checking game state on submit click: ' + gameState);
  var myOutputValue = '';

  if (gameState == gameStateStart) {
    console.log('control flow: gameState == gameStateStart');

    var start = startGame();
    const playerCardSet = start[0];
    const dealerCardSet = start[1];
    const playerMessage = start[2];
    const dealerMessage = start[3];
    playerCurrentSum = start[4];
    dealerCurrentSum = start[5];
  
    console.log('player card set: ', playerCardSet);
    console.log('dealer card set: ', dealerCardSet);

    myOutputValue = playerMessage + '<br>Sum: ' + playerCurrentSum + '<br><br>' + dealerMessage + '<br>Sum: ' + dealerCurrentSum + '<br><br>' + currentPlayer + ' turn: hit or stand?';

    gameState = gameStateChoose;

    return myOutputValue;
  }

  if (gameState == gameStateChoose) {
    console.log('control flow: gameState == gameStateChoose');

    if (input == 'hit') {
      gameState = gameStateHit;
      console.log('control flow: gameState == gameStateHit');

      playerHit();

      myOutputValue = 'Player hits. Current cards:';

      for (let p = 0; p < playerCards.length; p += 1) {
        playerSum += playerCards[p].rank;
        myOutputValue += "<br>" + playerCards[p].name + " of " + playerCards[p].suit;
      }

      gameState = gameStateChoose;

      return myOutputValue;
    }

    else if (input == 'stand') {
      gameState = gameStateStand;
      console.log('control flow: gameState == gameStateStand');

      myOutputValue = 'Player stands.';

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
    }
  }
};
