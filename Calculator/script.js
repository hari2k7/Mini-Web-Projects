const bigScreen = document.querySelector(".big");
const smallScreen = document.querySelector(".small");

const numberKeys = document.querySelectorAll(".nk");
const operatorKeys = document.querySelectorAll(".opk");
const clearBtn = document.getElementById("clear");
const backspace = document.getElementById("cb");

let currentInput = "";
let previousInput = "";
let operator = null;
let justCalculated = false;

function updateDisplay() {
    const value = currentInput || "0";
    bigScreen.textContent = value;
    smallScreen.textContent = previousInput + " " + (operator || "");

    // Shrink font size if number is too long
    if (value.length > 9) {
        bigScreen.style.fontSize = "28px";
    } else if (value.length > 6) {
        bigScreen.style.fontSize = "38px";
    } else {
        bigScreen.style.fontSize = "50px";
    }
}

numberKeys.forEach(button => {
    button.addEventListener("click", () => {
        const val = button.textContent;

        // Start fresh after = result
        if (justCalculated) {
            currentInput = "";
            justCalculated = false;
        }

        // Block leading zeros
        if (currentInput === "0" && val !== ".") return;

        currentInput += val;
        updateDisplay();
    });
});

operatorKeys.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "=") {
            calculate();
            return;
        }

        if (value === ".") {
            if (currentInput === "") currentInput = "0";
            if (!currentInput.includes(".")) currentInput += ".";
            updateDisplay();
            return;
        }

        if (currentInput === "" && previousInput === "") return;

        // Chain operators without pressing =
        if (currentInput !== "" && previousInput !== "" && operator) {
            calculate();
        }

        operator = value;
        previousInput = currentInput || previousInput;
        currentInput = "";
        justCalculated = false;
        updateDisplay();
    });
});

function calculate() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    let result;

    switch (operator) {
        case "+": result = prev + curr; break;
        case "-": result = prev - curr; break;
        case "*": result = prev * curr; break;
        case "/":
            result = curr === 0 ? "Error" : prev / curr;
            break;
        default: return;
    }

    // Fix float precision
    currentInput = typeof result === "string"
        ? result
        : parseFloat(result.toFixed(10)).toString();

    operator = null;
    previousInput = "";
    justCalculated = true;
    updateDisplay();
}

clearBtn.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = null;
    justCalculated = false;
    updateDisplay();
});

backspace.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});