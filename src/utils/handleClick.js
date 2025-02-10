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

  // Handle evaluation when "=" is pressed
  if (keyTrigger === "=") {
    try {
      // Normalize the expression before evaluation
      let sanitizedExpression = expression
        // Convert cases like "* -5" into "*(-5)" to handle negative numbers correctly
        .replace(/([+*/])-([0-9])/g, "$1(-$2)")
        // Convert "--" to "+" as two negatives make a positive
        .replace(/--/g, "+")
        // Keep only the last operator in a sequence (except when "-" is needed for negatives)
        .replace(/([+\-*/]){2,}/g, (match) => match[match.length - 1]);

      // Evaluate the sanitized expression
      const evalResult = evaluateExpression(sanitizedExpression);

      // return the result while keeping the evaluation intact
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

    // If multiple operators are entered
    if (/[+\-*/]$/.test(expression)) {
      if (keyTrigger === "-") {
        // Allow only ONE negative sign if a valid operator exists before it.
        if (!/[-]{2,}$/.test(expression)) {
          return { ...state, expression: expression + keyTrigger };
        }
      }
      // Remove all unnecessary operators and keep the last valid one
      return {
        ...state,
        expression: expression.replace(/[+*/-]+$/, "") + keyTrigger,
      };
    }

    // Append the operator normally if it's valid
    return { ...state, expression: expression + keyTrigger };
  }

  return state;
};
