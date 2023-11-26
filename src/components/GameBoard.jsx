import {useRef} from 'react'
import clickSound from "../assets/click-sound.wav"


export default function GameBoard({board, onSelect}) {
    const clickAudioRef = useRef(new Audio(clickSound));

    const handleClick = (row, col) => {
        console.log(clickAudioRef);
        clickAudioRef.current.play().catch(error => console.error('Error playing sound:', error));
        onSelect(row, col);
    };
       

    return (
        <div
            className={`grid grid-cols-3 gap-3 max-w-lg mx-auto mt-8 md:gap-6`}
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