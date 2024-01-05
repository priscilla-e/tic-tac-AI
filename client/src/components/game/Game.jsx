import {useContext, useEffect, useRef} from "react";
import GameContext from "../../contexts/game-context.jsx";
import GameStatus from "./GameStatus.jsx";
import Card from "../ui/Card.jsx";
import GamePlayer from "./GamePlayer.jsx";
import GameBoard from "./GameBoard.jsx";
import GameOver from "./GameOver.jsx";
import {
    checkDraw,
    checkWinner,
    getMoveFromGPT,
    getMoveFromMinimax,
    getNextTurn,
    getRandomEmptyCell,
    playAudio
} from "../../utils.js";
import clickSound from "../../assets/click-sound.wav";


export default function Game() {
    const ctx = useContext(GameContext);

    let turn = null // Whose turn is it? X or O
    let winner = null;
    let isDraw = null;
    let isComTurn = null
    let comTimeoutRef = useRef(null);

    if (ctx.board) {
        turn = getNextTurn(ctx.board);
        winner = checkWinner(ctx.board);
        isDraw = !winner && checkDraw(ctx.board)
        isComTurn = !winner && !isDraw && ctx.mode === 'single' && turn === 'O';
    }

    const handleSelect = (i, j) => {
        if (ctx.settings.allowAudio) {
            playAudio(clickSound);
        }
        const newBoard = [...ctx.board];
        newBoard[i][j] = turn;
        ctx.setBoard(newBoard);
    }

    // Simulating computer's turn
    useEffect(() => {
        if (!isComTurn) return;

        async function getComMove() {
            if (ctx.settings.difficulty === 'easy') {
                // Use random algorithm
                return new Promise((resolve) => {
                    comTimeoutRef.current = setTimeout(() => {
                        resolve(getRandomEmptyCell(ctx.board))
                    }, 1000)
                })
            } else if (ctx.settings.difficulty === 'medium') {
                // Use GPT algorithm
                return getMoveFromGPT(ctx.board)
            } else if (ctx.settings.difficulty === 'hard') {
                // Use Minimax algorithm
                let timeout = 500
                if (ctx.board.length < 5) {
                    timeout = 1000 // board 3x3 and 4x4 take less time to evaluate
                }
                return new Promise((resolve) => {
                    comTimeoutRef.current = setTimeout(() => {
                        resolve(getMoveFromMinimax(ctx.board))
                    }, timeout)
                })
            }
        }

        getComMove().then((move) => {
            handleSelect(move.row, move.col)
        });

        // clean up
        return () => {
            clearTimeout(comTimeoutRef.current)
        }
    }, [isComTurn, ctx.board, ctx.settings?.difficulty])

    return (
        <div className='space-y-2'>
            <GameStatus />
            <Card>
                <div className="flex">
                    <GamePlayer name={ctx.settings['X']} symbol='X' isActive={turn === 'X'}/>
                    <GamePlayer name={ctx.settings['O']} symbol='O' isActive={turn === 'O'}/>
                </div>
                <GameBoard isComTurn={isComTurn} onSelect={handleSelect}/>
                {(winner || isDraw) && <GameOver winner={winner}/>}
            </Card>
        </div>
    )
}