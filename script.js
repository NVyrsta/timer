'use strict';
//-------------------functions--------
const getS = selector => document.querySelector(selector);
const getSAll = selector => document.querySelectorAll(selector);

// ------------------variables--------
let restart = 0;
//------------------------------------
//-------------------BLOCK-1----------
setInterval(function() {
    const currentDate = new Date();
    const currentMonth = new Date();
    const currentYear = new Date();
    const currentHour = new Date();
    const currentMinutes = new Date();
    const currentSeconds = new Date();
    getS('.current-date').innerHTML = `${currentDate.getDate()}.${
    currentMonth.getMonth() > 10
      ? currentMonth.getMonth() + 1
      : '0' + (currentMonth.getMonth() + 1)
  }.${currentYear.getFullYear()}`;
    getS('.current-time').innerHTML = `${
    currentHour.getHours() > 9
      ? currentHour.getHours()
      : '0' + currentHour.getHours()
  } : ${
    currentMinutes.getMinutes() > 9
      ? currentMinutes.getMinutes()
      : '0' + currentMonth.getMonth()
  } : ${
    currentSeconds.getSeconds() > 9
      ? currentSeconds.getSeconds()
      : '0' + currentSeconds.getSeconds()
  }`;
}, 1000);
//---------------------------------------

//-------------------BLOCK-2----------------------
let [h, m, s, ms] = [0, 0, 0, 0];
let intervalID;
const loopDisplay = getS('.loop-display');
let hh, mm, ss, mms;
getS('.timer__display').innerHTML = `00 : 00 : 00 : 000`;

function resetTimer() {
    [h, m, s, ms] = [0, 0, 0, 0];
    [hh, mm, ss, mms] = [0, 0, 0, 0];
    getS('.timer__display').innerHTML = `00 : 00 : 00 : 000`;
}
getS('.t-start').addEventListener('click', () => {
    getSAll('input').forEach(btn => {
        btn.classList.remove('active');
    });
    getS('.t-start').classList.add('active');
    clearInterval(intervalID);
    intervalID = setInterval(startTimer, 10);

    function startTimer() {
        ms += 10;
        if (ms == 1000) {
            ms = 0;
            s++;
            if (s == 60) {
                s = 0;
                m++;
                if (m == 60) {
                    m = 0;
                    h++;
                }
            }
        }
        hh = h < 10 ? '0' + h : h;
        mm = m < 10 ? '0' + m : m;
        ss = s < 10 ? '0' + s : s;
        mms = ms < 10 ? '00' + ms : ms < 100 ? '0' + ms : ms;
        getS('.timer__display').innerHTML = `${hh} : ${mm} : ${ss} : ${mms}`;
    }
});
getS('.t-loop').addEventListener('click', () => {
    getSAll('input').forEach(btn => {
        btn.classList.remove('active');
    });
    getS('.t-loop').classList.add('active');

    clearInterval(intervalID);
    loopDisplay.innerHTML += `<h2>${hh} : ${mm} : ${ss} : ${mms}</h2>`;
});

getS('.t-stop').addEventListener('click', () => {
    getSAll('input').forEach(btn => {
        btn.classList.remove('active');
    });
    getS('.t-stop').classList.add('active');

    clearInterval(intervalID);
});
getS('.t-reset').addEventListener('click', () => {
    getSAll('input').forEach(btn => {
        btn.classList.remove('active');
    });
    getS('.t-reset').classList.add('active');

    clearInterval(intervalID);
    getS('.loop-display').innerHTML = '';
    resetTimer();
});

//-------------------BLOCK-3----------------------
// ------set countdown---------------
let counter = +getS('.countdown-set__number').innerHTML;
getS('input[value="+"]').addEventListener('click', () => {
    counter++;
    countdownDisplay.innerHTML = `00 : 00`;
    getSAll('input').forEach(btn => {
        btn.classList.remove('active');
    });
    getS('input[value="+"]').classList.add('active');
    clearInterval(timerID);
    restart = 0;
    getS('.countdown-set__number').innerHTML = counter;

    getS('.cd-start').disabled = false;
    getS('.cd-stop').disabled = false;
    getS('.cd-reset').disabled = false;
});
getS('input[value="-"]').addEventListener('click', () => {
    getSAll('input').forEach(btn => {
        btn.classList.remove('active');
    });
    getS('input[value="-"]').classList.add('active');

    if (counter > 0) {
        counter--;
        countdownDisplay.innerHTML = `00 : 00`;
        clearInterval(timerID);
        restart = 0;
        getS('.countdown-set__number').innerHTML = counter;
        getS('.cd-start').disabled = false;
        getS('.cd-stop').disabled = false;
        getS('.cd-reset').disabled = false;
    }
});
// ------display countdown-----------
const countdownDisplay = getS('.countdown');
countdownDisplay.innerHTML = `00 : 00`;
let min, sec, time, startCountdownFrom, timerID;
getS('.cd-start').addEventListener('click', () => {
    getSAll('input').forEach(btn => {
        btn.classList.remove('active');
    });
    getS('.cd-start').classList.add('active');
    getS('.cd-start').disabled = true;
    getS('.cd-stop').disabled = false;
    getS('.cd-reset').disabled = false;
    timerID = setInterval(updateCountdown, 1000);
    if (restart === 0) {
        startCountdownFrom = counter;
        time = startCountdownFrom * 60;
    }

    function updateCountdown() {
        if (time >= 0) {
            min = Math.floor(time / 60);
            sec = time % 60;
            sec = sec < 10 ? '0' + sec : sec;
            countdownDisplay.innerHTML = `${min > 9 ? min : '0' + min} : ${sec}`;
            time--;
        }
    }
});
getS('.cd-stop').addEventListener('click', () => {
    getS('.cd-start').disabled = false;
    getS('.cd-stop').disabled = true;
    getS('.cd-reset').disabled = false;
    clearInterval(timerID);
    restart = counter;
    getSAll('input').forEach(btn => {
        btn.classList.remove('active');
    });
    getS('.cd-stop').classList.add('active');
});
getS('.cd-reset').addEventListener('click', () => {
    getS('.cd-start').disabled = false;
    getS('.cd-stop').disabled = false;
    getS('.cd-reset').disabled = true;
    countdownDisplay.innerHTML = `00 : 00`;
    clearInterval(timerID);
    time = startCountdownFrom * 60;
    restart = 0;
    getSAll('input').forEach(btn => {
        btn.classList.remove('active');
    });
    getS('.cd-reset').classList.add('active');
});