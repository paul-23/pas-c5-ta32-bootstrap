// Mostramos el modal con información aidiconal
$( document ).ready(function() {
    $('#myModal').modal('toggle')
});

//Variables globales
let currentNumber = '';
let previousNumber = '';
let operator = '';
let string = '';
const resultScreen = document.getElementById('result');
const stringScreen = document.getElementById('string');

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
    clearScreen();
    currentNumber = '';
    previousNumber = '';
    operator = '';
    updateScreenString('0');
    updateScreen('');
    stringFormat();
}

// Borra el último número ingresado
function clearPrevious() {
    if (currentNumber.length > 1) {
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
    stringScreen.style.color = "#000";
    stringScreen.style.fontSize = "35px";
}

// Actualiza la pantalla con el resultado
function updateScreen(number) {
    resultScreen.value = number;
}

// Actualiza la pantalla con la cadena de operaciones
function updateScreenString(string) {
    stringScreen.value = string;
}

function chekError() {
    if (string === 'Infinity' || currentNumber === 'Infinity' || previousNumber === 'Infinity') {
        clearAll();
    }
}

// Inserta un número
function insertNumber(number) {
    chekError();
    currentNumber += number;
    string += number;
    updateScreenString(string);
}

// Inserta un operador
function insertOperator(op) {
    chekError();
    if (operator && currentNumber !== '') {
        if (previousNumber === '') {
            previousNumber = currentNumber;
        } else {
            calculate();
            previousNumber = currentNumber;
        }
        currentNumber = '';
        string = previousNumber + op;
        updateScreenString(string);
    } else if (previousNumber !== '') {
        if (/\+|\-|\*|\//.test(string.slice(-1))) {
            string = string.slice(0, -1) + op;
        } else {
            string += op;
        }
        updateScreenString(string);
    }
    operator = op;
    if (currentNumber !== '') {
        previousNumber = currentNumber;
        string = previousNumber + operator;
        currentNumber = '';
        updateScreenString(string);
    }
}

// Calcula el resultado
function calculate() {
    let result;
    if (previousNumber !== '' && currentNumber !== '') {
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
    }

    currentNumber = result.toString();
    updateScreen(currentNumber);
    operator = '';
    previousNumber = '';
    string = '';
    stringScreen.style.color = "#8d8d8d";
    stringScreen.style.fontSize = "25px";
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