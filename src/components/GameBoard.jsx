export default function GameBoard({board, onSelect, isComTurn}) {

    let classes = 'grid grid-cols-3 gap-3 max-w-lg mx-auto mt-8 md:gap-6';
    if (board.length === 4) {
        classes = 'grid grid-cols-4 gap-3 max-w-lg mx-auto mt-8 md:gap-6';
    }

    return (
        <div
            className={classes}
        >
            {board.map((row, rowIndex) =>
                row.map((col, colIndex) => (
                    <button
                        key={`cell-${rowIndex},${colIndex}`}
                        className="bg-smoke font-cursive h-28 text-6xl text-earth uppercase md:text-7xl md:h-32"
                        onClick={() => onSelect(rowIndex, colIndex)}
                        disabled={!!board[rowIndex][colIndex] || isComTurn} // DISABLED if computer's turn or cell is already occupied
                    >
                        {col}
                    </button>
                ))
            )}
        </div>
    );
}