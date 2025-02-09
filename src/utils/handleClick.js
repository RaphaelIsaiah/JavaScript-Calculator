import { evaluateExpression } from "./evaluateExpression";

export const handleClick = (state, keyTrigger) => {
  const { expression, result } = state;

  // Clear: reset to initial state
  if (keyTrigger === "C") {
    return { expression: "0", result: "" };
  }

  // Handle digit and decimal input
  if (/[\d.]/.test(keyTrigger)) {
    if (result !== "") {
      return { expression: keyTrigger, result: "" };
    }
    if (expression === "0" && keyTrigger !== ".") {
      return { ...state, expression: keyTrigger };
    }
    const lastNumber = expression.split(/[+\-*/]/).pop();
    if (keyTrigger === "." && lastNumber.includes(".")) return state;

    return { ...state, expression: expression + keyTrigger };
  }

  // Handle evaluation
  if (keyTrigger === "=") {
    try {
      // ** Fix: Normalize expression before evaluation **
      let sanitizedExpression = expression
        .replace(/([+*/])-([0-9])/g, "$1(-$2)") // Convert "*/-" into "*(-"
        .replace(/--/g, "+") // Convert "--" to "+"
        .replace(/([+\-*/]){2,}/g, (match) => match[match.length - 1]); // Keep only the last operator (except "-")

      const evalResult = evaluateExpression(sanitizedExpression);
      return { expression, result: evalResult.toString() };
    } catch (error) {
      return { ...state, result: `Error: ${error}` };
    }
  }

  // Handle operator input (+, -, *, /)
  if (/[+\-*/]/.test(keyTrigger)) {
    if (result !== "") {
      return { expression: result + keyTrigger, result: "" };
    }

    // If multiple operators are entered, allow "-"; otherwise, keep only the last one.
    if (/[+\-*/]$/.test(expression)) {
      if (keyTrigger === "-" && expression[expression.length - 1] !== "-") {
        return { ...state, expression: expression + keyTrigger };
      }
      return { ...state, expression: expression.replace(/[+*/]+$/, "") + keyTrigger };
    }

    return { ...state, expression: expression + keyTrigger };
  }

  return state;
};
