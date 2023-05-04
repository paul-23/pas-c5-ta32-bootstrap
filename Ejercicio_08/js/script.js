//Variables globales
let currentNumber = '';
let previousNumber = '';
let operator = '';
let string = '';
let calculationFinished = false;

clearAll();

// Limpia la pantalla
function clearScreen() {
    currentNumber = '';
    string = '';
    updateScreenString('0');
    updateScreen('');
    stringFormat();
}

// Limpia todo
function clearAll() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    calculationFinished = false;
    updateScreenString('0');
    updateScreen('');
    stringFormat();
}

// Borra el último número ingresado
function clearPrevious() {
    if (calculationFinished) {
        clearAll();
    } else if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
        string = string.slice(0, -1);
        updateScreenString(string);
    } else {
        currentNumber = '';
        string = string.slice(0, -1);
        updateScreenString(string || '0');
    }
}

function stringFormat() {
    document.getElementById("string").style.color = "#000";
    document.getElementById("string").style.fontSize = "35px";
}

// Actualiza la pantalla con el resultado
function updateScreen(number) {
    document.getElementById('result').value = number;
}

// Actualiza la pantalla con la cadena de operaciones
function updateScreenString(string) {
    document.getElementById('string').value = string;
}

// Inserta un número
function insertNumber(number) {
    if (calculationFinished) {
        clearAll();
    }
    currentNumber += number;
    string += number;
    updateScreenString(string);
}

// Inserta un operador
function insertOperator(op) {
    if (calculationFinished) {
        calculationFinished = false;
    }
    if (operator) {
        string = string.slice(0, -1); // Remueve el operador anterior de la cadena de operaciones
    }
    operator = op;
    string += operator;
    if (currentNumber) { // Si hay un número actual, lo guarda como número anterior
        previousNumber = currentNumber;
        string = previousNumber + operator;
        currentNumber = '';
    }
    updateScreenString(string);
}

// Calcula el resultado
function calculate() {
    let result;
    switch (operator) {
        case '+':
            result = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case '/':
            result = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        case '%':
            result = parseFloat(previousNumber) % parseFloat(currentNumber);
            break;
        case '1/x':
            result = 1 / parseFloat(currentNumber);
            break;
        case 'sqrt':
            result = Math.sqrt(parseFloat(currentNumber));
            break;
        default:
            break;
    }
    currentNumber = result.toString();
    updateScreen(currentNumber);
    operator = '';
    previousNumber = '';
    string = '';
    calculationFinished = true;
    document.getElementById("string").style.color = "#8d8d8d";
    document.getElementById("string").style.fontSize = "25px";
}

// Cambia el signo del número
function toggleSign() {
    currentNumber = (parseFloat(currentNumber) * -1).toString();
    updateScreen(currentNumber);
}

// Inserta un punto decimal
function insertDecimal() {
    if (currentNumber.indexOf('.') === -1) {
        if (currentNumber === '') {
            currentNumber = '0';
        }
        currentNumber += '.';
        updateScreen(currentNumber);
    }
}
// Función para insertar valores por teclado
document.addEventListener("keydown", function (event) {
    if (event.key >= 0 && event.key <= 9) {
        insertNumber(parseInt(event.key));
    } else if (event.key === "+") {
        insertOperator("+");
    } else if (event.key === "-") {
        insertOperator("-");
    } else if (event.key === "*") {
        insertOperator("*");
    } else if (event.key === "/") {
        insertOperator("/");
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === ".") {
        insertDecimal();
    } else if (event.key === "Backspace") {
        clearPrevious();
    } else if (event.key === "Escape") {
        clearScreen();
    } else if (event.key === "Delete") {
        clearScreen();
    }
});