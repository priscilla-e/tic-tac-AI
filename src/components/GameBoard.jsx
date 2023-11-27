export default function GameBoard({board, onSelect}) {
    const boardSize = board.length;


    const handleClick = (row, col) => {
        onSelect(row, col);
    };
       

    return (
        <div
            className={`grid grid-cols-${boardSize} gap-3 max-w-lg mx-auto mt-8 md:gap-6`}
        >
            {board.map((row, rowIndex) =>
                row.map((col, colIndex) => (
                    <button
                        key={`cell-${rowIndex},${colIndex}`}
                        className="bg-smoke font-cursive h-28 text-6xl text-earth uppercase md:text-7xl md:h-32"
                        onClick={() => handleClick(rowIndex, colIndex)}
                        disabled={!!board[rowIndex][colIndex]}
                    >
                        {col}
                    </button>
                ))
            )}
        </div>
    );
}