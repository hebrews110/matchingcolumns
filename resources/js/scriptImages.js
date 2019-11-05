//columns, double everything version

//Definitions: Variables are here to solve scope issues
//If they only exist in one function, they can't be used in another
//Why is there a need for MatchGame?
    //Not really a need just defines the object
//Count counts down to the end of the game
//Two is for tracking how many cards are flipped at once
//flip are used for the two card values that are flipped
//$game is the card layout/game div
//card is the card that is flipped over from each column
//Cards are the ordered arrays of strings. The second number in the array shows the matches
//There are two arrays, The first is the word (smaller), second definition (longer)
//flippedCards holds the array of two flipped cards

  var MatchGame = {};
  var count;
  var two1 = 0;
  var two2 = 0;
  var flip1 = 0;
  var flip2 = 0;
  var $game1 = $('#game1');
  var $game2 = $('#game2');
  var $card1 = $('.card1');
  var $card2 = $('.card2');
  var flippedCards = [];
//This takes 12 cards, 6 matches, answers/definitions in cards2

$(document).ready(function() {

//Shuffle the array
//Takes the arrays and has them shuffled.
//Input keeps you from having to make a new array.
//Runs the loop one time for each item in array and counts down to zero
//Math line gives a random number between 0 and array.length (8)
//Originally created a new array and used push to add the value of that index in the first array to the second "shuffled" array
//And then originally cut one array item off at place N in the array. This way it won't repeat that value.

cards1.shuffle = function() {
    var input = this;

    for (var i = cards1.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = cards1[randomIndex][0];
		    var itemAtSecond = cards1[randomIndex][1];

        input[randomIndex][0] = input[i][0];
		    input[randomIndex][1] = input[i][1];
        input[i][0] = itemAtIndex;
		    input[i][1] = itemAtSecond;
    }
    return input;
}

cards2.shuffle = function() {
    var input = this;

    for (var i = cards2.length-1; i >=0; i--) {
        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = cards2[randomIndex][0];
		    var itemAtSecond = cards2[randomIndex][1];

        input[randomIndex][0] = input[i][0];
		    input[randomIndex][1] = input[i][1];
        input[i][0] = itemAtIndex;
		    input[i][1] = itemAtSecond;
    }
    return input;
}
//end of shuffle function

cards1.shuffle();
cards2.shuffle();
//calls the function


//When they click on Play it shuffles the cards and puts the values in
//Count will count down till end of game, starts with how many cards are in one array
  $("#start").click(function() {
      $('.directions').css('display', 'none');
      MatchGame.makeCards1(cards1, $game1);
      MatchGame.makeCards2(cards2, $game2);
      count = cards1.length;
   })
   //end of click function
    });
//end of document ready


//Method makeCards take the shuffled array, cards, and the game board div
//empty clears out dummy cards in html
//data line creates an empty array called flippedCards and associated it with the game board data

//for loop assigns the data for each card in the div
//value is the number stored in the array at that index
//color is the color in the array for the value of the number so that the number 1s match color for instance

MatchGame.makeCards1 = function(cards1, $game1) {
  $game1.empty();
  $game1.data('flippedCards1', []);

for (var i=0; i<cards1.length; i++) {
    var data = {
    value: cards1[i][0],
    answer: cards1[i][1],
  };
  //ends data

$card1_html = $('<div class="card1"> '+ data.value + '</div>');

//data function (. means function) associates the data with the card
//adds the card onto the game baard, happens for each card

  $card1_html.data(data);
  $game1.append($card1_html);
  };
  //ends for loop


//This function runs when a card is clicked.
//If you click a card, it checks if a card is flipped in that column and if so does nothing
//If there isn't one card flipped, it will flip a card.

$(".card1").click(function() {
  if (two1 === 1) {
 return;
 } else {
    two1 = 1;
 MatchGame.flipCard1($(this), $('#game1'));
 }
  });
  //end of click function
};
//end of makeCards function 1

MatchGame.makeCards2 = function(cards2, $game2) {
  $game2.empty();
  $game2.data('flippedCards2', []);

for (var i=0; i<cards2.length; i++) {

    var data = {
    value: cards2[i][0],
    answer: cards2[i][1],
  };
  //ends data

$card2_html = $('<div class="card2"> '+ data.value + '</div>');

//data function (. means function) associates the data with the card
//adds the card onto the game baard, happens for each card

  $card2_html.data(data);
  $game2.append($card2_html);

  };
  //ends for loop


//This function runs when a card is clicked.
//If you click a card, it checks for two cards flipped and does nothing if there are two
//If there aren't two cards flip, it will flip a card.

$(".card2").click(function() {
  if (two2 === 1) {
 return;
 } else {
  two2 = 1;
  MatchGame.flipCard2($(this), $('#game2'));
 }
  });
};
//end of makeCards function 2

//Start of checkCard function to turn cards over
//if there are two cards flipped
//if the answers match
//count down one, change look of card, set two to 0, empty flippedCards

MatchGame.checkCard = function(flippedCards) {
if (flippedCards.length === 2) {
    if (flippedCards[0].data('answer') === flippedCards[1].data('answer')) {
      count = count - 1;
      var matchCss = {
        opacity: 0.5
    }; //closes var matchcss

      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
      two1 = 0;
      two2 = 0;
    //flippedCards = []; didn't work
      flippedCards.length = 0;

    //if checks if those were the last two cards checked over
    //if no more cards unflipped, plays cheering, flashes background colors, asks if you want to play again
      if (count === 0) {
        var audio = new Audio('cheer.mp3');
        audio.play();
        $('#endScreen').css('display', 'block');
        var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", '#FFFFFD'];
        var i = 1;
      window.setInterval(function(){
      document.body.style.backgroundColor = colors[i];
      i++;
      if (i === colors.length){
        return;
      }
    }, 700);
    //end of color flashing function, number is how long between colors
  } //end of if count = 0
} // closes if the values match

 //begins section on if the two cards aren't a match
    //creates variables for the two cards
    //Delays the flip back over so you can study the cards
    //applies css changes if not a match to make them look unflipped, sets to false for unflipped
    //two count is set back to zero
    else {
      flip1 = flippedCards[0];
      flip2 = flippedCards[1];
      window.setTimeout(function() {
        flip1.css('border', '5px solid #000')
        flip2.css('border', '5px solid #000')
        two1 = 0;
        two2 = 0;
     }, 500);
      //This number is how long it's flipped over. Ends timer.
    }
    //This ends else turning cards back over to unflipped
      flippedCards.length = 0;
   //Sets the array of two flipped cards back to empty to start looking for the next pair
 }
 //closes if two cards
};
//end checkCard function

//flipCard function
//creates array and associates it with game data
//changes the border of the clicked card to white
//adds the card to flippedCards array
//run a check on the cards

MatchGame.flipCard1 = function($card1, $game1) {
  $game1.data('flippedCards1', []);
  $card1.css('border', '5px solid #fff');
  flippedCards.push($card1);
  MatchGame.checkCard(flippedCards);
};

MatchGame.flipCard2 = function($card2, $game2) {
  $game2.data('flippedCards2', []);
  $card2.css('border', '5px solid #fff');
  flippedCards.push($card2);
  MatchGame.checkCard(flippedCards);
};
