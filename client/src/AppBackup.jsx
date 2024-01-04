import { useEffect, useState } from 'react';
import Header from './components/layout/Header.jsx';
import Player from './components/game/GamePlayer.jsx';
import GameBoard from './components/game/GameBoard.jsx';
import GameOver from './components/game/GameOver.jsx';
import GameSettings from './components/legacy/GameSettings.jsx';

import {
    checkWinner,
    checkDraw,
    createEmptyGameBoard,
    getRandomEmptyCell,
    playAudio,
    getMoveFromGPT,
    findBestMove,
} from './utils.js';

import clickSound from './assets/click-sound.wav';

const DEFAULT_SETTINGS = {
    mode: 'GPT', //GPT, MINIMAX, MULTI_PLAYER
    boardSize: 3,
    allowAudio: true,
};

const COM_NAMES = ['GPT', 'MINIMAX'];

let comMoveTimeout;

function App() {
    const [gameSettings, setGameSettings] = useState(DEFAULT_SETTINGS);
    const [gameBoard, setGameBoard] = useState(
        createEmptyGameBoard(gameSettings.boardSize)
    );
    const [players, setPlayers] = useState({
        X: 'Player 1',
        O: gameSettings.mode,
    });
    const [currentPlayer, setCurrentPlayer] = useState('X');

    let winner = checkWinner(gameBoard);
    let isDraw = !winner && checkDraw(gameBoard);
    let isComTurn = !winner && COM_NAMES.includes(players[currentPlayer]);

    // reset the game if the game settings change
    useEffect(() => {
        handleRematch();
    }, [gameSettings]);

    useEffect(() => {
        if (isComTurn) {
            if (gameSettings.mode === 'GPT') {
                // model: "gpt-4-1106-preview",
                const move =  getMoveFromGPT(gameBoard, "gpt-3.5-turbo-1106");
                move.then((move) => {
                    handleSelect(move.row, move.col);
                });
            } else if (gameSettings.mode === 'MINIMAX') {
                comMoveTimeout = setTimeout(() => {
                    const move = findBestMove(gameBoard);
                    handleSelect(move.row, move.col);
                }, 1000);
            }

            return () => clearTimeout(comMoveTimeout);
        }
    }, [isComTurn, gameBoard, gameSettings.mode]);

    const handleSelect = (row, col) => {
        setGameBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row]);
            newBoard[row][col] = currentPlayer;

            return newBoard;
        });

        // Game click sound
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

        //  Player 2 depending on the game mode
        if (gameSettings.mode === 'MULTI') {
            setPlayers((prevPlayers) => {
                return { ...prevPlayers, O: 'Player 2' };
            });
        } else {
            setPlayers((prevPlayers) => {
                return { ...prevPlayers, O: gameSettings.mode };
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

                {/*<GameSettings*/}
                {/*    initialSettings={gameSettings}*/}
                {/*    onSettingsChange={(newSettings) =>*/}
                {/*        setGameSettings(newSettings)*/}
                {/*    }*/}
                {/*/>*/}
            </main>
        </>
    );
}

export default App;
