import PropTypes from "prop-types";

const Display = ({ expression, result }) => {
  return (
    <div
      className="relative bg-gray-900 rounded-lg p-4 border-4 border-gray-700
     shadow-[inset_0_-4px_8px_rgba(0,0,0,0.5)] text-right"
    >
      {/* Background shine effect for glass-like depth */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-600 to-transparent opacity-20 rounded-t-lg"></div>

      <div className="pr-4 text-gray-400 font-mono mb-2 text-tiny sm:text-xl">
        {expression}
      </div>
      <div
        id="display"
        className="pr-4 text-small sm:text-2xl font-mono font-bold text-white"
      >
        {result !== "" ? result : expression}
      </div>
    </div>
  );
};

Display.propTypes = {
  expression: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};

export default Display;
