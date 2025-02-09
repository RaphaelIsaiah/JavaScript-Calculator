import CalculatorBtns from "./CalculatorBtns";
import Display from "./Display";
import { buttonsPack } from "../utils/buttonsPack";
// import { useState } from "react";
import { useCalculator } from "../utils/useCalculator";

const Calculator = () => {
  const { calculatorState, onButtonClick } = useCalculator();

  const {expression, result} = calculatorState;

  const btns = buttonsPack;

  return (
    <div className="calculator">
      <div>
        <Display expression={expression} result={result} />
      </div>
      <div className="buttons">
        {btns.map((btn) => (
          <CalculatorBtns
            key={btn.id}
            keyTrigger={btn.keyTrigger}
            id={btn.id}
            handleClick={onButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
