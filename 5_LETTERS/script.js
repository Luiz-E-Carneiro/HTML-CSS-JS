// API I've used Word: https://random-word-api.herokuapp.com/home

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
var firstTime = false

var especificWords = []
var arrayDivs = []
var currentInputs = []
var currentDivs = []
var objLetters = []
var currentWord

var alphabet = [];
for (var i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
}

function stringToArray(string) {
    return string.split('');
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
        if(!firstTime){
            cell.classList.add('borderedCell')
            firstTime = true
        }
    }
    arrayDivs.push(lineDivs)
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

    for (let i = 0; i < line.length; i++) {
        if(line[i].innerHTML != "" && i != line.length - 1){
            line[i].classList.remove('borderedCell')
            line[i].classList.add('animateDiv')
            line[i + 1].classList.add('borderedCell')
            console.log(line);    
        } else if(div === line[line.length - 1]){
            line[i].classList.add('animateDiv')
        }
    }

    currentCell++
    currentInputs.push(inpt)
}

const deleteLastLetter = (line) => {
    if (currentInputs.length > 0) {
        if (currentCell > 0) {
            currentCell--
            var last = currentInputs[currentInputs.length - 1];
            last.remove();
            currentInputs.splice(currentInputs.length - 1, 1);
            if(currentDivs.length != 5){
                line[currentDivs.length].classList.remove('borderedCell')
                line[currentDivs.length - 1].classList.remove('animateDiv')
                line[currentDivs.length - 1].classList.add('borderedCell')
                console.log(line);
            }
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
            if(currentLine < 6){
                var lastLine = arrayDivs[currentLine - 1]
                lastLine[lastLine.length - 1].classList.remove('borderedCell') 

                currentLine++
                var newLine = arrayDivs[currentLine - 1]
                newLine[0].classList.add('borderedCell')
            }
                
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

    var countType = countLetters(arrayWord)
    var arrayCurrentWord = stringToArray(currentWord)
    var countCurrentWord = countLetters(arrayCurrentWord)

    for (let i = 0; i < countType.length; i++) {
        for (let ii = 0; ii < countCurrentWord.length; ii++) {
            if (countType[i].letter === countCurrentWord[ii].letter) {
                if (countType[i].amount > countCurrentWord[ii].amount) {
                    countType[i].paint = countCurrentWord[ii].amount
                }
            }
        }
    }
    for (let i = 0; i < arrayWord.length; i++) {
        if(arrayWord[i] === arrayCurrentWord[i]){
         countType.forEach(element => {
             if(element.letter === arrayCurrentWord[i]){
                 element.paint--
            }
         });
        }
     }
    for (let i = 0; i < currentDivs.length; i++) {
        var span = document.createElement('span')
        span.innerText = arrayWord[i]
        span.classList.add('doneLetter')
        currentDivs[i].appendChild(span)

        putColor(currentDivs[i], arrayWord[i], currentWord[i], countType)
    }
    times++
    if(times === 6) gameOver() 
}

const putColor = (currentDiv, currentLetter, letterWord, countType) => {

    if (currentWord.includes(currentLetter)) {
        if (currentLetter === letterWord) {
            currentDiv.style.backgroundColor = "#6ABD45"
        } else {
            for (let i = 0; i < countType.length; i++) {
                if (countType[i].letter == currentLetter) {
                    if (countType[i].paint > 0) {
                        countType[i].paint--
                        currentDiv.style.backgroundColor = "#FF6F61"
                    }
                }
            }
        }
    }
}


const countLetters = (arrayWord) => {
    const count = {};
    arrayWord.forEach(e => {
        if (count[e]) {
            count[e]++;
        } else {
            count[e] = 1;
        }
    });
    const arrayObjLetters = Object.keys(count).map(letter => ({
        letter: letter,
        amount: count[letter],
        paint: count[letter]
    }));

    return arrayObjLetters;
}

const verific5Letters = (word) => {
    return word.length === 5
}

const verificCorrect = (word) => {
    return word === currentWord
}

const gameOver = () => {
    if(!win){
        alert(`You lost, the right word was: "${currentWord}"! Good luck next time! Au revoir! `)
    }
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
        alert("It's done! Reload to play again!")
    }
});


async function getWord(amount, length) { // You can expand the game by changing the amount and lenght of the words
    const resposta = await fetch(`https://random-word-api.herokuapp.com/word?number=${amount}&length=${length}`)
    const word = await resposta.json();
    currentWord = word[0].toUpperCase()
    console.log(currentWord);
}

makeBoard()
getWord(1, 5)

/*
// I'm thinking about use the code below to verify the words the player is typing, so I just saved the code to use in the future
async function getAllWords() { 
    const resposta = await fetch(`https://random-word-api.herokuapp.com/all`)
    const words = await resposta.json();
    console.log(words);

    words.forEach(w=> {
        if(w.length === 5){
            especificWords.push(w)
        }
    });
}
getAllWords()
*/
