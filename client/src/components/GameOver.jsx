import {useContext} from "react";
import GameContext from "../contexts/game-context.jsx";
import {createEmptyGameBoard, playAudio} from '../utils';
import winSound from '../assets/win-sound.wav';
import drawSound from '../assets/draw-sound.wav';
import PropTypes from "prop-types";

export default function GameOver({ winner }) {
    const ctx = useContext(GameContext);

    if (ctx.settings.allowAudio) {
        if (winner) {
            playAudio(winSound);
        } else {
            playAudio(drawSound);
        }
    }

    const handleRematch = () => {
        const newBoard = createEmptyGameBoard(ctx.settings.boardSize);
        ctx.setBoard(newBoard);
    }

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col space-y-8 items-center justify-center text-smoke bg-black bg-opacity-80 animate-pop-in">
            <p className="font-cursive text-4xl text-lightYellow">Game Over!</p>
            {winner ? <p>{`${ctx.settings[winner]} Won!`}</p> : <p>{"It's a Draw!"}</p>}

            <button
                className="px-4 py-1 border-2  border-darkYellow text-darkYellow rounded-sm animate-bounce focus:outline-none"
                onClick={handleRematch}
            >
                Rematch!
            </button>
        </div>
    );
}

GameOver.propTypes = {
    winner: PropTypes.string.isRequired
}
