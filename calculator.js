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
// holds values and operators in memory
let numbers = [];
let operator = '';
let previousKeyWasOperator = false;
let calcDisplayInputRecord = document.querySelector('#inputRecord');
let calcDisplayResult = document.querySelector('#result');

// add buttons to each keypad div
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
        numbers = [];
    } else if (pressedKey === '='){
        numbers.push(parseInt(calcDisplayResult.innerText));
        previousKeyWasOperator = true;
        equate();        
    } else { // an operator is pressed
        if (calcDisplayResult.innerText != '') {
            previousKeyWasOperator = true;
            calcDisplayInputRecord.innerText += `${calcDisplayResult.innerText} `;
            numbers.push(parseInt(calcDisplayResult.innerText));
            operator = pressedKey;
            calcDisplayInputRecord.innerText += `${operator} `;
            operate();
        } 
    }
}
function equate(){
    if (numbers.length === 1){        
        return;      
    } else if (numbers.length === 2){
        calcDisplayInputRecord.innerText += calcDisplayResult.innerText + ' = ';
        operate();
    }
}
function operate(){
    if (numbers.length === 1){        
        return;      
    } else if (numbers.length === 2){
        if (operator === '='){
            // check operator and proceed
            console.log(operator);
            calcDisplayInputRecord.innerText += '= ';
            numbers = [];
            operator = '';
            numbers.push(parseInt(calcDisplayResult.innerText))
        }
        if (operator === '+'){
            
            calcDisplayResult.innerText = add(numbers[0], numbers[1]);
            console.log(numbers);
            numbers = [];
            operator = '';
            numbers.push(parseInt(calcDisplayResult.innerText))
            
        }

    }

}

