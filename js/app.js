//Classes
class Budget {

  constructor() {
    this.total = 0;
    this.income = 0;
    this.expenses = 0;
    
  }

  addIncome(amount) {
    this.total += amount;
    this.income += amount;
  }

  addExpenses(amount) {
    this.total -= amount;
    this.expenses -= amount;
  }

}

class HTML {

  setDate() {
  
    document.querySelector('#date').innerHTML = `
      ${date.toLocaleString('en-us', { month: 'long' })} 
      ${date.getFullYear()}
    `;
  }

  createLi(name, amount) {
    
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${name}
      <span>
      <span>${amount.toFixed(2)}</span>
      <span>
    `;
    return li;
  }
  addIncome(name, amount) {

    const li = this.createLi(name,amount);
    li.classList.add('list-group-item-success');
    document.getElementById('incomes').appendChild(li);
  }

  addExpenses(name, amount) {

    const li = this.createLi(name,amount);
    li.classList.add('list-group-item-danger');
    li.querySelector('span').innerHTML += `
    <span class="badge badge-danger px-2 ml-2">
    ${ budget.income != 0 ? (Math.abs(amount / budget.income) * 100).toFixed(2) + '%': '...'}
    </span>`;
    document.getElementById('expenses').appendChild(li);
  }

  trackIncome(amount) {

    document.getElementById('income').innerHTML = budget.income.toFixed(2);
  }

  trackExpenses(amount) {

    document.getElementById('expense').innerHTML = Math.abs(budget.expenses).toFixed(2);
    document.getElementById('percent').innerHTML = `${Math.abs(budget.total / budget.expenses).toFixed(2) * 100} %`;
  }

  setTotal() {
    document.getElementById('total-amount').innerHTML = Math.abs(budget.total).toFixed(2);
    if (budget.total < 0) {
      document.querySelector('#total-budget span').innerHTML = '-';
    }

    //reset form
    setTimeout(() => {
      expenseForm.reset();
    }, 2000);
  }
}

//Variables
const date = new Date();
const expenseForm = document.getElementById('add-amount');
const html =  new HTML();
let budget = new Budget();


window.onload = html.setDate();


//Event listener

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const sign = document.querySelector('#sign').value;
  const expenseName = document.getElementById('name').value;
  const amount = Number(document.getElementById('amount').value);

  if (expenseName === '' || amount === '') {
    
  } else {

    if (sign === '+') {
      budget.addIncome(amount);
      html.addIncome(expenseName, amount);
      html.trackIncome(amount);
    }
    else if (sign === '-') {
      budget.addExpenses(amount);
      html.addExpenses(expenseName, amount);
      html.trackExpenses(amount);
    }

    html.setTotal();
  }

  /* console.log(sign);
  console.log(expenseName);
  console.log(amount); */
});
