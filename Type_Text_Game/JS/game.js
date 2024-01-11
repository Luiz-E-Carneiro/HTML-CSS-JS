const missesArea = document.getElementById('misses');
const finishSound = new Audio('./assets/sounds/finish.mp3');
let counting;
let misses = 0;
let started = false;
let index = 0;
let upperCase = false;
let wrong = false;

const alphabet = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M',
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç',
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
    "'", '-', ',', '.', ' '
];

const allLetters = document.getElementsByClassName('spanLetter');

const startGame = () => {
    allLetters[0].classList.add('selectedLetter');
};

const passLetter = () => {
    allLetters[index - 1].classList.remove('selectedLetter');
    allLetters[index - 1].classList.add('correctLetter');
    if (index <= allLetters.length - 1) allLetters[index].classList.add('selectedLetter');
    if (index === allLetters.length) {
        finishGame();
    }
};

const wrongLetter = () => {
    miss();
    if (index > 0) {
        allLetters[index - 1].classList.remove('selectedLetter');
    }
    allLetters[index].classList.add('wrongLetter');
    wrong = true;
};

const goBack = () => {
    allLetters[index].classList.remove('wrongLetter');
    wrong = false;
};

document.addEventListener('keydown', function (e) {
    const key = e.key;
    if (key === 'CapsLock') {
        upperCase = !upperCase;
    }
    if (alphabet.includes(key) && !wrong) {
        const keyClick = new Audio('./assets/sounds/click.mp3');
        keyClick.playbackRate = 2.0;
        keyClick.play();
        verifyLetter(key);
        actionKeyboard(key);
    }
    if (key === 'Backspace') {
        goBack();
    }
});

const verifyLetter = (key) => {
    const currentLetterText = allLetters[index].innerText;
    let keyTyped = key;
    if (allLetters[index].innerHTML === `&nbsp;` && key === " ") {
        index++;
        passLetter();
        timer();
    } else {
        if (upperCase) {
            keyTyped = keyTyped.toUpperCase();
        }
        if (currentLetterText === keyTyped) {
            index++;
            passLetter();
        } else {
            wrongLetter();
        }
        timer();
    }
};

const finishGame = () => {
    timer(true);
    finishSound.play();
};

const miss = (reset = false) => {
    misses++
    missesArea.innerText = `${misses < 10 ? "0" + misses : misses}`
};

const timer = (stop = false) => {
    if (!started && !stop) {
        started = true;
        const timerElement = document.getElementById('timer');
        let minutes = 0;
        let seconds = 0;

        counting = setInterval(() => {
            if (seconds === 59) {
                minutes++;
                seconds = 0;
            } else {
                seconds++;
            }
            timerElement.innerText = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }, 1000);
    }
    if (stop) {
        clearInterval(counting);
    }
};

/*
const actionKeyboard = (key) => {
    const keysDiv = document.getElementsByClassName('keyDiv');
    for (let i = 0; i < keysDiv.length; i++) {
        const currentLetter = keysDiv[i].innerText;
        key = key.trim().toUpperCase();
        if (key === currentLetter) {
            keysDiv[i].classList.add('clicked');
            setTimeout(() => {
                keysDiv[i].classList.remove('clicked');
            }, 200);
        }
    }
};
*/
