import PropTypes from "prop-types";

const Display = ({ expression, result }) => {
  return (
    <div id="display">
    {result !== "" ? result : expression}
  </div>
  );
};

Display.propTypes = {
  expression: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};

export default Display;
