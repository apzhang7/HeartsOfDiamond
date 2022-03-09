// Hearts of Diamond | Angela Zhang (Inky), Jonathan Wu (Loki), Jesse Xie (Polly)
// SoftDev
// P02: Wordle Mania!™
// 2022-03-03
// Time Spent: ??

var c = document.getElementById("playground"); // GET CANVAS
var ctx = c.getContext('2d');
var requestID = false;  //init global var for use with animation frames

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
