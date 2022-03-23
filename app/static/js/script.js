// Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
// SoftDev
// P02: Wordle Mania!™
// 2022-03-03
// Time Spent: ??

var c = document.getElementById("playground"); // GET CANVAS
var k = document.getElementById("keyboard");
var continueButton = document.getElementById('continue');
var ctx = c.getContext('2d');
var ktx = k.getContext('2d');7
var requestID = false;  //init global var for use with animation frames
var letterPosition = [0,0];
var keyboard = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
var lockedKeys = [];
var kbUsed = '#e3e3e3';
var currentLetters = "";
var guessedWords = [];
var correctLetterCount = 0;
var totalScore = 0;
var timeOn = false;
var lettersLeft = wordle;
var mode = "";
var frame = 0 ;
var column = 0 ;
var fillColors ;
var penaltyTime = 0;
var gameBegin = false;
var animating = false ;
var addData = true;

var changeToDefault = () => {
  localStorage.setItem("color",0);
  document.documentElement.style.setProperty("--primary", "#212529"); //nav
  document.documentElement.style.setProperty("--secondary", "#495057"); //continue and nav
  document.documentElement.style.setProperty("--third", "#ced4da"); //nav text
  document.documentElement.style.setProperty("--fourth", "#6c757d"); //background
  document.documentElement.style.setProperty("--fifth", "#DE7DC8"); //button hover
  document.documentElement.style.setProperty("--textColor", "#e9ecef"); //wordle text
  document.body.style.background = 'var(--fourth)';
}

var changeToClassic = () => {
  localStorage.setItem("color",1);
  document.documentElement.style.setProperty("--primary", "#a8dadc");
  document.documentElement.style.setProperty("--secondary", "#e63946");
  document.documentElement.style.setProperty("--third", "#1d3557");
  document.documentElement.style.setProperty("--fourth", "#457b9d");
  document.documentElement.style.setProperty("--fifth", "#f55662");
  document.documentElement.style.setProperty("--textColor", "#f1faee");;
  document.body.style.background = 'var(--fourth)';
}

var changeToMars = () => {
  localStorage.setItem("color",2);
  document.documentElement.style.setProperty("--primary", "#780116");
  document.documentElement.style.setProperty("--secondary", "#8c2f39");
  document.documentElement.style.setProperty("--third", "#fcb9b2");
  document.documentElement.style.setProperty("--fourth", "#d62839");
  document.documentElement.style.setProperty("--fifth", "#b23a48");
  document.documentElement.style.setProperty("--textColor", "#fed0bb");
  document.body.style.background = 'var(--fourth)';
}

var changeToForest = () => {
  localStorage.setItem("color",3);
  document.documentElement.style.setProperty("--primary", "#344e41");
  document.documentElement.style.setProperty("--secondary", "#6a994e");
  document.documentElement.style.setProperty("--third", "#91b18a");
  document.documentElement.style.setProperty("--fourth", "#588157");
  document.documentElement.style.setProperty("--fifth", "#3a5a40");
  document.documentElement.style.setProperty("--textColor", "#d5f5dd");
  document.body.style.background = 'var(--fourth)';
}

var changeToNavy = () => {
  localStorage.setItem("color",4);
  document.documentElement.style.setProperty("--primary", "#6a90a1");
  document.documentElement.style.setProperty("--secondary", "#166088");
  document.documentElement.style.setProperty("--third", "#233d4d");
  document.documentElement.style.setProperty("--fourth", "#4a6fa5");
  document.documentElement.style.setProperty("--fifth", "#c0d6df");
  document.documentElement.style.setProperty("--textColor", "#dbe9ee");
  document.body.style.background = 'var(--fourth)';
}


var changeToCoffee = () => {
  localStorage.setItem("color",5);
  document.documentElement.style.setProperty("--primary", "#9c6644");
  document.documentElement.style.setProperty("--secondary", "#7f5539");
  document.documentElement.style.setProperty("--third", "#b08968");
  document.documentElement.style.setProperty("--fourth", "#ddb892");
  document.documentElement.style.setProperty("--fifth", "#e6ccb2");
  document.documentElement.style.setProperty("--textColor", "#ede0d4");
  document.body.style.background = 'var(--fourth)';
}

var changeToWinter = () => {
  localStorage.setItem("color",6);
  document.documentElement.style.setProperty("--primary", "#abc4ff");
  document.documentElement.style.setProperty("--secondary", "#e2eafc");
  document.documentElement.style.setProperty("--third", "#edf2fb");
  document.documentElement.style.setProperty("--fourth", "#b0bfe8");
  document.documentElement.style.setProperty("--fifth", "#edf6f9");
  document.documentElement.style.setProperty("--textColor", "#012a4a");
  document.body.style.background = 'var(--fourth)';
}

var changeToGrapefruit = () => {
  localStorage.setItem("color",7);
  document.documentElement.style.setProperty("--primary", "#fc987e");
  document.documentElement.style.setProperty("--secondary", "#fdc47f");
  document.documentElement.style.setProperty("--third", "#fcd27e");
  document.documentElement.style.setProperty("--fourth", "#fba67d");
  document.documentElement.style.setProperty("--fifth", "#fcb57f");
  document.documentElement.style.setProperty("--textColor", "#FFFFFF");;
  document.body.style.background = 'var(--fourth)';
}

var changeToCandy = () => {
  localStorage.setItem("color",8);
  document.documentElement.style.setProperty("--primary", "#ffa0cc");
  document.documentElement.style.setProperty("--secondary", "#a2d2ff");
  document.documentElement.style.setProperty("--third", "#fff6f9");
  document.documentElement.style.setProperty("--fourth", "#ffafcc");
  document.documentElement.style.setProperty("--fifth", "#54F6FF");
  document.documentElement.style.setProperty("--textColor", "#ffffff");
  document.body.style.background = 'var(--fourth)';
}

var changeToSeafoam = () => {
  localStorage.setItem("color",9);
  document.documentElement.style.setProperty("--primary", "#57cc99");
  document.documentElement.style.setProperty("--secondary", "#72efdd");
  document.documentElement.style.setProperty("--third", "#c7f9cc");
  document.documentElement.style.setProperty("--fourth", "#38a3a5");
  document.documentElement.style.setProperty("--fifth", "#22577a");
  document.documentElement.style.setProperty("--textColor", "#212f45");
  document.body.style.background = 'var(--fourth)';
}


// draws the initial grid to play on
var drawGrid = () => {
  for(var k = 0 ; k<2; k++) {
    for(var j = 0; j<6; j++) {
      for(var i = 0; i<5; i++) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(5+(i*65),5+(j*65),60,60);
        ctx.fillStyle = 'gray';
        ctx.fillRect(6+(i*65),6+(j*65),58,58);
      }
    }
    // score/time boxes
    ctx.strokeRect(330,5,120,60);
    ctx.fillStyle = '#e3e3e3';
    ctx.fillRect(331,6,118,58);
    ctx.strokeRect(330,70,120,60);
    ctx.fillStyle = '#e3e3e3';
    ctx.fillRect(331,71,118,58);
  }
  if (localStorage.getItem("color") == 0) {
    changeToDefault();
  } else if (localStorage.getItem("color") == 1) {
    changeToClassic();
  } else if (localStorage.getItem("color") == 2) {
    changeToMars();
  } else if (localStorage.getItem("color") == 3) {
    changeToForest();
  } else if (localStorage.getItem("color") == 4) {
    changeToNavy();
  } else if (localStorage.getItem("color") == 5) {
    changeToCoffee();
  } else if (localStorage.getItem("color") == 6) {
    changeToWinter();
  } else if (localStorage.getItem("color") == 7) {
    changeToGrapefruit();
  } else if (localStorage.getItem("color") == 8) {
    changeToCandy();
  } else if (localStorage.getItem("color") == 9) {
    changeToSeafoam();
  }
  if (localStorage.getItem("FirstRound?") == "false") {
    var concurrentScore = parseInt(localStorage.getItem("TotalScore"));
    var concurrentTime = parseInt(localStorage.getItem("TimeLeft"));
    totalScore = concurrentScore;
    time = concurrentTime;
    localStorage.setItem("FirstRound?", true);
  } else {
    var colorScheme = localStorage.getItem("color");
    localStorage.clear();
    localStorage.setItem("color",colorScheme);
  }
  ctx.font = '20px Pragati Narrow';
  ctx.fillStyle = '#3b3b3b';
  if (time > Math.pow(10,10)) {
    ctx.clearRect(331,71,118,58);
    ctx.font = '20px Pragati Narrow';
    ctx.fillStyle = '#e3e3e3';
    ctx.fillRect(331,71,118,58);
    ctx.fillStyle = '#3b3b3b';
    ctx.fillText("Time Left: ∞", 335, 105);
  } else {
    ctx.fillText("Time Left: " + time + "s", 335, 105);
  }
  ctx.fillText("Score: " +  + totalScore, 335, 40);
}

window.addEventListener('load', drawGrid);
document.addEventListener("keydown",letter);

// sets the mode variable to the mode of the game
function identifyMode() {
  if (gamemode === "/") {
    mode = "NORMAL";
  } else if (gamemode === "/hard-wordle") {
    mode = "HARD";
  } else if (gamemode === "/chaos") {
    mode = "CHAOS";
  }
}

identifyMode();

// draws a keyboard
function drawKeyboard() {
  var kb = 10;
  var key = 0;
  ktx.font = '25px Pragati Narrow';
  ktx.fillStyle = '#edf2f4';
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
  ktx.fillStyle = '#edf2f4';
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
  if (!lockedKeys.includes(keyNum) && color != '#c9b216') {
    lockedKeys.push(keyNum);
  }
}

window.addEventListener('load', drawKeyboard);

// updates the score once called upon
function scoreCalc () {
  totalScore += (correctLetterCount * 100);
  if (guessedWords.length <= 3 && correctLetterCount == 5) {
    totalScore += 200;
    timeOn = false;
  }
  ctx.clearRect(331,6,118,58);
  ctx.font = '20px Pragati Narrow';
  ctx.fillStyle = '#e3e3e3';
  ctx.fillRect(331,6,118,58);
  ctx.fillStyle = '#3b3b3b';
  ctx.fillText("Score: " + totalScore, 335, 40);
}

// checks the word to see if it matches the generated word and colors the box appropriately
var wordCheck = () => {
  var guess =  currentLetters;
  // checks if the guessed word is inside the word bank
  if (wordBank.includes(guess.toLowerCase())) {
    guessedWords.push(currentLetters);
    correctLetterCount = 0;
    fillColors = ['#404040','#404040','#404040','#404040','#404040'] ;
    if (gamemode === "/hard-wordle") {
      for (var i = 0; i < 5; i++) {
        if (lockedKeys.includes(guess.charAt(i)) && !wordle.includes(guess.charAt(i))) {
          penaltyTime += 10;
        }
      }
    }
    for (var i = 0; i < 5; i++) {
      if (guess.charAt(i) === lettersLeft.charAt(i)) {
        lettersLeft = lettersLeft.substring(0,i)+'_'+lettersLeft.substring(i+1,5) ;
        fillColors[i] = '#2a9129';
        correctLetterCount++;
        drawKey(guess.charAt(i).toUpperCase(), '#2a9129');
      }
    }
    for (var i = 0; i < 5; i++) {
      if ((lettersLeft.includes(guess.charAt(i))) & (fillColors[i] != '#2a9129')) {
        lettersLeft = lettersLeft.substring(0,lettersLeft.indexOf(guess[i]))+'_'+lettersLeft.substring(lettersLeft.indexOf(guess[i])+1,5) ;
        fillColors[i] = '#c9b216';
        drawKey(guess.charAt(i).toUpperCase(), '#c9b216');
      }
      else if (!wordle.includes(guess.charAt(i))) {
        drawKey(guess.charAt(i).toUpperCase(), 'black');
      }
  // makes the rectangle transparent so that you can still see the letter
    }
    fillSquare() ;
    lettersLeft = wordle ;
    return true;
  } else {
    showMessage();
    kbUsed = '#e3e3e3';
    return false;
  }
}

var fillSquare = () => {
  animating = true ;
  frame+=4 ;
  speed = 4 ;
  if (frame >= 58) speed-=2 ;
  ctx.fillStyle = fillColors[column] ;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(6+(column*65),2+((guessedWords.length-1)*65)+frame,58,speed);
  ctx.globalAlpha = 1;
  ctx.font = '48px Pragati Narrow';
  ctx.fillStyle = 'black' ;
  ctx.fillText(guessedWords[guessedWords.length-1][column],23+(column*65),51+((guessedWords.length-1)*65));
  requestID = window.requestAnimationFrame(fillSquare) ;
  if (frame >= 58) {
    column++;
    frame = 0 ;
    if (column >= 5) {
      column = 0 ;
      animating = false ;
      window.cancelAnimationFrame(requestID);
    }
  }
}

// function for keypresses
function letter(e) {
  if (time > 0) {
    key = e.keyCode ;
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
    else if (((key == 13) || (key >= 65 && key <= 90)) & (!guessedWords.includes(wordle))) {
      if (letterPosition[1] == 5) {
        // next line if enter
        if (key == 13 && letterPosition[0] != 6 && !animating) {
          if (wordCheck()) {
            gameBegin = true;
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

// a timer to time the game
var gameTimer = () => {
    var startTimer = Date.now();
    var id = setInterval(function() {
        var timeElapsed = Date.now() - startTimer; // time passed
        var newTime = time - (Math.floor(timeElapsed/1000)) - penaltyTime; // in seconds
        if (time > Math.pow(10,10)) {
          ctx.clearRect(331,71,118,58);
          ctx.font = '20px Pragati Narrow';
          ctx.fillStyle = '#e3e3e3';
          ctx.fillRect(331,71,118,58);
          ctx.fillStyle = '#3b3b3b';
          ctx.fillText("Time Left: ∞", 335, 105);
        } else {
          ctx.clearRect(331,71,118,58);
          ctx.font = '20px Pragati Narrow';
          ctx.fillStyle = '#e3e3e3';
          ctx.fillRect(331,71,118,58);
          ctx.fillStyle = '#3b3b3b';
          ctx.fillText("Time Left: " + newTime + "s", 335, 105);
        }
        if (newTime <= 0 || (letterPosition[0] == 6 && correctLetterCount !=5)) {
          ctx.clearRect(331,71,118,58);
          ctx.font = '20px Pragati Narrow';
          ctx.fillStyle = '#e3e3e3';
          ctx.fillRect(331,71,118,58);
          ctx.fillStyle = '#3b3b3b';
          ctx.fillText("Time Left: N/A", 335, 105);
          clearInterval(id);
          time = newTime;
          timeOn = false;
          showMessage();
          setTimeout(function() {
            var randomUser = generateUsername();
            document.getElementById('user').defaultValue = randomUser;
            document.getElementById('score').defaultValue = totalScore;
            document.getElementById('mode').defaultValue = mode;
            document.getElementById('submit').style.display = "block";
          }, 1500);
          scoreCalc();
        } else if (correctLetterCount == 5) {
          time = newTime;
          clearInterval(id);
          ctx.font = '20px Pragati Narrow';
          ctx.fillStyle = '#e3e3e3';
          ctx.fillRect(331,71,118,58);
          ctx.fillStyle = '#3b3b3b';
          ctx.fillText("Time Left: " + time + "s", 335, 105);
        } else {
          continueButton.text = "Game is in session.";
        }
      }, 1000); // update about every second
}

// generates a random username for the user if none is provided
var generateUsername = () => {
  var word1 = wordBank[Math.floor(Math.random() * wordBank.length)];
  var word2 = wordBank[Math.floor(Math.random() * wordBank.length)];
  var num = Math.floor(Math.random() * wordBank.length);
  var user = word1 + word2 + num;
  return user;
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
        continueButton.style.background = '#e3e3e3';
        continueButton.text = "Loading word...";
        localStorage.setItem("TotalScore", totalScore);
        localStorage.setItem("FirstRound?", false);
        localStorage.setItem("TimeLeft", time);
        window.location.replace(gamemode);
      }
    }, 1000);
  } else if (correctLetterCount < 5 && (time <= 0 || letterPosition[0] == 6)) {
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
    continueButton.style.background = '#e3e3e3';
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
      return true ;
    }
    else {
      return false ;
    }
}

var endGame = () => {
  if (time > 0 && gameBegin === true && correctLetterCount < 5) {
    time = 0;
    continueButton.text = "Ending game...";
  } else {
    continueButton.text = "The game hasn't started yet!";
    setTimeout(function() {
      continueButton.text = "Waiting for the game to begin.";
    }, 1000);
  }
}

var displayInfo = () => {
  if (infoText.className == "hide") {
    infoText.className = "" ;
  }
  else {
    infoText.className = "hide";
  }
}

var colorDisplay = () => {
  if (colorDiv.className == "hide") {
    colorDiv.className = "" ;
  }
  else {
    colorDiv.className = "hide";
  }
}

var btn = document.getElementById("giveUp");
btn.addEventListener("click",endGame);

var infoText = document.getElementById("infoText");

var infoButton = document.getElementById("infoButton");
infoButton.addEventListener("click",displayInfo);

var colorDiv = document.getElementById("colorDiv");

var colorButton = document.getElementById("colorButton");
colorButton.addEventListener("click",colorDisplay);


var colorButtons = colorDiv.getElementsByTagName('button');

colorButtons[0].addEventListener('click',changeToDefault);
colorButtons[1].addEventListener('click',changeToClassic);
colorButtons[2].addEventListener('click',changeToMars);
colorButtons[3].addEventListener('click',changeToForest);
colorButtons[4].addEventListener('click',changeToNavy);
colorButtons[5].addEventListener('click',changeToCoffee);
colorButtons[6].addEventListener('click',changeToWinter);
colorButtons[7].addEventListener('click',changeToGrapefruit);
colorButtons[8].addEventListener('click',changeToCandy);
colorButtons[9].addEventListener('click',changeToSeafoam);
