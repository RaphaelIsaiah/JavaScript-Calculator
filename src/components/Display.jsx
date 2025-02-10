import PropTypes from "prop-types";

const Display = ({ expression, result }) => {
  return (
    <div className="display-container">
      <div className="expression">{expression}</div>
      <div id="display" className="result">
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
