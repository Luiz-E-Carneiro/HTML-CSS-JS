var objCheck = []
var booleanCheck = false
const verificCheck = () => {
    if (!booleanCheck) return

    var kingObj = objCheck[0].objKing

    if (objCheck.length > 1) {
        alert("KING MUST MOVE, or it's the end!!!")
    } else {
        console.log(objCheck);
    }

}

var cellsBlocked = {
    black: [],
    white: []
}

const blockCellsToKing = (cellsArray, piece) => {
    var color = piece.color

    if (piece.name === 'pawn' || piece.name === 'knight') {
        cellsArray.forEach(objSpot => {
            if (color === 'white') {
                objSpot.blackKingCannotStay = true
                cellsBlocked.white.push(objSpot)
            }
            else if (color === 'black') {
                objSpot.whiteKingCannotStay = true
                cellsBlocked.black.push(objSpot)
            }

            if (objSpot.piece.name === 'king' && objSpot.piece.color !== color) {
                alert('king in target')
                objCheck.push({ piece: piece, cellsUntilKing: objSpot, objKing: objSpot })
                booleanCheck = true
            }
        });
    } else {

        cellsArray.forEach(direction => {
            direction.forEach(objSpot => {

                if (color === 'white') {
                    objSpot.blackKingCannotStay = true
                    cellsBlocked.white.push(objSpot)
                }
                else if (color === 'black') {
                    objSpot.whiteKingCannotStay = true
                    cellsBlocked.black.push(objSpot)
                }

                if (objSpot.piece.name === 'king' && objSpot.piece.color !== color) {
                    alert('king in target')
                    objCheck.push({ piece: piece, cellsUntilKing: direction, objKing: objSpot })
                    booleanCheck = true
                }
            });
        });
    }

}

const resetBlockedCells = () => {

    cellsBlocked = {
        black: [],
        white: []
    }
}

const blockVerticalHorizontal = (line, column, color, directions, piece) => {
    let left = []
    let right = []
    let up = []
    let down = []

    for (let i = 0; i < directions.length; i++) {
        let j = 1;
        let stopBoardCondition = false
        let stopConditionPiece = false
        while (!stopBoardCondition) {
            let cell = '';
            switch (directions[i]) {
                case 'left':
                    if (column - j >= 0) {
                        cell = boardObj[line][column - j];
                        kingCantStay.left.push(cell)
                        stopBoardCondition = column - j === 0;
                    } else stopBoardCondition = true
                    break;

                case 'right':
                    if (column + j <= 7) {
                        cell = boardObj[line][column + j];
                        kingCantStay.right.push(cell)
                        stopBoardCondition = column + j === 7;
                    } else stopBoardCondition = true
                    break;

                case 'up':
                    if (line - j >= 0) {
                        cell = boardObj[line - j][column];
                        kingCantStay.up.push(cell)
                        stopBoardCondition = line - j === 0;
                    } else stopBoardCondition = true
                    break;

                case 'down':
                    if (line + j <= 7) {
                        cell = boardObj[line + j][column];
                        kingCantStay.down.push(cell)
                        stopBoardCondition = line + j === 7;
                    } else stopBoardCondition = true
                    break;

                default:
                    alert('Something went wrong, try agin please. . .')
                    return;
            }

            if (!stopConditionPiece && cell && !cell.piece) toBlock.push(cell)
            else if (!stopConditionPiece && cell && cell.piece) {
                toBlock.push(cell)
                stopBoardCondition = true
            }
            else stopBoardCondition = true
            j++;
        }
    }

    blockCellsToKing([right, left, up, down], piece)
}
const blockDiagonals = (line, column, color, directions, piece) => {

    let topLeft = []
    let topRight = []
    let bottomLeft = []
    let bottomRight = []

    for (let direc of directions) {
        let j = 1;
        let stopBoardCondition = false
        let stopConditionPiece = false
        while (!stopBoardCondition) {
            let cell = '';
            switch (direc) {
                case 'topLeft':
                    if (line - j >= 0 && column - j >= 0) {
                        cell = boardObj[line - j][column - j];
                        stopBoardCondition = column - j === 0 || line - j === 0;
                    } else stopBoardCondition = true
                    break;

                case 'topRight':
                    if (line - j >= 0 && column + j <= 7) {
                        cell = boardObj[line - j][column + j];
                        stopBoardCondition = column + j === 7 || line - j === 0;
                    } else stopBoardCondition = true
                    break;

                case 'bottomLeft':
                    if (line + j <= 7 && column - j >= 0) {
                        cell = boardObj[line + j][column - j];
                        stopBoardCondition = line + j === 7 || column - j === 0;
                    } else stopBoardCondition = true
                    break;

                case 'bottomRight':
                    if (line + j <= 7 && column + j <= 7) {
                        cell = boardObj[line + j][column + j];
                        stopBoardCondition = line + j === 7 || column + j === 7;
                    } else stopBoardCondition = true
                    break;

                default:
                    alert('something went wrong, try again please...');
                    return;
            }

            if (!stopConditionPiece && cell && !cell.piece) toBlock.push(cell)
            else if (!stopConditionPiece && cell && cell.piece) {
                toBlock.push(cell)
                stopBoardCondition = true
            }
            else stopBoardCondition = true
            j++;
        }
    }

    blockCellsToKing([topRight, topLeft, bottomLeft, bottomRight], piece);
}


const getPieces = (color) => {
    const coloredPieces = boardObj.map(line =>
        line.map(cell => cell.piece && cell.piece.color === color ? cell : null)
    );
    const filteredPieces = coloredPieces.flat().filter(cell => cell !== null);
    return filteredPieces
};

const validateCheck = () => {
    var whitePieces = getPieces('white')
    var blackPieces = getPieces('black')

    blockCells(whitePieces, 'white')
    blockCells(blackPieces, 'black')

    function blockCells(objs) {
        for (let obj of objs) {
            switch (obj.piece.name) {
                case 'pawn':
                    pawnBlock(obj)
                    break;
                case 'rook':
                    rookBlock(obj)
                    break;
                case 'knight':
                    knightBlock(obj)
                    break;
                case 'bishop':
                    bishopBlock(obj)
                    break;
                case 'queen':
                    queenBlock(obj)
                    break;
                case 'king':
                    kingBlock(obj)
                    break;

                default:
                    alert('Something went wrong, try again please!')
                    break;
            }
        }
    }
}
//----------------------------------------------------------------------------------

const pawnBlock = (divObj) => {
    const { line, column, piece } = divObj;
    var color = piece.color
    var x
    color === 'white' ? x = 1 : x = -1
    var spots = []

    let getRight = true;
    let getLeft = true;

    if (column === 0 || column === 7) {
        getLeft = column === 0 ? false : getLeft;
        getRight = column === 7 ? false : getRight;
    }
    const checkAndPushCapture = (targetColumn) => {
        var diagonalCell = boardObj[line - (1 * x)][targetColumn];
        spots.push(diagonalCell)
    };
    if (!getLeft) {
        checkAndPushCapture(column + 1);
    } else if (!getRight) {
        checkAndPushCapture(column - 1);
    } else {
        checkAndPushCapture(column - 1);
        checkAndPushCapture(column + 1);
    }
    blockCellsToKing(spots, piece)
}

const rookBlock = (divObj) => {
    const { line, column, piece } = divObj;
    var color = piece.color

    blockVerticalHorizontal(line, column, color, ['left', 'right', 'up', 'down'], piece)
}

const knightBlock = (divObj, validator = false) => {
    const { line, column, piece } = divObj;
    var color = piece.color
    var spots = []
    function addMove(row, col) {
        var cell = boardObj[row][col]
        if (cell) spots.push(cell)
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
    blockCellsToKing(spots, piece)
}

const bishopBlock = (divObj) => {
    const { line, column, piece } = divObj;
    var color = piece.color

    blockDiagonals(line, column, color, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'], piece)
}

const kingBlock = (divObj) => {
    const { line, column, piece } = divObj;
    var color = piece.color
    var spots = []
    let directions = [[0, 1], [1, 0], [1, 1]]

    for (let d of directions) {
        for (let i = 0; i < d.length; i++) {
            if (line + d[0] <= 7 && column + d[1] <= 7) addMove(line + d[0], column + d[1])
            if (line + d[0] <= 7 && column - d[1] >= 0) addMove(line + d[0], column - d[1])
            if (line - d[0] >= 0 && column + d[1] <= 7) addMove(line - d[0], column + d[1])
            if (line - d[0] >= 0 && column - d[1] >= 0) addMove(line - d[0], column - d[1])
        }
    }
    function addMove(row, col) {
        var cell = boardObj[row][col]
        if (cell) spots.push(cell)
    }
    blockCellsToKing(spots, piece)
}

const queenBlock = (divObj) => {
    const { line, column, piece } = divObj
    var color = piece.color

    blockVerticalHorizontal(line, column, color, ['left', 'right', 'up', 'down'], piece)
    blockDiagonals(line, column, color, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'], piece)
}
