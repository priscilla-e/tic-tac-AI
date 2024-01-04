import PropTypes from "prop-types";
export default function GamePlayer({name, symbol, isActive}) {
    return (
        <>
            <div
                className={`flex items-center w-1/2 space-x-4 ${
                    isActive ? 'border-2 border-lightYellow animate-ping' : ''
                }`}
            >
                <span
                    className={`inline-block flex-1 w-10 whitespace-nowrap truncate px-2 py-2 text-sm text-smoke uppercase md:py-4 md:px-4 ${
                        isActive ? 'animate-pulse' : ''
                    }`}
                >
                    {name}
                </span>
                <span className="font-bold text-sm text-smoke uppercase px-4">
                    {symbol}
                </span>
            </div>
        </>
    );
}


GamePlayer.propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
}