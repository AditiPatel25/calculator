document.addEventListener('DOMContentLoaded', function () {
    function add(num1, num2) {
        num1 = parseFloat(num1)
        num2 = parseFloat(num2)
        result = num1 + num2
        result = roundIfNeeded(result)
    }

    function subtract(num1, num2) {
        result = num1 - num2
        result = roundIfNeeded(result)
    }

    function multiply(num1, num2) {
        result = num1 * num2
        result = roundIfNeeded(result)
    }

    function divide(num1, num2) {
        if (num2 == 0) {
            result = "silly goose";
            return;
        }
        result = num1 / num2;
        result = roundIfNeeded(result)
    }

    // Helper function to round result if necessary
    function roundIfNeeded(value) {
        // Check if the value has a decimal part
        if (value % 1 !== 0) {
            return parseFloat(value.toFixed(8));
        } else {
            return value;
        }
    }

    function operate(num1, num2, operator) {
        if (operator === "+") {
            add(num1, num2);
        } else if (operator === "—") {
            subtract(num1, num2);
        } else if (operator === "*") {
            multiply(num1, num2);
        } else if (operator === "/") {
            divide(num1, num2);
        }
    }

    let num1 = 0;
    let num2 = null;
    let result = null;
    let operator = null;
    const display = document.getElementById("display");
    const displayText = document.createElement("h2");
    displayText.className = "display-text";
    let currentValue = '';
    displayText.textContent = 0;
    display.appendChild(displayText);

    const numberButtons = Array.from(document.getElementsByClassName("number-button"));
    const operatorButtons = Array.from(document.getElementsByClassName("operator-button"));
    const allButtons = Array.from(document.querySelectorAll("button"));

    // displays numbers 
    numberButtons.forEach(button => {
        button.addEventListener('click', function () {
            updateDisplay(button.textContent);
        });
    });

    function updateDisplay(value) {
        if (result !== null && operator === null) {
            clearDisplay();
        }
        // Update currentValue
        currentValue += value;
        // Update display text
        displayText.textContent = currentValue;
    }

        // DARKENS EACH BUTTON WHEN PRESSED
        allButtons.forEach(button => {
            button.addEventListener('click', function () {
                darkenButton(button); // Darken the button
            }
        )})

        function darkenButton(button) {
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 100);
        }

        // MATH OPERATIONS
        operatorButtons.forEach(button => {
            button.addEventListener('click', function () {
                operator = button.textContent;
                num1 = displayText.textContent
                currentValue = '';
            });
        });

        const equalButton = document.getElementById("equal-button");
        equalButton.addEventListener('click', function () {
            num2 = displayText.textContent
            operate(num1, num2, operator)
            displayText.textContent = result;

            // reset values for potential next operation
            num1 = result;
            num2 = null;
            operator = null;
            currentValue = ''; 
        });

        // CLEARS DISPLAY
        const clearButton = document.getElementById("clear-button");
        clearButton.addEventListener("click", clearDisplay)

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
            let num = displayText.textContent;
            num = num / 100;
            currentValue = num
            displayText.textContent = currentValue;
        });
});