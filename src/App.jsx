import { useEffect, useState } from 'react';

import Header from './components/Header.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameOver from './components/GameOver.jsx';
import GameSettings from './components/GameSettings.jsx';

import {
    checkWinner,
    checkDraw,
    createEmptyGameBoard,
    getRandomEmptyCell,
} from './utils.js';


const PLAYERS = {
    X: 'Player 1',
    O: 'COM',
};

const DEFAULT_SETTINGS = {
    mode: 'COM', //COM or MULTI_PLAYER
    boardSize: 3,
    allowAudio: true
}

function App() {
    const [gameSettings, setGameSettings] = useState(DEFAULT_SETTINGS);
    const [players, setPlayers] = useState(PLAYERS);
    const [gameBoard, setGameBoard] = useState(
        createEmptyGameBoard(gameSettings.boardSize)
    );
    const [currentPlayer, setCurrentPlayer] = useState('X');

    let winner = checkWinner(gameBoard);
    let isDraw = !winner && checkDraw(gameBoard);
    const isComTurn =
        gameSettings.mode === 'COM' && players[currentPlayer] === 'COM';

    useEffect(() => {
        if (isComTurn) {
            // Introduce a delay for the computer's turn
            const comMoveTimeout = setTimeout(() => {
                const emptyCell = getRandomEmptyCell(gameBoard);
                if (emptyCell) {
                    handleSelect(emptyCell.row, emptyCell.col);
                }
            }, 1000); 


            return () => clearTimeout(comMoveTimeout);
        }
    }, [isComTurn, gameBoard]);

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


    const handleSettingsChange = (newSettings) => {
        console.log(newSettings);
    }
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
                    initialSettings={gameSettings}
                    onSettingsChange={handleSettingsChange}
                />
            </main>
        </>
    );
}

export default App;
