/// Estado de la calculadora
let calculatorState = {
    display: '0',
    previousOperand: '',
    currentOperand: '',
    operation: null,
    lastCalculation: ''
};

// Función para actualizar el display
function updateDisplay() {
    document.querySelector('.previous-operation').textContent = calculatorState.lastCalculation || (calculatorState.previousOperand + (calculatorState.operation || ''));
    document.querySelector('.current-operation').textContent = calculatorState.currentOperand || calculatorState.display;
}

// Función para manejar los clics en los botones numéricos
function handleNumberClick(number) {
    if (calculatorState.currentOperand === '0' && number === '0') return;
    if (calculatorState.currentOperand.includes('.') && number === '.') return;
    calculatorState.currentOperand = `${calculatorState.currentOperand || ''}${number}`;
    calculatorState.display = calculatorState.currentOperand;
    updateDisplay();
}

// Función para manejar los clics en los botones de operación
function handleOperationClick(operation) {
    if (calculatorState.currentOperand === '' && calculatorState.previousOperand === '') return;
    if (calculatorState.currentOperand === '') {
        calculatorState.operation = operation;
        updateDisplay();
        return;
    }
    if (calculatorState.previousOperand !== '') {
        calculate();
    }
    calculatorState.operation = operation;
    calculatorState.previousOperand = calculatorState.currentOperand;
    calculatorState.currentOperand = '';
    calculatorState.lastCalculation = '';
    updateDisplay();
}

// Función para realizar el cálculo
function calculate() {
    let result;
    const prev = parseFloat(calculatorState.previousOperand);
    const current = parseFloat(calculatorState.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (calculatorState.operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case 'Math.sin':
            result = Math.sin(current);
            break;
        case 'Math.cos':
            result = Math.cos(current);
            break;
        case 'Math.tan':
            result = Math.tan(current);
            break;
        case 'Math.log10':
            result = Math.log10(current);
            break;
        case 'Math.log':
            result = Math.log(current);
            break;
        case 'Math.sqrt':
            result = Math.sqrt(current);
            break;
        case 'Math.pow':
            result = Math.pow(prev, current);
            break;
        case 'factorial':
            result = factorial(current);
            break;
        default:
            return;
    }

    calculatorState.lastCalculation = `${calculatorState.previousOperand} ${calculatorState.operation} ${calculatorState.currentOperand}`;
    calculatorState.currentOperand = result.toString();
    calculatorState.operation = null;
    calculatorState.previousOperand = '';
    calculatorState.display = calculatorState.currentOperand;
    addToHistory(calculatorState.lastCalculation, result);
}

// Función para calcular el factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Función para manejar el clic en el botón de igual
function handleEqualsClick() {
    if (calculatorState.previousOperand && calculatorState.currentOperand && calculatorState.operation) {
        calculate();
        updateDisplay();
    }
}

// Función para limpiar la calculadora
function handleClearClick() {
    calculatorState = {
        display: '0',
        previousOperand: '',
        currentOperand: '',
        operation: null,
        lastCalculation: ''
    };
    updateDisplay();
}

// Función para cambiar entre modo oscuro y claro
function toggleDarkMode() {
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Cambiar entre el modo oscuro y claro
    body.classList.toggle('dark-mode');

    // Verifica si está en modo oscuro
    if (body.classList.contains('dark-mode')) {
        sunIcon.style.display = 'inline'; // Mostrar icono del sol
        moonIcon.style.display = 'none';   // Ocultar icono de la luna
    } else {
        sunIcon.style.display = 'none';    // Ocultar icono del sol
        moonIcon.style.display = 'inline'; // Mostrar icono de la luna
    }
}

// Asegúrate de que la función se llame cuando se cargue la página para establecer el estado inicial
document.addEventListener('DOMContentLoaded', () => {
    // Verifica el estado actual del modo y ajusta los iconos en consecuencia
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (body.classList.contains('dark-mode')) {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    }
});



// Función para activar/desactivar el modo científico
function toggleScientificMode() {
    const scientificButtons = document.querySelector('.scientific-buttons');
    const isScientific = scientificButtons.style.display !== 'none';
    scientificButtons.style.display = isScientific ? 'none' : 'grid';
    document.querySelector('#scientific-toggle span').textContent = isScientific ? 'Modo Científico' : 'Modo Básico';
}

// Función para mostrar/ocultar el historial
function toggleHistory() {
    const historyPanel = document.getElementById('history-panel');
    historyPanel.style.display = historyPanel.style.display === 'none' ? 'block' : 'none';
}

// Función para añadir una operación al historial
function addToHistory(operation, result) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${operation} = ${result}`;
    historyList.prepend(listItem);

    // Guardar en el almacenamiento local
    const history = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    history.unshift({ operation, result });
    localStorage.setItem('calculatorHistory', JSON.stringify(history.slice(0, 10))); // Guardar solo los últimos 10 cálculos
}

// Función para cargar el historial desde el almacenamiento local
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.operation} = ${item.result}`;
        historyList.appendChild(listItem);
    });
}

// Inicializar los iconos de Lucide y cargar el historial
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    loadHistory();
});
// Seleccionar todos los enlaces "ver más"
const verMasLinks = document.querySelectorAll('.project-link a');

verMasLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento por defecto del enlace
        const projectLink = this.closest('.project-link'); // Obtener el contenedor del proyecto
        projectLink.classList.toggle('active'); // Alternar la clase 'active' para mostrar/ocultar la descripción
    });
});
