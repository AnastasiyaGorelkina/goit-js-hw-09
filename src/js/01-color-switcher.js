const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}
console.log(refs.startBtn);
console.log(refs.stopBtn);

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

refs.stopBtn.disabled = true;
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartBtnClick(e) {
    refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
     intervalId = setInterval(() => {
        changeColorBody();
    }, 1000);
    
};

function onStopBtnClick(e) {
    refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
    clearInterval(intervalId);
};

function changeColorBody() {
    document.body.style.backgroundColor = getRandomHexColor();
};
