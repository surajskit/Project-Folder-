// setTimeout(function(){
//   window.location.reload(1);
// }, 5000);
// Retrieve cart data from local storage
const cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart);

console.log(Object.values(cart));
// Get a reference to the table body element
const tableBody = document.querySelector('#cartTable tbody');

// Initialize variables for tracking the total cost and the row count
let totalCost = 0;
let rowCount = 1;

// Loop over the cart data and add a row to the table for each item
Object.values(cart).forEach(item => {
  const row = document.createElement('tr');

  // Add the serial number cell to the row
  const serialNumberCell = document.createElement('td');
  serialNumberCell.textContent = rowCount;
  row.appendChild(serialNumberCell);

  // Add the product name and delete button cells to the row
  const productCell = document.createElement('td');
  productCell.classList.add('product-cell');

  const productNameSpan = document.createElement('span');
  productNameSpan.textContent = item.name;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.style.marginRight = "20px";

  deleteBtn.innerHTML = "&times;";

  deleteBtn.addEventListener('click', () => {

    // Remove the item from cart data
    delete cart[item.name];
    console.log(item.name);
    // Update the cart data in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Remove the row from the table
    row.remove();

    // Recalculate the total cost 
    totalCost -= item.price * item.quantity * (item.currency == '$' ? 81.73 : 1);
    totalCostDiv.textContent = `Total Cost: ₹ ${totalCost.toFixed(2)}`;

    console.log(totalCost);
  });

  productCell.appendChild(deleteBtn);
  productCell.appendChild(productNameSpan);
  row.appendChild(productCell);

  const priceCell = document.createElement('td');
  priceCell.textContent = item.currency + Number(item.price).toFixed(2);
  row.appendChild(priceCell);

  // Add the quantity cell to the row
  const quantityCell = document.createElement('td');
  quantityCell.classList.add('quantity-cell');

  const minusBtn = document.createElement('button');
  minusBtn.textContent = '-';

  minusBtn.addEventListener('click', () => {
    if (item.quantity > 1) {
      item.quantity--;
      quantitySpan.textContent = item.quantity;
      // Update the cart data in local storage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Recalculate the item total and update the row
      const itemTotal = item.price * item.quantity * (item.currency == '$' ? 81.73 : 1); // update itemTotal
      itemTotalCell.textContent = "₹ " + ((itemTotal).toFixed(2));

      // Recalculate the total cost and update the total cost div
      totalCost -= item.price;
      totalCostDiv.textContent = `Total Cost:₹ ${totalCost.toFixed(2)}`;

      console.log(totalCost);
    }
    else {
      // Remove the item from cart data
      delete cart[item.name];
      // Update the cart data in local storage
      localStorage.setItem('cart', JSON.stringify(cart));
      // Remove the row from the table
      row.remove();
      // Recalculate the total cost and update the total cost div
      totalCost -= item.price * item.quantity;
      totalCostDiv.textContent = `Total Cost: ₹ ${totalCost.toFixed(2)}`;
    }

  });

  const quantitySpan = document.createElement('span');
  quantitySpan.textContent = item.quantity;
  quantitySpan.classList.add("text-input");

  const plusBtn = document.createElement('button');
  plusBtn.textContent = '+';

  plusBtn.addEventListener('click', () => {
    if (item.quantity < item.availableQuantity) {
      item.quantity++;
      quantitySpan.textContent = item.quantity;
      // Update the cart data in local storage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Recalculate the item total and update the row
      const itemTotal = item.price * item.quantity * (item.currency == '$' ? 81.73 : 1); // update itemTotal
      console.log(itemTotal);
      itemTotalCell.textContent = "₹" + ((itemTotal).toFixed(2));

      // Recalculate the total cost 
      console.log(totalCost, 'totalCost');
      totalCost += +item.price;
      console.log(totalCost, 'totalCost', item.price);
      totalCostDiv.textContent = `Total Cost:₹ ${totalCost}`;

      console.log(totalCost);
    }
    else {
      alert('Item out of Stock.');
    }
  });

  quantityCell.appendChild(minusBtn);
  quantityCell.appendChild(quantitySpan);
  quantityCell.appendChild(plusBtn);
  row.appendChild(quantityCell);

  // Calculate the total cost for this item and update the running total
  let itemTotal = 0;
  if (item.currency == "$") {
    itemTotal = item.price * item.quantity * 81.73;
  }
  else {

    itemTotal = item.price * item.quantity;
  }
  totalCost += itemTotal;

  console.log(itemTotal);

  console.log(totalCost);
  // function totalcost(){
  //   totalCost += itemTotal;
  //   totalCostDiv.textContent = `Total Cost: ${totalCost.toFixed(2)}`;
  // }

  // Add the total cost cell to the row
  const itemTotalCell = document.createElement('td');
  itemTotalCell.textContent = "₹ " + ((itemTotal).toFixed(2));
  row.appendChild(itemTotalCell);

  // Add the row to the table body
  tableBody.appendChild(row);
  // Increment the row count
  rowCount++;
});

// Add the total cost outside the table
const totalCostDiv = document.createElement('div');
totalCostDiv.classList.add('total-cost');
totalCostDiv.textContent = `Total Cost: ₹ ${totalCost.toFixed(2)}`;
const tableContainer = document.getElementById('table-parent');
tableContainer.appendChild(totalCostDiv);


const checkoutBtn = document.querySelector('.check-out-btn');
// checkoutBtn.addEventListener('click', () => {
//   alert('Thank you for ordering!');
// });

// const checkoutBtn = document.getElementById('checkoutBtn');
const table = document.getElementById('cartTable');
checkoutBtn.addEventListener('click', () => {

  // window.location.href='checkout.html';
  window.location.replace('checkout.html');
  // Delete table data
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }

  const collection = document.getElementsByClassName("total-cost");
  collection[0].innerHTML = "";

  // Remove data from local storage
  localStorage.removeItem('cart');
});


// Object.values(cart).forEach(item => {
//   // ...
//   console.log("item.name:", item.name);
//   console.log("item.price:", item.price);
//   console.log("item.availableQuantity:", item.availableQuantity);
//   console.log("item.quantity:", item.quantity);
//   const itemTotal = item.price * item.quantity;
//   console.log("itemTotal:", itemTotal);
//   totalCost += itemTotal;
//   // ...
// });
