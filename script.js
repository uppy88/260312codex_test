const display = document.getElementById('display');
const keys = document.querySelector('.keys');

let current = '0';
let previous = null;
let operator = null;
let shouldReset = false;

const updateDisplay = () => {
  display.value = current;
};

const inputNumber = (num) => {
  if (shouldReset) {
    current = num;
    shouldReset = false;
    return;
  }

  current = current === '0' ? num : current + num;
};

const inputDecimal = () => {
  if (shouldReset) {
    current = '0.';
    shouldReset = false;
    return;
  }

  if (!current.includes('.')) {
    current += '.';
  }
};

const clearAll = () => {
  current = '0';
  previous = null;
  operator = null;
  shouldReset = false;
};

const deleteOne = () => {
  if (shouldReset) return;
  current = current.length > 1 ? current.slice(0, -1) : '0';
};

const calculate = () => {
  if (previous === null || operator === null) return;

  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  let result;

  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = curr === 0 ? 'Error' : prev / curr;
      break;
    default:
      return;
  }

  current = String(result);
  previous = null;
  operator = null;
  shouldReset = true;
};

const handleOperator = (nextOperator) => {
  if (operator && !shouldReset) {
    calculate();
  }

  previous = current;
  operator = nextOperator;
  shouldReset = true;
};

const handlePercent = () => {
  current = String(parseFloat(current) / 100);
};

keys.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  const value = button.dataset.value;

  switch (action) {
    case 'number':
      inputNumber(value);
      break;
    case 'decimal':
      inputDecimal();
      break;
    case 'operator':
      handleOperator(value);
      break;
    case 'equals':
      calculate();
      break;
    case 'clear':
      clearAll();
      break;
    case 'delete':
      deleteOne();
      break;
    case 'percent':
      handlePercent();
      break;
    default:
      break;
  }

  updateDisplay();
});
