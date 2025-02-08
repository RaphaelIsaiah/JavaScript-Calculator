import PropTypes from "prop-types";

const Display = ({ expression, result }) => {
  return (
    <div id="display">
      <div>{expression}</div>
      <div>{result}</div>
    </div>
  );
};

Display.propTypes = {
  expression: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};

export default Display;
