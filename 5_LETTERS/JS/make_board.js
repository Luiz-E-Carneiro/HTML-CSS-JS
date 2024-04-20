// Function to create the game board
const makeBoard = () => {
    const boardArea = document.getElementById('boardArea')
    boardArea.innerHTML = ""
    objLetters = []
    const board = document.createElement('div')
    board.innerHTML = ""
    board.classList.add('board')
    makeLines(board)
    boardArea.appendChild(board)
}

// Function to create lines in the board
const makeLines = (board) => {
    var board = board
    for (let i = 0; i < 6; i++) {
        const line = document.createElement('div')
        line.classList.add('line')
        makeCells(line)
        board.appendChild(line)
    }

}

// Function to create cells in a line
const makeCells = (line) => {
    var line = line
    var lineDivs = []

    for (let i = 0; i < 5; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        line.appendChild(cell)
        lineDivs.push(cell)
        if (!firstTime) {
            cell.classList.add('borderedCell')
            firstTime = true
        }
    }
    arrayDivs.push(lineDivs)
}
