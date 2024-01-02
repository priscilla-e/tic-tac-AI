import {useContext} from 'react';
import Header from './components/layout/Header.jsx';
import PlayNow from './components/PlayNow.jsx';
import SelectMode from './components/SelectMode.jsx';
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
                {ctx.page === 1 && <SelectMode onSelectMode={handleGameMode}/>}
            </main>
        </>
    );
}

export default App;
