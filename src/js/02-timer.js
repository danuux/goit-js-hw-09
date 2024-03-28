
const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]')
};

let intervalId = null;
let selectedDate = null;
let deltaTime = null;
const currentDate = Date.now();
refs.input.placeholder = currentDate;
refs.btnStart.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > currentDate) {
            refs.btnStart.disabled = false;
            selectedDate = selectedDates[0];
        } else {
            refs.btnStart.disabled = true;
            Notiflix.Notify.warning('Please choose a date in the future');
        }
    },
};

flatpickr(refs.input, options);

refs.btnStart.addEventListener('click', startTimer);


function startTimer() {
    intervalId = setInterval(() => { 
        deltaTime = selectedDate - Date.now();
        if (deltaTime > 0) {
            refs.seconds.textContent = addLeadingZero(convertMs(deltaTime).seconds);
            refs.minutes.textContent = addLeadingZero(convertMs(deltaTime).minutes);
            refs.hours.textContent = addLeadingZero(convertMs(deltaTime).hours);
            refs.days.textContent = addLeadingZero(convertMs(deltaTime).days);
        } else {
            clearInterval(intervalId);
            refs.btnStart.disabled = true;
        }
    });
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

