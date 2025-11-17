const display = document.querySelector("#display");

let currentNumber = "";
let lastNumber = "";
let operatorSign = "";

const numberBtns = document.querySelectorAll(".number-button");
const operatorBtns = document.querySelectorAll(".operator-button");
const equalBtn = document.querySelector(".equal-button");
const clearBtn = document.querySelector(".clear-button");

// Number buttons
numberBtns.forEach((e) => {
    e.addEventListener("click", () => {

        // Wipes the initial zero in the display
        if (display.textContent === "0") {
            display.textContent = "";
        }

        // Adds the selected button number to current number
        // Stops inputs past 15 digits
        if (display.textContent.length < 15) {
            currentNumber += e.textContent;
            display.textContent = currentNumber;
        } else {
            alert("Can't enter more than 15 digits");
        }
    })
});

// Operator buttons
operatorBtns.forEach((e) => {
    e.addEventListener("click", () => {
        lastNumber = currentNumber;
        currentNumber = "";
        operatorSign = e.textContent;
    })
})

// Equal button
equalBtn.addEventListener("click", () => {
    display.textContent = operation(lastNumber, currentNumber, operatorSign);
    currentNumber = "";
    lastNumber = "";
    operatorSign = "";
})

// Clear button
clearBtn.addEventListener("click", () => {
    currentNumber = "";
    lastNumber = "";
    operatorSign = "";
    display.textContent = "0";
})


function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function operation(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
    }
}