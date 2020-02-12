const d = document
let lives
let level

function introduction(){
    const b = d.getElementsByTagName('body')[0]
    let container = d.createElement('div')
    let secondh1 = d.createElement('div')
    let thirdh1 = d.createElement('div')
    container.setAttribute('id', 'container')
    container.setAttribute('class', 'visToggle')
    container.innerHTML = `<h1>In an abandoned castle are unfathomable treasures...</h1>`
    secondh1.innerHTML = `<h1>Unfortunately, there are five strange magical runes that seal the door to it.</h1>`
    thirdh1.innerHTML = `<h1>You've been hired as an expert on decrypting runes. You've created a method to decrypt runes based on two numerical qualities they are related to.</h1>`
    b.appendChild(container)
    setTimeout(() =>{
        container.appendChild(secondh1)
        secondh1.setAttribute('class','visToggle')
    }, 2000)
    setTimeout(() =>{
        container.appendChild(thirdh1)
        thirdh1.setAttribute('class','visToggle')
    }, 5000)
    setTimeout(() =>{
        let cont = continueButton()
        let centered = d.createElement('center')
        cont.setAttribute('id', 'contButton')
        cont.setAttribute('class', 'visToggle')
        container.appendChild(centered)
        centered.appendChild(cont)
        cont.focus()
        d.addEventListener('click', () => focusButton(cont))
        level = 1
        lives = 3
    }, 7000)
}

function focusButton(button){
    button.focus()
}

function continueButton(){
    let contButton = d.createElement('button')
    contButton.appendChild(d.createTextNode('Continue . . .'))
    contButton.addEventListener('click', (e) => {
        e.preventDefault()
        let code = generateCode(level)
        displayChallenge(code)
    })
    return contButton
}

function generateCode(levelNum){
    let CodeA, CodeB, CodeC
    CodeA = Math.round(Math.random() * (100) % (levelNum * 2)) + levelNum
    CodeB = Math.round(Math.random() * (100) % (levelNum * 2)) + levelNum
    CodeC = Math.round(Math.random() * (100) % (levelNum * 2)) + levelNum
    return code = {
        codeA: CodeA,
        codeB: CodeB,
        codeC: CodeC,
        codeSum: CodeA + CodeB + CodeC,
        codeProduct: CodeA * CodeB* CodeC
    }
}

function populateInfo(){
    let info = d.getElementById('info')
    info.setAttribute('class', '')
    let levelCount = d.getElementById('level')
    displayLives()
    levelCount.textContent = level
}

function displayChallenge(code = {}){
    populateInfo()
    let container = d.getElementById('container')
    container.innerHTML = `<h1>There are three numbers in the code.</h1>
    <h1>The codes add up to ${code.codeSum}.</h1>
    <h1>The codes multiply to ${code.codeProduct}</h1>
    <h1>What are the three numbers?</h1>`

    let answers = `
    <center><form id='userGuess'>
        <input type='number' name='code1' class="codeField">
        <input type='number' name='code2' class="codeField">
        <input type='number' name='code3' class="codeField">
        <br><br>
        <input type='submit' value='Test Runes' id="submit">
    </form></center>`

    container.innerHTML += answers
    let form = d.getElementById('userGuess')
    form.addEventListener("submit", e => {
        checkGuess(e, code)
    })
    
}

function checkGuess(event, code){
    event.preventDefault()
    let code1 = parseInt(d.getElementsByName('code1')[0].value)
    let code2 = parseInt(d.getElementsByName('code2')[0].value)
    let code3 = parseInt(d.getElementsByName('code3')[0].value)

    let guessSum = code1 + code2 + code3
    let guessProduct = code1 * code2 * code3
    if (guessSum === code.codeSum && guessProduct === code.codeProduct){
        displaySuccess()
    } else {
        displayFailure()
    }
}

function displaySuccess(){
    let messageDiv = d.getElementById('messageDiv')
    if (level !== 5){
        messageDiv.innerHTML = `<h3>That seemed to work! The rune has faded. On to the next rune!</h3>`
        messageDiv.setAttribute('class', '')
        setTimeout(() => messageDiv.setAttribute('class', 'hidden'), 3000)
        level += 1
        let code = generateCode(level)
        displayChallenge(code)
    } else {
        messageDiv.innerHTML = `<h3>The final rune has faded away!</h3>`
        messageDiv.setAttribute('class', '')
        setTimeout(() => messageDiv.setAttribute('class', 'hidden'), 3000)
        winScreen()
    }
}

function displayFailure(){
    let messageDiv = d.getElementById('messageDiv')
    let info = d.getElementById('info')
    info.setAttribute('class', 'lossLife')
    lives -= 1
    if (lives === 0){
        lossScreen()
    } else{
        messageDiv.innerHTML = `<h3>That didn't seem to work! Your error caused the rune to shift, changing the combination!</h3>`
        messageDiv.setAttribute('class', '')
        setTimeout(() => messageDiv.setAttribute('class', 'hidden'), 3000)
        let code = generateCode(level)
        displayChallenge(code)
    }
}

function lossScreen() {
    let info = d.getElementById('info')
    info.setAttribute('class', 'hidden')
    let container = d.getElementById('container')
    container.innerHTML = `<h1>It seems your errors have caused the runes to seal forever, and you can no longer break them.</h1>`
    let retry = d.createElement('button')
    retry.setAttribute('id', 'playAgain')
    retry.appendChild(d.createTextNode('Try Again?'))
    retry.addEventListener('click', () =>{
        container.innerHTML = ""
        let messageDiv = d.getElementById('messageDiv')
        messageDiv.textContent = ""
        introduction()
    })
    let centered = d.createElement('center')
    container.appendChild(centered)
    centered.appendChild(retry)
    retry.focus()
}

function winScreen(){
    let container = d.getElementById('container')
    container.innerHTML = `<h2>You've solved the final rune and the door opens! Inside is a large treasure chest filled with gold.</h2>
    <h2>You can take as much as you like!</h2>`
    let retry = d.createElement('button')
    retry.setAttribute('id','playAgain')
    retry.appendChild(d.createTextNode('Play Again?'))
    retry.addEventListener('click', () =>{
        container.innerHTML = ""
        let messageDiv = d.getElementById('messageDiv')
        messageDiv.textContent = ""
        introduction()
    })
    let centered = d.createElement('center')
    container.appendChild(centered)
    centered.appendChild(retry)
    retry.focus()
}

function displayLives(){
    let lifeCount = d.getElementById('lives')
    lifeCount.innerHTML = ""
    for(let i = 0; i < lives; i++){
        lifeCount.innerHTML += "&#10084;"
    }
}

d.addEventListener("DOMContentLoaded", () =>{
    introduction()
})