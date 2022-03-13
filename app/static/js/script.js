// Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
// SoftDev
// P02: Wordle Mania!™
// 2022-03-03
// Time Spent: ??

var c = document.getElementById("playground"); // GET CANVAS
var continueButton = document.getElementById('continue');
var ctx = c.getContext('2d');
var requestID = false;  //init global var for use with animation frames
var letterPosition = [0,0];
var currentLetters = "";
var guessedWords = [];
var correctLetterCount = 0;
var totalScore = 0;
var timeOn = false;
var lettersLeft = wordle ;
var frame = 0 ;
var column = 0 ;
var fillColors ;
// draws the initial grid to play on
var drawGrid = () => {
  for(var k = 0 ; k<2; k++) {
    for(var j = 0; j<6; j++) {
      for(var i = 0; i<5; i++) {
        ctx.strokeStyle = 'black'
        ctx.strokeRect(5+(i*65),5+(j*65),60,60);
        ctx.fillStyle = 'gray';
        ctx.fillRect(6+(i*65),6+(j*65),58,58);
      }
    }
    ctx.strokeRect(330,5,120,60);
    ctx.fillStyle = '#a8dadc';
    ctx.fillRect(331,6,118,58);
    ctx.strokeRect(330,70,120,60);
    ctx.fillStyle = '#a8dadc';
    ctx.fillRect(331,71,118,58);
  }
  ctx.font = '20px Pragati Narrow';
  ctx.fillStyle = '#e63946';
  ctx.fillText("Score: " +  + totalScore, 335, 40);
  ctx.fillText("Time Left: " + time + "s", 335, 105);
}

drawGrid();
document.addEventListener("keydown",letter);

// updates the score once called upon
function scoreCalc () {
  totalScore += (correctLetterCount * 100);
  if (guessedWords.length <= 3 && correctLetterCount == 5) {
    totalScore += 200;
    timeOn = false;
  }
  ctx.clearRect(331,6,118,58);
  ctx.font = '20px Pragati Narrow';
  ctx.fillStyle = '#a8dadc';
  ctx.fillRect(331,6,118,58);
  ctx.fillStyle = '#e63946';
  ctx.fillText("Score: " + totalScore, 335, 40);
}

// checks the word to see if it matches the generated word and colors the box appropriately
var wordCheck = () => {
  var guess = guessedWords[guessedWords.length-1];
  correctLetterCount = 0;
  fillColors = ['black','black','black','black','black'] ;
  for (var i = 0; i < 5; i++) {
    if (guess.charAt(i) === lettersLeft.charAt(i)) {
      lettersLeft = lettersLeft.substring(0,i)+' '+lettersLeft.substring(i+1,5) ;
      fillColors[i] = 'green';
      correctLetterCount++;
      console.log(lettersLeft);
    }
  }
  for (var i = 0; i < 5; i++) {
    if (lettersLeft.includes(guess.charAt(i))) {
      fillColors[i] = 'yellow';
    }
    // makes the rectangle transparent so that you can still see the letter
  }
  fillSquare() ;
  lettersLeft = wordle ;
}

var fillSquare = () => {
  frame+=4 ;
  speed = 4 ;
  if (frame >= 58) speed-=2 ;
  ctx.fillStyle = fillColors[column] ;
  ctx.globalAlpha = 0.2;
  ctx.fillRect(6+(column*65),2+((guessedWords.length-1)*65)+frame,58,speed);
  ctx.globalAlpha = 1;
  requestID = window.requestAnimationFrame(fillSquare) ;
  if (frame >= 58) {
    column++;
    frame = 0 ;
    if (column >= 5) {
      column = 0 ;
      window.cancelAnimationFrame(requestID);
    }
  }
}

// function for keypresses
function letter(e) {
  if (time > 0) {
    key = e.keyCode ;
    console.log(key);
    ctx.font = '48px Pragati Narrow';
    // if backspace, clear space
    if ((key == 8) & (letterPosition[1] != 0)) {
      ctx.clearRect((letterPosition[1]-1)*65+6,letterPosition[0]*65+6,58,58);
      ctx.fillStyle = 'gray';
      ctx.fillRect(6+((letterPosition[1]-1)*65),6+(letterPosition[0]*65),58,58);
      letterPosition[1]--;
      currentLetters = currentLetters.substring(0,letterPosition[1]) ;
    }
    // if 'enter' or letter
    else if ((key == 13) || (key >= 65 && key <= 90)) {
      if (letterPosition[1] == 5) {
        console.log("full");
        // next line if enter
        if (key == 13 && letterPosition[0] != 6) {
          letterPosition[0]++;
          if (letterPosition[0] == 6) {
            time = 0;
            showMessage();
          }
          letterPosition[1] = 0;
          guessedWords.push(currentLetters);
          wordCheck();
          if (check()) {
            letterPosition[0] = 6;
            showMessage();
            scoreCalc();
            time += 60;
          }
          if (timeOn == false && correctLetterCount != 5) {
            gameTimer();
            timeOn = true;
          }
          currentLetters = "" ;
        }
      } else {
        // add letter to list and grid
        if ((key != 13) & (letterPosition[0] < 6)) {
          currentLetters += String.fromCharCode(key) ;
          ctx.fillStyle = 'black';
          ctx.fillText(String.fromCharCode(key),letterPosition[1]*65+23,letterPosition[0]*65+51);
          letterPosition[1]++;
        }
      }
    }
  }
};

console.log(wordle);

// a timer to time the game
var gameTimer = () => {
  var startTimer = Date.now();
  var id = setInterval(function() {
      var timeElapsed = Date.now() - startTimer; // time passed
      var newTime = time - (Math.floor(timeElapsed/1000)); // in seconds
      ctx.clearRect(331,71,118,58);
      ctx.font = '20px Pragati Narrow';
      ctx.fillStyle = '#a8dadc';
      ctx.fillRect(331,71,118,58);
      ctx.fillStyle = '#e63946';
      ctx.fillText("Time Left: " + newTime + "s", 335, 105);
      continueButton.text = "Game is in session."
      if (newTime <= 0) {
        ctx.clearRect(331,71,118,58);
        ctx.font = '20px Pragati Narrow';
        ctx.fillStyle = '#a8dadc';
        ctx.fillRect(331,71,118,58);
        ctx.fillStyle = '#e63946';
        ctx.fillText("Time Left: N/A", 335, 105);
        clearInterval(id);
        time = newTime;
        timeOn = false;
        scoreCalc();
      } else if (correctLetterCount == 5) {
        time = newTime;
        clearInterval(id);
        ctx.font = '20px Pragati Narrow';
        ctx.fillStyle = '#a8dadc';
        ctx.fillRect(331,71,118,58);
        ctx.fillStyle = '#e63946';
        ctx.fillText("Time Left: " + time + "s", 335, 105);
      }
  }, 1000); // update about every second
}

function showMessage() {
  if (correctLetterCount == 5) {
    var sec = 4;
    var idInterval = setInterval(function() {
      if (sec-- > 0) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(5,395,c.width-10,60);
        ctx.strokeRect(5,395,c.width-10,60);
        ctx.fillStyle = '#4df06b';
        ctx.fillRect(6,396, c.width-12, 58);
        ctx.fillStyle = 'black';
        ctx.font = '25px Pragati Narrow';
        ctx.fillText("Splendid! New word in " + sec, 125, 430);
      } else {
        clearInterval(idInterval);
        ctx.clearRect(4,394,c.width,62);
        continueButton.href = "/";
        continueButton.text = "Continue"
        continueButton.style.color = "#1d3557";
        continueButton.style.background = '#a8dadc';
      }
    }, 1000);
  } else {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(5,395,c.width-10,60);
    ctx.strokeRect(5,395,c.width-10,60);
    ctx.fillStyle = '#4df06b';
    ctx.fillRect(6,396, c.width-12, 58);
    ctx.fillStyle = 'black';
    ctx.font = '25px Pragati Narrow';
    ctx.fillText("The word was: " + wordle, 130, 430);
    continueButton.href = "/";
    continueButton.text = "Try Again?"
    continueButton.style.color = "#1d3557";
    continueButton.style.background = '#a8dadc';
  }
}

// checks if the word makes the generated word
var check = () => {
    if (currentLetters === wordle) {
      console.log("same") ;
      return true ;
    }
    else {
      console.log("no") ;
      return false ;
    }
}
