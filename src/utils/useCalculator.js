import { useState, useEffect, useCallback } from "react";
import { handleClick } from "./handleClick";

export const useCalculator = () => {
  const [calculatorState, setCalculatorState] = useState({
    expression: "0",
    result: "",
  });

  const onButtonClick = useCallback((keyTrigger) => {
    setCalculatorState((prevState) => handleClick(prevState, keyTrigger));
  }, []);

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      const validKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
        "+",
        "-",
        "*",
        "/",
        "=",
        "Enter",
        "Backspace",
        "Delete",
      ];

      if (validKeys.includes(key)) {
        if (key === "Enter") onButtonClick("=");
        else if (key === "Backspace" || key === "Delete") onButtonClick("C");
        else onButtonClick(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onButtonClick]);

  return { calculatorState, onButtonClick };
};
