import { useState } from 'react';

export default function GameSettings({ initialSettings, onSettingsChange }) {
    const [mode, setMode] = useState(initialSettings.mode);
    const [boardSize, setBoardSize] = useState(initialSettings.boardSize);
    const [allowAudio, setAllowAudio] = useState(initialSettings.allowAudio);


    const handleSave = (e) => {
        e.preventDefault();

        const gameSettings = {
            mode,
            boardSize: +boardSize,
            allowAudio,
        };

        onSettingsChange(gameSettings);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center my-4 max-w-2xl mx-auto">
            <h1 className="font-cursive text-2xl mb-4">Game Settings</h1>
            <form onSubmit={handleSave} className='space-y-4'>
                <div>
                    <label htmlFor="game-mode">Mode: </label>
                    <select
                        id="game-mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className='bg-darkEarth text-smoke rounded-sm'
                    >
                        <option value="GPT">GPT</option>
                        <option value="MINIMAX">Minimax</option>
                        <option value="MULTI">Multiplayer</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="board-size">Board Size: </label>
                    <select
                        id="board-size"
                        value={boardSize}
                        onChange={(e) => setBoardSize(e.target.value)}
                        className='bg-darkEarth text-smoke rounded-sm'
                    >
                        <option value="3">3 x 3</option>
                        <option value="4">4 x 4</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="audio">Allow Audio: </label>
                    <input
                        type="checkbox"
                        id="audio"
                        checked={allowAudio}
                        onChange={(e) => setAllowAudio(e.target.checked)}
                    />
                </div>

                <button type="submit" className="px-8 py-4 rounded-sm shadow-lg bg-darkEarth text-smoke duration-150 hover:text-white hover:scale-105 focus:outline-none">
                    Save & Restart
                </button>
            </form>
        </div>
    );
}
