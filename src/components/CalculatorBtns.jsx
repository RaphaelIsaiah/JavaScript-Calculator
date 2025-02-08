import PropTypes from "prop-types";

const CalculatorBtns = ({ keyTrigger, id }) => {
  return (
    <div>
      <button value={keyTrigger} id={id}>
        {keyTrigger}
      </button>
    </div>
  );
};

CalculatorBtns.propTypes = {
  keyTrigger: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default CalculatorBtns;
