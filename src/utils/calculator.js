/**
 * Pure Mathematical Engine & Precision Formatter
 */

/**
 * Eliminates floating point rounding issues (e.g. 0.1 + 0.2 = 0.3)
 * @param {number|string} value
 * @returns {string}
 */
export function formatResult(value) {
  if (isNaN(value)) return 'Error';
  if (!isFinite(value)) return 'Cannot divide by 0';

  // Limit floating point precision to 10 decimal digits
  const rounded = Number(Math.round(Number(value + 'e+10')) + 'e-10');

  // Exponential format for very large or tiny numbers
  if (Math.abs(rounded) >= 1e12 || (Math.abs(rounded) > 0 && Math.abs(rounded) < 1e-7)) {
    return rounded.toExponential(6).replace(/\+?0*e/, 'e');
  }

  return rounded.toString();
}

/**
 * Evaluates binary operation (num1 op num2)
 * @param {string} a
 * @param {string} b
 * @param {string} op
 * @returns {number|string}
 */
export function calculate(a, b, op) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);

  if (isNaN(num1) || isNaN(num2)) return 'Error';

  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
    case '−':
      return num1 - num2;
    case '×':
    case '*':
      return num1 * num2;
    case '÷':
    case '/':
      if (num2 === 0) return 'Cannot divide by 0';
      return num1 / num2;
    default:
      return num2;
  }
}

/**
 * Calculates live preview result before user hits '='
 * @param {string} previousInput
 * @param {string} currentInput
 * @param {string|null} activeOperator
 * @returns {string}
 */
export function getLivePreview(previousInput, currentInput, activeOperator) {
  if (!activeOperator || previousInput === '' || currentInput === '') {
    return '';
  }
  if (currentInput === 'Cannot divide by 0' || currentInput === 'Error') {
    return '';
  }

  const preview = calculate(previousInput, currentInput, activeOperator);
  if (preview === 'Cannot divide by 0') {
    return 'Division by zero';
  }
  if (!isNaN(preview) && isFinite(preview)) {
    return `= ${formatResult(preview)}`;
  }
  return '';
}
