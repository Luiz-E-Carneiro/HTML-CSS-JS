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
let cellsWithPieces = separatePieces(boardObj);

const pieces = document.getElementsByClassName('piece')

for (let p of pieces) {
    p.addEventListener('click', () => addHelpPath(p))
}

var helperCells = []

const pawnPath = (object) => {
    const { line, column, piece } = object;
    var x
    piece.color === 'white' ? x = 1 : x = -1

    let adjacent = boardObj[line - (1 * x)][column]
    let nextCell = boardObj[line - (2 * x)][column]

    if (helperCells.length > 0) {
        helperCells[1].forEach(div => {
            div.parentNode.removeChild(div)
        });
        if(helperCells[0][0] === adjacent && helperCells[0][1] === nextCell ) {
            helperCells = []
        }else{
            helperCells = []
            var cellsToPaint = [adjacent, nextCell]
            helperCells.push(cellsToPaint)
            paintPath(cellsToPaint)
        }
    } else {
        var cellsToPaint = [adjacent, nextCell]
        helperCells.push(cellsToPaint)
        paintPath(cellsToPaint)
    }
    console.log(helperCells);
}

const paintPath = (cells) => {
    var arrayHelp = []
    cells.forEach(c => {
        var help = document.createElement('div')
        arrayHelp.push(help)
        c.piece ? help.classList.add('ring') : help.classList.add('ball')
        c.cell.appendChild(help)
        c.cell.classList.add('path')
    });
    helperCells.push(arrayHelp)
}


const addHelpPath = (p) => {
    var parent = p.parentNode
    cellsWithPieces.allCellsPiece.forEach(c => {
        if (parent === c.cell) {
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
        }
    });
}

