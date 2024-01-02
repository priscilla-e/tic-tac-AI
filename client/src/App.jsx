import {useContext} from 'react';
import Header from './components/Header.jsx';
import PlayNow from './components/PlayNow.jsx';
import GameMode from './components/GameMode.jsx';
import GameContext from './contexts/game-context.jsx';

function App() {
    const ctx = useContext(GameContext);


    const handleGameMode = (mode) => {
        ctx.setMode(mode)
        ctx.setPage(2);
    }

    return (
        <>
            <Header/>
            <main className="container mx-auto px-2">
                {ctx.page === 0 && <PlayNow onPlay={() => ctx.setPage(1)}/>}
                {ctx.page === 1 && <GameMode onSelectMode={handleGameMode}/>}
            </main>
        </>
    );
}

export default App;
