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
const keypadDivs = document.querySelectorAll('.keypadRow');
keypadDivs.forEach(key => {
    const btn = document.createElement('button');
    btn.classList.add('keypadButton');
    // label numeral keys
    btn.innerText = key.getAttribute('id').replace('key', '');

    
    key.appendChild(btn);    
});
