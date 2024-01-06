var keyboard = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç',
    ',','Z', 'X', 'C', 'V', 'B', 'N', 'M', '-', ' '
    ]


var letters = document.getElementsByClassName('spanLetter')

const startGame = () => {
    letters[0].classList.add('selectedLetter')
}

var index = 0
const passLetter = () => {
    letters[index - 1].classList.remove('selectedLetter')
    letters[index - 1].classList.add('correctLetter')
    
    letters[index].classList.add('selectedLetter')
}

document.addEventListener('keydown', function (e) {
    var key = e.key.toUpperCase()

    if(keyboard.includes(key)){
        index++
        passLetter()
    }
    
})
