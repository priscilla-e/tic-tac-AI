import { SERVER } from "./axios";

/**
 * Creates an empty game board of the specified size.
 *
 * @param {number} size - The size of the game board (default is 3).
 * @returns {Array<Array<null>>} - An empty game board represented as a 2D array.
 */
export const createEmptyGameBoard = (size = 3) => {
    const gameBoard = []
    for (let i = 0; i < size; i++) {
        const row = []
        for (let j = 0; j < size; j++) {
            row.push(null)
        }
        gameBoard.push(row)
    }
    return gameBoard
}


/**
 * Checks for a winner on the provided game board.
 *
 * @param {Array<Array<null|string>>} board - The game board represented as a 2D array.
 * @returns {null|string} - The symbol of the winner ('X' or 'O') or null if no winner.
 */
export const checkWinner = (board) => {
    const size = board.length;

    // Check rows and columns
    for (let i = 0; i < size; i++) {
        if (board[i][0] && board[i].every((val) => val === board[i][0])) {
            return board[i][0]; // Winner in a row
        }

        let colMatch = true;
        for (let j = 1; j < size; j++) {
            if (board[0][i] !== board[j][i]) {
                colMatch = false;
                break;
            }
        }
        if (colMatch && board[0][i]) {
            return board[0][i]; // Winner in a column
        }
    }

    // Check main diagonal
    let diagMatch = true;
    for (let i = 1; i < size; i++) {
        if (board[0][0] !== board[i][i]) {
            diagMatch = false;
            break;
        }
    }
    if (diagMatch && board[0][0]) {
        return board[0][0]; // Winner in the main diagonal
    }

    // Check anti-diagonal
    diagMatch = true;
    for (let i = 1; i < size; i++) {
        if (board[0][size - 1] !== board[i][size - 1 - i]) {
            diagMatch = false;
            break;
        }
    }
    if (diagMatch && board[0][size - 1]) {
        return board[0][size - 1]; // Winner in the anti-diagonal
    }

    return null; // No winner
}


/**
 * Checks if the game board is in a draw state.
 *
 * @param {Array<Array<null|string>>} gameBoard - The game board represented as a 2D array.
 * @returns {boolean} - True if the game is a draw, false otherwise.
 */
export const checkDraw = (gameBoard) => {
    for (let row of gameBoard) {
        let rowFilled = row.every((cell) => cell !== null);
        if (!rowFilled) {
            return false;
        }
    }
    return true;
};


/**
 * Gets a random empty cell on the game board.
 *
 * @param {Array<Array<null|string>>} board - The game board represented as a 2D array.
 * @returns {Object|null} - An object with 'row' and 'col' properties representing the random empty cell, or null if no empty cell is found.
 */
export function getRandomEmptyCell(board) {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === null) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

/**
 * Plays the provided audio.
 *
 * @param {string} audio - The audio file path to play.
 */
export const playAudio = (audio) => {
    const audioElement = new Audio(audio);
    audioElement.play();
}


/**
 * Converts a game board to a string.
 *
 * @param {Array<Array<null|string>>} board - The game board represented as a 2D array.
 * @returns {string} - The game board represented as a string.
 */
export const stringifyBoard = (board) => {
    let boardStr = "";
    for (let row of board) {
        for (let cell of row) {
            if (cell === null) {
                boardStr += "_ "; // Represent empty cells with an underscore or any other symbol
            } else {
                boardStr += cell + " ";
            }
        }
        boardStr += "\n"; // New line after each row
    }
    return boardStr;
}



export async function getMoveFromGPT(board, model="gpt-3.5-turbo-1106") {
    try {
        const response = await SERVER.get('/gpt-move', { params: {model, board: stringifyBoard(board)}})
        return JSON.parse(response.data);
    }
    catch (err) {
        console.log(err);
    }
}