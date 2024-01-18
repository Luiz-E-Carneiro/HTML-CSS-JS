const movePiece = (newSpot) => {
    //curentObj -- to take out
    //NewSpot -- to go
    let capturedAreas = document.getElementsByClassName('capture-area')
    let capturedWhite = capturedAreas[0]
    let capturedBlack = capturedAreas[1]
    var img
    //DELET IMG    
    function deletePiece(childrens, newS = false) {
        for (let i = 0; i < childrens.length; i++) {
            if (childrens[i].tagName.toLowerCase() === 'img') {
                img = childrens[i]
                childrens[i].parentNode.removeChild(childrens[i])
                if (newS) {
                    let imgConteiner = document.createElement('div')
                    imgConteiner.classList.add('image-container')
                    imgConteiner.appendChild(img)
                    newSpot.piece.color === 'white' ? capturedWhite.appendChild(imgConteiner) : capturedBlack.appendChild(imgConteiner)

                }
            }
        }
    }
    //It has to be in thus order of deletting pieces
    deletePiece(newSpot.cell.children, true)
    deletePiece(currentObj.cell.children)
    //DELETE piece from the main OBJ
    const { column, line } = {...currentObj}
    const { name, color } = currentObj.piece
    // ADD IT TO THE NEW CELL
    newSpot.cell.appendChild(img)
    // ADD IN THE MAIN OBJ
    var newColumn = newSpot.column
    var newLine = newSpot.line
    var WB = color === 'white' ? 'W' : 'B'
        // Piece Check
    if(currentObj.piece.name === 'pawn' && currentObj.piece.firstPlay === false){
        boardObj[newLine][newColumn].piece = { name: name, color: color, firstPlay:true , src: `./../assets/pieces/${name}${WB}.png` }
    }else if(currentObj.piece.name === 'pawn'){
        boardObj[newLine][newColumn].piece = { name: name, color: color, firstPlay: true, src: `./../assets/pieces/${name}${WB}.png` }
        if(newLine === 0 || newLine === 7 ) promotePawn(boardObj[newLine][newColumn])
    }else{
        boardObj[newLine][newColumn].piece = { name: name, color: color, src: `./../assets/pieces/${name}${WB}.png` }
    }
    boardObj[line][column].piece = false
}
