import {createContext} from "react";
import {createEmptyGameBoard} from "../utils.js";

const INITIAL_SETTINGS = {
    difficulty: 'easy', //easy, medium, hard
    boardSize: 3, //3, 4, 5
    allowAudio: true,
}

const GameContext = createContext({
    page: localStorage.getItem('page') || 0,
    mode: localStorage.getItem('mode') || 'single',
    settings: localStorage.getItem('settings') || INITIAL_SETTINGS,
    board: localStorage.getItem('board') || createEmptyGameBoard(INITIAL_SETTINGS.boardSize),
    setPage: () => {},
    setMode: () => {},
    setSettings: () => {},
    setBoard: () => {},
});

export default GameContext;
