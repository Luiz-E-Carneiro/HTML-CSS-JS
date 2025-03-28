const span = document.querySelector('#number')
const btnAction = document.querySelector('#btnAction')

var interval;
var isRunning = false;

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowDown') {
    if (!isRunning) {
      var value = 0;
      span.innerHTML = value.toFixed(1);

      isRunning = true;

      interval = setInterval(() => {
        value += 0.1;
        span.innerHTML = value.toFixed(1);
      }, 100);

      btnAction.disabled = false;
    } else {
      isRunning = false;
      clearInterval(interval);
      btnAction.disabled = true;
    }
  }
});
