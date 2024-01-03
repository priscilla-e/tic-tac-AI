import Card from "./ui/Card.jsx";
import {useContext} from "react";
import GameContext from "../contexts/game-context.jsx";
import Button from "./ui/Button.jsx";


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
                <Button
                    type='button'
                    onClick={() => handleGameMode('single')}
                >
                    Single Player
                </Button>
                <Button
                    type='button'
                    onClick={() => handleGameMode('multi')}
                >
                    Multi Player
                </Button>
            </div>
        </Card>
    )
}
