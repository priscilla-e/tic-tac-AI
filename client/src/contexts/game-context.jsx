import {createContext} from "react";


const GameContext = createContext({
    page: localStorage.page || 0,
    mode: localStorage.mode || null,
    settings: localStorage.settings ? JSON.parse(localStorage.settings) : null,
    board: localStorage.board ? JSON.parse(localStorage.board) : null,
    setPage: () => {},
    setMode: () => {},
    setSettings: () => {},
    setBoard: () => {},
});

export default GameContext;
