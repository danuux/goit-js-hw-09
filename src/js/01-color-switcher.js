const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

let intervalId;

function startColorChange() {
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopColorChange() {
  clearInterval(intervalId);

  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

