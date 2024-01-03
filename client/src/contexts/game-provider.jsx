import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import GameContext from "./game-context.jsx";

// const INITIAL_SETTINGS = {
//     player1: null,
//     player2: null,
//     difficulty: 'easy', //easy, medium, hard
//     boardSize: 3, //3, 4, 5
//     allowAudio: true,
// }

export default function GameProvider ({children}) {
    const [page, setPage] = useState(+localStorage.page || 0);
    const [mode, setMode] = useState(localStorage.mode || null);
    const [settings, setSettings] = useState( localStorage.settings ? JSON.parse(localStorage.settings) : null);
    const [board, setBoard] = useState(localStorage.board ? JSON.parse(localStorage.board) : null);

    useEffect(() => {
        localStorage.page = page;
        localStorage.mode = mode;
        localStorage.settings = JSON.stringify(settings);
        localStorage.board = JSON.stringify(board);
    }, [page, mode, settings, board]);

    return (
        <GameContext.Provider value={{page, mode, settings, board, setPage, setMode , setSettings, setBoard}}>
            {children}
        </GameContext.Provider>
    )
}

GameProvider.propTypes = {
    children: PropTypes.node.isRequired,
}


