var helpersDots = []
var possiblePlays = []
var currentObj = ''

boardObj.forEach(line => {
    line.forEach(obj => {
        let cell = obj.cell
        cell.addEventListener('click', function () {
            if (obj.possibleMove) {
                movePiece(obj)
                cleanHelpers()
                letPlayable(true)
            } else {
                if (currentObj === obj) {
                    cleanHelpers()
                    currentObj = ''
                }
                else {
                    currentObj = {...obj}
                    verificCell(currentObj)

                }
            }
        })
    });
});

const verificCell = (divObj) => {
    cleanHelpers()
    letPlayable(true)
    let { cell, piece } = {...divObj} //AQUI N APARECE NADA, ESSE É O ÚNICO PROBLEMA
    console.log(piece.name);
    var img = false

    let elementosFilhos = cell.children;
    for (let i = 0; i < elementosFilhos.length; i++) {
        if (elementosFilhos[i].tagName.toLowerCase() === 'img') {
            img = true
        }
    }
    console.log(img);
    if (img) verificPieceToPath(divObj, piece)

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
    else return

    let getRight = true;
    let getLeft = true;

    if (column === 0 || column === 7) {
        getLeft = column === 0 ? false : getLeft;
        getRight = column === 7 ? false : getRight;
    }
    const checkAndPushCapture = (targetColumn) => {
        const diagonalCell = boardObj[line - (1 * x)][targetColumn];
        console.log(diagonalCell.piece);

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

const paintPath = (moves, captures) => {
    moves.forEach(c => {
        var help = document.createElement('div')
        helpersDots.push(help)
        c.cell.appendChild(help)
        help.classList.add('ball')
        c.cell.classList.add('path')
    })
    if (captures.length > 0) {
        captures.forEach(c => {
            var help = document.createElement('div')
            helpersDots.push(help)
            help.classList.add('ring')
            c.cell.appendChild(help)
            c.cell.classList.add('path')
        });
    }
    possiblePlays.push(moves, captures)
    letPlayable()
}

const cleanHelpers = () => {
    helpersDots.forEach(div => {
        div.parentNode.removeChild(div)
    });
    helpersDots = []
}

const letPlayable = (exclue = false) => {
    possiblePlays.forEach(arrayDivs => {
        arrayDivs.forEach(c => {
            let { column, line } = c
            if (exclue) {
                delete boardObj[line][column].possibleMove
            } else {
                let { column, line } = c
                boardObj[line][column].possibleMove = true
            }
        });
    });
}

const movePiece = (newSpot) => {
    //curentObj -- to get out
    //NewSpot -- to go
    var img
    //DELET IMG
    let elementosFilhos = currentObj.cell.children;
    for (let i = 0; i < elementosFilhos.length; i++) {
        if (elementosFilhos[i].tagName.toLowerCase() === 'img') {
            img = elementosFilhos[i]
            elementosFilhos[i].parentNode.removeChild(elementosFilhos[i])
        }
    }
    //DELETE piece from the main OBJ
    const { column, line } = currentObj
    const { name, color } = currentObj.piece
    console.log(name);
    boardObj[line][column].piece = false
    // ADD IT TO THE NEW CELL
    newSpot.cell.appendChild(img)
    // ADD IN THE MAIN OBJ
    var newColumn = newSpot.column
    var newLine = newSpot.line
    var WB = color === 'white' ? 'W' : 'B'
    boardObj[newLine][newColumn].piece = { piece: { name: name, color: color, src: `./../assets/images/${name}${WB}.png` } }
}

const verificPieceToPath = (divObj, piece) => {

    console.log(piece.name);
    switch (piece.name) {
        case 'pawn':
            pawnPath(divObj)
            break;
        case 'rook':

            break;
        case 'knight':

            break;
        case 'bishop':

            break;
        case 'queen':

            break;
        case 'king':

            break;

        default:
            alert('Something went wrong, try again please!')
            break;
    }
}
