var helpersDots = []

boardObj.forEach(line => {
    line.forEach(obj => {
        let cell = obj.cell
        cell.addEventListener('click', function () {
            if(!verificCell(obj)){} //celanHelpers() 
        })
    });
});

const verificCell = (currentObj) => {
    let { cell, piece } = currentObj

    let elementosFilhos = cell.children;
    for (let i = 0; i < elementosFilhos.length; i++) {
        if (elementosFilhos[i].tagName.toLowerCase() === 'img') {
            verificPieceToPath(currentObj, piece)
            return true
        }else {
            return false
        }
    }
    
}

const pawnPath = (currentObj) => {
    const { line, column, color } = currentObj;
    var x
    color === 'white' ? x = 1 : x = -1

    var moves = []
    var captures = []
    let inFront = boardObj[line - (1 * x)][column]
    let nextFront
    if (line != 1 && line != 6) {
        nextFront = boardObj[line - (2 * x)][column]
    }
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
        if (diagonalCell.piece && diagonalCell.piece.color !== color) {
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
}

const verificPieceToPath = (currentObj, piece) => {
    switch (piece.name) {
        case 'pawn':
            pawnPath(currentObj)
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
