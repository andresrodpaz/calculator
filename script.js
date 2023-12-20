// Initialize variables
let runningTotal = 0;
let buffer = "0";
let previousOperator;

// Get the display screen element
const screen = document.querySelector('.screen');

/**
 * Handles button clicks, distinguishing between symbols and numbers.
 * @param {string | number} value - The value of the clicked button.
 */
function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    updateScreen();
}

/**
 * Handles different symbol actions such as clear, equals, backspace, and operators.
 * @param {string} symbol - The symbol clicked.
 */
function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            clearBuffer();
            break;

        case '=':
            if (previousOperator !== undefined) {
                performCalculation(parseInt(buffer));
                previousOperator = undefined;
                buffer = runningTotal.toString();
            }
            break;

        case '←':
            if (buffer.length === 1) {
                clearBuffer();
            } else {
                buffer = buffer.slice(0, -1);
            }
            break;

        case '+':
        case '-':
        case '×':
        case '÷':
            handleOperator(symbol);
            break;
    }
}

/**
 * Handles arithmetic operators, performing calculations based on the previous input.
 * @param {string} symbol - The operator symbol clicked.
 */
function handleOperator(symbol) {
    if (previousOperator !== undefined) {
        performCalculation(parseInt(buffer));
        previousOperator = symbol;
        clearBuffer();
    } else {
        previousOperator = symbol;
        runningTotal = parseInt(buffer);
        clearBuffer();
    }
}

/**
 * Performs arithmetic calculations based on the previous operator.
 * @param {number} value - The value to be used in the calculation.
 */
function performCalculation(value) {
    switch (previousOperator) {
        case '+':
            runningTotal += value;
            break;
        case '-':
            runningTotal -= value;
            break;
        case '×':
            runningTotal *= value;
            break;
        case '÷':
            runningTotal /= value;
            break;
    }
}

/**
 * Handles the input of numeric values, updating the buffer accordingly.
 * @param {string | number} numberString - The number or digit clicked.
 */
function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

/**
 * Resets the input buffer to its default value, "0".
 */
function clearBuffer() {
    buffer = "0";
}

/**
 * Updates the display screen with the current buffer value.
 */
function updateScreen() {
    screen.innerText = buffer;
}


/**
 * Initializes the calculator by setting up an event listener for button clicks.
 */
function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    });
}

// Initialize the calculator
init();
