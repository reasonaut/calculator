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
        previousKeyWasOperator = false;
        return;     
    } else if (pressedKey === 'C'){
        calcDisplayInputRecord.innerText = '';
        calcDisplayResult.innerText = '';
        operand1 = NaN;
        operand2 = NaN;
        numbers = [];
    } else if (pressedKey === '='){
        if (previousKeyWasOperator) return;
        operand2 = parseInt(calcDisplayResult.innerText);
        
        previousKeyWasOperator = true;
        equate();        
    } else { // an operator is pressed
        if (previousKeyWasOperator) return;
        if (calcDisplayResult.innerText != '') {
            previousKeyWasOperator = true;
            // evaluate current calculation before changing operator to keyPress value
            isNaN(operand1) ? operand1 = parseInt(calcDisplayResult.innerText) : 
                operand2 = parseInt(calcDisplayResult.innerText);
            calcDisplayInputRecord.innerText += `${calcDisplayResult.innerText} `;
            if (!isNaN(operand1) && !isNaN(operand2) && operator != '') operate();
            operator = pressedKey;
            calcDisplayInputRecord.innerText += `${operator} `;
            if (isNaN(operand2)) return;
            operate();
        } 
    }
}
function equate(){
    calcDisplayInputRecord.innerText += calcDisplayResult.innerText + ' = ';
    operate();
    calcDisplayInputRecord.innerText += calcDisplayResult.innerText + '; ';
    operator = '';
    operand1 = NaN;
    operand2 = NaN;
}
// todo: operate should return a value
function operate(){
    if (operator === '+'){
        const result = add(operand1, operand2);
        console.log(operand1);
        console.log(operand2);
        calcDisplayResult.innerText = result;
        operand1 = result;
        operand2 = NaN;
    }
    if (operator === '-'){
        const result = subtract(operand1, operand2);
        calcDisplayResult.innerText = result;
        operand1 = result;
        operand2 = NaN;
    }

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
