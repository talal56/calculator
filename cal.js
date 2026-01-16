const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleInput(value);
    });
});

function handleInput(value) {
    if (value >= '0' && value <= '9' || value === '.') {
        handleNumber(value);
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
        handleOperator(value);
    } else if (value === '=') {
        calculate();
    } else if (value === 'C') {
        clear();
    } else if (value === '⌫') {
        backspace();
    } else if (value === '%') {
        handlePercent();
    }
}

function handleNumber(num) {
    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    
    if (currentInput === '' && previousInput !== '') {
        operator = op;
        return;
    }
    
    if (previousInput !== '' && currentInput !== '') {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Error';
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('');
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

function handlePercent() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.value = value;
}