import {useState} from 'react'

import Header from './components/Header.jsx'
import Player from './components/Player.jsx'

function App() {
    return (
        <>
            <Header/>
            <main className="container mx-auto px-2">

                {/*Game Container Card */}
                <div
                    className="relative mx-auto px-2 py-8 w-full bg-white shadow-custom rounded-md bg-gradient-to-b from-earth to-darkEarth md:max-w-2xl md:px-8 md:py-12"
                >
                    {/*Player Names Container*/}
                    <div className="flex space-x-2 md:space-x-10">
                        {/*Player Name 1*/}
                        <Player defaultName='Player 1' symbol='X'/>
                        <Player defaultName='Player 2' symbol='O'/>
                    </div>
                    Hello world
                </div>
            </main>
        </>
    )
}


export default App
