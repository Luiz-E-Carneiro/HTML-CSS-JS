var helpersDots = []
var possiblePlays = []
var currentObj = ''

boardObj.forEach(line => {
    line.forEach(obj => {
        let cell = obj.cell
        cell.addEventListener('click', function () {
            if (obj.possibleMove) {
                cleanHelpers()
                letPlayable(true)
                movePiece(obj)
            } else {
                if (currentObj === obj) {
                    currentObj = ''
                    cleanHelpers()
                }
                else {
                    currentObj = obj
                    verificCell(currentObj)

                }
            }
        })
    });
});

const verificCell = (divObj) => {
    cleanHelpers()
    letPlayable(true)
    let { cell, piece } = { ...divObj }
    var img = false

    let elementosFilhos = cell.children;
    for (let i = 0; i < elementosFilhos.length; i++) {
        if (elementosFilhos[i].tagName.toLowerCase() === 'img') {
            img = true
        }
    }
    if (img) verificPieceToPath(divObj, piece)

}

const verificPieceToPath = (divObj, piece) => {
    switch (piece.name) {
        case 'pawn':
            pawnPath(divObj)
            break;
        case 'rook':
            rookPath(divObj)
            break;
        case 'knight':
            kingPath(divObj)
            break;
        case 'bishop':
            bishopPath(divObj)
            break;
        case 'queen':
            queenPath(divObj)
            break;
        case 'king':
            kingPath(divObj)
            break;

        default:
            alert('Something went wrong, try again please!')
            break;
    }
}

const pawnPath = (divObj) => {
    const { line, column, piece } = divObj;
    var color = piece.color
    var x
    color === 'white' ? x = 1 : x = -1

    var moves = []
    var captures = []
    let inFront = boardObj[line - (1 * x)][column]
    let nextFront = boardObj[line - (2 * x)][column]
    if (!inFront.piece && nextFront.piece) moves.push(inFront)
    else if (!inFront.piece && !nextFront.piece) moves.push(inFront, nextFront)

    let getRight = true;
    let getLeft = true;

    if (column === 0 || column === 7) {
        getLeft = column === 0 ? false : getLeft;
        getRight = column === 7 ? false : getRight;
    }
    const checkAndPushCapture = (targetColumn) => {
        var diagonalCell = boardObj[line - (1 * x)][targetColumn];
        if (diagonalCell.piece && diagonalCell.piece.color != color) {
            captures.push(diagonalCell);
        }
    };
    if (!getLeft) {
        checkAndPushCapture(column + 1);
    } else if (!getRight) {
        checkAndPushCapture(column - 1);
    } else {
        checkAndPushCapture(column - 1);
        checkAndPushCapture(column + 1);
    }
    paintPath(moves, captures)
}

const rookPath = (divObj) => {

}
const knightPath = (divObj) => {

}
const bishopPath = (divObj) => {

}
const kingPath = (divObj) => {

}
const queenPath = (divObj) => {

}
