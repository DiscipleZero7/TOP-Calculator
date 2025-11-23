const display = document.querySelector(".display-number");
const numberBtns = document.querySelectorAll(".number-button");
const decimalBtn = document.querySelector(".decimal-button");
const operatorBtns = document.querySelectorAll(".operator-button");
const equalBtn = document.querySelector(".equal-button");
const clearBtn = document.querySelector(".clear-button");
const operatorSelected = document.querySelector(".operator-selected");
const backBtn = document.querySelector(".back-button");

let decimal = false;
let result = false;

let currentNumber = 0;
let lastNumber = 0;
let operatorSign = "";

numberBtns.forEach((e) => {
    e.addEventListener("click", () => {
        updateDisplay(e)
    })
})

decimalBtn.addEventListener("click", () => {
    decimal = true;

    if(result === true) {
        if (operatorSign === "") {
            lastNumber = 0;
        }

        result = false;
        display.classList.remove("result");
        display.textContent = "";
    }

    if (!display.textContent.includes(".")) {
        if (display.textContent === "") {
            display.textContent += "0";
        }
        display.textContent += ".";
    }
})

// Operations
operatorBtns.forEach((e) => {
    e.addEventListener("click", () => {
        if (result === true) {
            operatorSign = e.textContent;
            operatorSelected.textContent = operatorSign;
            return;
        }

        if (display.textContent !== "") {
            if(lastNumber) {
                display.textContent = operation(lastNumber, currentNumber, operatorSign).toLocaleString("en-US");
                lastNumber = operation(lastNumber, currentNumber, operatorSign);
                currentNumber = 0;
                operatorSign = e.textContent;
                operatorSelected.textContent = operatorSign;
                return;
            }
            operatorSign = e.textContent;
            operatorSelected.textContent = operatorSign;
            lastNumber = currentNumber;
            currentNumber = 0;
            display.textContent = "";
        } else if (lastNumber) {
            operatorSign = e.textContent;
            operatorSelected.textContent = operatorSign;
        } else {
            alert("Invalid input!");
        }
    })
})

clearBtn.addEventListener("click", () => {
    currentNumber = 0;
    lastNumber = 0;
    operatorSign = "";
    operatorSelected.textContent = operatorSign;
    decimal = false;
    result = false;
    display.classList.remove("result");
    display.textContent = "";
})

equalBtn.addEventListener("click", () => {
    if (operatorSign !== "") {
        if (operation(lastNumber, currentNumber, operatorSign) > 999999999) {
        display.textContent = "ERROR";
        currentNumber = 0;
        lastNumber = 0;
        operatorSign = "";
        operatorSelected.textContent = operatorSign;
        decimal = false;
        return;
    }

        display.textContent = operation(lastNumber, currentNumber, operatorSign).toLocaleString("en-US");
        lastNumber = operation(lastNumber, currentNumber, operatorSign);
        currentNumber = 0;
        operatorSign = "";
        operatorSelected.textContent = operatorSign;
    } else {
        alert("Invalid input")
    }
})

backBtn.addEventListener("click", () => {
    //TODO
})

function updateDisplay(e) {
    if (display.textContent.replaceAll(",", "").length >= 9) {
        alert("Digit limit reached");
        return;
    }

    if (result === true) {
        if (operatorSign === "") {
            lastNumber = 0;
        }

        result = false;
        display.classList.remove("result");
        display.textContent = "";
    }

    display.textContent += e.textContent;
    let converted = Number(display.textContent.replaceAll(",", ""));

    if (!decimal) {
        display.textContent = converted.toLocaleString("en-US");
    }

    currentNumber = converted
}

function operation(num1, num2, sign) {
    result = true;
    display.classList.add("result")
    switch (sign) {
        case "+":
            return num1 + num2;
        
        case "-":
            return num1 - num2;

        case "*":
            return num1 * num2;

        case "/":
            if(num2 === 0) {
                display.textContent = "VERY FUNNY";
                return 0;
            }
            return num1 / num2;
    }
}