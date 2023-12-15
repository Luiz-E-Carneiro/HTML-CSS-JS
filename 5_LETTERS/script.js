// API Word: https://random-word-api.herokuapp.com/home

var alphabet = [];
for (var i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
}

const body = document.body
const boardArea = document.getElementById('boardArea')
var currentLine = 1
var currentCell = 1
var times = 0
var win = false

var arrayDivs = []
var currentInputs = []
var currentDivs = []
var currentWord

async function getWord(numberOfTimes) { // You can expand the game, make the player guess 2 or more word at the same time
    const resposta = await fetch(`https://random-word-api.herokuapp.com/word?number=${numberOfTimes}&length=2`)
    const words = await resposta.json();
    currentWord.push(words)
}

const makeBoard = () => {
    objLetters = []
    const board = document.createElement('div')
    board.classList.add('board')
    makeLines(board)
    boardArea.appendChild(board)
}

const makeLines = (board) => {
    var board = board
    for (let i = 0; i < 6; i++) {
        const line = document.createElement('div')
        line.classList.add('line')
        makeCells(line)
        board.appendChild(line)
    }
}

makeCells = (line) => {
    var line = line
    var lineDivs = []

    for (let i = 0; i < 5; i++) { //Change by the lenght of the words 
        const cell = document.createElement('div')
        cell.classList.add('cell')
        line.appendChild(cell)
        lineDivs.push(cell)
    }
    arrayDivs.push(lineDivs)
}

var alphabet = [];
for (var i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
}

const makeInput = (line, key) => {
    var line = line
    var inpt = document.createElement('input')
    inpt.setAttribute('type', 'text')
    inpt.classList.add('inputLetter')
    inpt.value = key
    var div = line[currentCell - 1]
    div.appendChild(inpt)
    currentDivs.push(div)

    currentCell++
    currentInputs.push(inpt)
}

const deleteLastLetter = () => {
    if (currentInputs.length > 0) {
        if (currentCell > 0) {
            currentCell--
            var last = currentInputs[currentInputs.length - 1];
            last.remove();
            currentInputs.splice(currentInputs.length - 1, 1);
            currentDivs.pop()
        }
    }
};

const verificationWord = () => {
    var values = []
    currentInputs.forEach(inpt => {
        values.push(inpt.value)
    });
    var word = values.join('')

    if (verific5Letters(word)) {
        if (verificCorrect(word)) {
            win = true
        }
        else {
            currentLine++
        }
        writeTheWord(values)
        currentInputs = []
        currentDivs = []
        currentCell = 1

    }


}

const writeTheWord = (arrayWord) => {
    currentInputs.forEach(inpt => {
        inpt.remove()
    });
    for (let i = 0; i < currentDivs.length; i++) {
        var span = document.createElement('span')
        span.innerText = arrayWord[i]
        span.classList.add('doneLetter')
        currentDivs[i].appendChild(span)

        putColor(currentDivs[i], arrayWord[i], currentWord[i] )
    }
    times++
}

const putColor = (currentDiv, currentLetter, letterWord) => {
    if(currentLetter === letterWord){
        currentDiv.style.backgroundColor = "#6ABD45"
    }
    else if(currentWord.includes(currentLetter)){
        currentDiv.style.backgroundColor = "#FF6F61"
    }
}

const verific5Letters = (word) => {
    return word.length === 5
}

const verificCorrect = (word) => {
    return word === currentWord
}



document.addEventListener('keydown', function (e) {
    var key = e.key.toUpperCase();
    var line = arrayDivs[currentLine - 1]
    var length = currentInputs.length
    if (times !== 6 && win == false) {
        if (length !== 5) {
            if (alphabet.includes(key)) {
                makeInput(line, key)
            }
        }
        if (key === "BACKSPACE") {
            deleteLastLetter(line)

        } else if (key === "ENTER") {
            verificationWord()
        }
    } else {
        console.log("It's done! Reload to play again!");
    }
});


async function getWord(amount, length) { // You can expand the game by changing the amount and lenght of the words
    const resposta = await fetch(`https://random-word-api.herokuapp.com/word?number=${amount}&length=${length}`)
    const word = await resposta.json();
    currentWord = word[0].toUpperCase()
    //console.log(currentWord);
}

makeBoard()
getWord(1, 5)

/*
// I'm thinking about use the code below to verify the words the player is typing, so i just saved the code to use in the future
async function getAllWords() { 
    const resposta = await fetch(`https://random-word-api.herokuapp.com/all`)
    const words = await resposta.json();
    console.log(words);
    if(words.includes('shape')){
        console.log("OK ESTÁ AÍ ");
    }else{
        console.log('se mata, quase morri');
    }
    words.forEach(w=> {
        if(w.length === 5){
            //get especific words
        }
    });
}
getAllWords()
*/