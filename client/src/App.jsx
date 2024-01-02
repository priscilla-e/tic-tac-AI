import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import PlayNow from './components/PlayNow.jsx';
import GameMode from './components/GameMode.jsx';

function App() {
    const [page, setPage] = useState(0);
    const [mode , setMode] = useState('single');

    const handleGameMode = (mode) => {
        setMode(mode);
        setPage(2);
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-2">
                {page === 0 && <PlayNow onPlay={() => setPage(1)}/>}
                {page === 1 && <GameMode onSelectMode={handleGameMode}/>}
            </main>
        </>
    );
}

export default App;
