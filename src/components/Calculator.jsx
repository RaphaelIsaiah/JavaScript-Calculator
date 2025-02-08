import CalculatorBtns from "./CalculatorBtns";
import Display from "./Display";
import { buttonsPack } from "../utils/buttonsPack";
import { useState } from "react";

const evaluateExpression = (expression) => {
  // Split the expression into numbers and operators
  const operators = expression.split(/[\d.]+/).filter(Boolean);
  const numbers = expression.split(/[^0-9.]+/).map(Number);

  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    switch (operators[i - 1]) {
      case "+":
        result += numbers[i];
        break;
      case "-":
        result -= numbers[i];
        break;
      case "*":
        result *= numbers[i];
        break;
      case "/":
        result /= numbers[i];
        break;
      default:
        break;
    }
  }

  // Return result with 4 decimal places
  return result.toFixed(4);
};

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (keyTrigger) => {
    if (keyTrigger === "C") {
      setExpression("0");
      setResult("");
    } else if (keyTrigger === "=") {
      try {
        const evalResult = evaluateExpression(expression);
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else if (/[\d.]/.test(keyTrigger)) {
      // Prevent leading zero
      if (expression === "0" && keyTrigger !== ".") {
        setExpression(keyTrigger);
        return;
      }

      // Prevent multiple decimals in a number
      if (keyTrigger === "." && expression.slice(-1) === ".") return;

      setExpression((prev) => prev + keyTrigger);
    } else if (/[+\-*/]/.test(keyTrigger)) {
      // Prevent multiple operators (excluding negative sign)
      if (/[+\-*/]$/.test(expression) && keyTrigger !== "-") return;

      setExpression((prev) => prev + keyTrigger);
    }
  };

  const btns = buttonsPack;

  return (
    <div>
      <div>
        <Display expression={expression} result={result} />
      </div>
      <div>
        {btns.map((btn) => (
          <CalculatorBtns
            key={btn.id}
            keyTrigger={btn.keyTrigger}
            id={btn.id}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
