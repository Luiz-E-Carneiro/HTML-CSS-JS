var boardObj = [
    // Line 1
    [
        { piece: { name: 'rook', color: 'black', src: "./../assets/images/rookB.png" } },
        { piece: { name: 'knight', color: 'black', src: "./../assets/images/knightB.png" } },
        { piece: { name: 'bishop', color: 'black', src: "./../assets/images/bishopB.png" } },
        { piece: { name: 'king', color: 'black', src: "./../assets/images/kingB.png" } },
        { piece: { name: 'queen', color: 'black', src: "./../assets/images/queenB.png" } },
        { piece: { name: 'bishop', color: 'black', src: "./../assets/images/bishopB.png" } },
        { piece: { name: 'knight', color: 'black', src: "./../assets/images/knightB.png" } },
        { piece: { name: 'rook', color: 'black', src: "./../assets/images/rookB.png" } }
    ],

    // Line 2
    [
        { piece: { name: 'pawn', color: 'black', src: "./../assets/images/pawnB.png" } },
        { piece: { name: 'pawn', color: 'black', src: "./../assets/images/pawnB.png" } },
        { piece: { name: 'pawn', color: 'black', src: "./../assets/images/pawnB.png" } },
        { piece: { name: 'pawn', color: 'black', src: "./../assets/images/pawnB.png" } },
        { piece: { name: 'pawn', color: 'black', src: "./../assets/images/pawnB.png" } },
        { piece: { name: 'pawn', color: 'black', src: "./../assets/images/pawnB.png" } },
        { piece: { name: 'pawn', color: 'black', src: "./../assets/images/pawnB.png" } },
        { piece: { name: 'pawn', color: 'black', src: "./../assets/images/pawnB.png" } }
    ],

    // Line 3 (sem peças)
    [
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false }
    ],

    // Line 4 (sem peças)
    [
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false }
    ],

    // Line 5 (sem peças)
    [
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false }
    ],

    // Line 6 (sem peças)
    [
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false },
        { piece: false }
    ],

    // Line 7
    [
        { piece: { name: 'pawn', color: 'white', src: "./../assets/images/pawnW.png" } },
        { piece: { name: 'pawn', color: 'white', src: "./../assets/images/pawnW.png" } },
        { piece: { name: 'pawn', color: 'white', src: "./../assets/images/pawnW.png" } },
        { piece: { name: 'pawn', color: 'white', src: "./../assets/images/pawnW.png" } },
        { piece: { name: 'pawn', color: 'white', src: "./../assets/images/pawnW.png" } },
        { piece: { name: 'pawn', color: 'white', src: "./../assets/images/pawnW.png" } },
        { piece: { name: 'pawn', color: 'white', src: "./../assets/images/pawnW.png" } },
        { piece: { name: 'pawn', color: 'white', src: "./../assets/images/pawnW.png" } }
    ],

    // Line 8
    [
        { piece: { name: 'rook', color: 'white', src: "./../assets/images/rookW.png" } },
        { piece: { name: 'knight', color: 'white', src: "./../assets/images/knightW.png" } },
        { piece: { name: 'bishop', color: 'white', src: "./../assets/images/bishopW.png" } },
        { piece: { name: 'queen', color: 'white', src: "./../assets/images/queenW.png" } },
        { piece: { name: 'king', color: 'white', src: "./../assets/images/kingW.png" } },
        { piece: { name: 'bishop', color: 'white', src: "./../assets/images/bishopW.png" } },
        { piece: { name: 'knight', color: 'white', src: "./../assets/images/knightW.png" } },
        { piece: { name: 'rook', color: 'white', src: "./../assets/images/rookW.png" } }
    ]
]

const numbersDiv = document.getElementsByClassName('numbers')
const letterDiv = document.getElementsByClassName('letters')
const boardArea = document.getElementById('board')

const realoadBoard = () => {
    boardArea.innerHTML = ''
    var allCells = [];
    for (let i = 0; i < boardObj.length; i++) {
        let color = i % 2 !== 0 ? 'black' : 'white';

        for (let j = 0; j < boardObj[i].length; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            color === 'white' ? cell.classList.add('white') : cell.classList.add('black');
            color === 'white' ? color = 'black' : color = 'white';

            boardObj[i][j].cell = cell;
            boardObj[i][j].column = j;
            boardObj[i][j].line = i;

            allCells.push(cell);
            boardArea.appendChild(cell);
        }
    }

    putPieces()
    createNumbers(allCells);
    createLetters(allCells);
}

const createNumbers = (allCells) => {
    var leftCells = [];
    for (let i = 0; i < allCells.length; i++) {
        if (i % 8 !== 0) continue;
        leftCells.push(allCells[i]);
    }

    var nums = ['8', '7', '6', '5', '4', '3', '2', '1'];
    for (let i = 0; i < leftCells.length; i++) {
        let span = document.createElement('span');
        span.innerText = nums[i];
        span.classList.add('topNumber');
        leftCells[i].appendChild(span);
    }
}

const createLetters = (allCells) => {
    var bottomCells = [];

    for (let i = 8; i > 0; i--) {
        bottomCells.push(allCells[allCells.length - i]);
    }

    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let i = 0; i < bottomCells.length; i++) {
        let span = document.createElement('span');
        span.innerText = letters[i];
        span.classList.add('bottomLetter');
        bottomCells[i].appendChild(span);
    }
}

const putPieces = () => {
    for (let i = 0; i < boardObj.length; i++) {
        var line = boardObj[i]
        line.forEach(obj => {
            if (!obj.piece) return
            let imgPiece = document.createElement('img')
            imgPiece.classList.add('piece')
            imgPiece.src = obj.piece.src
            obj.cell.appendChild(imgPiece)

        });
    }
}

realoadBoard();
