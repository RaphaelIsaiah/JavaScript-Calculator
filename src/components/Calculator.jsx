import CalculatorBtns from "./CalculatorBtns";
import Display from "./Display";
import { buttonsPack } from "../utils/buttonsPack";

const Calculator = () => {
  const btns = buttonsPack;

  return (
    <div>
      <div>
        <Display />
      </div>
      <div>
        {btns.map((btn) => (
          <CalculatorBtns
            key={btn.id}
            keyTrigger={btn.keyTrigger}
            id={btn.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
