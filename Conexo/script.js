// script.js

const words = [
    // Round 1
    [
        { word: "ote", type: "sufixo" },
        { word: "supra", type: "prefixo" },
        { word: "arbori", type: "radical" },
        { word: "íssimo", type: "sufixo" },
        { word: "al", type: "sufixo" },
        { word: "agogo", type: "radical" },
        { word: "circum", type: "prefixo" },
        { word: "micro", type: "prefixo" },
        { word: "etno", type: "radical" },
        { word: "arra", type: "sufixo" },
        { word: "meta", type: "prefixo" },
        { word: "vermi", type: "radical" }
    ],
    // Round 2
    [
        { word: "eira", type: "sufixo" },
        { word: "aero", type: "radical" },
        { word: "preter", type: "prefixo" },
        { word: "vis", type: "prefixo" },
        { word: "érrimo", type: "sufixo" },
        { word: "cruci", type: "radical" },
        { word: "acho", type: "sufixo" },
        { word: "crono", type: "radical" },
        { word: "tres", type: "prefixo" },
        { word: "ambi", type: "prefixo" },
        { word: "anzil", type: "sufixo" },
        { word: "trofia", type: "radical" }
    ],
    // Round 3
    [
        { word: "co", type: "prefixo" },
        { word: "fero", type: "radical" },
        { word: "eira", type: "sufixo" },
        { word: "meta", type: "prefixo" },
        { word: "mente", type: "sufixo" },
        { word: "so", type: "prefixo" },
        { word: "cefalo", type: "radical" },
        { word: "inho", type: "sufixo" },
        { word: "contra", type: "prefixo" },
        { word: "umbra", type: "radical" },
        { word: "fide", type: "radical" },
        { word: "agem", type: "sufixo" }
    ],
];

let numPlayers = 2;
let currentRound = 0;
let selectedWords = [];
let currentPlayer = 1;
let scores = [];
const maxPlayers = 4;

document.getElementById('start-game').addEventListener('click', setupGame);

function setupGame() {
    numPlayers = parseInt(document.getElementById('num-players').value);
    if (numPlayers < 2 || numPlayers > 4) {
        alert('Número de jogadores deve ser entre 2 e 4.');
        return;
    }
    scores = Array(numPlayers).fill(0);
    document.querySelector('.setup-container').style.display = 'none';
    document.querySelector('.game-container').style.display = 'grid';
    startGame();
}

function startGame() {
    updateScores();
    loadRound(currentRound);
    updateCurrentPlayer();
}

function loadRound(round) {
    const round_span = document.querySelector('.round-span');
    round_span.innerText = Number(round_span.innerText) + 1 
    const container = document.getElementById('words-container');
    container.innerHTML = '';
    words[round].forEach((item, index) => {
        const wordElement = document.createElement('div');
        wordElement.classList.add('word');
        wordElement.textContent = item.word;
        wordElement.dataset.index = index;
        wordElement.onclick = () => selectWord(index);
        container.appendChild(wordElement);
    });
}

function selectWord(index) {
    const wordElement = document.querySelector(`[data-index='${index}']`);
    if (selectedWords.includes(index)) {
        selectedWords = selectedWords.filter(i => i !== index);
        wordElement.classList.remove('selected');
    } else {
        selectedWords.push(index);
        wordElement.classList.add('selected');
    }

    if (selectedWords.length === 4) {
        checkSelection();
    }
}

function checkSelection() {
    const selected = selectedWords.map(index => words[currentRound][index]);
    const types = selected.map(item => item.type);
    const isCorrect = types.every(type => type === types[0]);

    if (isCorrect) {
        updateScore();
        updateConnections(selected);
        selectedWords = [];
        document.querySelectorAll('.word.selected').forEach(el => el.classList.remove('selected'));

        if (document.querySelectorAll('.word').length === 0) {
            currentRound++;
            if (currentRound < words.length) {
                loadRound(currentRound);
            } else {
                endGame();
            }
        }
    } else {
        switchPlayer();
    }
}

function updateScore() {
    scores[currentPlayer - 1]++;
    updateScores();
}

function switchPlayer() {
    currentPlayer = (currentPlayer % numPlayers) + 1;
    selectedWords = [];
    document.querySelectorAll('.word.selected').forEach(el => el.classList.remove('selected'));
    updateCurrentPlayer();
}

function updateScores() {
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.innerHTML = '';
    scores.forEach((score, index) => {
        const scoreElement = document.createElement('p');
        scoreElement.textContent = `Jogador ${index + 1}: ${score}`;
        scoreContainer.appendChild(scoreElement);
    });
}

function updateCurrentPlayer() {
    document.getElementById('current-player').textContent = `Vez do Jogador ${currentPlayer}`;
}

function updateConnections(selected) {
    const connectionsList = document.getElementById('connections-list');
    const listItem = document.createElement('li');
    listItem.textContent = selected.map(item => item.word).join(', ') + ` (${selected[0].type})`;
    connectionsList.appendChild(listItem);

    selected.forEach(item => {
        const wordElement = document.querySelector(`[data-index='${words[currentRound].indexOf(item)}']`);
        wordElement.parentNode.removeChild(wordElement);
    });
}

function endGame() {
    const back = document.querySelector('.background-score');
    back.style.display = 'flex'
    const result = document.querySelector('.result');
    result.innerText = `Jogo terminou!\n Placar final:\n${scores.map((score, index) => `Jogador ${index + 1}: ${score}`).join('\n')}`
}

function resetGame() {
    location.reload();
}

startGame();
