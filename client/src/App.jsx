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
import {checkDraw, checkTurn, checkWinner, getRandomEmptyCell, playAudio} from "./utils.js";
import clickSound from './assets/click-sound.wav';

function App() {
    console.log('App')
    const ctx = useContext(GameContext);
    let comTimeoutRef = useRef(null);

    let turn = null;
    let winner = null;
    let isDraw = null;
    let isComTurn = null

    if (ctx.board) {
        turn = checkTurn(ctx.board);
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

        if (ctx.settings.difficulty === 'easy') {
            // Use random algorithm
            comTimeoutRef.current = setTimeout(() => {
                const move = getRandomEmptyCell(ctx.board)
                handleSelect(move.row, move.col);
            }, 1000) // 1 second delay
        } else if (ctx.settings.difficulty === 'medium') {
            // Use GPT algorithm


        } else if (ctx.settings.difficulty === 'hard') {
            // Use Minimax algorithm
        }

        // clean up
        return () => {
            clearTimeout(comTimeoutRef.current)
        }


    }, [isComTurn])

    return (
        <>
            <Header/>
            <main className="container mx-auto px-2">
                {ctx.page === 0 && <SelectMode/>}

                {ctx.page === 1 && <SelectSettings/>}

                {ctx.page === 2 &&
                    <div>
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
