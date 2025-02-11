import { evaluateExpression } from "./evaluateExpression";

// Helper: returns true if a token is one of our operators.
function isOperator(token) {
  return ["+", "-", "*", "/"].includes(token);
}

export const handleClick = (state, keyTrigger) => {
  let { expression, result } = state;

  // === Handle Clear Button (C) ===
  // Reset the calculator to its initial state.
  if (keyTrigger === "C") {
    return { expression: "0", result: "" };
  }

  // === Handle Delete Button (D) ===
  // "D" stands for DEL (delete last character).
  if (keyTrigger === "D") {
    // If a result is showing (after evaluation), reset everything.
    if (result !== "") {
      return { expression: "0", result: "" };
    }
    // Tokenize the expression (tokens are separated by a space).
    let tokens = expression.trim().split(" ");
    // If there are no tokens, reset to "0"
    if (tokens.length === 0) {
      return { ...state, expression: "0" };
    }
    // Remove the last character from the last token.
    let lastToken = tokens[tokens.length - 1];
    lastToken = lastToken.slice(0, -1);
    // If the last token becomes empty after deletion, remove it entirely.
    if (lastToken === "") {
      tokens.pop();
    } else {
      tokens[tokens.length - 1] = lastToken;
    }
    // Reassemble tokens with spaces (or reset to "0" if empty).
    const newExpression = tokens.length > 0 ? tokens.join(" ") : "0";
    return { ...state, expression: newExpression };
  }

  // === Handle Digit & Decimal Input ===
  if (/[\d.]/.test(keyTrigger)) {
    // If a previous result is showing, start a new expression with the digit.
    if (result !== "") {
      return { expression: keyTrigger, result: "" };
    }
    // If the current expression is just "0" (initial state) and the input isn’t a decimal,
    // replace "0" with the digit.
    if (expression === "0" && keyTrigger !== ".") {
      return { ...state, expression: keyTrigger };
    }
    // Tokenize the expression (tokens will be numbers or operators).
    let tokens = expression.trim().split(" ");
    // Get the last token (the current number in progress or the last operator).
    let lastToken = tokens[tokens.length - 1];

    // === Decimal Check ===
    // If the key pressed is a decimal point, check if the current number already contains one.
    if (keyTrigger === ".") {
      // If the last token already includes a ".", ignore the input.
      if (lastToken.includes(".")) {
        return state;
      }
    }

    // === Append the Digit or Decimal ===
    // If the last token is a number (i.e. not an operator), append directly (no space).
    if (!isOperator(lastToken)) {
      tokens[tokens.length - 1] = lastToken + keyTrigger;
    } else {
      // If the last token is an operator, push a new token containing the digit.
      tokens.push(keyTrigger);
    }
    return { ...state, expression: tokens.join(" ") };
  }

  // === Handle Evaluation ("=") ===
  if (keyTrigger === "=") {
    try {
      // Remove spaces to obtain the raw expression (so mathjs sees "555+662" instead of "555 + 662").
      let rawExpression = expression.replace(/\s/g, "");
      // Sanitize the raw expression (handle negatives, double negatives, extra operators).
      let sanitizedExpression = rawExpression
        .replace(/([+*/])-([0-9])/g, "$1(-$2)")
        .replace(/--/g, "+")
        .replace(/([+\-*/]){2,}/g, (match) => match[match.length - 1]);
      const evalResult = evaluateExpression(sanitizedExpression);
      // Keep the spaced expression for display; store the evaluated result.
      return { expression, result: evalResult.toString() };
    } catch (error) {
      return { ...state, result: `Error: ${error}` };
    }
  }

  // === Handle Operator Input (+, -, *, /) ===
  if (/[+\-*/]/.test(keyTrigger)) {
    // If a previous result exists, start a new expression using that result.
    if (result !== "") {
      return { expression: result + " " + keyTrigger, result: "" };
    }
    // Tokenize the expression.
    let tokens = expression.trim().split(" ");
    // If the last token is an operator:
    if (tokens.length > 0 && isOperator(tokens[tokens.length - 1])) {
      // Special handling for "-" to allow negative numbers:
      // For example, if the user types "5 *" and then "-", we want tokens to become ["5", "*", "-"].
      if (keyTrigger === "-" && tokens[tokens.length - 1] !== "-") {
        tokens.push(keyTrigger);
      } else {
        // For other cases, replace the last operator token with the new operator.
        tokens[tokens.length - 1] = keyTrigger;
      }
    } else {
      // If the last token is a number, add the operator as a new token.
      tokens.push(keyTrigger);
    }
    return { ...state, expression: tokens.join(" ") };
  }

  // If no condition matches, return the state unchanged.
  return state;
};
