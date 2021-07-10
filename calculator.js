// holds values and operators in memory
// todo: change numbers from an array to holding seperately two numbers
let operand1 = NaN;
let operand2 = NaN;
let operator = '';
let previousKeyWasOperator = false;
let calcDisplayInputRecord = document.querySelector('#inputRecord');
let calcDisplayResult = document.querySelector('#result');

generateKeypad();

function keyPress(eventData){
    let pressedKey = eventData.target.innerText;
    if (parseInt(pressedKey) <= 9){
        if (previousKeyWasOperator) calcDisplayResult.innerText = '';
        calcDisplayResult.innerText += pressedKey;
        if (calcDisplayResult.innerText.length === 30)
            calcDisplayResult.innerText = calcDisplayResult.innerText.substring(1);
        previousKeyWasOperator = false;
        return;     
    } else if (pressedKey === 'C'){
        calcDisplayInputRecord.innerText = '';
        calcDisplayResult.innerText = '';
        operand1 = NaN;
        operand2 = NaN;
        numbers = [];
        previousKeyWasOperator = false;
    } else if (pressedKey === '='){
        if (previousKeyWasOperator) return;
        if (isNaN(operand1)) return;
        operand2 = parseInt(calcDisplayResult.innerText);
        previousKeyWasOperator = true;
        equate();        
    } else {
        processOperator(pressedKey);
    }
}
function processOperator(pressedKey){
    if (previousKeyWasOperator){
        // remove previous operator from record
        if (calcDisplayResult === ''){
            var index = calcDisplayInputRecord.innerText.lastIndexOf(operator);
            calcDisplayInputRecord.innerText = 
                calcDisplayInputRecord.innerText.slice(0, index) + `${pressedKey} `
        }
        operator = pressedKey;
        return;
    }
    if (calcDisplayResult.innerText != ''){
        previousKeyWasOperator = true;
        isNaN(operand1) ? operand1 = parseInt(calcDisplayResult.innerText) : 
            operand2 = parseInt(calcDisplayResult.innerText);
        calcDisplayInputRecord.innerText += `${calcDisplayResult.innerText} `;
        // evaluate current calculation before updating operator to new keyPress value
        if (!isNaN(operand1) && !isNaN(operand2) && operator != '') operate();
        operator = pressedKey;
        calcDisplayInputRecord.innerText += `${operator} `;
    }
}
function equate(){
    calcDisplayInputRecord.innerText += calcDisplayResult.innerText + ' = ';
    operate();
    calcDisplayInputRecord.innerText += calcDisplayResult.innerText + ';  ';
    if (calcDisplayInputRecord.innerText.length > 58)
    calcDisplayInputRecord.innerText = '...' + calcDisplayInputRecord.innerText.substring(calcDisplayInputRecord.innerText.length - 61);
    operator = '';
    operand1 = NaN;
    operand2 = NaN;
}
function operate(){
    if (operator === '+'){
        handleResult(add(operand1, operand2));
    }
    if (operator === '-'){
        handleResult(subtract(operand1, operand2));
    }
    if (operator === '*'){
        handleResult(multiply(operand1, operand2));
    }
    if (operator === '/'){
        handleResult(divide(operand1, operand2));
    }
}
function handleResult(result){
    calcDisplayResult.innerText = result;
        operand1 = result;
        operand2 = NaN;
}
// calc functions
function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1 / num2;
}
// add buttons to each keypad div
function generateKeypad(){
    const keypadDivs = document.querySelectorAll('.keypadRow');
    keypadDivs.forEach(key => {
        const btn = document.createElement('button');
        btn.classList.add('keypadButton');
        // label keys
        btn.innerText = key.getAttribute('id').replace('key', '');
        if (btn.innerText.includes('Clear')) btn.innerText = 'C';
        if (btn.innerText.includes('Equals')) btn.innerText = '=';
        if (btn.innerText.includes('Plus')) btn.innerText = '+';
        if (btn.innerText.includes('Minus')) btn.innerText = '-';
        if (btn.innerText.includes('Multiply')) btn.innerText = '*';
        if (btn.innerText.includes('Divide')) btn.innerText = '/';
        // add click event handlers
        btn.addEventListener('click', keyPress);
        key.appendChild(btn);    
    });
}
