import PropTypes from "prop-types";

const CalculatorBtns = ({
  keyTrigger,
  id,
  handleClick,
  className,
  activeKey,
  setActiveKey,
}) => {
  const isActive = activeKey === keyTrigger;

  return (
    <div className={`${className} rounded shadow-3xl`}>
      <button
        value={keyTrigger}
        id={id}
        // onClick={() => handleClick(keyTrigger)}
        onClick={() => {
          setActiveKey(keyTrigger); // Ensure active effect on click / update active key on click
          handleClick(keyTrigger);
          setTimeout(() => setActiveKey(""), 150); // Reset active state after 150ms
        }}
        className={`calc-btn bg-fuchsia-700 py-7 w-full h-full rounded select-none outline-none cursor-pointer
           hover:bg-fuchsia-800 transition-all duration-150 ease-in-out ${
             isActive ? "bg-fuchsia-800 scale-97 shadow-4xl" : ""
           } `}
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
  className: PropTypes.string.isRequired,
  activeKey: PropTypes.string,
  setActiveKey: PropTypes.func.isRequired,
};
export default CalculatorBtns;
