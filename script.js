const numberBtns = document.querySelectorAll(".number-button");
const decimalBtn = document.querySelector(".decimal-button");
const operatorBtns = document.querySelectorAll(".operator-button");
const equalBtn = document.querySelector(".equal-button");
const clearBtn = document.querySelector(".clear-button");
const operatorSelected = document.querySelector(".operator-selected");
const backBtn = document.querySelector(".back-button");

let currentNumber = "0";
let lastNumber = "";
let operatorSign = null;
let result = false;

// Number buttons
numberBtns.forEach((e) => {
    e.addEventListener("click", () => {
        if (currentNumber.replace(".", "").length >= 10) {
            alert("Max digits reached!");
            return;
        }

        if (result === true) {
            currentNumber = "";
            result = false;
        }

        if (currentNumber === "0") {
            currentNumber = e.textContent;
        } else {
            currentNumber += e.textContent;
        }

        updateDisplay(currentNumber);
    })
});

// Decimal button
decimalBtn.addEventListener("click", () => {
    if (result === true) {
        currentNumber = "";
        result = false;
    }

    if (!currentNumber.includes(".") && result === false) {
        currentNumber += ".";
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
        currentNumber = String(operation(lastNumber, currentNumber, operatorSign));

        if(currentNumber.length > 13) {
            currentNumber = "";
            updateDisplay("Error!");
            return;
        }

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
    operatorSign = "";
    operatorSelected.textContent = "";
    updateDisplay(currentNumber);
})

// Back button
backBtn.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay(currentNumber);
})

function operation(num1, num2, operator) {

    switch (operator) {
        case "+":
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
    display.textContent = number;
}