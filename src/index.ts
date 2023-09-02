"use strict";
const bAdd = document.querySelector('#bAdd') as HTMLButtonElement;
const inputTitle = document.querySelector('#title') as HTMLInputElement;
const inputCost = document.querySelector('#cost') as HTMLInputElement;
const inputCurrency = document.querySelector('#currency') as HTMLInputElement;
const inputDisplay = document.querySelector('#s-display') as HTMLInputElement;

function selector(selector:string):HTMLElement{
  return document.querySelector(selector) as HTMLElement
}
function nodeSelector(selector:string):NodeListOf<HTMLElement>{
  return document.querySelectorAll(selector)
}

const currencyDisplay = inputDisplay.value as Currency

const expenses = new Expenses();

inputDisplay.addEventListener('change', () => {
  expenses.currency(<Currency>inputDisplay.value);
  selector('#display').textContent = expenses.getTotal();
})

render();

bAdd.addEventListener('click', () => {
  if(inputTitle.value !== '' && inputCost.value !== '' && !isNaN(parseFloat(inputCost.value))) {
    const title = inputTitle.value;
    const cost:number = parseFloat(inputCost.value);
    const currency:Currency = <Currency>inputCurrency.value;

    expenses.add({title: title, cost: {number:cost, currency: currency}})

    render();
  } else {
    alert('Please fill in the data correctly!')
  }
});

function render(){
  let html = '';

  expenses.getItems().forEach(item => {
    const {id, title, cost} = item;
    const {number, currency} = cost;
    html += `
    <div class="item">
    <div><span class="currency">${currency}</span>${number}</div>
    <div>${title}</div>
    <div><button class="bEliminar" data-id="${id}">Delete</button></div>
  </div>
    `;
  })

  selector('#items').innerHTML = html;
  selector('#display').textContent = expenses.getTotal();

  nodeSelector('.bEliminar').forEach(bEliminar =>{
    bEliminar.addEventListener('click', e => {
      const id = (e.target as HTMLButtonElement).getAttribute('data-id')

      expenses.remove(parseInt(id!));

      render();
    })
  })
}
