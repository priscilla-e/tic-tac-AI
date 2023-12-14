import { useEffect, useState } from 'react';

export default function Player({ defaultName, symbol, isActive, onSave }) {
    const [playerName, setPlayerName] = useState(defaultName);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setPlayerName(defaultName);
    }, [defaultName]);

    const handleEdit = () => {
        setIsEditing((isEditing) => !isEditing);

        if (isEditing) {
            // handle save instead
            onSave(symbol, playerName.toUpperCase());
        }
    };

    return (
        <>
            <div
                className={`flex items-center w-1/2 space-x-4 ${
                    isActive ? 'border-2 border-lightYellow animate-ping' : ''
                }`}
            >
                {isEditing ? (
                    <input
                        type="text"
                        className="flex-1 w-10 px-2 py-2 text-sm text-smoke uppercase bg-darkEarth focus:outline-none md:py-4 md:px-4"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                ) : (
                    <span
                        className={`inline-block flex-1 w-10 whitespace-nowrap truncate px-2 py-2 text-sm text-smoke uppercase md:py-4 md:px-4 ${
                            isActive ? 'animate-pulse' : ''
                        }`}
                    >
                        {playerName}
                    </span>
                )}
                <span className="font-bold text-sm text-smoke uppercase">
                    {symbol}
                </span>
                <button
                    className="w-10 text-sm text-darkYellow focus:outline-none md:pr-14"
                    onClick={handleEdit}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
        </>
    );
}
