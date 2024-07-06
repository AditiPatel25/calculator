
let num1;
let num2;
let result;

function add(num1, num2) {
    result = num1 + num2
    return result;
}

function subtract(num1, num2) {
    result = num1 - num2
    return result
}

function multiply(num1, num2) {
    result = num1 * num2
    return result
}

function divide(num1, num2) {
    result = num1 / num2
    return result
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