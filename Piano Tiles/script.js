const score = document.getElementById('score');
const paths = document.getElementsByClassName('pathDown');
const btnGame = document.getElementById('btnGame');

var keys = [];
var gameStarted = false;
var lose = false;
var add = false;

btnGame.addEventListener('click', function () {
    switch (this.innerText) {
        case "Começar":
            gameStarted = true;
            keyDown();
            break;
        case "Recomeçar":
            keys = [];
            lose = false;
            add = true;
            score.innerText = "00";
            for (let pt of paths) {
                pt.style.backgroundColor = 'transparent';
            }
            for (let pt of paths) {
                pt.innerHTML = "";
            }
            keyDown();
            break;
    }
    this.innerText = "Recomeçar";
});

const createKey = () => {
    const key = document.createElement('div');
    key.classList.add('key');
    var px = -105;
    key.style.top = `${px}px`;

    var rand = Math.round(Math.random() * 4);
    paths[rand].appendChild(key);

    keys.push({ ky: key, down: px, click: false, path: rand });
};

const keyDown = () => {
    createKey();
    const moviment = setInterval(() => {
        if (!add) {
            add = true;
            setInterval(() => {
                keys.forEach(k => {
                    k.down++;
                    if (k.down === 500 && k.click === true) {
                        keys.splice(0, 1);
                    }
                });
            }, 1);
        }
        if (!lose) {
            keys.forEach(k => {
                k.ky.style.top = `${k.down}px`;
                if (!k.click && k.down === 500) {
                    clearInterval(moviment);
                    playGameOver()
                }
                if (keys[keys.length - 1].down === 0) {
                    keyDown();
                }
            });
        }
    }, 5);
};

const lines = document.getElementsByClassName('line');

for (let line of lines) {
    line.addEventListener('click', function () {
        keys.forEach(k => {
            if (k.down >= 400 && k.down <= 500) {
                this.style.backgroundColor = 'rgba(0,0,0,0.5)';

            }
        });
    });
}

document.addEventListener('keydown', function (e) {
    if (!lose) {
        let audioToPlay;
        switch (e.key) {
            case "a":
                verificationKey(0);
                audioToPlay = new Audio('assets/re.wav');
                break;
            case "s":
                verificationKey(1);
                audioToPlay = new Audio('assets/mi.wav');
                break;
            case "d":
                verificationKey(2);
                audioToPlay = new Audio('assets/fa.wav');
                break;
            case "f":
                verificationKey(3);
                audioToPlay = new Audio('assets/sol.wav');
                break;
            case "g":
                verificationKey(4);
                audioToPlay = new Audio('assets/la.wav');
                break;
        }
        if (audioToPlay) {
            audioToPlay.play();
        }
    }
});

const verificationKey = (num) => {
    var rightClick = false;
    keys.forEach(key => {
        if (key.down >= 301 && key.down <= 399 && key.path === num) {
            key.ky.style.backgroundColor = 'rgba(0,0,0,0.5)';
            key.click = true;
            rightClick = true;
            score.innerText = Number(score.innerText) + 10;
        }
    });
    if (!rightClick && gameStarted) {
        paths[num].style.backgroundColor = 'rgba(0,0,0,0.5)';
        playGameOver()
    }
};

const playGameOver = () => {
    lose = true;
    // Choose any audio you want when lose
    const audios = [new Audio('assets/fa.wav'), new Audio('assets/la.wav'), new Audio('assets/mi.wav'), new Audio('assets/re.wav'), new Audio('assets/sol.wav'),];
    audios.forEach(audio => {
        audio.play()
    });
}
