const movePiece = (newSpot) => {
    //curentObj -- to take out
    //NewSpot -- to go
    let capturedAreas = document.getElementsByClassName('capture-area')
    let capturedWhite = capturedAreas[0]
    let capturedBlack = capturedAreas[1]
    var img
    var captured
    //DELET IMG    
    function deletePiece(childrens, newS) {
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
    deletePiece(currentObj.cell.children, false)
    //DELETE piece from the main OBJ
    const { column, line } = currentObj
    const { name, color } = currentObj.piece
    boardObj[line][column].piece = false
    // ADD IT TO THE NEW CELL
    newSpot.cell.appendChild(img)
    // ADD IN THE MAIN OBJ
    var newColumn = newSpot.column
    var newLine = newSpot.line
    var WB = color === 'white' ? 'W' : 'B'
    boardObj[newLine][newColumn].piece = { name: name, color: color, src: `./../assets/images/${name}${WB}.png` }
}
