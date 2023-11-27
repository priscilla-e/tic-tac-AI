import { useState } from 'react';

export default function GameSettings({ settings, onSettingsChange }) {
    const [mode, setMode] = useState(settings.mode);
    const [boardSize, setBoardSize] = useState(settings.boardSize);
    const [playAudio, setPlayAudio] = useState(settings.playAudio);



    const handleSave = (e) => {
        e.preventDefault();

        const gameSettings = {
            mode,
            boardSize: +boardSize,
            playAudio,
        };

        onSettingsChange(gameSettings);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="font-cursive text-2xl">Game Settings</h1>
            <form onSubmit={handleSave}>
                <div>
                    <label htmlFor="game-mode">Mode: </label>
                    <select
                        id="game-mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                    >
                        <option value="com">COM</option>
                        <option value="multi">Multiplayer</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="board-size">Board Size: </label>
                    <select
                        id="board-size"
                        value={boardSize}
                        onChange={(e) => setBoardSize(e.target.value)}
                    >
                        <option value="3">3 x 3</option>
                        <option value="4">4 x 4</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="audio">Audio: </label>
                    <input
                        type="checkbox"
                        id="audio"
                        checked={playAudio}
                        onChange={(e) => setPlayAudio(e.target.checked)}
                    />
                </div>

                <button type="submit" className="border-2">
                    Save
                </button>
            </form>
        </div>
    );
}
