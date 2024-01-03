import {useContext} from 'react';
import GameContext from './contexts/game-context.jsx';
import Header from './components/layout/Header.jsx';
import Footer from "./components/layout/Footer.jsx";
import SelectMode from './components/SelectMode.jsx';
import SelectSettings from "./components/SelectSettings.jsx";
import Card from "./components/ui/Card.jsx";
import PlayerName from "./components/PlayerName.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import {checkDraw, checkTurn, checkWinner, playAudio} from "./utils.js";
import clickSound from './assets/click-sound.wav';




function App() {
    console.log('App')
    const ctx = useContext(GameContext);

    let turn = null;
    let winner = null;
    let isDraw = null;
    // let isComTurn = ctx.mode === 'multi' && turn === 'O';

    if (ctx.board) {
        turn = checkTurn(ctx.board);
        winner = checkWinner(ctx.board);
        isDraw = !winner && checkDraw(ctx.board)
    }

    const handleSelect = (i, j) => {
        if (ctx.settings.allowAudio) {
            playAudio(clickSound);
        }
        const newBoard = [...ctx.board];
        newBoard[i][j] = turn;
        ctx.setBoard(newBoard);
    }

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
                                <PlayerName name={ctx.settings['X']} symbol='X' isActive={true}/>
                                <PlayerName name={ctx.settings['O']} symbol='O' isActive={false}/>
                            </div>
                            <GameBoard isComTurn={false} onSelect={handleSelect}/>
                            {winner || isDraw && <GameOver winner={winner} />}
                        </Card>
                    </div>
                }
            </main>
            <Footer/>
        </>
    );
}

export default App;
