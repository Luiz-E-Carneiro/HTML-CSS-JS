document.addEventListener('keydown', function (e) {
    var key = e.key.toUpperCase()
})


const createText = async() => {
    const textArea = document.getElementById('textArea')
    var text = ""
    for (let i = 0; i < 7; i++) {
        const res = await fetch("https://api-random.vercel.app/")
        const data = await res.json()
        text = text + " " + data.mensage
    }
    var spanText = document.createElement('span')
    spanText.classList.add('spanText')
    spanText.innerText = text
    textArea.appendChild(spanText)

}

createText()

const createKeyboard = () => {
    const keysArea = document.getElementById('areaKeyboard')
    var keyboard = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', `<span class="material-symbols-outlined">backspace</span>`],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
    ]

    keyboard.forEach(array => {
        let lineKeys = document.createElement('div')
        lineKeys.classList.add('lineKeyboard')
        array.forEach(k => {
            let key = document.createElement('button')
            key.classList.add('keyDiv')

            if (k.length === 1) key.innerText = k
            else {
                key.innerHTML = k
                if (key.innerText == 'ENTER') key.classList.toggle('keyEnter')
            }

            lineKeys.appendChild(key)
        });
        keysArea.appendChild(lineKeys)
    });

}
createKeyboard()