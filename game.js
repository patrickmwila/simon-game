// keep track of user clicks
let userClickedPattern = [];

// keeps track of previously generated colours
// as per simon game requirements
let gamePattern = [];

// prepare an array from which the computer will 
// be randomly selecting colours
let buttonColours = ['red', 'blue', 'green', 'yellow'];

// set the game level
let gameLevel = 0;

// game in progress
// add an eventListener to the entire document 
// and invoke the nextSequence fxn when the event is trigard
let gameStart = false;
$(document).keypress(() => {
  if (!gameStart) {
    nextSequence();
    gameStart = true
  }
});

// simon game functions
// detect any clicked button
$('.btn').click(function() {
  let userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  // play sound based on the colour of the button clicked
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  // set game title 
  $('#level-title').text('Level ' + gameLevel);

  // generate a random colour
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  // keep track of computer colour choice
  gamePattern.push(randomChosenColour);

  // add animation to computer colour choice (div button type)
  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  // play with respect to computer colour choice
  playSound(randomChosenColour);

  // increase the game level
  gameLevel++;
}

function playSound(colourName) {
  let audio = new Audio('./sounds/' + colourName + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  // add class pressed
  let element = '.' + currentColour;
  $(element).addClass('pressed');

  // remove class pressed after 100 milliseconds
  setTimeout(()=> {
    $(element).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {

  // check if the most recent user answer is the same as the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    // check if user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(()=> {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  gameLevel = 0;
  userClickedPattern = [];
  gamePattern = [];
  gameStart = false;
}