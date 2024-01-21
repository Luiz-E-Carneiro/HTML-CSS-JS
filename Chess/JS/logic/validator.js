// const getPieces = (color) => {
//     const coloredPieces = boardObj.map(line =>
//         line.map(cell => cell.piece && cell.piece.color === color ? cell : null)
//     );
//     const filteredPieces = coloredPieces.flat().filter(cell => cell !== null);
//     return filteredPieces
// };

// const validateCheck = () => {
//     var whitePieces = getPieces('white')
//     var blackPieces = getPieces('black')

//     blockCells(whitePieces, 'white')
//     blockCells(blackPieces, 'black')

//     function blockCells(objs, color) {
//         for (let obj of objs) {
//             switch (obj.piece.name) {
//                 case 'pawn':
//                     blockCellToKing(pawnPath(obj, true), color)
//                     break;
//                 case 'rook':
//                     blockCellToKing(rookPath(obj, true), color)
//                     break;
//                 case 'knight':
//                     blockCellToKing(knightPath(obj, true), color)
//                     break;
//                 case 'bishop':
//                     blockCellToKing(bishopPath(obj, true), color)
//                     break;
//                 case 'queen':
//                     blockCellToKing(queenPath(obj, true), color)
//                     break;
//                 case 'king':
//                     blockCellToKing(kingPath(obj, true), color)
//                     break;

//                 default:
//                     alert('Something went wrong, try again please!')
//                     break;
//             }
//         }
//     }
// }
// const blockCellToKing = (arraysCellToBlock, color) => {
//     arraysCellToBlock.forEach(arrayMain => {
//         arrayMain.forEach(element => {
//             const { line, column } = element
//             if (color === 'white') {
//                 boardObj[line][column].blackKingCannotStay = true
//             } else if (color === 'black') {
//                 boardObj[line][column].whiteKingCannotStay = true
//             }
//         });
//     });
//     var whiteKing
//     var blackKing
//     const getKings = boardObj.map(line =>
//         line.map(cell => cell.piece && cell.piece.name === 'king' ? cell : null)
//     ).flat().filter(cell => cell !== null);
//     getKings.forEach(obj => {
//         if (obj.piece.color === 'white') whiteKing = obj
//         if (obj.piece.color === 'black') blackKing = obj
//     });
//     verificCheck(whiteKing, blackKing)
// }

// const verificCheck = (whiteKing, blackKing) => {

//     if (whiteKing.whiteKingCannotStay) console.log('check on white')
//     if (blackKing.blackKingCannotStay) console.log('check on black')
// }

// const deleteBlocksToKing = () => {
//     boardObj.map(line =>
//         line.map(cell => {
//             if(cell.whiteKingCannotStay) delete cell.whiteKingCannotStay
//             if(cell.blackKingCannotStay) delete cell.blackKingCannotStay
//         })
//     );
// }