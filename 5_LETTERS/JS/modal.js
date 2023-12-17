const modal = (win, currentWord) => {
    
    var backModal = document.createElement('div')
    backModal.classList.add('backModal')

    var modal = document.createElement('div')
    modal.classList.add('modal')
    
    //Title
    var h2 = document.createElement('h2')
    h2.classList.add('text')
    //Showing the Right Word
    var h1 = document.createElement('h1')
    h1.innerText = currentWord
    // Button to Restart
    var btn = document.createElement('button')
    btn.classList.add('btn-reset')
    btn.innerHTML = `<p>Play Again</p><span class="material-symbols-outlined">rotate_left</span>`
    //Add Event to the Button
    btn.addEventListener('click', function(){
        resetGame()
        backModal.remove()
    })
    
    if(win){
        h2.innerText = "Congrats! You guessed the right word!"
        h1.classList.add('rightWord')
    }
    else{
        h2.innerText = "Almost there... The right word was:"    
        h1.classList.add('almostRightWord')
    }
    
    //Adding
    modal.appendChild(h2)
    modal.appendChild(h1)
    modal.appendChild(btn)
    backModal.appendChild(modal)
    
    var targetSript = document.querySelector('script[src="./JS/make_board.js"]')
    targetSript.parentNode.insertBefore(backModal, targetSript)
}
