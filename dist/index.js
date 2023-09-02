"use strict";
const bAdd = document.querySelector('#bAdd');
const inputTitle = document.querySelector('#title');
const inputCost = document.querySelector('#cost');
const inputCurrency = document.querySelector('#currency');
const inputDisplay = document.querySelector('#s-display');
function selector(selector) {
    return document.querySelector(selector);
}
function nodeSelector(selector) {
    return document.querySelectorAll(selector);
}
const currencyDisplay = inputDisplay.value;
const expenses = new Expenses();
inputDisplay.addEventListener('change', () => {
    expenses.currency(inputDisplay.value);
    selector('#display').textContent = expenses.getTotal();
});
render();
bAdd.addEventListener('click', () => {
    if (inputTitle.value !== '' && inputCost.value !== '' && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value;
        const cost = parseFloat(inputCost.value);
        const currency = inputCurrency.value;
        expenses.add({ title: title, cost: { number: cost, currency: currency } });
        render();
    }
    else {
        alert('Please fill in the data correctly!');
    }
});
function render() {
    let html = '';
    expenses.getItems().forEach(item => {
        const { id, title, cost } = item;
        const { number, currency } = cost;
        html += `
    <div class="item">
    <div><span class="currency">${currency}</span>${number}</div>
    <div>${title}</div>
    <div><button class="bEliminar" data-id="${id}">Delete</button></div>
  </div>
    `;
    });
    selector('#items').innerHTML = html;
    selector('#display').textContent = expenses.getTotal();
    nodeSelector('.bEliminar').forEach(bEliminar => {
        bEliminar.addEventListener('click', e => {
            const id = e.target.getAttribute('data-id');
            expenses.remove(parseInt(id));
            render();
        });
    });
}
