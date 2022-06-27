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
      } else if (rankCounter == 11) {
        cardName = "Jack";
      } else if (rankCounter == 12) {
        cardName = "Queen";
      } else if (rankCounter == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // changing rank of face cards to 10
      if (card.name == "Jack") {
        card.rank = 10;
      }
      else if (card.name == "Queen") {
        card.rank = 10;
      }
      else if (card.name == "King") {
        card.rank = 10;
      }

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
  console.log('current player sum: ', playerSum);
  
  var dealerOutputValue = 'Dealer hand: '
  for (let d = 0; d < dealerCards.length; d += 1) {
    dealerSum += dealerCards[d].rank;
    dealerOutputValue += "<br>" + dealerCards[d].name + " of " + dealerCards[d].suit;
  }
  console.log('current dealer sum: ', dealerSum);

  return [playerCards, dealerCards, playerOutputValue, dealerOutputValue, playerSum, dealerSum]
}

var playerHit = function () {
  playerCards.push(getCards(1)[0]);
  console.log('player cards: ', playerCards);
  return playerCards;
}

var dealerHit = function () {
  dealerCards.push(getCards(1)[0]);
  console.log('dealer cards: ', dealerCards);
  return dealerCards;
}

var resetGame = function () {
  currentPlayer = 'player';
  gameState = gameStateStart;
  allPlayersScore = [];
  playerCards = [];
  dealerCards = [];
  deck = makeDeck();
}

var gameStateStart = 'game state start (give two start cards)';
var gameStatePlayerChoose = 'game state player choosing';
var gameStatePlayerHit = 'game state player hit';
var gameStatePlayerStand = 'game state player stand';
var gameStateDealerHit = 'game state dealer hit';
var gameStateDealerStand = 'game state dealer stand';
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
    console.log('control flow: gameState == ' + gameState);
    console.log('checking current player on submit click: ' + currentPlayer);

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

    gameState = gameStatePlayerChoose;

    return myOutputValue;
  }

  if (gameState == gameStatePlayerChoose) {
    console.log('control flow: gameState == ' + gameState);
    console.log('checking current player on submit click: ' + currentPlayer);

    if (input == 'hit') {
      gameState = gameStatePlayerHit;
    }
    else if (input == 'stand') {
      gameState = gameStatePlayerStand;
    }
  }

  if (gameState == gameStatePlayerHit) {
    console.log('control flow: gameState == ' + gameState);
    console.log('checking current player on submit click: ' + currentPlayer);

    playerHit();

    myOutputValue = 'Player hits. Current cards:';

    playerCurrentSum = 0;
    for (let p = 0; p < playerCards.length; p += 1) {
      playerCurrentSum += playerCards[p].rank;
      myOutputValue += "<br>" + playerCards[p].name + " of " + playerCards[p].suit;
    }

    console.log('current player sum: ', playerCurrentSum);
    console.log('final dealer sum: ', dealerCurrentSum);

    gameState = gameStatePlayerChoose;

    return myOutputValue;
  }

  if (gameState == gameStatePlayerStand) {
    currentPlayer = 'dealer';

    console.log('control flow: gameState == ' + gameState);
    console.log('checking current player on submit click: ' + currentPlayer);

    console.log('current dealer sum: ' + dealerCurrentSum);

    if (dealerCurrentSum < 17) {
      gameState = gameStateDealerHit;
    }
    else {
      gameState = gameStateDealerStand;
      myOutputValue += '<br><br>Click submit to see who won.';
      return myOutputValue;
    }
  }

  if (gameState == gameStateDealerHit) {
    console.log('control flow: gameState == ' + gameState);
    console.log('checking current player on submit click: ' + currentPlayer);

    myOutputValue = 'Dealer hits. <br>Current cards:';
    
    dealerHit();

    dealerCurrentSum = 0;
    for (let d = 0; d < dealerCards.length; d += 1) {
      dealerCurrentSum += dealerCards[d].rank;
      myOutputValue += "<br>" + dealerCards[d].name + " of " + dealerCards[d].suit;
    }

    // myOutputValue += '<br><br>Click submit to hit for dealer.'

    console.log('final player sum: ', playerCurrentSum);
    console.log('final dealer sum: ', dealerCurrentSum);

    gameState = gameStateDealerStand;

    myOutputValue += '<br><br>Click submit to see who won.';

    return myOutputValue;
  }

  if (gameState == gameStateDealerStand) {
    console.log('control flow: gameState == ' + gameState);
    console.log('checking current player on submit click: ' + currentPlayer);

    console.log('final player sum: ', playerCurrentSum);
    console.log('final dealer sum: ', dealerCurrentSum);

    if (playerCurrentSum > 21 && dealerCurrentSum < 21) {
      myOutputValue += 'Player went over 21. Dealer did not. <br><br>Dealer wins!' 
    }
    else if (playerCurrentSum < 21 && dealerCurrentSum > 21) {
      myOutputValue += 'Dealer went over 21. Player did not. <br><br>Player wins!' 
    }
    else if (playerCurrentSum > 21 && dealerCurrentSum > 21) {
      myOutputValue += 'Both player and dealer went over 21. <br><br>Draw.'
    }
    else {
      if (playerCurrentSum > dealerCurrentSum) {
        if (playerCurrentSum == 21) {
          myOutputValue += 'Player had 21. <br><br>Player wins by black jack!'
        }
        else {
          myOutputValue += 'Player was closer to 21. <br><br>Player wins!'
        }
      }
      else if (playerCurrentSum < dealerCurrentSum) {
        if (dealerCurrentSum == 21) {
          myOutputValue += 'Dealer had 21. <br><br>Dealer wins by black jack!'
        }
        else {
          myOutputValue += 'Dealer was closer to 21. <br><br>Dealer wins!'
        }
      }
      else {
        myOutputValue += 'Both dealer and player have the same total. <br><br>Draw.'
      }
    }
    return myOutputValue;
  }
};
