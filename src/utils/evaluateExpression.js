import { evaluate } from "mathjs";

export const evaluateExpression = (expression) => {
  try {
    const result = evaluate(expression);
    return parseFloat(result.toFixed(4)); // Round to 4 decimal places
  } catch (error) {
    return `Error: ${error}`;
  }
};
