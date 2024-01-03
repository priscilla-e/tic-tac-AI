import Card from "./ui/Card.jsx";
import {useContext} from "react";
import GameContext from "../contexts/game-context.jsx";


export default function SelectMode() {
    const ctx = useContext(GameContext);

    const handleGameMode = (mode) => {
        ctx.setMode(mode)
        ctx.setPage((curPage) => curPage + 1);
    }

    return (
        <Card>
            <p className='text-center text-lg '>
                Tic Tac Toe is a two-player game where players take turns marking a grid with X or O. The first to
                complete a row horizontally, vertically, or diagonally wins.
            </p>

            <p className='my-10 text-center text-2xl font-bold'>Select Game Mode</p>
            <div className='text-center space-x-10'>
                <button
                    type='button'
                    className='border-2 border-lightYellow bg-black font-bold mx-auto px-6 py-2 focus:outline-none'
                    onClick={() => handleGameMode('single')}
                >
                    Single Player
                </button>
                <button
                    type='button'
                    className='border-2 border-lightYellow bg-black font-bold mx-auto px-6 py-2 focus:outline-none'
                    onClick={() => handleGameMode('multi')}
                >
                    Multi Player
                </button>
            </div>
        </Card>
    )
}
