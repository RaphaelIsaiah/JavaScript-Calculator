// import { evaluate } from "mathjs";
import { evaluateExpression } from "./evaluateExpression";

export const handleClick = (state, keyTrigger) => {
  const { expression, result } = state;

  // Clear: reset to initial state
  if (keyTrigger === "C") {
    return { expression: "0", result: "" };
  }

  // Handle digit and decimal input
  if (/[\d.]/.test(keyTrigger)) {
    // If there's a previous evaluation result, start a new expression when a digit is pressed.
    if (result !== "") {
      return { expression: keyTrigger, result: "" };
    }
    // Prevent leading zeros (except for decimals)
    if (expression === "0" && keyTrigger !== ".") {
      return { ...state, expression: keyTrigger };
    }
    // Prevent multiple decimals in the current number segment
    const lastNumber = expression.split(/[+\-*/]/).pop();
    if (keyTrigger === "." && lastNumber.includes(".")) return state;

    return { ...state, expression: expression + keyTrigger };
  }

  // Handle evaluation
  if (keyTrigger === "=") {
    try {
      const evalResult = evaluateExpression(expression);
      return { expression, result: evalResult.toString() };
    } catch (error) {
      return { ...state, result: `Error: ${error}` };
    }
  }

  // Handle operator input (+, -, *, /)
  if (/[+\-*/]/.test(keyTrigger)) {
    // If there is a previous result, start a new calculation using that result.
    if (result !== "") {
      return { expression: result + keyTrigger, result: "" };
    }

    // Prevent multiple operators (excluding the negative sign "-")
    if (/[+\-*/]$/.test(expression)) {
      // If last two characters are an operator followed by "-", allow negative numbers
      if (/[+*/]-$/.test(expression) && keyTrigger !== "-") {
        return {
          ...state,
          expression: expression.slice(0, -2) + keyTrigger, // Replace second-to-last operator
        };
      }
    }

    // Otherwise, append the operator normally.
    return { ...state, expression: expression + keyTrigger };
  }

  return state;
};
