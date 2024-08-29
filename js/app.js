const squares = document.querySelectorAll(".square");
const statusDisplay = document.getElementById("status");

const X_TURN = "X";
const O_TURN = "O";
let currentTurn = X_TURN;

let boardState = Array(9).fill("");

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

squares.forEach((square, index) => {
    square.addEventListener("click", () => {
        if (square.textContent == "" && !checkWin()) {
            square.textContent = currentTurn;
            boardState[index] = currentTurn;
            if (checkWin()) {
                statusDisplay.textContent = `${currentTurn} a gagné!`;
            } else if (isBoardFull()) {
                statusDisplay.textContent = "Match nul!";
            } else {
                switchTurn();
            }
        }
    });
});

function checkWin() {
    const winningCombination = winningCombinations.find(combination => {
        return combination.every(index => boardState[index] === currentTurn);
    });

    if (winningCombination) {
        winningCombination.forEach(index => {
            squares[index].classList.add("winning-square");
        });
        return true;
    }

    return false;
}

function isBoardFull() {
    return boardState.every(cell => cell !== "");
}

function switchTurn() {
    currentTurn = currentTurn === X_TURN ? O_TURN : X_TURN;
    statusDisplay.textContent = `C'est au tour de ${currentTurn}`;
}

function resetGame() {
    boardState.fill("");
    squares.forEach(square => {
        square.textContent = "";
        square.classList.remove("winning-square");
    });
    switchTurn();
}
