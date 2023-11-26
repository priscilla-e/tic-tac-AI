export default function GameOver({ playerName, onRematch }) {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col space-y-8 items-center justify-center text-smoke bg-black bg-opacity-80 animate-pop-in">
            <p className="font-cursive text-4xl text-lightYellow">Game Over!</p>
            <p>{`${playerName} Won!`}</p>
            <button
                className="px-4 py-1 border-2  border-darkYellow text-darkYellow rounded-sm animate-bounce focus:outline-none"
                onClick={onRematch}
            >
                Rematch!
            </button>
        </div>
    );
}
