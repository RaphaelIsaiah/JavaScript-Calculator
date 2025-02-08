import CalculatorBtns from "./CalculatorBtns";
import { buttonsPack } from "../utils/buttonsPack";

const Calculator = () => {
  const btns = buttonsPack;

  return (
    <div>
      {btns.map((btn) => (
        <CalculatorBtns key={btn.id} keyTrigger={btn.keyTrigger} id={btn.id} />
      ))}
    </div>
  );
};

export default Calculator;
