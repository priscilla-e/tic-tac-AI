import { useEffect, useState } from 'react';

import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameOver from './components/GameOver.jsx';
import GameSettings from './components/GameSettings.jsx';

function checkWinner(board) {
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

const checkDraw = (gameBoard) => {
    for (let row of gameBoard) {
        let rowFilled = row.every((cell) => cell !== null);
        if (!rowFilled) {
            return false;
        }
    }
    return true;
};

const createEmptyGameBoard = (size = 3) =>  {
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

const PLAYERS = {
    // symbol: name
    X: 'Player 1',
    O: 'Player 2',
};

const DEFAULT_SETTINGS = {
    mode: 'COM', //COM or MULTI_PLAYER
    boardSize: 3,
    playAudio: true
}

function App() {
    const [gameSettings, setGameSettings] = useState(DEFAULT_SETTINGS);
    const [players, setPlayers] = useState(PLAYERS);
    const [gameBoard, setGameBoard] = useState(
        createEmptyGameBoard(DEFAULT_SETTINGS.boardSize)
    );
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
    };

    const handleNameChange = (symbol, newName) => {
        setPlayers((prevPlayers) => {
            return { ...prevPlayers, [symbol]: newName };
        });
    };

    const handleRematch = () => {
        setGameBoard(createEmptyGameBoard(gameSettings.boardSize));
        setCurrentPlayer('X');
    };


    useEffect(() => {
        handleRematch();
    }, [gameSettings]);

    return (
        <>
            <Header />
            <main className="container mx-auto px-2">
                {/*Game Container Card */}
                <div className="relative mx-auto px-2 py-8 w-full bg-white shadow-custom rounded-md bg-gradient-to-b from-earth to-darkEarth md:max-w-2xl md:px-8 md:py-12">
                    {(winner || isDraw) && (
                        <GameOver
                            winner={winner ? players[winner] : winner}
                            onRematch={handleRematch}
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

                <GameSettings
                    settings={gameSettings}
                    onSettingsChange={(newSettings) =>
                        setGameSettings(newSettings)
                    }
                />
            </main>
        </>
    );
}

export default App;
