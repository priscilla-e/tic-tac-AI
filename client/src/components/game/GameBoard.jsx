import {useContext} from 'react';
import GameContext from '../../contexts/game-context.jsx';
import PropTypes from "prop-types";

export default function GameBoard({onSelect, isComTurn}) {
    const ctx = useContext(GameContext);

    let classes = 'grid grid-cols-3 gap-3 max-w-lg mx-auto mt-8 md:gap-6';

    if (ctx.board?.length === 4) {
        classes = 'grid grid-cols-4 gap-3 max-w-lg mx-auto mt-8 md:gap-6';
    }
    if (ctx.board?.length=== 5) {
        classes = 'grid grid-cols-5 gap-3 max-w-lg mx-auto mt-8 md:gap-6';
    }

    return (
        <div
            className={classes}
        >
            {ctx.board.map((row, rowIndex) =>
                row.map((col, colIndex) => (
                    <button
                        key={`cell-${rowIndex},${colIndex}`}
                        className="bg-smoke font-cursive h-28 text-6xl text-earth uppercase md:text-7xl md:h-32"
                        onClick={() => onSelect(rowIndex, colIndex)}
                        disabled={!!ctx.board[rowIndex][colIndex] || isComTurn} // DISABLED if computer's turn or cell is already occupied
                    >
                        {col}
                    </button>
                ))
            )}
        </div>
    );
}

GameBoard.propTypes = {
    onSelect: PropTypes.func,
    isComTurn: PropTypes.bool.isRequired
}
