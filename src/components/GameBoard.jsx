
export default function GameBoard({board, onSelect}) {

    return (
        <div
            className={`grid grid-cols-${board.length} gap-3 max-w-lg mx-auto mt-8 md:gap-6`}
        >
            {board.map((row, rowIndex) =>
                row.map((col, colIndex) => (
                    <button
                        key={`cell-${rowIndex},${colIndex}`}
                        className="bg-smoke font-cursive h-28 text-6xl text-earth uppercase md:text-7xl md:h-32"
                        onClick={() => onSelect(rowIndex, colIndex)}
                        disabled={!!board[rowIndex][colIndex]}
                    >
                        {col}
                    </button>
                ))
            )}
        </div>
    );
}