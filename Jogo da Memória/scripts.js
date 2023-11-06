const cards = [
    { name: 'Capiroto', img: 'img/capiroto.jpg' },
    { name: 'Capiroto', img: 'img/capiroto.jpg' },
    { name: 'Doge', img: 'img/doge.jpg' },
    { name: 'Doge', img: 'img/doge.jpg' },
    { name: 'Hunter', img: 'img/hunter.jpg' },
    { name: 'Hunter', img: 'img/hunter.jpg' },
    { name: 'Princesa', img: 'img/naomorde.jpg' },
    { name: 'Princesa', img: 'img/naomorde.jpg' },
    { name: 'Nerd', img: 'img/nerd.jpg' },
    { name: 'Nerd', img: 'img/nerd.jpg' },
    { name: 'ovo', img: 'img/ovo.jpg' },
    { name: 'ovo', img: 'img/ovo.jpg' },
    { name: 'Pantufa', img: 'img/pantufa.jpg' },
    { name: 'Pantufa', img: 'img/pantufa.jpg' },
    { name: 'ZUUUN', img: 'img/veloz.jpg' },
    { name: 'ZUUUN', img: 'img/veloz.jpg' }
];

let tab = [];
let flippedCards = [];
let matchedPairs = 0;

const btn = document.createElement('button');
btn.setAttribute('type', 'button');
btn.classList.add('btn-StartReset');
btn.innerText = 'Começar';

const init = () => {
    const app = document.getElementById('app');
    app.innerHTML = '';
    btn.addEventListener('click', () => {
        if (btn.innerText === 'Começar') {
            btn.innerText = 'Reset Game';
            geraTabuleiroInicial();
        } else {
            const imagesArea = document.querySelector('.images');
            imagesArea.innerHTML = '';
            const app = document.getElementById('app');
            app.innerHTML = '';
            app.appendChild(btn);
            geraTabuleiroInicial();
        }
    });
    app.appendChild(btn);
};

const geraTabuleiroInicial = () => {
    tab = [];
    flippedCards = [];
    matchedPairs = 0;
    const novo = [...cards];

    while (novo.length > 0) {
        const idx = Math.floor(Math.random() * novo.length);
        const [n] = novo.splice(idx, 1);
        tab.push(n);
    }

    const imagesArea = document.createElement('div');
    imagesArea.classList.add('images');
    app.insertBefore(imagesArea, btn);

    tab.forEach(obj => {
        const divCard = document.createElement('div');
        divCard.classList.add('cardNotTurned');

        let imgCard = document.createElement('img');
        imgCard.setAttribute('src', `${obj.img}`);
        imgCard.classList.add('img-card');

        let pCard = document.createElement('p');
        pCard.innerText = obj.name;

        divCard.appendChild(imgCard);
        divCard.appendChild(pCard);
        imagesArea.appendChild(divCard);
    });

    const divsCards = document.getElementsByClassName('cardNotTurned');

    for (let card of divsCards) {
        card.addEventListener('click', function () {
            if (!flippedCards.includes(this) && flippedCards.length < 2) {
                flipCard(this);
                flippedCards.push(this);

                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, 200);
                }
            }
        });
    }
};

const flipCard = (card) => {
    card.classList.remove('cardNotTurned');
    card.classList.add('cardTurned');
};

const checkMatch = () => {
    const [card1, card2] = flippedCards;
    const name1 = card1.querySelector('p').innerText;
    const name2 = card2.querySelector('p').innerText;

    if (name1 === name2) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cards.length / 2) {
            alert('Parabéns! Você completou todos os pares!');
        }
    } else {
        setTimeout(() => {
            unflipCard(card1);
            unflipCard(card2);
            flippedCards = [];
        }, 200);
    }
};

const unflipCard = (card) => {
    card.classList.remove('cardTurned');
    card.classList.add('cardNotTurned');
};
init();
