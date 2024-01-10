const getText = async () => {
    var text = ""
    const res = await fetch("https://type.fit/api/quotes")
    const data = await res.json()

    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    for (let i = 0; i < 5; i++) {
        var rand = Math.floor(Math.random() * numbers.length)
        numbers.splice(rand, 1)
        text = text + " " + data[rand].text
    }
    var arrayParagaph = []
    for (let i = 1; i < text.length; i++) {
        var letter = text[i];
        arrayParagaph.push(letter)
    }
    ready(arrayParagaph)

}

const ready = (array) => {
    var paragraph = array
    const textArea = document.getElementById('textArea')

    var spanParagraph = document.createElement('span')
    spanParagraph.classList.add('spanText')                     //<--CHANGE CLASS NAME

    var word = document.createElement('span')
    word.classList.add('word')

    for (let i = 0; i < paragraph.length; i++) {
        let spanLetter = document.createElement('span')
        spanLetter.classList.add('spanLetter')
        if (paragraph[i] != " ") {
            spanLetter.innerText = paragraph[i]
            word.appendChild(spanLetter)
            if (i === paragraph.length - 1) spanParagraph.appendChild(word)
        } else {
            spanLetter.innerHTML = '&nbsp;'
            word.appendChild(spanLetter)
            spanParagraph.appendChild(word)
            word = document.createElement('span')
            word.classList.add('word')
        }
        textArea.appendChild(spanParagraph)
    }
    startGame()
}

var btn = document.getElementById('restetBtn')
btn.addEventListener('click', function () {
    timer(true)
    getText()
    const textArea = document.getElementById('textArea')
    textArea.innerHTML = ""
    index = 0
    started = false
})
getText()


// This is the code to create a keyboard to let a smarphone play as well, but I won't implement it for the moment
// const createKeyboard = () => {
//     const keysArea = document.getElementById('areaKeyboard')
//     var keyboard = [
//         ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
//         ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'],
//         [',', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ".", 'Backspace'],
//         ['Space']
//     ]

//     keyboard.forEach(array => {
//         let lineKeys = document.createElement('div')
//         lineKeys.classList.add('lineKeyboard')
//         array.forEach(k => {
//             let key = document.createElement('button')
//             key.classList.add('keyDiv')
//             if (k.length === 1) {
//                 key.innerText = k
//                 if (k === '.' || k === ',') key.classList.add('keyPunctuation')
//             }
//             else if (k === 'Backspace') {
//                 key.innerHTML = `<span class="material-symbols-outlined">backspace</span>`
//                 key.classList.toggle('keyBackSpace')
//             } else {
//                 key.classList.toggle('keySpace')
//             }

//             lineKeys.appendChild(key)
//         });
//         keysArea.appendChild(lineKeys)
//     });

// }

// createKeyboard()
