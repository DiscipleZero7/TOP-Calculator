const numberBtns = document.querySelectorAll(".number-button");
const decimalBtn = document.querySelector(".decimal-button");
const operatorBtns = document.querySelectorAll(".operator-button");
const equalBtn = document.querySelector(".equal-button");
const clearBtn = document.querySelector(".clear-button");
const operatorSelected = document.querySelector(".operator-selected");
const backBtn = document.querySelector(".back-button");

let currentNumber = 0;
let lastNumber = "";
let operatorSign = "";
let decimal = false;
let result = false;

// Number buttons
numberBtns.forEach((e) => {
    e.addEventListener("click", () => {

        if (result === true) {
            currentNumber = "";
            result = false;
        }

        if (decimal === true) {
            decimal = false;
            currentNumber += `.${e.textContent}`;
            updateDisplay(currentNumber);
        } else {
            currentNumber += e.textContent;
            currentNumber = Number(currentNumber);
            updateDisplay(currentNumber);
        }
        
    })
});

// Decimal button
decimalBtn.addEventListener("click", () => {
    if (result === true) {
        currentNumber = "";
        result = false;
    }

    if (!String(currentNumber).includes(".") && result === false) {
        decimal = true;
        updateDisplay(currentNumber);
    }
})

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
            lastNumber = operation(lastNumber, currentNumber, operatorSign);
            updateDisplay(lastNumber);
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
        currentNumber = operation(lastNumber, currentNumber, operatorSign);

        updateDisplay(currentNumber);
        lastNumber = "";
        operatorSign = "";
        operatorSelected.textContent = "";
    }
})

// Clear button
clearBtn.addEventListener("click", () => {
    currentNumber = "";
    lastNumber = "";
    decimal = false;
    operatorSign = "";
    operatorSelected.textContent = "";
    updateDisplay(currentNumber);
})

// Back button
backBtn.addEventListener("click", () => {
    result = false;
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay(currentNumber);
})

function operation(num1, num2, operator) {

    switch (operator) {
        case "+":
            /*if ((num1 + num2) % 1 !== 0) {
                return (Number(num1) + Number(num2)).toFixed(3);
            }*/

            return Number(num1) + Number(num2);

        case "-":
            return Number(num1) - Number(num2);

        case "*":
            return Number(num1) * Number(num2);

        case "/":
            if (Number(num2) === 0) {
                alert("Very funny...");
                return 0;
            }

            if ((Number(num1) / Number(num2)) % 1 !== 0) {
                return (Number(num1) / Number(num2)).toFixed(3);
            }

            return Number(num1) / Number(num2);
    }   
}

function updateDisplay(number) {
    const display = document.querySelector(".display-number");

    if (result === true) {
        display.classList.add("result");
    } else {
        display.classList.remove("result");
    }

    display.textContent = number.toLocaleString("en-US", {
        maximumFractionDigits: 10
    });

    if (decimal === true) {
        display.textContent += ".";
    }
}
