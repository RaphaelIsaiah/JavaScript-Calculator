import { evaluateExpression } from "./evaluateExpression";

export const handleClick = (state, keyTrigger) => {
  const { expression, result } = state;

  // === Handle Clear Button (C) ===
  // When "C" is pressed, reset the calculator to its initial state.
  if (keyTrigger === "C") {
    return { expression: "0", result: "" };
  }

  // === Handle Delete Button (DEL) ===
  // When "DEL" is pressed, remove the last character of the expression.
  if (keyTrigger === "D") {
    // If a result is currently displayed (from a previous evaluation),
    // pressing DEL resets the expression.
    if (result !== "") {
      return { expression: "0", result: "" };
    }
    // If the expression has only one character, resetting to "0" prevents empty expression.
    if (expression.length === 1) {
      return { ...state, expression: "0" };
    }
    // Otherwise, remove the last character.
    return { ...state, expression: expression.slice(0, -1) };
  }

  // === Handle Digit & Decimal Input ===
  if (/[\d.]/.test(keyTrigger)) {
    // If a previous result is displayed, start a new expression with the new digit.
    if (result !== "") {
      return { expression: keyTrigger, result: "" };
    }
    // Replace the initial "0" if a non-decimal digit is pressed.
    if (expression === "0" && keyTrigger !== ".") {
      return { ...state, expression: keyTrigger };
    }
    // Split the expression by any operator to get the current number segment.
    const lastNumber = expression.split(/[+\-*/]/).pop();
    // Prevent entering more than one decimal point in the current number segment.
    if (keyTrigger === "." && lastNumber.includes(".")) return state;

    // Append the digit or decimal point to the expression.
    return { ...state, expression: expression + keyTrigger };
  }

  // === Handle Evaluation ("=") ===
  if (keyTrigger === "=") {
    try {
      // Before evaluation, sanitize the expression to ensure it can be correctly interpreted:
      let sanitizedExpression = expression
        // Example: convert cases like "* -5" into "*(-5)" so negative numbers work properly.
        .replace(/([+*/])-([0-9])/g, "$1(-$2)")
        // Replace double negatives "--" with a plus sign ("+").
        .replace(/--/g, "+")
        // When multiple operators are entered consecutively, keep only the last one.
        // (This handles cases like "5 + + 5" so that the extra "+" is removed.)
        .replace(/([+\-*/]){2,}/g, (match) => match[match.length - 1]);

      // Evaluate the sanitized expression.
      const evalResult = evaluateExpression(sanitizedExpression);

      // Return the result as a string, while preserving the original expression.
      return { expression, result: evalResult.toString() };
    } catch (error) {
      // If evaluation fails, display an error message.
      return { ...state, result: `Error: ${error}` };
    }
  }

  // === Handle Operator Input (+, -, *, /) ===
  if (/[+\-*/]/.test(keyTrigger)) {
    // If a previous result exists, start a new expression using that result.
    if (result !== "") {
      return { expression: result + keyTrigger, result: "" };
    }

    // If the expression already ends with an operator...
    if (/[+\-*/]$/.test(expression)) {
      // Special handling for "-" to allow negative numbers:
      if (keyTrigger === "-") {
        // If the expression does not already end with two or more "-" signs,
        // allow one additional "-" (e.g., "5 * -" is valid).
        if (!/[-]{2,}$/.test(expression)) {
          return { ...state, expression: expression + keyTrigger };
        }
      }
      // For other operators (or if too many "-" are already present),
      // remove all consecutive operators at the end and then append the new one.
      return {
        ...state,
        expression: expression.replace(/[+*/-]+$/, "") + keyTrigger,
      };
    }

    // Otherwise, simply append the operator to the expression.
    return { ...state, expression: expression + keyTrigger };
  }

  // If no condition is met, return the state unchanged.
  return state;
};
