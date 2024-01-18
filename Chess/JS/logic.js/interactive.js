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
    console.log(helpersDots);
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
