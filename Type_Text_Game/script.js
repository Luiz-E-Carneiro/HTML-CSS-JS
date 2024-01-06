const createKeyboard = () => {
    const keysArea = document.getElementById('areaKeyboard')
    var keyboard = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'],
        [',','Z', 'X', 'C', 'V', 'B', 'N', 'M', "." ,'BACKSPACE']
    ]

    keyboard.forEach(array => {
        let lineKeys = document.createElement('div')
        lineKeys.classList.add('lineKeyboard')
        array.forEach(k => {
            let key = document.createElement('button')
            key.classList.add('keyDiv')
            if (k.length === 1){
                key.innerText = k
                if(k === '.' || k === ',') key.classList.add('keyPunctuation')
            }
            else {
                key.innerHTML = `<span class="material-symbols-outlined">backspace</span>`
                key.classList.toggle('keyBackSpace')
            }

            lineKeys.appendChild(key)
        });
        keysArea.appendChild(lineKeys)
    });

}

const getText = async () => {
    var text = ""
    for (let i = 0; i < 5; i++) {
        const res = await fetch("https://api-random.vercel.app/")
        const data = await res.json()
        text = text + " " + data.mensage
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
            if(i === paragraph.length - 1) spanParagraph.appendChild(word)
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
createKeyboard()
getText()



