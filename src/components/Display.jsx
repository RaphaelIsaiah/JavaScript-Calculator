import PropTypes from "prop-types";

const Display = ({ expression, result }) => {
  return (
    <div className="display-container bg-blue-950 rounded p-1 text-right">
      <div className="bg-rose-700 rounded my-0.5 pr-4">{expression}</div>
      <div id="display" className="bg-fuchsia-700 rounded my-0.5 pr-4">
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
