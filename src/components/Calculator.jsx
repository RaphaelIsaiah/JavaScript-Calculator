import CalculatorBtns from "./CalculatorBtns";
import Display from "./Display";
import { buttonsPack } from "../utils/buttonsPack";
import { useCalculator } from "../utils/useCalculator";

const Calculator = () => {
  const { calculatorState, onButtonClick, activeKey, setActiveKey } =
    useCalculator();

  const { expression, result } = calculatorState;

  const btns = buttonsPack;

  return (
    <div className="calculator bg-cyan-800 w-full p-1 rounded flex flex-col items-center justify-center gap-3 shadow-4xl">
      {/* Display section */}
      <div className="bg-slate-400 p-1 rounded w-full">
        <Display expression={expression} result={result} />
      </div>

      {/* Buttons section */}
      <div className="w-full">
        <div className="calc-btns rounded grid grid-cols-4 gap-1 md:gap-1.5 select-none">
          {btns.map((btn) => (
            <CalculatorBtns
              key={btn.id}
              keyTrigger={btn.keyTrigger}
              id={btn.id}
              handleClick={onButtonClick}
              className={btn.className}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
