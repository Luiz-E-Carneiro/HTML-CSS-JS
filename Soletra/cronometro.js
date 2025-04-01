const span = document.querySelector('#number')
const btnAction = document.querySelector('#btnAction')

var interval;
var isRunning = false;
var breakTime = false;
var intervalBreak;

document.addEventListener('keydown', (e) => {
  if (e.code === 'Enter' || e.code === 'Space') {
    e.preventDefault();
  }

  if (e.code === 'ArrowDown') {
    if (!isRunning && !breakTime) {
      var value = 0;
      span.innerHTML = value.toFixed(1);
      
      isRunning = true;

      interval = setInterval(() => {
        value += 0.1;
        span.innerHTML = value.toFixed(1);
      }, 100);

      btnAction.disabled = false;
    } else if (isRunning) {
      clearInterval(interval);
      btnAction.disabled = true;
      
      if (!intervalBreak) {
        breakTime = true;
        
        intervalBreak = setInterval(() => {
          isRunning = false;
          breakTime = false;
          clearInterval(intervalBreak);
          intervalBreak = null;
        }, 3000);
      }
    }
  }
});
