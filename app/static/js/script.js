// Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
// SoftDev
// P02: Wordle Mania!™
// 2022-03-03
// Time Spent: ??

var c = document.getElementById("playground"); // GET CANVAS
var ctx = c.getContext('2d');
var requestID = false;  //init global var for use with animation frames
var letterPosition = [0,0];
var currentLetters = "";
var guessedWords = [];

var drawGrid = () => {
  ctx.strokeStyle = 'white';
  for(var k = 0 ; k < 2; k++) {
    for(var j = 0; j<6; j++) {
      for(var i = 0; i<5; i++) {
        ctx.beginPath();
        ctx.moveTo(4+i*65, 5+j*65);
        ctx.lineTo(65+i*65, 5+j*65);
        ctx.stroke();
        ctx.lineTo(65+i*65, 65+j*65);
        ctx.stroke();
        ctx.lineTo(5+i*65, 65+j*65);
        ctx.stroke();
        ctx.lineTo(5+i*65, 5+j*65);
        ctx.stroke();
      }
    }
  }
}



drawGrid();
document.addEventListener("keydown",letter) ;

function letter(e) {
  key = e.keyCode ;
  console.log(key);
  ctx.font = '48px monospace';
  // if backspace, clear space

  if ((key == 8) & (letterPosition[1] != 0)) {
    ctx.clearRect((letterPosition[1]-1)*65+6,letterPosition[0]*65+6,55,55);
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
        letterPosition[1] = 0;
        guessedWords.push(currentLetters);
        if (check()) {
          letterPosition[0] = 6 ;
        }
        currentLetters = "" ;
      }
    }
    else {
      // add letter to list and grid
      if ((key != 13) & (letterPosition[0] < 6)) {
        currentLetters += String.fromCharCode(key) ;
        ctx.fillText(String.fromCharCode(key),letterPosition[1]*65+21,letterPosition[0]*65+53);
        letterPosition[1]++ ;
      }
    }
  }
};

console.log(""+wordle);

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
