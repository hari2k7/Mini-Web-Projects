const bigScreen = document.querySelector(".big");
const smallScreen = document.querySelector(".small");

const numberKeys = document.querySelectorAll(".nk");
const operatorKeys = document.querySelectorAll(".opk");
const clearBtn = document.getElementById("clear");
const backspace = document.getElementById("cb");

let currentInput = "";
let previousInput = "";
let operator = null;

// Display update
function updateDisplay() {
    bigScreen.textContent = currentInput || "0";
    smallScreen.textContent = previousInput + " " + (operator || "");
}

// Number buttons
numberKeys.forEach(button => {
    button.addEventListener("click", () => {
        currentInput += button.textContent;
        updateDisplay();
    });
});

// Operator buttons
operatorKeys.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.textContent;

        if (value === "=") {
            calculate();
            return;
        }

        if (value === ".") {
            if (!currentInput.includes(".")) {
                currentInput += ".";
            }
            updateDisplay();
            return;
        }

        if (currentInput === "") return;

        operator = value;
        previousInput = currentInput;
        currentInput = "";
        updateDisplay();
    });
});

// Calculate result
function calculate() {
    let result;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case "+":
            result = prev + curr;
            break;

        case "-":
            result = prev - curr;
            break;

        case "*":
            result = prev * curr;
            break;

        case "/":
            result = prev / curr;
            break;

        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";
    updateDisplay();
}

// Clear button
clearBtn.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay();
});

// Backspace
backspace.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});