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
    getMoveFromGPT,
    findBestMove,
} from './utils.js';

import clickSound from './assets/click-sound.wav';
import PlayNow from "./components/PlayNow.jsx";

const DEFAULT_SETTINGS = {
    mode: 'GPT', //GPT, MINIMAX, MULTI_PLAYER
    boardSize: 3,
    allowAudio: true,
};

const COM_NAMES = ['GPT', 'MINIMAX'];

let comMoveTimeout;

function App() {
    return (
        <>
            <Header />
            <main className="container mx-auto px-2">
                <PlayNow/>
            </main>
        </>
    );
}

export default App;
