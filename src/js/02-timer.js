import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    calendarInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    fieldDays: document.querySelector('[data-days]'),
    fieldHours: document.querySelector('[data-hours]'),
    fieldMinutes: document.querySelector('[data-minutes]'),
    fieldSeconds: document.querySelector('[data-seconds]'),
    field: document.querySelector('.field'),
};

refs.timer.style.fontSize = `30px`;
refs.timer.style.fontWeight = `bolder`;   
refs.timer.style.display = `flex`;
refs.timer.style.justifyContent = `space-around`;
refs.timer.style.marginTop = `60px`;
// refs.field.forEach(
//     e => {
//         e.style.display = `flex`;
//         e.style.flexDirection = `column`;
//         e.style.alignItems = `center`;
    
//     });

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.startBtn.setAttribute('disabled', 'true');

const startDate = Date.now();
let futereDate = 0;
let colorStart = false;
let intervalForColor = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    refs.startBtn.removeAttribute('disabled');
    futereDate = selectedDates[0].getTime();
    if (futereDate < startDate) {
      refs.startBtn.setAttribute('disabled', 'true');
      Notiflix.Notify.init({
        position: 'center-top',
        warning: {
          background: 'yellow',
          textColor: 'red',
        },
      });
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};
  
function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', 'true');
  changeColor();
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = futereDate - currentTime;
    console.log(deltaTime);

    if (deltaTime < 900) {
      clearInterval(intervalForColor);
      refs.startBtn.setAttribute('disabled', 'true');
      clearInterval(timerId);
    }
    const textTime = convertMs(deltaTime);
    refs.fieldSeconds.textContent = textTime.seconds;
    refs.fieldMinutes.textContent = textTime.minutes;
    refs.fieldHours.textContent = textTime.hours;
    refs.fieldDays.textContent = textTime.days;
  }, 1000);
}

flatpickr(refs.calendarInput, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  if (colorStart) {
    return;
  }
  colorStart = true;
  intervalForColor = setInterval(() => {
    refs.timer.style.color = getRandomHexColor();
  }, 1000);
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

