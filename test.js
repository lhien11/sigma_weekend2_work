var count = 10;
var counterIncrement=-1;
var counter = setInterval(timer, 500);

function timer() {
  count = count+counterIncrement;
  if (count == 0 || count == 10 ) {
        counterIncrement = -counterIncrement;
    }
  console.log(count);
}
