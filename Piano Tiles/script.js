const score = document.getElementById('score')
const paths = document.getElementsByClassName('pathDown')
const btnGame = document.getElementById('btnGame')

const fa = new Audio('assets/fa.wav'); fa.playbackRate = 1.1
const la = new Audio('assets/la.wav'); la.playbackRate = 1.1
const mi = new Audio('assets/mi.wav'); mi.playbackRate = 1.1
const re = new Audio('assets/re.wav'); re.playbackRate = 1.1
const sol = new Audio('assets/sol.wav'); sol.playbackRate = 1.1

var keys = []
var gameStarted = false
var lose = false
var add = false

btnGame.addEventListener('click', function () {

    switch (this.innerText) {
        case "Começar":
            gameStarted = true
            keyDown()
            break;
        case "Recomeçar":
            keys = []
            lose = false
            add = true
            score.innerText = "00"
            for (let pt of paths) {
                pt.style.backgroundColor = 'transparent'
            }
            for (let pt of paths) {
                pt.innerHTML = ""
            }
            keyDown()
            break;
    }

    this.innerText = "Recomeçar"
})

const createKey = () => {
    const key = document.createElement('div')
    key.classList.add('key')
    var px = -105
    key.style.top = `${px}px`

    var rand = Math.round(Math.random() * 4)
    paths[rand].appendChild(key)

    keys.push({ ky: key, down: px, click: false, path: rand })
}

const keyDown = () => {

    createKey()
    const moviment = setInterval(() => {
        if (!add) {
            add = true
            setInterval(() => {
                keys.forEach(k => {
                    k.down++
                    if (k.down === 500 && k.click === true) {
                        keys.splice(0, 1)
                    }
                })
            }, 1);
        }
        if (!lose) {
            keys.forEach(k => {
                k.ky.style.top = `${k.down}px`
                if (!k.click && k.down === 500) {
                    clearInterval(moviment)
                    lose = true
                }
                if (keys[keys.length - 1].down === 0) { keyDown() }
            });
        }
    }, 1)
};


const lines = document.getElementsByClassName('line')

for (let line of lines) {
    line.addEventListener('click', function () {
        keys.forEach(k => {
            if (k.down >= 400 && k.down <= 500) {
                this.style.backgroundColor = 'rgba(0,0,0,0.5)'
            }
        });
    })
}

document.addEventListener('keydown', function (e) {
    if (!lose) {
        switch (e.key) {
            case "a":
                verificationKey(0)
                re.play()
                break;
            case "s":
                verificationKey(1)
                mi.play()
                break;
            case "d":
                verificationKey(2)
                fa.play()
                break;
            case "f":
                verificationKey(3)
                sol.play()
                break;
            case "g":
                verificationKey(4)
                la.play()
                break;
        }
    }
});

const verificationKey = (num) => {
    var rightClick = false
    keys.forEach(key => {
        if (key.down >= 301 && key.down <= 399 && key.path === num) {
            key.ky.style.backgroundColor = 'rgba(0,0,0,0.5)';
            key.click = true
            rightClick = true
            score.innerText = Number(score.innerText) + 10
        }
    });
    if (!rightClick && gameStarted) {
        paths[num].style.backgroundColor = 'rgba(0,0,0,0.5)';
        lose = true
        re.play()
        mi.play()
        fa.play()
        sol.play()
        la.play()
    }
} 
