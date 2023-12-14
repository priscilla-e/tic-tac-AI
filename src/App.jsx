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
    playAudio,
} from './utils.js';

import clickSound from './assets/click-sound.wav';

const DEFAULT_SETTINGS = {
    mode: 'COM', //COM, MULTI_PLAYER
    boardSize: 3,
    allowAudio: true,
};

function App() {
    const [gameSettings, setGameSettings] = useState(DEFAULT_SETTINGS);
    const [gameBoard, setGameBoard] = useState(
        createEmptyGameBoard(gameSettings.boardSize)
    );
    const [players, setPlayers] = useState({ X: 'Player 1', O: 'COM' });
    const [currentPlayer, setCurrentPlayer] = useState('X');

    let winner = checkWinner(gameBoard);
    let isDraw = !winner && checkDraw(gameBoard);
    const isComTurn =
        gameSettings.mode === 'COM' &&
        players[currentPlayer] === 'COM' &&
        !winner; // com shouldn't play if there's already a winner

    useEffect(() => {
        handleRematch();
    }, [gameSettings]);

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

        // Play click sound
        if (gameSettings.allowAudio) {
            playAudio(clickSound);
        }

        // Switch player
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

        // Set player 2 to COM or Player 2 depending on the game mode
        if (gameSettings.mode === 'COM') {
            setPlayers((prevPlayers) => {
                return { ...prevPlayers, O: 'COM' };
            });
        } else if (gameSettings.mode === 'MULTI') {
            setPlayers((prevPlayers) => {
                return { ...prevPlayers, O: 'Player 2' };
            });
        }
    };

    return (
        <>
            <Header />
            <main className="container mx-auto px-2">
                {/*Game Container Card */}
                <div className="relative mx-auto px-2 py-8 w-full bg-white shadow-custom rounded-md bg-gradient-to-b from-earth to-darkEarth md:max-w-2xl md:px-8 md:py-12">
                    {(winner || isDraw) && (
                        <GameOver
                            winner={winner ? players[winner] : null}
                            gameSettings={gameSettings}
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

                    <GameBoard
                        board={gameBoard}
                        isComTurn={isComTurn}
                        onSelect={handleSelect}
                    />
                </div>

                <GameSettings
                    initialSettings={gameSettings}
                    onSettingsChange={(newSettings) =>
                        setGameSettings(newSettings)
                    }
                />
            </main>
        </>
    );
}

export default App;
