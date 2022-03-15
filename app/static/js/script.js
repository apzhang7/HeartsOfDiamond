// Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
// SoftDev
// P02: Wordle Mania!™
// 2022-03-03
// Time Spent: ??

var c = document.getElementById("playground"); // GET CANVAS
var k = document.getElementById("keyboard");
var continueButton = document.getElementById('continue');
var ctx = c.getContext('2d');
var ktx = k.getContext('2d');
var requestID = false;  //init global var for use with animation frames
var letterPosition = [0,0];
var keyboard = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
var lockedKeys = [];
var kbUsed = '#a8dadc';
var currentLetters = "";
var guessedWords = [];
var correctLetterCount = 0;
var totalScore = 0;
var timeOn = false;
var firstRound;
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
    ctx.strokeRect(330,135,120,60);
    ctx.fillStyle = '#a8dadc';
    ctx.fillRect(331,136,118,58);
  }
  if (localStorage.getItem("FirstRound?") == "false") {
    var concurrentScore = parseInt(localStorage.getItem("TotalScore"));
    var concurrentTime = parseInt(localStorage.getItem("TimeLeft"));
    totalScore = concurrentScore;
    time = concurrentTime;
    localStorage.setItem("FirstRound?", true);
  } else {
    localStorage.clear();
  }
  ctx.font = '20px Pragati Narrow';
  ctx.fillStyle = '#e63946';
  if (time > Math.pow(10,10)) {
    ctx.clearRect(331,71,118,58);
    ctx.font = '20px Pragati Narrow';
    ctx.fillStyle = '#a8dadc';
    ctx.fillRect(331,71,118,58);
    ctx.fillStyle = '#e63946';
    ctx.fillText("Time Left: Inf", 335, 105);
  } else {
    ctx.fillText("Time Left: " + time + "s", 335, 105);
  }
  ctx.fillText("Score: " +  + totalScore, 335, 40);
}

drawGrid();
document.addEventListener("keydown",letter);

// draws a keyboard
function drawKeyboard() {
  var kb = 10;
  var key = 0;
  ktx.font = '25px Pragati Narrow';
  ktx.fillStyle = 'white';
  ktx.fillText("Letters Remaining",143,25);
  for (j = 0; j < 3; j++) {
    for (i = 0; i < kb; i++) {
      if (j <= 1) {
        ktx.strokeStyle = 'black'
        ktx.strokeRect(5+(i*44)+(j*22),35+(j*44),39,39);
        ktx.fillStyle = kbUsed;
        ktx.fillRect(6+(i*44)+(j*22),36+(j*44),37,37);
        ktx.fillStyle = 'black';
        ktx.font = '30px Pragati Narrow';
        ktx.fillText(keyboard[key],17+(i*44)+(j*22),64+(j*44));
      } else if (j == 2) {
        ktx.strokeStyle = 'black'
        ktx.strokeRect(5+(i*44)+(j*33),35+(j*44),39,39);
        ktx.fillStyle = kbUsed;
        ktx.fillRect(6+(i*44)+(j*33),36+(j*44),37,37);
        ktx.fillStyle = 'black';
        ktx.font = '30px Pragati Narrow';
        ktx.fillText(keyboard[key],39+(i*44)+(j*22),64+(j*44));

      }
      key++;
    }
    kb = kb - j - 1;
  }
}

// draws the specific key to a specific color
function drawKey(keyNum, color) {
  var indexKey = keyboard.indexOf(keyNum);
  var kb = 10;
  var key = 0;
  ktx.font = '25px Pragati Narrow';
  ktx.fillStyle = 'white';
  ktx.fillText("Letters Remaining",143,25);
  for (j = 0; j < 3; j++) {
    for (i = 0; i < kb; i++) {
      if (key == indexKey && !lockedKeys.includes(keyNum)) {
        if (j <= 1) {
          ktx.clearRect(5+(i*44)+(j*22),35+(j*44),39,39);
          ktx.fillStyle = kbUsed;
          ktx.fillRect(6+(i*44)+(j*22),36+(j*44),37,37);
          ktx.strokeStyle = 'black'
          ktx.strokeRect(5+(i*44)+(j*22),35+(j*44),39,39);
          ktx.globalAlpha = 0.5;
          ktx.fillStyle = color;
          ktx.fillRect(6+(i*44)+(j*22),36+(j*44),37,37);
          ktx.globalAlpha = 1;
          ktx.fillStyle = 'black';
          ktx.font = '30px Pragati Narrow';
          ktx.fillText(keyboard[key],17+(i*44)+(j*22),64+(j*44));
        } else if (j == 2) {
          ktx.clearRect(6+(i*44)+(j*33),36+(j*44),37,37);
          ktx.fillStyle = kbUsed;
          ktx.fillRect(6+(i*44)+(j*33),36+(j*44),37,37);
          ktx.strokeStyle = 'black'
          ktx.strokeRect(5+(i*44)+(j*33),35+(j*44),39,39);
          ktx.globalAlpha = 0.5;
          ktx.fillStyle = color;
          ktx.fillRect(6+(i*44)+(j*33),36+(j*44),37,37);
          ktx.globalAlpha = 1;
          ktx.fillStyle = 'black';
          ktx.font = '30px Pragati Narrow';
          ktx.fillText(keyboard[key],39+(i*44)+(j*22),64+(j*44));
        }
      }
      key++;
    }
    kb = kb - j - 1;
  }
  if (!lockedKeys.includes(keyNum) && color != 'yellow') {
    lockedKeys.push(keyNum);
  }
}

drawKeyboard();

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
  var guess =  currentLetters;
  // checks if the guessed word is inside the word bank
  if (wordBank.includes(guess.toLowerCase())) {
    guessedWords.push(currentLetters);
    correctLetterCount = 0;
    fillColors = ['black','black','black','black','black'] ;
    for (var i = 0; i < 5; i++) {
      if (guess.charAt(i) === lettersLeft.charAt(i)) {
        lettersLeft = lettersLeft.substring(0,i)+'_'+lettersLeft.substring(i+1,5) ;
        fillColors[i] = 'green';
        correctLetterCount++;
        drawKey(guess.charAt(i).toUpperCase(), 'green');
        console.log(lettersLeft);
      }
    }
    for (var i = 0; i < 5; i++) {
      if ((lettersLeft.includes(guess.charAt(i))) & (fillColors[i] != 'green')) {
        fillColors[i] = 'yellow';
        drawKey(guess.charAt(i).toUpperCase(), 'yellow');
      }
      else {
        drawKey(guess.charAt(i).toUpperCase(), 'black');
      }
  // makes the rectangle transparent so that you can still see the letter
  }
  fillSquare() ;
  lettersLeft = wordle ;

    return true;
  } else {
    showMessage();
    kbUsed = '#a8dadc';
    return false;
  }
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
          if (wordCheck()) {
            continueButton.text = "Game is in session.";
            if (letterPosition[0] == 6) {
              time = 0;
              showMessage();
            }
            letterPosition[0]++;
            letterPosition[1] = 0;
            if (check()) {
              time += moreTime;
              showMessage();
              scoreCalc();
            }
            if (timeOn == false && correctLetterCount != 5) {
              gameTimer();
              timeOn = true;
            }
            currentLetters = "" ;
          }
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
  if (time > Math.pow(10,10)) {
    ctx.clearRect(331,71,118,58);
    ctx.font = '20px Pragati Narrow';
    ctx.fillStyle = '#a8dadc';
    ctx.fillRect(331,71,118,58);
    ctx.fillStyle = '#e63946';
    ctx.fillText("Time Left: inf", 335, 105);
  } else {
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
          showMessage();
          scoreCalc();
        } else if (correctLetterCount == 5) {
          time = newTime;
          clearInterval(id);
          ctx.font = '20px Pragati Narrow';
          ctx.fillStyle = '#a8dadc';
          ctx.fillRect(331,71,118,58);
          ctx.fillStyle = '#e63946';
          ctx.fillText("Time Left: " + time + "s", 335, 105);
        } else {
          continueButton.text = "Game is in session.";
        }
      }, 1000); // update about every second
    }
}

// displays various messages
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
        ctx.fillText("Splendid! New word in " + sec + ".", 125, 430);
      } else {
        clearInterval(idInterval);
        ctx.clearRect(4,394,c.width,62);
        continueButton.style.color = "#1d3557";
        continueButton.style.background = '#a8dadc';
        continueButton.text = "Loading word...";
        localStorage.setItem("TotalScore", totalScore);
        localStorage.setItem("FirstRound?", false);
        localStorage.setItem("TimeLeft", time);
        window.location.replace(gamemode);
      }
    }, 1000);
  } else if (correctLetterCount < 5 && time <= 0) {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(5,395,c.width-10,60);
    ctx.strokeRect(5,395,c.width-10,60);
    ctx.fillStyle = '#4df06b';
    ctx.fillRect(6,396, c.width-12, 58);
    ctx.fillStyle = 'black';
    ctx.font = '25px Pragati Narrow';
    ctx.fillText("The word was: " + wordle, 130, 430);
    continueButton.href = gamemode;
    continueButton.text = "Try Again?"
    continueButton.style.color = "#1d3557";
    continueButton.style.background = '#a8dadc';
  } else {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(5,395,c.width-10,60);
    ctx.strokeRect(5,395,c.width-10,60);
    ctx.fillStyle = '#4df06b';
    ctx.fillRect(6,396, c.width-12, 58);
    ctx.fillStyle = 'black';
    ctx.font = '25px Pragati Narrow';
    ctx.fillText(currentLetters + " is not a word. Try again!", 95, 430);
    setTimeout(function() {
      ctx.clearRect(4,394,c.width,62);
    }, 1000);
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

var endGame = () => {
  if (time > 0) {
    time = 0;
  }
}

var btn = document.getElementById("giveUp");
btn.innerHTML = "End Game?";
btn.addEventListener("click",endGame);
