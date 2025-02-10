import PropTypes from "prop-types";

const CalculatorBtns = ({ keyTrigger, id, handleClick }) => {
  return (
    <div>
      <button
        value={keyTrigger}
        id={id}
        onClick={() => handleClick(keyTrigger)}
      >
        {keyTrigger}
      </button>
    </div>
  );
};

CalculatorBtns.propTypes = {
  keyTrigger: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default CalculatorBtns;
