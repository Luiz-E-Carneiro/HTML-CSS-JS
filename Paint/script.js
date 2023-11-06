const canvas = document.querySelector('canvas')
const draws = document.getElementById('draws')
const imagesDraws = []
function myFunction(x) {
    if (x.matches) {

        canvas.style.width = "800px"
        canvas.style.height = "450px"
        canvas.width = "800"
        canvas.height = "450"
    } else {
        canvas.style.width = "1200px"
        canvas.style.height = "675px"
        canvas.width = "1200"
        canvas.height = "675"
    }
}
var x = window.matchMedia("(max-width: 1500px)")
myFunction(x)
x.addListener(myFunction)

const ctx = canvas.getContext('2d')
let size = 50 / 1.5
let color = document.getElementById('selectColor')
let paiting = false
var usingEraser = false

ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineCap = 'round'
ctx.strokeStyle = color.value

var diameter_valueP = document.getElementById('diameter-valueP')
var diameter_valueE = document.getElementById('diameter-valueE')

color.addEventListener('input', function () {
    usingEraser === false ? ctx.strokeStyle = this.value : ctx.strokeStyle = "white"
    diameterPencil.style.backgroundColor = color.value
})

const diameterP = document.getElementById('diameter-pencil')
const diameterE = document.getElementById('diameter-eraser')

const diameterPencil = document.getElementById('diameterPencil')
const diameterEraser = document.getElementById('diameterEraser')

const imgs = document.getElementsByTagName('img')

var allowed = false

for (let img of imgs) {
    img.addEventListener('click', function () {
        for (let img of imgs) {
            img.style.left = "-40%"
        }
        this.style.left = "-20%"
        this.id === "imgPencil" ? size = (diameterP.value) / 1.5 : size = (diameterE.value) / 1.5
        this.id === "imgPencil" ? ctx.strokeStyle = color.value : ctx.strokeStyle = "White"
        this.id === "imgPencil" ? usingEraser = false : usingEraser = true
        allowed = true
        document.addEventListener('mousedown', function () {
            if (allowed) StartPaint()
        })
    })
}
diameterP.addEventListener('input', function () {
    size = (this.value) / 1.5
    this.value != 0 ? diameter_valueP.innerText = this.value : diameter_valueP.innerText = 1

    if (this.value != 0) {
        diameterPencil.style.width = `${(this.value) / 1.5}px`
        diameterPencil.style.height = `${(this.value) / 1.5}px`
    } else {
        diameterPencil.style.width = "1px"
        diameterPencil.style.height = "1px"
    }
})
diameterE.addEventListener('input', function () {
    size = (this.value) / 1.5

    this.value != 0 ? diameter_valueE.innerText = this.value : diameter_valueE.innerText = 1

    if (this.value != 0) {
        diameterEraser.style.width = `${(this.value) / 1.5}px`
        diameterEraser.style.height = `${(this.value) / 1.5}px`
    } else {
        diameterEraser.style.width = "1px"
        diameterEraser.style.height = "1px"
    }
})

function StartPaint() {
    paiting = true
    Paint()
}

function StopPaint() {
    paiting = false
    ctx.beginPath()
}

function Paint(event) {
    if (!paiting) return

    let rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top

    ctx.lineWidth = size
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
}

const Clean = () => {
    let rect = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, rect["width"], rect["height"])
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
const verificDisabled = () => {
    const btnAni = document.getElementById('btnAni')
    if (imagesDraws.length > 1) {
        btnAni.classList.add('btnNotDisabled')
        btnAni.disabled = false
    } else {
        console.log(imagesDraws.length);
        btnAni.classList.remove('btnNotDisabled')
        btnAni.classList.add('btnAniDisabled')
        btnAni.disabled = true
    }
}
verificDisabled()
var i = 0
const SaveDraw = () => {
    i++
    let imgWithouI = canvas.toDataURL('image/png')
    let imgI = `${i}!-!${imgWithouI}`
    imagesDraws.push(imgI)
    verificDisabled()
    draws.innerHTML = ""
    const showImagesOfDraws = () => {
        imagesDraws.forEach(img => {
            let divAct = document.createElement('div')
            divAct.classList.add('divImgAct')

            var imgIn = document.createElement('img')
            var imgURL = img.split('!-!')
            imgIn.setAttribute('src', imgURL[1])

            let iconDelete = document.createElement('span')
            iconDelete.classList.add("material-symbols-outlined")
            iconDelete.innerText = 'delete'

            let iconEdit = document.createElement('span')
            iconEdit.classList.add("material-symbols-outlined")
            iconEdit.innerText = 'edit'

            let icons = document.createElement('div')
            icons.appendChild(iconEdit), icons.appendChild(iconDelete)

            divAct.appendChild(imgIn)

            divAct.appendChild(icons)
            draws.appendChild(divAct)

            iconEdit.addEventListener('click', function () {
                this.innerText === 'edit' ? this.innerText = 'done_outline' : this.innerText = 'edit'
                var lastURL = img
                switch (this.innerText) {
                    case 'done_outline':
                        this.style.backgroundColor = '#2e2'
                        const imgAgain = new Image();

                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        imgAgain.src = imgURL[1];
                        ctx.drawImage(imgAgain, 0, 0, canvas.width, canvas.height)
                        break;
                    case 'edit':
                        let newImg = canvas.toDataURL('image/png')
                        let switchURL = `${i}!-!${newImg}`
                        for (let i = 0; i < imagesDraws.length; i++) {
                            if (imagesDraws[i] === lastURL) {
                                imagesDraws[i] = switchURL
                            }
                        }
                        draws.innerHTML = ""
                        showImagesOfDraws()
                        ctx.fillStyle = "white"
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        break;
                }

            })
            iconDelete.addEventListener('click', function () {
                this.parentNode.parentNode.parentNode.removeChild(divAct)
                for (let i = 0; i < imagesDraws.length; i++) {
                    if (img === imagesDraws[i]) {
                        imagesDraws.splice([i], 1)
                        verificDisabled()
                    }
                }
            })
        })
    };
    showImagesOfDraws()
    console.log(imagesDraws);
}

var backModalFile = document.createElement('div')
backModalFile.classList.add('backModalFile')
var inp = document.createElement('input')
inp.classList.add('inptDraw')
var btnDelete = document.createElement('button')
btnDelete.innerHTML = `<span class="material-symbols-outlined">delete</span><span>Delete Draw</span>`
var btnEdit = document.createElement('button')
btnEdit.innerHTML = `<span class="material-symbols-outlined">edit</span> <span>Edit Draw</span>`
var btnConfirm = document.createElement('button')
btnConfirm.innerHTML = `<span class="material-symbols-outlined">done_outline</span><span>Save as PNG</span>`

let divDraw = document.createElement('div')
divDraw.classList.add('divDraw')

const beforeSaveAsFile = () => {

    backModalFile.innerHTML = ""
    backModalFile.style.display = "flex"
    divDraw.innerHTML = ""

    const body = document.body
    const script = document.querySelector('script')
    body.insertBefore(backModalFile, script)

    const modal = document.createElement('div')
    modal.classList.add('modal')
    backModalFile.appendChild(modal)

    let h2 = document.createElement('h2')
    h2.innerText = "Name your draw:"

    let divBtns = document.createElement('div')
    divBtns.classList.add('divBtns')

    const canvasDataUrl = canvas.toDataURL('image/png');
    let imgDraw = document.createElement('img')
    imgDraw.setAttribute('src', canvasDataUrl)
    divDraw.appendChild(imgDraw)
    backModalFile.appendChild(divDraw)

    divBtns.appendChild(btnConfirm), divBtns.appendChild(btnEdit), divBtns.appendChild(btnDelete)
    modal.appendChild(h2), modal.appendChild(inp), modal.appendChild(divBtns)
}
const saveAsFile = () => {
    const canvasDataUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = canvasDataUrl;
    downloadLink.download = inp.value;
    downloadLink.click();
}
const goBackToDraw = () => {
    backModalFile.style.display = "none"
}

const deleteDraw = () => {
    backModalFile.style.display = "none"
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    verificDisabled()
}

const animation = () => {
    const body = document.body
    const script = document.querySelector('script')
    function startingAnimation() {
        var backModalAnimation = document.createElement('div')
        body.insertBefore(backModalAnimation, script)
        backModalAnimation.classList.add('backModalAnimation')
        backModalAnimation.style = 'flex'
        backModalAnimation.innerHTML = ""
        let spanNormal = document.createElement('span')
        spanNormal.innerText = "Animation Starting in "
        let spanCount = document.createElement('span')
        spanCount.innerText = 3
        let divSpans = document.createElement('div')
        divSpans.classList.add('divSpans')

        divSpans.appendChild(spanNormal)
        spanNormal.appendChild(spanCount)
        backModalAnimation.appendChild(divSpans)

        let goodImages = []
        for (let i = 0; i < imagesDraws.length; i++) {
            let getImg = imagesDraws[i]
            let separetor = getImg.split('!-!')

            goodImages.push(separetor[1])
        }
        let imgDraw = document.createElement('img')
        imgDraw.setAttribute('src', goodImages[0])

        let divActions = document.createElement('div')
        divActions.classList.add('divActions')
        let buttonExit = document.createElement('button')
        buttonExit.innerHTML = `<span class="material-symbols-outlined">logout</span>`
        let buttonReset = document.createElement('button')
        buttonReset.innerHTML = `<span class="material-symbols-outlined">replay</span>`

        divActions.appendChild(buttonReset)
        divActions.appendChild(buttonExit)

        backModalAnimation.appendChild(imgDraw)
        backModalAnimation.appendChild(divActions)
        var count = 0
        const countingTime = setInterval(() => {
            if (spanCount.innerText > 1) spanCount.innerText--
            else {
                clearInterval(countingTime);
                const animationInterval = setInterval(() => {
                    const text = spanNormal.innerText;
                    if (text.length > 9) {
                        spanNormal.innerText = text.substring(0, text.length - 1);
                    } else {
                        clearInterval(animationInterval);
                        const showingImages = setInterval(() => {
                            if (count < goodImages.length - 1) {
                                count++
                                imgDraw.setAttribute('src', goodImages[count])
                            } else {
                                clearInterval(showingImages)
                                imgDraw.setAttribute('src', goodImages[goodImages.length - 1])
                            }
                        }, 500);
                    }
                }, 20);
            }

        }, 1000);

        buttonExit.addEventListener('click', function () { backModalAnimation.style.display = 'none' })
        buttonReset.addEventListener('click', function () {
            backModalAnimation.parentNode.removeChild(backModalAnimation)
            startingAnimation()
        })

    }
    startingAnimation()
}



btnConfirm.addEventListener('click', saveAsFile)
btnDelete.addEventListener('click', deleteDraw)
btnEdit.addEventListener('click', goBackToDraw)

document.addEventListener('mouseup', StopPaint)
document.addEventListener('mousemove', Paint)