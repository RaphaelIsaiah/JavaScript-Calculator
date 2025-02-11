import PropTypes from "prop-types";

const Display = ({ expression, result }) => {
  return (
    <div className="display-container bg-gray-900 rounded-lg p-4 shadow-inner border-4 border-gray-700 text-right ">
      <div className=" pr-4 text-gray-400 font-mono mb-2 text-tiny sm:text-xl">
        {expression}
      </div>
      <div
        id="display"
        className=" pr-4 text-small sm:text-2xl font-mono font-bold "
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
