import {useContext} from "react";
import GameContext from "./contexts/game-context.jsx";
import Header from './components/layout/Header.jsx';
import Footer from "./components/layout/Footer.jsx";
import SelectMode from './components/SelectMode.jsx';
import SelectSettings from "./components/SelectSettings.jsx";
import Game from "./components/game/Game.jsx"

function App() {
    const ctx = useContext(GameContext)

    return (
        <>
            <Header/>
            <main className="container mx-auto px-2">
                {ctx.page === 0 && <SelectMode/>}

                {ctx.page === 1 && <SelectSettings/>}

                {ctx.page === 2 && <Game />}
            </main>
            <Footer/>
        </>
    );
}

export default App;
