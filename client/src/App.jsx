import {useContext} from 'react';
import GameContext from './contexts/game-context.jsx';
import Header from './components/layout/Header.jsx';
import Footer from "./components/layout/Footer.jsx";
import SelectMode from './components/SelectMode.jsx';
import SelectSettings from "./components/SelectSettings.jsx";
import Card from "./components/ui/Card.jsx";
import GameBoard from "./components/GameBoard.jsx";
import PlayerName from "./components/PlayerName.jsx";


function App() {
    const ctx = useContext(GameContext);


    return (
        <>
            <Header/>
            <main className="container mx-auto px-2">
                {ctx.page === 0 && <SelectMode/>}
                {ctx.page === 1 && <SelectSettings/>}

                {ctx.page === 2 &&
                    <Card>
                        <div className="flex">
                            <PlayerName name={ctx.settings.player1} symbol='X' isActive={true}/>
                            <PlayerName name={ctx.settings.player2} symbol='O' isActive={false}/>
                        </div>
                        <GameBoard isComTurn={false}  onSelect={() => console.log('h')}/>
                    </Card>
                }
            </main>
            <Footer/>
        </>
    );
}

export default App;
