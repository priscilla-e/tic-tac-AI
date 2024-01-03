import {useContext} from "react";
import Card from "./ui/Card.jsx";
import GameContext from "../contexts/game-context.jsx";
export default function SelectSettings() {
    const ctx = useContext(GameContext);

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <Card title='Select Settings'>
            <form className='max-w-sm mx-auto mt-4 md:mt-8' onSubmit={handleSubmit}>
                <div className="flex items-center justify-between space-y-2">
                    <label htmlFor="player1" className='mr-5'>Player 1</label>
                    <input type="text" name='player1' id='player1'  className="px-2 py-2 text-sm text-smoke uppercase bg-darkEarth focus:outline-none md:py-4 md:px-4"/>
                </div>
                <div className="flex items-center justify-between space-y-2">
                    <label htmlFor="player1">Difficulty</label>
                    <input type="text" name='player1' id='player1'  className="px-2 py-2 text-sm text-smoke uppercase bg-darkEarth focus:outline-none md:py-4 md:px-4"/>
                </div>
            </form>

            <div>
                <button
                    type='button'
                    className='border-2 border-lightYellow bg-black font-bold mx-auto px-6 py-2 focus:outline-none'
                    onClick={() => ctx.setPage((curPage) => curPage - 1)}
                >
                    Back
                </button>
            </div>
        </Card>
    )
}