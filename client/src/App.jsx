import {useContext} from 'react';
import Header from './components/layout/Header.jsx';
import SelectMode from './components/SelectMode.jsx';
import GameContext from './contexts/game-context.jsx';
import Footer from "./components/layout/Footer.jsx";
import SelectSettings from "./components/SelectSettings.jsx";

function App() {
    const ctx = useContext(GameContext);

    return (
        <>
            <Header/>
            <main className="container mx-auto px-2">
                {ctx.page === 0 && <SelectMode/>}
                {ctx.page === 1 && <SelectSettings/>}
            </main>
            <Footer/>
        </>
    );
}

export default App;
