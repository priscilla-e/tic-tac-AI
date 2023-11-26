import {useState} from 'react'

import Header from './components/Header.jsx'
import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import GameOver from './components/GameOver.jsx';

function checkWinner(board) {
    const size = board.length;

    // Check rows and columns
    for (let i = 0; i < size; i++) {
        if (board[i][0] && board[i].every(val => val === board[i][0])) {
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

const checkDraw = (gameBoard) => {
    for (let row of gameBoard) {
        let rowFilled = row.every((cell) => cell !== null)
        if (!rowFilled) {
            return false;
        }
    }
    return true;
}


const INITIAL_GAMEBOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

const PLAYERS = {
    // symbol: name
    X: 'Player 1',
    O: 'Player 2'
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameBoard, setGameBoard] = useState(INITIAL_GAMEBOARD);
    const [currentPlayer, setCurrentPlayer] = useState('X');

    let winner = checkWinner(gameBoard);
    let isDraw = !winner && checkDraw(gameBoard);


    const handleSelect = (row, col) => {
        setGameBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row]);
            newBoard[row][col] = currentPlayer;

            return newBoard;
        });

        if (currentPlayer === 'X') {
            setCurrentPlayer('O');
        } else {
            setCurrentPlayer('X');
        }
    }

    const handleNameChange = (symbol, newName) => {
        setPlayers((prevPlayers) => {
            return {...prevPlayers, [symbol]: newName}
        })
    }

    // console.log(players)
    // console.log(players.winner)

    return (
        <>
            <Header />
            <main className="container mx-auto px-2">
                {/*Game Container Card */}
                <div className="relative mx-auto px-2 py-8 w-full bg-white shadow-custom rounded-md bg-gradient-to-b from-earth to-darkEarth md:max-w-2xl md:px-8 md:py-12">
                    {(winner || isDraw) && (
                        <GameOver
                            winner={winner ? players[winner] : winner}
                            onRematch={() => {
                                console.log('rematch!');
                            }}
                        />
                    )}
                    {/*Player Names Container*/}
                    <div className="flex space-x-2 md:space-x-10">
                        <Player
                            defaultName={players.X}
                            symbol="X"
                            isActive={currentPlayer == 'X'}
                            onSave={handleNameChange}
                        />
                        <Player
                            defaultName={players.O}
                            symbol="O"
                            isActive={currentPlayer == 'O'}
                            onSave={handleNameChange}
                        />
                    </div>

                    <GameBoard board={gameBoard} onSelect={handleSelect} />
                </div>
            </main>
        </>
    );
}


export default App
