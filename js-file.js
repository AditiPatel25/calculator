document.addEventListener('DOMContentLoaded', function () {
    let num1 = 0;
    let num2 = null;
    let result = null;
    let operator = null;
    const display = document.getElementById("display");
    const displayText = document.createElement("h2");
    displayText.className = "display-text";
    let currentValue = '';
    displayText.textContent = '0';
    display.appendChild(displayText);
    let decimalEntered = false;

    const numberButtons = Array.from(document.getElementsByClassName("number-button"));
    const operatorButtons = Array.from(document.getElementsByClassName("operator-button"));
    const allButtons = Array.from(document.querySelectorAll("button"));

    // ROUNDS RESULT IF NECESSARY
    function roundIfNeeded(value) {
        if (value % 1 !== 0) {
            return parseFloat(value.toFixed(8));
        } else {
            return value;
        }
    }

    // MATH OPERATIONS
    function add(num1, num2) {
        return roundIfNeeded(num1 + num2);
    }

    function subtract(num1, num2) {
        return roundIfNeeded(num1 - num2);
    }

    function multiply(num1, num2) {
        return roundIfNeeded(num1 * num2);
    }

    function divide(num1, num2) {
        if (num2 === 0) {
            return "silly goose";
        }
        return roundIfNeeded(num1 / num2);
    }

    function operate(num1, num2, operator) {
        if (operator === "+") {
            return add(num1, num2);
        } else if (operator === "—") {
            return subtract(num1, num2);
        } else if (operator === "*") {
            return multiply(num1, num2);
        } else if (operator === "/") {
            return divide(num1, num2);
        }
        return null;
    }

    // MATH OPERATIONS
    operatorButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (num1 !== null && operator !== null && currentValue !== '') {
                num2 = parseFloat(currentValue);
                result = operate(parseFloat(num1), parseFloat(num2), operator);
                displayText.textContent = result;
                num1 = result; 
                num2 = null;
                currentValue = '';
                operator = button.textContent;
                decimalEntered = false;
            } else {
                operator = button.textContent;
                num1 = parseFloat(displayText.textContent);
                currentValue = '';
                decimalEntered = false;
            }
        });
    });

    const equalButton = document.getElementById("equal-button");
    equalButton.addEventListener('click', function () {
        if (num1 !== null && operator !== null && currentValue !== '') {
            num2 = parseFloat(currentValue);
            result = operate(parseFloat(num1), parseFloat(num2), operator);
            displayText.textContent = result;
            num1 = result; // Store result as num1 for potential next operation
            num2 = null;
            operator = null;
            currentValue = '';
        }
    });

    // DISPLAYS NUMBERS 
    numberButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (button.textContent === '.' && decimalEntered) {
                return;
            }
            if (button.textContent === '.') {
                decimalEntered = true; 
            }
            updateDisplay(button.textContent);
        });
    });

    function updateDisplay(value) {
        if (result !== null && operator === null) {
            clearDisplay();
        }
        currentValue += value;
        displayText.textContent = currentValue;
    }

    // DARKENS EACH BUTTON WHEN PRESSED
    allButtons.forEach(button => {
        button.addEventListener('click', function () {
            darkenButton(button); // Darken the button
        });
    });

    function darkenButton(button) {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 100);
    }

    // CLEARS DISPLAY
    const clearButton = document.getElementById("clear-button");
    clearButton.addEventListener("click", clearDisplay);

    function clearDisplay() {
        currentValue = '';
        displayText.textContent = '0';
        num1 = 0;
        num2 = null;
        operator = null;
        result = null;
    }

    // GETS PERCENTAGES
    const percentButton = document.getElementById("percent-button");
    percentButton.addEventListener("click", function () {
        let num = parseFloat(displayText.textContent);
        num = num / 100;
        currentValue = num.toString();
        displayText.textContent = currentValue;
    });

    // ADD NEGATIVE SIGN
    const negativeButton = document.getElementById("negative-button");
    negativeButton.addEventListener("click", function () {
        let num = parseFloat(displayText.textContent);
        num = -num;
        currentValue = num;
        displayText.textContent = currentValue;
    });
});