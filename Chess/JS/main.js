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