import {useState} from 'react'

const INITIAL_GAMEBOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(INITIAL_GAMEBOARD);
    
    const handleClick = (row, col, symbol) => {
        setGameBoard((prevBoard) => {
            const newBoard = prevBoard.map(row => [...row])
            newBoard[row][col] = symbol
            return newBoard;
        });
    }
    
    return (
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mt-8 md:gap-6">
            {gameBoard.map((row, rowIndex) =>
                row.map((col, colIndex) => (
                    <button
                        key={`cell-${rowIndex},${colIndex}`}
                        className="bg-smoke font-cursive h-28 text-6xl text-earth uppercase md:text-7xl md:h-32"
                        onClick={() => handleClick(rowIndex, colIndex, 'X')}
                    >
                        {col}
                    </button>
                ))
            )}
        </div>
    );
}