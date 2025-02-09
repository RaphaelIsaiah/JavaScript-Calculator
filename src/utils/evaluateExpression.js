export const evaluateExpression = (expression) => {
  try {
    const result = eval(expression);
    return parseFloat(result.toFixed(4)); // Round to 4 decimal places
  } catch {
    return "Error";
  }
};
