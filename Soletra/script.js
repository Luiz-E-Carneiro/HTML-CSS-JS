let wordElement = document.getElementById('word');
let descriptionElement = document.getElementById('description');
let roundElement = document.getElementById('round');
let level = document.getElementById('level');

const btnShowDescription = document.getElementById('showDescription');
const btnStart = document.getElementById('startButton');
const btnNextWord = document.getElementById('nextWord');

let wordsData = { facil: [], medio: [], dificil: [] };
let wordIndexes = { facil: 0, medio: 0, dificil: 0 };
let currentRound = 0;
let currentDifficulty = 'facil';
let wordsPerLevel = 10;
let wordsLoaded = 0;

const difficultyLevels = ['facil', 'medio', 'dificil'];

const loadWords = async () => {
    try {
        const easyResponse = await fetch('faceis.json');
        const mediumResponse = await fetch('medios.json');
        const hardResponse = await fetch('dificeis.json');



        wordsData.facil = await easyResponse.json();
        wordsData.medio = await mediumResponse.json();
        wordsData.dificil = await hardResponse.json();

        btnStart.addEventListener('click', newGame);
        btnNextWord.addEventListener('click', nextWord);
        btnShowDescription.addEventListener('click', showDesc);
    } catch (error) {
        console.error('Erro ao carregar palavras:', error);
    }
};

const newGame = () => {
    wordsLoaded = 0;
    currentDifficulty = 'facil';
    currentRound++;
    roundElement.textContent = `${currentRound < 10 ? "0" + currentRound : currentRound}`;

}

const showDesc = () => {
    descriptionElement.style.display = 'block';
};


const nextWord = () => {
    if (wordsLoaded >= wordsPerLevel && currentDifficulty != 'dificil') {
        let currentIndex = difficultyLevels.indexOf(currentDifficulty);
        if (currentIndex < difficultyLevels.length - 1) {
            currentDifficulty = difficultyLevels[currentIndex + 1];
        } else {
            alert('Fim da competição!');
            return;
        }
        wordsLoaded = 0;
    }
    level.textContent = currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);
    if (wordIndexes[currentDifficulty] >= wordsData[currentDifficulty].length) {
        alert('Sem mais palavras neste nível!');
        return;
    }

    let wordData = wordsData[currentDifficulty][wordIndexes[currentDifficulty]];

    if (!wordData || !wordData.palavra) {
        alert('Erro ao carregar palavra.');
        return;
    }

    wordElement.textContent = wordData.palavra;
    descriptionElement.textContent = wordData.definicao;
    descriptionElement.style.display = 'none';
    showDesc()

    wordIndexes[currentDifficulty]++;
    wordsLoaded++;
};

loadWords();


function salvarDados() {
    const dados = {
      wordIndexes,
      currentRound,
      currentDifficulty,
      wordsLoaded
    };

    const jsonString = JSON.stringify(dados, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dados.json";
    link.click();
}