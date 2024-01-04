import {useContext} from "react";
import GameContext from '../../contexts/game-context.jsx'
import {HiMiniSpeakerWave, HiMiniSpeakerXMark} from "react-icons/hi2";

export default function GameStatus() {
    const ctx = useContext(GameContext)

    const handleAudio = () => {
        ctx.setSettings((prevSettings) => {
            return {...prevSettings, allowAudio: !prevSettings.allowAudio}
        })
    }

    return (
        <div
            className='animate-fade-in flex items-center justify-between text-gray-300 mx-auto px-2 py-6 w-full bg-white shadow-custom rounded-md bg-gradient-to-b from-earth to-darkEarth md:max-w-2xl md:px-14'>
            <div>
                <span className="font-bold">Mode: </span>
                <span className="capitalize">{ctx.mode + ' Player'}</span>
            </div>
            {ctx.mode === 'single' &&
                <div>
                    <span className="font-bold">Difficulty: </span>
                    <span className="capitalize">{ctx.settings.difficulty}</span>
                </div>
            }
            <div className='text-2xl md:text-3xl'>
                {ctx.settings?.allowAudio ?
                    <HiMiniSpeakerWave onClick={handleAudio}/>
                    :
                    <HiMiniSpeakerXMark onClick={handleAudio}/>
                }
            </div>
        </div>

    )
}