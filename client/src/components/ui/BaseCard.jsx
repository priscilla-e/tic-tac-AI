import PropTypes from "prop-types";

export default function BaseCard({children}) {
    return (
        <div className="relative text-gray-300 mx-auto px-2 py-8 w-full bg-white shadow-custom rounded-md bg-gradient-to-b from-earth to-darkEarth md:max-w-2xl md:px-8 md:py-12">
            {children}
        </div>
    )
}

BaseCard.propTypes = {
    children: PropTypes.node.isRequired,
}