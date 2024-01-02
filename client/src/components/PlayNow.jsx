import Card from "./ui/Card.jsx";
import PropTypes from "prop-types";

export default function PlayNow({onPlay}) {
    return (
        <Card>
            <p className='text-center text-lg '>
                Tic Tac Toe is a two-player game where players take turns marking a grid with X or O. The first to
                complete a row horizontally, vertically, or diagonally wins.
            </p>
            <div className="flex items-center justify-center mt-14">
                <button
                    type='button'
                    className='border-2 border-lightYellow bg-black font-bold animate-bounce mx-auto px-6 py-2 focus:outline-none'
                    onClick={onPlay}
                >
                    Play Now
                </button>
            </div>
        </Card>
    )
}

PlayNow.propTypes = {
    onPlay: PropTypes.func.isRequired,
}