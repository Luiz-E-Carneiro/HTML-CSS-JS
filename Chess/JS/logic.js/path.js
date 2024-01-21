var player = 'Player1'
var helpersDots = []
var possibleCastle = { left: null, right: null }
var possiblePlays = []
var currentObj = ''

boardObj.forEach(line => {
    line.forEach(obj => {
        let cell = obj.cell
        cell.addEventListener('click', function () {
            if (obj.castle) {
                castle(obj)
                player === 'Player1' ? player = 'Player2' : player = 'Player1'
                console.log(boardObj);
            }
            else if (obj.possibleMove) {
                movePiece(obj)
                refrash()
                player === 'Player1' ? player = 'Player2' : player = 'Player1'
            } else {
                if (currentObj === obj) {
                    currentObj = ''
                    refrash()
                } else {
                    if (verifiPlayerTime(obj.piece.color)) {
                        currentObj = obj
                        verificCell(currentObj)
                    } else {
                        refrash()
                    }
                }
            }
        })
    });
});

const verificCell = (divObj) => {
    refrash()
    let { cell, piece } = divObj
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
            knightPath(divObj)
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

    if (!piece.firstPlay) {
        let inFront = boardObj[line - (1 * x)][column]
        let nextFront = boardObj[line - (2 * x)][column]
        if (!inFront.piece && nextFront.piece) moves.push(inFront)
        else if (!inFront.piece && !nextFront.piece) moves.push(inFront, nextFront)
    } else {
        let inFront = boardObj[line - (1 * x)][column]
        if (!inFront.piece) moves.push(inFront)
    }

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
    const { line, column, piece } = divObj;
    var color = piece.color
    var moves = []
    var captures = []

    const cellsToPaint = getVerticalHorizontal(line, column, color, ['left', 'right', 'up', 'down'], moves, captures)
    paintPath(cellsToPaint[0], cellsToPaint[1])
}

const knightPath = (divObj, validator = false) => {
    const { line, column, piece } = divObj;
    var color = piece.color
    var moves = []
    var captures = []

    function addMove(row, col) {
        var cell = boardObj[row][col]
        if (cell && !cell.piece) moves.push(cell)
        else if (cell && cell.piece.color != color) captures.push(cell)
    }

    if (line + 2 <= 7) {
        if (column + 1 <= 7) addMove(line + 2, column + 1)
        if (column - 1 >= 0) addMove(line + 2, column - 1)
    }
    if (line - 2 >= 0) {
        if (column + 1 <= 7) addMove(line - 2, column + 1)
        if (column - 1 >= 0) addMove(line - 2, column - 1)
    }
    if (line + 1 <= 7) {
        if (column + 1 <= 7) addMove(line + 1, column + 2)
        if (column - 1 >= 0) addMove(line + 1, column - 2)
    }
    if (line - 1 >= 0) {
        if (column + 1 <= 7) addMove(line - 1, column + 2)
        if (column - 1 >= 0) addMove(line - 1, column - 2)
    }
    paintPath(moves, captures)
}

const bishopPath = (divObj) => {
    const { line, column, piece } = divObj;
    var color = piece.color
    var moves = []
    var captures = []
    const cellsToPaint = getDiagonals(line, column, color, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'], moves, captures)
    paintPath(cellsToPaint[0], cellsToPaint[1])

}

const kingPath = (divObj) => {
    const { line, column, piece } = divObj;
    var color = piece.color
    var moves = []
    var captures = []
    let directions = [[0, 1], [1, 0], [1, 1]]

    for (let d of directions) {
        for (let i = 0; i < d.length; i++) {
            if (line + d[0] <= 7 && column + d[1] <= 7) addMove(line + d[0], column + d[1])
            if (line + d[0] <= 7 && column - d[1] >= 0) addMove(line + d[0], column - d[1])
            if (line - d[0] >= 0 && column + d[1] <= 7) addMove(line - d[0], column + d[1])
            if (line - d[0] >= 0 && column - d[1] >= 0) addMove(line - d[0], column - d[1])
        }
    }
    if (!piece.firstPlay) verificCastle(divObj)

    function addMove(row, col) {
        var cell = boardObj[row][col]
        if (cell && !cell.piece) {
            if (color === 'white' && !cell.whiteKingCannotStay) moves.push(cell)
            if (color === 'black' && !cell.blackKingCannotStay) moves.push(cell)
        }
        else if (cell && cell.piece.color != color && !cell.blackKingCannotStay) captures.push(cell)
    }
    paintPath(moves, captures)
}

const queenPath = (divObj) => {
    const { line, column, piece } = divObj
    var color = piece.color
    var moves = []
    var captures = []
    const verticalHorizontal = getVerticalHorizontal(line, column, color, ['left', 'right', 'up', 'down'], moves, captures)
    const diagonals = getDiagonals(line, column, color, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'], moves, captures)

    var allMoves = verticalHorizontal[0].concat(diagonals[0])
    var allCaptures = verticalHorizontal[1].concat(diagonals[1])
    paintPath(allMoves, allCaptures)
}

const verificCastle = (divObj) => {
    const { line, column, piece } = divObj
    const color = piece.color

    const allPieces = boardObj.map(line =>
        line.map(cell => cell.piece && cell.piece.name === 'rook' && !cell.piece.firstPlay && cell.piece.color === color ? cell : null)
    );
    const filteredRooks = allPieces.flat().filter(cell => cell !== null);
    if (filteredRooks.length == 0) return
    filteredRooks.forEach(rookCell => {
        if (rookCell.column === 0) verificEmptySpaces('left', rookCell.column)
        if (rookCell.column === 7) verificEmptySpaces('right', rookCell.column)
    });

    function verificEmptySpaces(side, rookColumn) {
        var emptySpaces = true
        if (side === 'left') {
            for (let i = rookColumn + 1; i < column; i++) {
                if (boardObj[line][i].piece) emptySpaces = false
            }
        } else {
            for (let i = rookColumn - 1; i > column; i--) {
                if (boardObj[line][i].piece) emptySpaces = false
            }
        }

        if (emptySpaces) {
            var help = document.createElement('div')
            helpersDots.push(help)
            help.classList.add('square')
            console.log(side);
            if (side === 'left') {
                boardObj[line][column - 2].cell.appendChild(help)
                boardObj[line][column - 2].cell.classList.add('path')
                boardObj[line][column - 2].castle = true
                possibleCastle.left = boardObj[line][column - 2].cell
            } else {
                boardObj[line][column + 2].cell.appendChild(help)
                boardObj[line][column + 2].cell.classList.add('path')
                boardObj[line][column + 2].castle = true
                possibleCastle.right = boardObj[line][column + 2].cell
            }
        }
        console.log(possibleCastle);
    }
}
const castle = (cellObj) => {
    var { line, column } = cellObj
    var color = cellObj.line === 0 ? 'black' : 'white'
    console.log(cellObj.cell);
    console.log(cellObj.cell);
    if (cellObj.cell === possibleCastle.left) changePieces('left', color)
    if (cellObj.cell === possibleCastle.right) changePieces('right', color)

    function changePieces(side, color) {
        console.log('entrei');
        var numberSide = side === 'left' ? 0 : 7
        var abbrevColor = color === 'white' ? 'W' : 'B'
        var objKing
        var objRook

        boardObj.forEach(line => {
            line.forEach(obj => {
                if (obj.piece.name === 'rook' && obj.column === numberSide && obj.piece.color === color) {
                    objRook = obj
                    boardObj[obj.line][obj.column].piece = false
                } else if (obj.piece.name === 'king' && obj.piece.color === color) {
                    objKing = obj
                    boardObj[obj.line][obj.column].piece = false
                }
            })
        });

        console.log(objKing);
        console.log(objRook);
        var imgKing = deletePiece(objKing.cell.children)
        var imgRook = deletePiece(objRook.cell.children)

        console.log(imgKing);
        console.log(imgRook);

        if (numberSide === 0) {
            boardObj[line][column].cell.appendChild(imgKing)
            boardObj[line][column].piece = { name: 'king', color: color, firstPlay: true, src: `./../assets/pieces/king${abbrevColor}.png` }

            boardObj[line][column + 1].cell.appendChild(imgRook)
            boardObj[line][column + 1].piece = { name: 'rook', color: color, firstPlay: true, src: `./../assets/pieces/rook${abbrevColor}.png` }

        }
        else if (numberSide === 7) {
            boardObj[line][column].cell.appendChild(imgKing)
            boardObj[line][column].piece = { name: 'king', color: color, firstPlay: true, src: `./../assets/pieces/king${abbrevColor}.png` }

            boardObj[line][column - 1].cell.appendChild(imgRook)
            boardObj[line][column - 1].piece = { name: 'rook', color: color, firstPlay: true, src: `./../assets/pieces/rook${abbrevColor}.png` }

        }

        function deletePiece(childrens) {
            for (let i = 0; i < childrens.length; i++) {
                if (childrens[i].tagName.toLowerCase() === 'img') {
                    let img = childrens[i]
                    childrens[i].parentNode.removeChild(childrens[i])
                    return img
                }
            }
        }
        refrash()
    }
}
