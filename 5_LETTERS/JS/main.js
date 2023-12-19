// Constants and variables
var alphabet = []
for (var i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i))
}

var currentLine = 1
var currentCell = 1
var times = 0
var win = false
var firstTime = false

var possibleWords = []
var arrayDivs = []
var currentInputs = []
var currentDivs = []
var objLetters = []
var currentWord

// Function to get a random word from the API: https://random-word-api.herokuapp.com/home
async function getWord(amount, length) {
    const resposta = await fetch(`https://random-word-api.herokuapp.com/word?number=${amount}&length=${length}`)
    const word = await resposta.json()
    currentWord = word[0].toUpperCase()
    console.log(currentWord)
}


// Fuction to verify if the player's words are real words (in the API)
async function getAllWords() {
    const resposta = await fetch(`https://random-word-api.herokuapp.com/word?number=8885&length=5`)
    var words = await resposta.json();
    words.forEach(element => {
        element = element.toUpperCase();
        possibleWords.push(element);
    });
    console.log(possibleWords);
    console.log('ready');
}


// Function to convert string to array
function stringToArray(string) {
    return string.split('')
}

const changeColor = () => {
    var line = arrayDivs[currentLine - 1]
    line.forEach(div => {
        div.classList.add('current-cell')
        div.classList.remove('cell')
    })
}

// Function to create an input in a cell
const makeInput = (line, key) => {
    var line = line
    var inpt = document.createElement('input')
    inpt.setAttribute('type', 'text')
    inpt.classList.add('inputLetter')
    inpt.value = key
    inpt.setAttribute('readonly', 'true')
    var div = line[currentCell - 1]
    div.appendChild(inpt)
    currentDivs.push(div)

    for (let i = 0; i < line.length; i++) {
        if (line[i].innerHTML !== "" && i !== line.length - 1) {
            line[i].classList.remove('borderedCell')
            line[i].classList.add('animateDiv')
            line[i + 1].classList.add('borderedCell')
        } else if (div === line[line.length - 1]) {
            div.classList.add('animateDiv')

        }
    }

    currentCell++
    currentInputs.push(inpt)
}

// Function to delete the last letter in a line
const deleteLastLetter = (line) => {
    if (currentInputs.length > 0) {
        if (currentCell > 0) {
            currentCell--
            var last = currentInputs[currentInputs.length - 1]
            last.remove()
            currentInputs.splice(currentInputs.length - 1, 1)
            if (currentDivs.length !== 5) {
                line[currentDivs.length].classList.remove('borderedCell')
                line[currentDivs.length - 1].classList.remove('animateDiv')
                line[currentDivs.length - 1].classList.add('borderedCell')
            } else {
                line[currentDivs.length - 1].classList.remove('animateDiv')
            }
            currentDivs.pop()
        }
    }
}

// Function to verify the typed word
const verificationWord = () => {
    var values = []
    currentInputs.forEach(inpt => {
        values.push(inpt.value)
    })
    var word = values.join('')

    if (verificWordAndLength(word)) {
        if (verificCorrect(word)) {
            win = true
            modal(win, currentWord)
        } else {
            if (currentLine < 6) {
                var lastLine = arrayDivs[currentLine - 1]
                lastLine[lastLine.length - 1].classList.remove('borderedCell')

                currentLine++
                var newLine = arrayDivs[currentLine - 1]
                newLine[0].classList.add('borderedCell')
                changeColor()
            }
        }
        writeTheWord(values)
        currentInputs = []
        currentDivs = []
        currentCell = 1
    }
}

// Function to verify if the word has 5 letters
const verificWordAndLength = (word) => {
    var okay = false
    var correctLength = word.length
    var includesWord = possibleWords.includes(word)

    if (correctLength === 5 && includesWord) {
        okay = true
    } else {
        if (word.length != 5) makeAlerts('WrongLength')
        else if (!includesWord) makeAlerts('NotIncludes')
    }
    return okay
}

// Function to verify if the guessed word is correct
const verificCorrect = (word) => {
    var lastLine = arrayDivs[currentLine - 1]
    lastLine[lastLine.length - 1].classList.remove('borderedCell')
    return word === currentWord
}

// Function to write the guessed word on the board
const writeTheWord = (arrayWord) => {
    currentInputs.forEach(inpt => {
        inpt.remove()
    })

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
        if (arrayWord[i] === arrayCurrentWord[i]) {
            countType.forEach(element => {
                if (element.letter === arrayCurrentWord[i]) {
                    element.paint--
                }
            })
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

    if (times === 6) gameOver()
}

// Function to apply color to guessed letters on the board
const putColor = (currentDiv, currentLetter, letterWord, countType) => {
    if (currentWord.includes(currentLetter)) {
        if (currentLetter === letterWord) {
            currentDiv.style.backgroundColor = "#6ABD45"
        } else {
            for (let i = 0; i < countType.length; i++) {
                if (countType[i].letter === currentLetter) {
                    if (countType[i].paint > 0) {
                        countType[i].paint--
                        currentDiv.style.backgroundColor = "#FF6F61"
                    }
                }
            }
        }
    }
}

// Function to count the occurrences of each letter in a word
const countLetters = (arrayWord) => {
    const count = {}
    arrayWord.forEach(e => {
        if (count[e]) {
            count[e]++
        } else {
            count[e] = 1
        }
    })

    const arrayObjLetters = Object.keys(count).map(letter => ({
        letter: letter,
        amount: count[letter],
        paint: count[letter]
    }))

    return arrayObjLetters
}

// Event listener for keyboard input - Main
document.addEventListener('keydown', function (e) {
    var key = e.key.toUpperCase()
    var line = arrayDivs[currentLine - 1]
    var length = currentInputs.length

    if (times !== 6 && win === false) {
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
})

// Initialize the game
makeBoard()
changeColor()
getWord(1, 5)
getAllWords()
