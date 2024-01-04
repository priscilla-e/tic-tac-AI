import {useContext, useEffect, useRef} from 'react';
import GameContext from './contexts/game-context.jsx';
import Header from './components/layout/Header.jsx';
import Footer from "./components/layout/Footer.jsx";
import SelectMode from './components/SelectMode.jsx';
import SelectSettings from "./components/SelectSettings.jsx";
import Card from "./components/ui/Card.jsx";
import PlayerName from "./components/PlayerName.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import {
    checkDraw,
    getNextTurn,
    checkWinner,
    getRandomEmptyCell,
    playAudio,
    getMoveFromGPT,
    getMoveFromMinimax
} from "./utils.js";
import clickSound from './assets/click-sound.wav';
import { HiMiniSpeakerWave } from "react-icons/hi2";
import StatusBar from "./components/StatusBar.jsx";

function App() {
    console.log('App')
    const ctx = useContext(GameContext);
    let comTimeoutRef = useRef(null);

    let turn = null // Whose turn is it? X or O
    let winner = null;
    let isDraw = null;
    let isComTurn = null

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
        <>
            <Header/>
            <main className="container mx-auto px-2">
                {ctx.page === 0 && <SelectMode/>}

                {ctx.page === 1 && <SelectSettings/>}

                {ctx.page === 2 &&
                    <div className='space-y-2'>
                        <StatusBar />
                        <Card>
                            <div className="flex">
                                <PlayerName name={ctx.settings['X']} symbol='X' isActive={turn === 'X'}/>
                                <PlayerName name={ctx.settings['O']} symbol='O' isActive={turn === 'O'}/>
                            </div>
                            <GameBoard isComTurn={isComTurn} onSelect={handleSelect}/>
                            {(winner || isDraw) && <GameOver winner={winner}/>}
                        </Card>
                    </div>
                }
            </main>
            <Footer/>
        </>
    );
}

export default App;
