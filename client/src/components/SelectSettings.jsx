import {useContext} from "react";
import Card from "./ui/Card.jsx";
import GameContext from "../contexts/game-context.jsx";

export default function SelectSettings() {
    console.log('SelectSettings')
    const ctx = useContext(GameContext);

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <Card title='Select Settings'>
            <form className='max-w-xs mx-auto mt-4 md:mt-8' onSubmit={handleSubmit}>
                <div className="flex items-center justify-between space-y-2">
                    <label htmlFor="player1" className='mr-5'>Player 1</label>
                    <input type="text" name='player1' id='player1' placeholder='name'
                           className="px-2 py-2 text-sm text-smoke uppercase bg-darkEarth focus:outline-none md:py-4 md:px-4"/>
                </div>
                {ctx.mode === 'multi' && (
                    <div className="flex items-center justify-between space-y-2">
                        <label htmlFor="player2">Player2</label>
                        <input
                            type="text" name='player2' id='player2' placeholder='name'
                            className="px-2 py-2 text-sm text-smoke uppercase bg-darkEarth focus:outline-none md:py-4 md:px-4"/>
                    </div>
                )}
                <div className="flex items-center justify-between space-y-2">
                    <label htmlFor="player1">Difficulty</label>
                    <select defaultValue='easy'>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                </div>
                <div className="flex items-center justify-between space-y-2">
                    <label htmlFor="player1">Board size</label>
                    <select defaultValue='easy'>
                        <option value={3}>3 x 3</option>
                        <option value={4}>4 x 4</option>
                        <option value={5}>5 x 5</option>
                    </select>
                </div>
            </form>

            <div className='mt-10 flex justify-between'>
                <button
                    type='button'
                    className='border-2 border-lightYellow bg-black font-bold mx-auto px-6 py-2 focus:outline-none'
                    onClick={() => ctx.setPage((curPage) => curPage - 1)}
                >
                    Back
                </button>
                <button
                    type='button'
                    className='border-2 border-lightYellow bg-black font-bold mx-auto px-6 py-2 focus:outline-none'
                    onClick={() => ctx.setPage((curPage) => curPage - 1)}
                >
                    Start Game
                </button>
            </div>
        </Card>
    )
}