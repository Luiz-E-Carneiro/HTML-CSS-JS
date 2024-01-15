var helpersDots = []
var possibleMoves = []
var verificCell
var lastPiece
var lastCell
var lastImg
let cellsWithPieces = separatePieces(boardObj);
var pieces = document.getElementsByClassName('piece')

function separatePieces(board) {
    let allCellsPiece = []
    let cellsBlackPieces = [];
    let cellsWhitePieces = [];
    board.map((line) => {
        let linePieces = line.filter((cell) => cell.piece);
        linePieces.map((cell) => cell.piece.color === 'black' ? cellsBlackPieces.push(cell) : cellsWhitePieces.push(cell));
        linePieces.map((cell) => allCellsPiece.push(cell));

    });
    return { allCellsPiece, cellsBlackPieces, cellsWhitePieces };
}

for (let p of pieces) {
    p.addEventListener('click', () => addHelpPath(p))
}

const pawnPath = (object) => {
    const { line, column, piece } = object;
    var color = piece.color
    var x
    color === 'white' ? x = 1 : x = -1

    var moves = []
    var captures = []
    let inFront = boardObj[line - (1 * x)][column]
    let nextFront = boardObj[line - (2 * x)][column]

    if (!inFront.piece && nextFront.piece) moves.push(inFront)
    else moves.push(inFront, nextFront)

    var right = true
    var left = true
    if (column === 0 || column === 7) { column === 0 ? left = false : right = false }

    if (!left) {
        let dgnRight = boardObj[line - (1 * x)][column + 1]
        if (dgnRight.piece) captures.push(dgnRight)
    } else if (!right) {
        let dgnLeft = boardObj[line - (1 * x)][column - 1]
        if (dgnLeft.piece) captures.push(dgnLeft)
    } else {
        let dgnLeft = boardObj[line - (1 * x)][column - 1]
        let dgnRight = boardObj[line - (1 * x)][column + 1]
        if (boardObj[line - (1 * x)][column + 1].piece) captures.push(dgnRight)
        if (boardObj[line - (1 * x)][column - 1].piece) captures.push(dgnLeft)
    }
    possibleMoves.push({ moves: moves, captures: captures })
    paintPath(moves, captures, piece.color)

}

const paintPath = (moves, captures, color) => {
    var color = color
    moves.forEach(c => {
        var help = document.createElement('div')
        helpersDots.push(help)
        c.cell.appendChild(help)
        if (!c.piece) help.classList.add('ball')
        c.cell.classList.add('path')
    })
    if (captures.length > 0) {
        captures.forEach(c => {
            var help = document.createElement('div')
            helpersDots.push(help)
            if (c.piece.color != color) help.classList.add('ring')
            c.cell.appendChild(help)
            c.cell.classList.add('path')
        });
    }
    ableToPlay()
}

const removeHelpers = () => {
    console.log(helpersDots);
    helpersDots.forEach(div => {
        div.parentNode.removeChild(div)
    });
    helpersDots = []
    possibleMoves = []
    lastPiece = ''
    lastCell = ''
    verificCell = ''
    console.log(helpersDots);
}


const ableToPlay = () => {
    possibleMoves[0].moves.forEach(c => {
        c.cell.addEventListener('click', function () {
            let piece = document.createElement('img')
            piece.src = lastPiece.src
            this.appendChild(piece)
            
            let lastLine = lastCell.line
            let lastColumn = lastCell.column
            let currLine = c.line
            let currColumn = c.column
            console.log(boardObj);
            console.log(boardObj[lastLine][lastColumn]);
            boardObj[lastLine][lastColumn].piece = false
            console.log(boardObj[lastLine][lastColumn]);
            boardObj[currLine][currColumn].piece = { piece: { name: lastPiece.name, color: lastPiece.color, src: `./../assets/images/${lastPiece.name}${lastPiece.color[0].toUpperCase()}.png` } }
            lastImg.parentNode.removeChild(lastImg)
            
            removeHelpers()
            cellsWithPieces = separatePieces(boardObj);
            pieces = document.getElementsByClassName('piece')
        })
    });
    // possibleMoves.captures.forEach(cellPiece => {
    //     cellPiece.addEventListener('click', function () {

    //     })
    // })
}



const rookPath = () => {
    const { line, column } = object;



}
const knightPath = () => {

}
const bishopPath = () => {

}
const queenPath = () => {

}
const kingPath = () => {

}

const addHelpPath = (p) => {
    var parent = p.parentNode
    cellsWithPieces.allCellsPiece.forEach(c => {
        if (parent === c.cell) {
            if (parent != verificCell) {
                lastImg = p
                verificCell = c.cell
                lastCell = { ...c }
                lastPiece = c.piece
                switch (c.piece.name) {
                    case 'pawn':
                        pawnPath(c)
                        break;
                    // case 'rook':
                    //     rookPath()
                    //     break;
                    // case 'knight':
                    //     knightPath()
                    //     break;
                    // case 'bishop':
                    //     bishopPath()
                    //     break;
                    // case 'queen':
                    //     queenPath()
                    //     break;
                    // case 'king':
                    //     kingPath()
                    //     break;
                    // default:
                    //     alert('error, try again')
                    //     break;
                }
            } else {
                removeHelpers()
            }
        }
    });
}
