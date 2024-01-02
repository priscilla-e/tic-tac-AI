import { useState } from "react";
import PropTypes from "prop-types";
import { createEmptyGameBoard } from "../utils.js";

import GameContext from "./game-context.jsx";

const INITIAL_SETTINGS = {
    difficulty: 'easy', //easy, medium, hard
    boardSize: 3, //3, 4, 5
    allowAudio: true,
}

export default function GameProvider ({children}) {
    const [page, setPage] = useState(localStorage.getItem('page') || 0);
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'single');
    const [settings, setSettings] = useState(localStorage.getItem('settings') || INITIAL_SETTINGS);
    const [board, setBoard] = useState(localStorage.getItem('board'))  || createEmptyGameBoard(INITIAL_SETTINGS.boardSize);

    return (
        <GameContext.Provider value={{page, mode, settings, board, setPage, setMode , setSettings, setBoard}}>
            {children}
        </GameContext.Provider>
    )
}

GameProvider.propTypes = {
    children: PropTypes.node.isRequired,
}


