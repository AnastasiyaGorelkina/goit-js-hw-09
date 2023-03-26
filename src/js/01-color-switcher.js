const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}
console.log(refs.startBtn);
console.log(refs.stopBtn);

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

changeColorBody();

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartBtnClick(e) {
     intervalId = setInterval(() => {
        changeColorBody();
    }, 1000);
    
};

function onStopBtnClick(e) {
    clearInterval(intervalId);
};

function changeColorBody() {
    document.body.style.backgroundColor = getRandomHexColor();
};