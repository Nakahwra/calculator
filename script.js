// MANIPULANDO A DOM --------------
const currentOperationText = document.querySelector("[data-current-operation");
const memoryOperationText = document.querySelector("[data-memory-operation]");

const numberButtons = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const signButton = document.querySelector("[data-number-sign]");

const backspaceButton = document.querySelector("[data-backspace]")
const allClearButton = document.querySelector("[data-all-clear]");


// INICIALIZAÇÃO --------------
var operator = '';
var currentOperation = '';
var memoryOperation = '';
updateDisplay();


// MÉTODOS --------------
// Atualiza o display
function updateDisplay() {
  if(currentOperation != ''){
    currentOperationText.innerText = currentOperation;
  }else {
    currentOperationText.innerText = '0';
  }

  if(memoryOperation != ''){
    memoryOperationText.innerText = memoryOperation;
  }else {
    memoryOperationText.innerText = '0';
  }
}

// Concatena números selecionados na operação atual
function appendNumber(button) {
  if(button === "." && currentOperation.includes(".")) return;

  if(currentOperation === '' && button === '0') return;
  if(currentOperation === '' && button === '.') currentOperation = 0;
  
  currentOperation += button;
}

// Identifica a operação e realiza o cálculo
function calculate() {
  if(currentOperation === '0') return;

  if(memoryOperation === ''){
    memoryOperation = currentOperation;
    return;
  }

  switch(operator){
    case "+":
      memoryOperation = parseFloat(memoryOperation) + parseFloat(currentOperation);  
      break;
    case "-":
      memoryOperation = parseFloat(memoryOperation) - parseFloat(currentOperation);
      break;
    case "×":
      memoryOperation = parseFloat(memoryOperation) * parseFloat(currentOperation);
      break;
    case "÷":
      memoryOperation = parseFloat(memoryOperation) / parseFloat(currentOperation);
      break;
  }
}

// Certifica que o operador seja explicitado na mémoria em caso de múltiplas operações
function handleMemoryDisplay() {
  if(currentOperation === '') {
    memoryOperation += ` ${operator}`;
  }

  if(memoryOperation === ''){
    memoryOperation = `${currentOperation} ${operator}`;
    currentOperation = '';
    return;
  }

  calculate();
  memoryOperation = memoryOperation.toString() + ` ${operator}`;
  currentOperation = '';
}

// Altera o sinal do valor
function changeSign() {
  if(!currentOperation.includes('-')){
    currentOperation = "-" + currentOperation;
    return
  }

  currentOperation = currentOperation.replace('-', '');
}


// EVENTOS --------------
// Números
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  })
})

// Operações
operationButton.forEach(button => {
  button.addEventListener('click', () => {
    operator = button.innerText;

    handleMemoryDisplay();
    updateDisplay();
  });
})

// Igual (=)
equalsButton.addEventListener('click', () => {
  if(currentOperation) {
    calculate(operator);
    currentOperation = memoryOperation;
    memoryOperation = '';
    updateDisplay();
    return;
  }

  currentOperation = memoryOperation;
  memoryOperation = '';
  updateDisplay();
})

// Sinal
signButton.addEventListener('click', () => {
  changeSign();
  updateDisplay();
})

// Backspace
backspaceButton.addEventListener('click', () => {
  if(currentOperationText.innerText === '0') return;

  currentOperation = currentOperation.slice(0, -1);
  updateDisplay();
});

// All Clear (AC)
allClearButton.addEventListener('click', () => {
  currentOperation = '';
  memoryOperation = '';
  updateDisplay();
  currentOperationText.innerText = 0;
});