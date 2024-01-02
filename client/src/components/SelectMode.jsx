import PropTypes from "prop-types";
import Card from "./ui/Card.jsx";

export default function SelectMode({onSelectMode}) {
    return (
        <Card title='Select Game Mode'>
            <div className='mt-10 text-center space-x-10'>
                <button
                    type='button'
                    className='border-2 border-lightYellow bg-black font-bold mx-auto px-6 py-2 focus:outline-none'
                    onClick={() => onSelectMode('single')}
                >
                    Single Player
                </button>
                <button
                    type='button'
                    className='border-2 border-lightYellow bg-black font-bold mx-auto px-6 py-2 focus:outline-none'
                    onClick={() => onSelectMode('multi')}
                >
                    Multi Player
                </button>
            </div>
        </Card>
    )
}

SelectMode.propTypes = {
    onSelectMode: PropTypes.string.isRequired
}