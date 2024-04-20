// Function to handle the end of the game
const gameOver = () => {
    modal(win, currentWord)
}

// Fuction to reset the game

const resetGame = () => {
    currentLine = 1
    currentCell = 1
    times = 0
    win = false
    firstTime = false

    especificWords = []
    arrayDivs = []
    currentInputs = []
    currentDivs = []
    objLetters = []
    makeBoard()
    changeColor()
    getWord(1, 5)
}

// Fuction to make the alerts when they are needed
const makeAlerts = (problem) => {
    const backAlert = document.getElementById('backAlert')
    const alert = document.getElementById('alert')
    backAlert.style.visibility = "hidden"
    alert.innerText = ""
    if (problem === "WrongLength") {
        alert.innerText = "Type a 5 Letter Word!"
    }
    if (problem === "NotIncludes") {
        alert.innerText = "This word dosen't exist in our data!"
    }
    backAlert.style.visibility = "visible"
    setTimeout(() => {
        backAlert.style.visibility = "hidden"
    }, 2500);
}