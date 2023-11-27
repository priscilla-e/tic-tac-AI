import { useEffect, useState, useRef } from 'react';

import clickSound from "./assets/click-sound.wav"

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
    playAudio: true
}

function App() {
    const clickAudioRef = useRef(new Audio(clickSound));
    const [gameSettings, setGameSettings] = useState(DEFAULT_SETTINGS);
    const [players, setPlayers] = useState(PLAYERS);
    const [gameBoard, setGameBoard] = useState(
        createEmptyGameBoard(DEFAULT_SETTINGS.boardSize)
    );
    const [currentPlayer, setCurrentPlayer] = useState('X');

    let winner = checkWinner(gameBoard);
    let isDraw = !winner && checkDraw(gameBoard);
    const isComTurn =
        gameSettings.mode === 'COM' && players[currentPlayer] === 'COM';


    useEffect(() => {
        if (isComTurn && !(winner || isDraw)) {
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
        // Play click sound
        clickAudioRef.current.play().catch(error => console.error('Error playing sound:', error));

        // Set the cell to the current player
        setGameBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row]);
            newBoard[row][col] = currentPlayer;

            return newBoard;
        });

        // Change the current player
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

                    <GameBoard board={gameBoard} onSelect={handleSelect} isComTurn={isComTurn} />
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
