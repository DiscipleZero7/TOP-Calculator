const display = document.querySelector("#display");

let currentNumber = "0";
let lastNumber = "";
let operatorSign = null;

const numberBtns = document.querySelectorAll(".number-button");
const operatorBtns = document.querySelectorAll(".operator-button");
const equalBtn = document.querySelector(".equal-button");
const clearBtn = document.querySelector(".clear-button");
const operatorSelected = document.querySelector(".operator-selected");

let result = false;

// Number buttons
numberBtns.forEach((e) => {
    e.addEventListener("click", () => {

        if (result === true) {
            currentNumber = "";
            result = false;
        }

        if (currentNumber === "0") {
            currentNumber = e.textContent;
        } else {
            currentNumber += e.textContent;
        }

        display.textContent = currentNumber;
    })
});

// Operator buttons
operatorBtns.forEach((e) => {
    e.addEventListener("click", () => {
        
        if (lastNumber === "") {
            lastNumber = currentNumber;
            currentNumber = "";
        } else if (currentNumber === ""){
            operatorSign = e.textContent;
            operatorSelected.textContent = operatorSign;
            return;
        } else {
            display.textContent = operation(lastNumber, currentNumber, operatorSign);
            
            lastNumber = operation(lastNumber, currentNumber, operatorSign);
            currentNumber = "";
        }

        operatorSign = e.textContent;
        operatorSelected.textContent = operatorSign;
    })
})

// Equal button
equalBtn.addEventListener("click", () => {
    // Only runs if operator has been selected
    if (operatorSign !== "") {
        result = true;
        display.textContent = operation(lastNumber, currentNumber, operatorSign);
        currentNumber = operation(lastNumber, currentNumber, operatorSign);
        lastNumber = "";
        operatorSign = "";
        operatorSelected.textContent = "";
    }
})

// Clear button
clearBtn.addEventListener("click", () => {
    currentNumber = "0";
    lastNumber = "";
    operatorSign = "";
    operatorSelected.textContent = "";
    display.textContent = currentNumber;
})


function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function mulitply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === "0") {
        alert("Very funny...");
        return 0;
    }
    return num1 / num2;
}

function operation(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);

        case "-":
            return subtract(num1, num2);

        case "*":
            return mulitply(num1, num2);

        case "/":
            return divide(num1, num2);
    }   
}