import PropTypes from "prop-types";

export default function Button({children, onClick, ...props }) {
    return (
        <button
            {...props}
            onClick={onClick}
            className='border-2 border-lightYellow bg-black font-bold px-6 py-2 duration-300 hover:scale-105 focus:outline-none'
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
}