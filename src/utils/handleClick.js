import { evaluateExpression } from "./evaluateExpression";

export const handleClick = (state, keyTrigger) => {
  const { expression } = state;

  if (keyTrigger === "C") {
    return { expression: "0", result: "" };
  } else if (keyTrigger === "=") {
    try {
      const evalResult = evaluateExpression(expression);
      return {
        expression: expression.toString(),
        result: evalResult.toString(),
      };
    } catch (error) {
      return { ...state, result: `Error: ${error}` };
    }
  } else if (/[\d.]/.test(keyTrigger)) {
    // Prevent leading zeros
    if (expression === "0" && keyTrigger !== ".") {
      return { ...state, expression: keyTrigger };
    }

    // Prevent multiple decimals in a single number
    const lastNumber = expression.split(/[+\-*/]/).pop();
    if (keyTrigger === "." && lastNumber.includes(".")) return state;

    return { ...state, expression: expression + keyTrigger };
  } else if (/[+\-*/]/.test(keyTrigger)) {
    // Prevent multiple operators (excluding negative sign)
    if (/[+\-*/]$/.test(expression) && keyTrigger !== "-") return state;

    // Replace consecutive operators with the last one entered (except for negative sign)
    if (/[+\-*/]$/.test(expression)) {
      return { ...state, expression: expression.slice(0, -1) + keyTrigger };
    }

    return { ...state, expression: expression + keyTrigger };
  }

  return state;
};
