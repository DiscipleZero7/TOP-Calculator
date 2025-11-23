const display = document.querySelector(".display-number");
const numberBtns = document.querySelectorAll(".number-button");
const decimalBtn = document.querySelector(".decimal-button");
const operatorBtns = document.querySelectorAll(".operator-button");
const equalBtn = document.querySelector(".equal-button");
const clearBtn = document.querySelector(".clear-button");
const operatorSelected = document.querySelector(".operator-selected");
const backBtn = document.querySelector(".back-button");

let decimal = false;
let operatorSign = null;
let currentNumber = 0;
let savedNumber = null;
let result = false;

// Keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key;
    
    // Number keys
    if (/^[0-9]$/.test(key)) {
        if (result) {
            result = false;
            display.classList.remove("result");
            if (!saveNumber) {
            clear();
            }
        }
        updateValue(updateDisplay(key))
    }

    // Decimal key
    if (key === ".") {
        if (result) {
            result = false;
            display.classList.remove("result");
            if (!savedNumber) {
                clear();
            }
        }

        if (!decimal) {
            decimal = true;
            updateValue(updateDisplay("."));
        }
    }

    // Operator key
    if (/^[+\-*\/]$/.test(key)) {
       if (result) {
            updateOperator(key);
            currentNumber = null;
            savedNumber = Number(display.textContent.replaceAll(",", ""));
        } else if (savedNumber !== null && currentNumber !== null) {
            operation(operatorSign);
            updateOperator(key);
            currentNumber = null;
            savedNumber = Number(display.textContent.replaceAll(",", ""));
        }

        updateOperator(key);
        if (savedNumber === null && !result) {
            saveNumber();
        } 
    }

    // Equal key
    if (key === "Enter") {
        if (savedNumber !== null && currentNumber !== null) {
            updateDisplay("OPERATION")
        } else {
            alert("Invalid input");
        }
    }

    // Backspace key
    if (key === "Backspace") {
        updateValue(updateDisplay("BACKSPACE"));
    }

    // Clear key
    if (key === "c") {
        clear();
    }
})

numberBtns.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (result) {
            result = false;
            display.classList.remove("result");
            if (!saveNumber) {
            clear();
            }
        }
        updateValue(updateDisplay(digit.textContent))
    })
})

decimalBtn.addEventListener("click", () => {
    if (result) {
            result = false;
            display.classList.remove("result");
            if (!savedNumber) {
                clear();
            }
        }

    if (!decimal) {
        decimal = true;
        updateValue(updateDisplay("."));
    }
})

operatorBtns.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (result) {
            updateOperator(operator.textContent);
            currentNumber = null;
            savedNumber = Number(display.textContent.replaceAll(",", ""));
        } else if (savedNumber !== null && currentNumber !== null) {
            operation(operatorSign);
            updateOperator(operator.textContent);
            currentNumber = null;
            savedNumber = Number(display.textContent.replaceAll(",", ""));
        }

        updateOperator(operator.textContent);
        if (savedNumber === null && !result) {
            saveNumber();
        }
    })
})

equalBtn.addEventListener("click", () => {
    if (savedNumber !== null && currentNumber !== null) {
       updateDisplay("OPERATION")
    } else {
        alert("Invalid input");
    }
})

backBtn.addEventListener("click", () => {
    updateValue(updateDisplay("BACKSPACE"));
})

clearBtn.addEventListener("click", clear);

function updateDisplay(value) {

    // Resets display is currentNumber and display don't match
    if (currentNumber === null && value !== "BACKSPACE") {
        display.textContent = "";
    }

    // Chooses between deleting a digit or appending a digit
    // If the display is left empty after a backspace, returns null for logic
    // If appending to the display, checks if there's enough room
    if (value === "BACKSPACE") {
        result = false;
        display.classList.remove("result");
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === "") {
            return null;
        }   
    } else {
        if (display.textContent.replaceAll(",", "").replaceAll(".", "").length >= 12 && !result) {
            alert("Digit limit reached");
        } else {
            display.textContent += value;
        }
    }

    if (value === "OPERATION") {
        operation(operatorSign);
    }

    // Used to convert string to number for both logic and proper display
    const converted = Number(display.textContent.replaceAll(",", ""));

    // Handles comma seperation and decimal cases
    if (!display.textContent.includes(".") && display.textContent !== "") {
        display.textContent = converted.toLocaleString("en-US");
        decimal = false;
    } else if (display.textContent === ".") {
        display.textContent = "0.";
        return 0;
    }

    return converted;
}

function updateValue(value) {
    currentNumber = (value);
}

function clear() {
    display.textContent = "";
    currentNumber = null;
    savedNumber = null;
    decimal = false;
    updateOperator(null);
    result = false;
    display.classList.remove("result");
}

function updateOperator(sign) {
    operatorSign = sign;
    operatorSelected.textContent = operatorSign;
}

function saveNumber() {
    savedNumber = currentNumber;
    currentNumber = null;
}

function operation(sign) {
    result = true;
    display.classList.add("result")
    let output;
    switch (sign) {
        case "+":
            output = savedNumber + currentNumber;
            if(output > 999999999999) {
                alert("Exceeded max value");
                output = 999999999999;
            }

            display.textContent = output.toLocaleString("en-US");
            savedNumber = null;
            currentNumber = null;
            updateOperator(null);
            break;
        
        case "-":
            display.textContent = (savedNumber - currentNumber).toLocaleString("en-US");
            savedNumber = null;
            currentNumber = null;
            updateOperator(null);
            break;

        case "*":
            output = savedNumber * currentNumber;
            if(output > 999999999999) {
                alert("Exceeded max value");
                output = 999999999999;
            }

            display.textContent = output.toLocaleString("en-US");
            savedNumber = null;
            currentNumber = null;
            updateOperator(null);
            break;

        case "/":
            if (currentNumber === 0) {
                clear();
                return alert("THE WORLD EXPLODED!!");
            }

            display.textContent = (savedNumber / currentNumber).toLocaleString("en-US");
            savedNumber = null;
            currentNumber = null;
            updateOperator(null);
            break;
    }
}