// v1. two players with two cards each, compare
// v2. add player hit or stand
// v3. add dealer hit or stand
// v4. add variable ace values
  // if total including ace < 21, ace value = 11
  // otherwise, ace value = 1

var playerChooseGif = '<img src=https://c.tenor.com/cC6KsZwvNBEAAAAC/presenting-eddie-munson.gif>';
var dealerTurnGif = '<img src=https://c.tenor.com/t8fWVUuih2gAAAAd/stranger-things-number-one.gif>';
var playerWinGif= '<img src=https://c.tenor.com/Eb4OiNR6YegAAAAC/high-five-stranger-things.gif>';
var playerLoseGif = '<img src=https://c.tenor.com/OplXM1-hjhgAAAAd/arriving-monster-vecna.gif>';
var drawGif= '<img src=https://c.tenor.com/ypZyi9yT8JAAAAAC/stranger-things-stranger-things-gifs.gif>';

function removeInstructions() {
  var instructions = document.getElementById("start-instructions");
  instructions.style.display = "none";

  document.querySelector('#deal-button').disabled = true;
  document.querySelector('#hit-button').disabled = false;
  document.querySelector('#stand-button').disabled = false;
  document.querySelector('#reveal-button').disabled = true;

  document.querySelector('#start-gif').display = false;
}

var makeDeck = function () {
  var deck = [];
  var suitIndex = 0;
  // var suitList = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var suitList = ["♥️", "♦", "♣️", "♠️"];
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

  var playerOutputValue = 'Your hand: ';
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

var calculatePlayerHandValue = function () {
  var totalPlayerHandValue = 0;
  var aceCounter = 0;

  var index = 0;
  while (index < playerCards.length) {
    var currentCard = playerCards[index];
    if (currentCard.name == 'Jack' || currentCard.name == 'Queen' || currentCard.name == 'King') {
      totalPlayerHandValue += 10;
    }
    else if (currentCard.name == 'Ace') {
      totalPlayerHandValue += 11;
      aceCounter += 1;
    }
    else {
      totalPlayerHandValue += currentCard.rank
    }
    index += 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalPlayerHandValue > 21) {
      totalPlayerHandValue -= 10;
    }
    index +=1
  }

  return totalPlayerHandValue
}

var calculateDealerHandValue = function () {
  var totalDealerHandValue = 0;
  var aceCounter = 0;

  var index = 0;
  while (index < dealerCards.length) {
    var currentCard = dealerCards[index];
    if (currentCard.name == 'Jack' || currentCard.name == 'Queen' || currentCard.name == 'King') {
      totalDealerHandValue += 10;
    }
    else if (currentCard.name == 'Ace') {
      totalDealerHandValue += 11;
      aceCounter += 1;
    }
    else {
      totalDealerHandValue += currentCard.rank
    }
    index += 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalDealerHandValue > 21) {
      totalDealerHandValue -= 10;
    }
    index +=1
  }

  return totalDealerHandValue
}

var playerHit = function () {
  console.log('control flow: gameState == ' + gameState);
  console.log('checking current player on submit click: ' + currentPlayer);
  
  console.log('player hit');
  playerCards.push(getCards(1)[0]);
  console.log('player cards: ', playerCards);

  console.log('working');

  var myOutputValue = 'You hit. Current cards:';

  playerCurrentSum = 0;
  for (let p = 0; p < playerCards.length; p += 1) {
    playerCurrentSum += playerCards[p].rank;
    myOutputValue += "<br>" + playerCards[p].name + " of " + playerCards[p].suit;
  }

  myOutputValue += '<br><br>' + playerChooseGif + '<br><br>Hit or stand?';

  console.log('current player sum: ', playerCurrentSum);
  console.log('final dealer sum: ', dealerCurrentSum);

  gameState = gameStatePlayerChoose;

  return [playerCards, myOutputValue, gameState];
}

var playerStand = function () {
  var myOutputValue = ''
  currentPlayer = 'dealer';

  console.log('control flow: gameState == ' + gameState);
  console.log('checking current player on submit click: ' + currentPlayer);

  console.log('current dealer sum: ' + dealerCurrentSum);

  if (dealerCurrentSum < 17) {
    console.log('control flow: gameState == ' + gameState);
    console.log('checking current player on submit click: ' + currentPlayer);

    myOutputValue = 'Vecna hits.<br><br>' + dealerTurnGif;
    
    dealerHit();

    dealerCurrentSum = 0;
    for (let d = 0; d < dealerCards.length; d += 1) {
      dealerCurrentSum += dealerCards[d].rank;
      // myOutputValue += " Current cards:<br>" + dealerCards[d].name + " of " + dealerCards[d].suit;
    }

    console.log('final player sum: ', playerCurrentSum);
    console.log('final dealer sum: ', dealerCurrentSum);

    gameState = gameStateDealerStand;

    myOutputValue += '<br><br>Click reveal to see who won.';
    document.querySelector('#reveal-button').disabled = false;
  }
  else {
    myOutputValue += 'Dealer stands.<br><br>' + dealerTurnGif + '<br><br>Click reveal to see who won.';
  }
  document.querySelector('#hit-button').disabled = true;
  document.querySelector('#stand-button').disabled = true;
  document.querySelector('#reveal-button').disabled = false;
  return myOutputValue; 
}

var revealWinner = function () {
  myOutputValue = '';

  console.log('control flow: gameState == ' + gameState);
  console.log('checking current player on submit click: ' + currentPlayer);

  // myOutputValue += 'Click reveal to see who won.';

  playerCurrentSum = calculatePlayerHandValue();
  dealerCurrentSum = calculateDealerHandValue();

  console.log('final player sum: ', playerCurrentSum);
  console.log('final dealer sum: ', dealerCurrentSum);

  console.log('final player value: ', playerCurrentSum);

  if (playerCurrentSum > 21 && dealerCurrentSum <= 21) {
    if (dealerCurrentSum < 21) {
      myOutputValue += 'You had ' + playerCurrentSum +'. Vecna had ' + dealerCurrentSum + '. <br><br>Vecna wins!' + '<br><br>' + playerLoseGif
    }
    else {
      myOutputValue += 'You had ' + playerCurrentSum +'. Vecna had ' + dealerCurrentSum + '. <br><br>Vecna wins by black jack!' + '<br><br>' + playerLoseGif
    }
  }
  else if (playerCurrentSum <= 21 && dealerCurrentSum > 21) {
    if (playerCurrentSum < 21) {
      myOutputValue += 'You had ' + playerCurrentSum +'. Vecna had ' + dealerCurrentSum + '. <br><br>You win!' + '<br><br>' + playerWinGif
    }
    else {
      myOutputValue += 'You had ' + playerCurrentSum +'. Dealer had ' + dealerCurrentSum + '. <br><br>You win by black jack!' + '<br><br>' + playerWinGif
    }
  }
  else if (playerCurrentSum <= 21 && dealerCurrentSum <= 21) {
    if (playerCurrentSum > dealerCurrentSum) {
      myOutputValue += 'You had ' + playerCurrentSum +'. Vecna had ' + dealerCurrentSum + '. <br><br>You win!' + '<br><br>' + playerWinGif
    }
    else if (playerCurrentSum < dealerCurrentSum) {
      myOutputValue += 'You had ' + playerCurrentSum +'. Vecna had ' + dealerCurrentSum + '. <br><br>Vecna wins!' + '<br><br>' + playerLoseGif
    }
    else if (playerCurrentSum == 21) {
      myOutputValue += 'You had ' + playerCurrentSum +'. Dealer had ' + dealerCurrentSum + '. <br><br>You win by black jack!' + '<br><br>' + playerWinGif
    }
    else if (dealerCurrentSum == 21) {
      myOutputValue += 'You had ' + playerCurrentSum +'. Vecna had ' + dealerCurrentSum + '. <br><br>Vecna wins by black jack!' + '<br><br>' + playerLoseGif
    }
    else {
      myOutputValue += 'You had ' + playerCurrentSum +'. Dealer had ' + dealerCurrentSum + '. <br><br>Draw!' + '<br><br>'+ drawGif;
    }
  }

  myOutputValue += '<br><br>Click deal to play again!'

  resetGame();
  console.log('game is reset');

  document.querySelector('#deal-button').disabled = false;
  document.querySelector('#reveal-button').disabled = true;

  return myOutputValue;
}

var dealerHit = function () {
  dealerCards.push(getCards(1)[0]);
  console.log('dealer cards: ', dealerCards);
  return dealerCards;
}

var resetGame = function () {
  currentPlayer = 'player';
  gameState = gameStateStart;
  playerCards = [];
  dealerCards = [];
  playerSum = 0;
  dealerSum = 0;
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

    myOutputValue = playerMessage + '<br><br>' + playerChooseGif;
    myOutputValue += '<br><br>Hit or stand?';

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
};
