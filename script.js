const buttons = document.querySelectorAll(".btn")
const items = document.querySelectorAll(".item")
const currentTurn = document.querySelector("#current-turn")

const caption = document.querySelector(".caption")


const playerX = {
    symbol: "X",
    chosen: []
}

const playerO = {
    symbol: "O",
    chosen: []
}

let currentPlayer = playerX

const winningCombos = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

buttons.forEach((button) => {
    button.onclick = (e) => {
        turn(currentPlayer, button)
    }
})

function turn(player, button) {
    // add currentPlayer.symbol to item (parent of the button)
    button.parentElement.textContent = player.symbol
    // making the same item being usable only once
    button.onclick = null
    // adding button's number to currentPlayer.chosen
    player.chosen.push(button.dataset.id)
    player.chosen.sort()
    console.log(player.chosen)
    // calling a function to know if someone already won (gameover if so)
    if (hasWon(player)) {
        buttons.forEach((button) => {
            button.onclick = null
        })
        return gameOver(player)
    }
    // switch currentPlayer and announce that in currentTurn <span>
    if (currentPlayer == playerX) {
        currentPlayer = playerO
        currentTurn.textContent = playerO.symbol
    } else {
        currentPlayer = playerX
        currentTurn.textContent = playerX.symbol
    }
}

function hasWon(player) {
    // copying player with spread operator
    playerCopy = {...player}
    // loop to check if current player has completed any combo
    for (let i = 0; i < winningCombos.length; i++) {
        if (playerCopy.chosen.includes(winningCombos[i][0].toString()) && playerCopy.chosen.includes(winningCombos[i][1].toString()) && playerCopy.chosen.includes(winningCombos[i][2].toString())) {
            return true
        }
    }
    return false
}

function gameOver(playerWon) {
    currentTurn.textContent = ""
    const p = document.createElement("p")
    p.textContent = `Player ${playerWon.symbol} won!`
    caption.after(p)
}