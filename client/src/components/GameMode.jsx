import PropTypes from "prop-types";
import Card from "./ui/Card.jsx";

export default function GameMode({onSelectMode}) {
    return (
        <Card title='Select Game Mode'>
            <div className='mt-10 text-center space-x-10'>
                <button
                    className='border-2 border-lightYellow bg-black font-bold mx-auto px-6 py-2 focus:outline-none'
                    type='button'
                >
                    Single Player
                </button>
                <button
                    className='border-2 border-lightYellow bg-black font-bold mx-auto px-6 py-2 focus:outline-none'
                    type='button'
                >
                    Multi Player
                </button>
            </div>
        </Card>
    )
}

GameMode.propTypes = {
    onSelectMode: PropTypes.string.isRequired
}