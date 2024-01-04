import {useContext, useEffect, useState} from "react";
import Card from "./ui/Card.jsx";
import Button from "./ui/Button.jsx";
import GameContext from "../contexts/game-context.jsx";
import {createEmptyGameBoard} from "../utils.js";

export default function SelectSettings() {
    const ctx = useContext(GameContext);

    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [boardSize, setBoardSize] = useState(3);
    const [err, setErr] = useState(null);

    // Set Com Player Name  programmatically if in single player mode
    useEffect(() => {
        if (ctx.mode !== 'single') return;

        if (difficulty === 'easy') {
            setPlayer2('RANDOM')
        } else if (difficulty === 'medium') {
            setPlayer2('GPT')
        } else if (difficulty === 'hard') {
            setPlayer2('MINIMAX')
        }
    }, [ctx.mode, difficulty])


    useEffect(() => {
        // Reset error message when player1 or player2 changes
        setErr(null);
    }, [player1, player2]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!player1.trim()) {
            setErr('Player 1 name is required.');
            return
        }

        if (!player2.trim()) {
            setErr('Player 2 name is required.');
            return
        }


        const settings = {
            X: player1.toUpperCase(),
            O: player2.toUpperCase(),
            difficulty, // Used only in single player mode
            boardSize: +boardSize,
            allowAudio: true,
        };

        // Save game settings and start game
        ctx.setSettings(settings);
        ctx.setBoard(createEmptyGameBoard(boardSize)); // set game board
        ctx.setPage((curPage) => curPage + 1); // go to game page
    }

    const handleBack = () => {
        ctx.setPage((curPage) => curPage - 1);
        ctx.setMode(null);
    }

    return (
        <Card title='Select Settings'>
            <p className='my-2 text-center text-xs text-red-800'>{err}</p>
            <form className='max-w-xs mx-auto mt-4 md:mt-8' onSubmit={handleSubmit}>
                <div className="flex items-center justify-between space-y-2">
                    <label htmlFor="player1" className='mr-5'>Player 1</label>
                    <input
                        value={player1}
                        type="text" name='player1' id='player1' placeholder='name'
                        className="w-8/12 px-2 py-2 text-sm text-smoke uppercase bg-darkEarth focus:outline-none md:py-4 md:px-4"
                        onChange={(e) => setPlayer1(e.target.value)}
                    />
                </div>
                {ctx.mode === 'multi' && (
                    <div className="flex items-center justify-between space-y-2">
                        <label htmlFor="player2">Player2</label>
                        <input
                            value={player2}
                            type="text" name='player2' id='player2' placeholder='name'
                            className="w-8/12 px-2 py-2 text-sm text-smoke uppercase bg-darkEarth focus:outline-none md:py-4 md:px-4"
                            onChange={(e) => setPlayer2(e.target.value)}
                        />
                    </div>
                )}

                {ctx.mode === 'single' && (
                    <div className="flex items-center justify-between space-y-2">
                        <label htmlFor="difficulty">Difficulty</label>
                        <select
                            name='difficulty'
                            value={difficulty}
                            className='w-8/12 px-2 py-2 text-sm text-smoke uppercase bg-darkEarth focus:outline-none md:py-4 md:px-4'
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value='easy'>Easy - Random</option>
                            <option value='medium'>Medium - Gpt</option>
                            <option value='hard'>Hard - Minimax</option>
                        </select>
                    </div>)
                }
                <div className="flex items-center justify-between space-y-2">
                    <label htmlFor="boardsize">Board size</label>
                    <select
                        name="boardsize"
                        value={boardSize}
                        className='w-8/12 px-2 py-2 text-sm text-smoke uppercase bg-darkEarth focus:outline-none md:py-4 md:px-4'
                        onChange={(e) => setBoardSize(+e.target.value)}
                    >
                        <option value={3}>3 x 3</option>
                        <option value={4}>4 x 4</option>
                        <option value={5}>5 x 5</option>
                    </select>
                </div>

                <div className='mt-10 flex justify-between p-0'>
                    <Button
                        type='button'
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        type='submit'
                        onClick={() => console.log('hello')}
                    >
                        Start Game
                    </Button>
                </div>
            </form>
        </Card>
    )
}