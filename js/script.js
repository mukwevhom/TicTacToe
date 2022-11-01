const squares = document.querySelectorAll(".square")
let playerTurn = true
let gameStop = false
let playerSquares = []
let computerSquares = []

let combination = {
    "horizontal": [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ],
    "vertical": [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ],
    "diagonal": [
        [0, 4, 8],
        [2, 4, 6]
    ]
}

let computerTurnFunc = () => {
    checkTie()
    let random = Math.floor(Math.random() * 9)

    if(!playerSquares.includes(random) && !computerSquares.includes(random)) {
        squares[random].classList.add('o')
        computerSquares.push(random)

        playerTurn = true
        gameCheck(computerSquares, "Computer")
    } else {
        if(!gameStop) computerTurnFunc()
    }
}

let gameCheck = (squares, currPlayer) => {
    for (let combo in combination) {
        combination[combo].forEach((pattern) => {
            if ( squares.includes(pattern[0]) && squares.includes(pattern[1]) && squares.includes(pattern[2])) {
                alert(`${currPlayer} Wins`);
                gameStop = true
            }
        });
    
    }
}

let checkTie = () => {
    console.log(playerSquares.length + computerSquares.length)
}

squares.forEach((square, idx) => {
    square.addEventListener("click", (evt) => {
        let elementClassList = evt.target.classList

        if(!playerSquares.includes(idx) && !computerSquares.includes(idx) && !gameStop) {
            let turnClass = playerTurn ? "x" : "o"

            elementClassList.add(turnClass)
            playerSquares.push(idx)
            playerTurn = !playerTurn
            checkTie()
            gameCheck(playerSquares, "Murendeni")
            if(!gameStop) computerTurnFunc()
        }
    })
})