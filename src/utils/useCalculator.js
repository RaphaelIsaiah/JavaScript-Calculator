import { useState, useEffect, useCallback } from "react";
import { handleClick } from "./handleClick";

export const useCalculator = () => {
  const [calculatorState, setCalculatorState] = useState({
    expression: "0",
    result: "",
  });
  const [activeKey, setActiveKey] = useState("");

  const onButtonClick = useCallback((keyTrigger) => {
    setCalculatorState((prevState) => handleClick(prevState, keyTrigger));
  }, []);

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      let key = event.key;

      // Map keys for consistency with button values
      if (key === "Enter") key = "=";
      if (key === "Backspace") key = "D";
      if (key === "Delete") key = "C";

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
        "D",
        "C",
      ];

      if (validKeys.includes(key)) {
        setActiveKey(key);
        onButtonClick(key);
      }
    };

    const handleKeyUp = () => {
      // Ensure smooth transition
      setTimeout(() => setActiveKey(""), 150);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onButtonClick]);

  return { calculatorState, onButtonClick, activeKey, setActiveKey };
};
