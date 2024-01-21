const verifiPlayerTime = (color) => {
    if (color === 'white' && player === 'Player1') {
        return true
    }
    else if (color === 'black' && player === 'Player2') {
        return true
    }
    else {
        return false
    }
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

const refrash = () => {
    cleanHelpers()
    letPlayable(true)
    cancelCastle()
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
                possiblePlays = []
            } else {
                boardObj[line][column].possibleMove = true
            }
        });
    });
}

const cancelCastle = () => {
    boardObj.forEach(line => {
        line.forEach(obj => {
            if(obj.castle) delete obj.castle
        });
    });
    possibleCastle = {left: null, right: null }
}


var blackChoose = document.getElementById('promoteBlackArea')
var whiteChoose = document.getElementById('promoteWhiteArea')
const promotePawn = (cellObj) => {
    var color = cellObj.piece.color
    blackChoose.innerHTML = ''
    whiteChoose.innerHTML = ''
    var letter = color === 'white' ? 'W' : 'B'
    var pieces = [
        `./../../assets/pieces/knight${letter}.png`,
        `./../../assets/pieces/bishop${letter}.png`,
        `./../../assets/pieces/rook${letter}.png`,
        `./../../assets/pieces/queen${letter}.png`,
    ]
    var names = ['knight', 'bishop', 'rook', 'queen']
    for (let i = 0; i < 4; i++) {
        let backImg = document.createElement('div')
        backImg.classList.add('backImg')
        let img = document.createElement('img')
        img.src = pieces[i]
        backImg.appendChild(img)
        if (color === 'white') {
            whiteChoose.style.visibility = 'visible'
            whiteChoose.appendChild(backImg)
        } else {
            blackChoose.style.visibility = 'visible'
            blackChoose.appendChild(backImg)
        }
        backImg.addEventListener('click', function (color) {

            let childrens = cellObj.cell.children
            for (let j = 0; j < childrens.length; j++) {
                if (childrens[j].tagName.toLowerCase() === 'img') {
                    childrens[j].src = pieces[i]
                    cellObj.piece.name = names[i]
                    cellObj.piece.src = pieces[i]
                }
            }
            setTimeout(() => {
                this.parentNode.style.visibility = 'hidden'
            }, 150);
        })
    }
}
