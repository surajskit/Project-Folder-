const gotocart = document.getElementById('gotocart');
// add click event listeners to the buttons to move to AdminDetail Page
gotocart.addEventListener('click', () => {
  window.location.href = 'cartsummary.html';
});


function createProductCard(name, price, image, gender, quantity, currency) {
  // Create the product card container
  const productCard = document.createElement('div');
  productCard.classList.add('cart1', 'border', 'bg-white', 'rounded', 'mx-4');
  productCard.setAttribute('data-name', name);
  productCard.setAttribute('data-price', price);

  // Create the product image element

  const productImage = document.createElement('div');
  productImage.classList.add('image1');
  const imageElement = document.createElement('img');
  // imageElement.setAttribute('src', "ddd");
  imageElement.src = image;
  // console.log(image, 'hhhhhh');
  imageElement.alt = 'cart1';
  // imageElement.width = '80%';
  imageElement.setAttribute('width', '140');
  imageElement.setAttribute('height', '160');

  productImage.appendChild(imageElement);
  productCard.appendChild(productImage);

  // Create the product name element
  const productName = document.createElement('h3');
  productName.classList.add('fw-bold');
  productName.textContent = name;
  productCard.appendChild(productName);

  // Create the product price element
  const productPrice = document.createElement('h3');
  productPrice.classList.add('text-danger');
  productPrice.innerHTML = `${currency} ${price}`;
  productCard.appendChild(productPrice);

  // Create the product details list
  const productDetails = document.createElement('ul');
  const details1 = document.createElement('li');
  details1.innerHTML = `for <span class="fw-bold">${gender}</span>`;
  // 
  const details2 = document.createElement('li');
  details2.innerHTML = `Quantity Availabe: <span class="fw-bold">${quantity}</span>`;
  productDetails.appendChild(details1);
  productDetails.appendChild(details2);
  productCard.appendChild(productDetails);

  // Create the "ADD TO CART" button
  const addToCartButton = document.createElement('button');
  addToCartButton.setAttribute('type', 'submit');
  addToCartButton.classList.add('btn', 'bg-success', 'fw-bold', 'text-white');
  addToCartButton.textContent = 'ADD TO CART';


  // Add click event listener to the "ADD TO CART" button
  addToCartButton.addEventListener('click', (e) => {
    replaceAddToCartButton(addToCartButton);
    console.log(e.target, 'e.target add to cart');
    updateLocalStorage(name, price, 1, quantity, currency);
    console.log(currency);
    //if in localstorage, quantity == 0 then call "Add to Cart" button else call replaceAddToCartButton
  });


  productCard.appendChild(addToCartButton);
  return productCard;
}

// // // start ................
let productsInCart = [];
let obj = JSON.parse(localStorage.getItem('cart'));
for (const key in obj) {
  productsInCart.unshift(obj[key]);
}

// console.log(productsInCart, 'productsInCart');
if (productsInCart.length) {
  setTimeout(() => {
    let classes = document.getElementsByClassName('cart1');
    for (let i = 0; i < classes.length; i++) {
      console.log(classes[i].childNodes[4], 'iterator', productsInCart[i]);
      const prodName = classes[i].querySelector('h3').innerText;
      const product = productsInCart.find(prod=>prod.name==prodName);
      // Create the "REMOVE" button
      const removeButton = document.createElement('button');
      removeButton.classList.add('btn', 'bg-danger', 'fw-bold', 'text-white', 'me-2');
      removeButton.textContent = '-';

      // Create the number input
      const QuantityInput = document.createElement('input');
      QuantityInput.setAttribute('type', 'number');
      QuantityInput.setAttribute('min', '0');
      if(product)
      QuantityInput.setAttribute('value', +product.quantity );
      QuantityInput.classList.add('form-control', 'd-inline-block', 'me-2');
      QuantityInput.style.width = '60px';

      // Create the "ADD" button
      const addButton = document.createElement('button');
      addButton.classList.add('btn', 'bg-success', 'fw-bold', 'text-white', 'me-2');
      addButton.textContent = '+';

      // Replace the "ADD TO CART" button with the new group of buttons
      // const buttonParent = addToCartButton.parentElement;
      if(product){
      classes[i].removeChild(classes[i].childNodes[4]);
      classes[i].appendChild(removeButton);
      classes[i].appendChild(QuantityInput);
      classes[i].appendChild(addButton);
      }
      // Update the local storage with the first value as soon as the "ADD TO CART" button is clicked
      // console.log(buttonParent.childNodes[3].childNodes[1].childNodes[1].innerText, 'buttton', 'intended');
      // updateLocalStorage(classes[i].getAttribute('data-name'), classes[i].getAttribute('data-price'), '1', +classes[i].childNodes[3].childNodes[1].childNodes[1].innerText);


      // Add event listener for the remove button
      removeButton.addEventListener('click', (e) => {
        let Quantity = parseInt(QuantityInput.value);
        console.log(Quantity, 'removeButton');
        if (Quantity > 0) {
          QuantityInput.value = Quantity - 1;
          // console.log(JSON.parse(localStorage.getItem('cart')), e.target.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[0].data);
          
          updateLocalStorage(classes[i].getAttribute('data-name'), classes[i].getAttribute('data-price'), QuantityInput.value, +e.target.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[0].data);
          if (QuantityInput.value == 0) {
            // Remove the item from local storage
            let cart = JSON.parse(localStorage.getItem('cart')) || {};
            delete cart[classes[i].getAttribute('data-name')];
            localStorage.setItem('cart', JSON.stringify(cart));

            // Remove the buttons and add the "ADD TO CART" button back
            classes[i].removeChild(removeButton);
            classes[i].removeChild(QuantityInput);
            classes[i].removeChild(addButton);
            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('btn', 'bg-success', 'text-white');
            addToCartButton.textContent = 'ADD TO CART';
            addToCartButton.setAttribute('data-name', classes[i].getAttribute('data-name'));
            addToCartButton.setAttribute('data-price', classes[i].getAttribute('data-price'));
            classes[i].appendChild(addToCartButton);
            addToCartButton.addEventListener('click', () => {
              replaceAddToCartButton(addToCartButton);
              console.log(classes[i].childNodes[3].childNodes[1].childNodes[1].childNodes[0].data, 'classes[i] 2nd button');
              updateLocalStorage(addToCartButton.getAttribute('data-name'), classes[i].getAttribute('data-price'), '1', +classes[i].childNodes[3].childNodes[1].childNodes[1].childNodes[0].data);
            });
          }
        }
      });


      addButton.addEventListener('click', (e) => {
        console.log(e, 'add button');
        let Quantity = parseInt(QuantityInput.value);
        const updatedQuantity = Quantity + 1;
        const availableQuantity = parseInt(e.target.parentNode.childNodes[3].childNodes[1].childNodes[1].innerHTML);

        if (updatedQuantity > availableQuantity) {
          alert(`Only ${availableQuantity} items are available.`);
          return;
        }

        QuantityInput.value = updatedQuantity;
        updateLocalStorage(classes[i].getAttribute('data-name'), classes[i].getAttribute('data-price'), QuantityInput.value, availableQuantity);
      });

    }
  }, 10)

}
// //end .....................................................


// Get the forms array from local storage
const forms = JSON.parse(localStorage.getItem('forms')) || [];

// Create an empty array to hold the products
const products = [];

// Loop through the forms array and extract the required properties
for (let i = 0; i < forms.length; i++) {
  const product = {
    name: forms[i] && forms[i].name,
    price: forms[i] && forms[i].price,
    image: forms[i] && forms[i].image,
    gender: forms[i] && forms[i].gender,
    quantity: forms[i] && forms[i].quantity,
    currency: forms[i] && forms[i].currency
  };

  // Add the new product object to the products array
  products.unshift(product);
}

// You can now use the products array as required
console.log(products);

// Loop through the products array and create a product card for each item
const container = document.getElementById('container');

for (const product of products) {
  const { name, price, image, gender, quantity, currency } = product;
  const productCard = createProductCard(name, price, image, gender, quantity, currency);
  container.appendChild(productCard);
  // console.log(productCard);
}

// store
const cart = {
  items: []
};




// // // replace button for "Add to Cart button" 
function replaceAddToCartButton(button) {
  // Create the "REMOVE" button
  const removeButton = document.createElement('button');
  removeButton.classList.add('btn', 'bg-danger', 'fw-bold', 'text-white', 'me-2');
  removeButton.textContent = '-';

  // Create the number input
  const QuantityInput = document.createElement('input');
  QuantityInput.setAttribute('type', 'number');
  QuantityInput.setAttribute('min', '0');
  QuantityInput.setAttribute('value', '1');
  QuantityInput.classList.add('form-control', 'd-inline-block', 'me-2');
  QuantityInput.style.width = '60px';

  // Create the "ADD" button
  const addButton = document.createElement('button');
  addButton.classList.add('btn', 'bg-success', 'fw-bold', 'text-white', 'me-2');
  addButton.textContent = '+';

  // Replace the "ADD TO CART" button with the new group of buttons
  const buttonParent = button.parentElement;
  buttonParent.removeChild(button);
  buttonParent.appendChild(removeButton);
  buttonParent.appendChild(QuantityInput);
  buttonParent.appendChild(addButton);

  // Update the local storage with the first value as soon as the "ADD TO CART" button is clicked
  console.log(buttonParent.childNodes[3].childNodes[1].childNodes[1].innerText, 'buttton', 'intended');
  const curr = buttonParent.childNodes[2].innerText.slice(0,1)
  updateLocalStorage(buttonParent.getAttribute('data-name'), buttonParent.getAttribute('data-price'), '1', +buttonParent.childNodes[3].childNodes[1].childNodes[1].innerText,curr);

  // Add event listener for the remove button
  removeButton.addEventListener('click', (e) => {
    let Quantity = parseInt(QuantityInput.value);
    console.log(Quantity, 'removeButton');
    if (Quantity > 0) {
      QuantityInput.value = Quantity - 1;
      // console.log(JSON.parse(localStorage.getItem('cart')), e.target.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[0].data);
      const curr = buttonParent.childNodes[2].innerText.slice(0,1)
      updateLocalStorage(buttonParent.getAttribute('data-name'), buttonParent.getAttribute('data-price'), QuantityInput.value, +e.target.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[0].data,curr);
      if (QuantityInput.value == 0) {
        // Remove the item from local storage
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        delete cart[buttonParent.getAttribute('data-name')];
        localStorage.setItem('cart', JSON.stringify(cart));

        // Remove the buttons and add the "ADD TO CART" button back
        buttonParent.removeChild(removeButton);
        buttonParent.removeChild(QuantityInput);
        buttonParent.removeChild(addButton);
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('btn', 'bg-success', 'text-white');
        addToCartButton.textContent = 'ADD TO CART';
        addToCartButton.setAttribute('data-name', buttonParent.getAttribute('data-name'));
        addToCartButton.setAttribute('data-price', buttonParent.getAttribute('data-price'));
        buttonParent.appendChild(addToCartButton);
        addToCartButton.addEventListener('click', () => {
          replaceAddToCartButton(addToCartButton);
          console.log(buttonParent.childNodes[3].childNodes[1].childNodes[1].childNodes[0].data, 'buttonParent 2nd button');
          const curr = buttonParent.childNodes[2].innerText.slice(0,1)
          updateLocalStorage(addToCartButton.getAttribute('data-name'), buttonParent.getAttribute('data-price'), '1', +buttonParent.childNodes[3].childNodes[1].childNodes[1].childNodes[0].data, curr);
        });
      }
    }
  });


  addButton.addEventListener('click', (e) => {
    console.log(e, 'add button');
    let Quantity = parseInt(QuantityInput.value);
    const updatedQuantity = Quantity + 1;
    const availableQuantity = parseInt(e.target.parentNode.childNodes[3].childNodes[1].childNodes[1].innerHTML);

    if (updatedQuantity > availableQuantity) {
      alert(`Only ${availableQuantity} items are available.`);
      return;
    }

    QuantityInput.value = updatedQuantity;
    const curr =e.target.parentNode.childNodes[2].innerText.slice(0,1)
    updateLocalStorage(buttonParent.getAttribute('data-name'), buttonParent.getAttribute('data-price'), QuantityInput.value, availableQuantity,curr);
  });
}

// add the item to the cart
function updateLocalStorage(name, price, quantity, availableQuantity, currency) {
  console.log(availableQuantity, 'availableQuantity', name, 'price', price, 'quantity', quantity, currency);
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const item = {
    name: name,
    price: price,
    quantity: quantity,
    availableQuantity: availableQuantity,
    currency: currency
    // Store available quantity in item object
  };

  // Check if there's enough available quantity before adding to cart
  if (quantity > availableQuantity) {
    alert(`Only ${availableQuantity} items are available.`);
    return;
  }

  cart[name] = item;
  localStorage.setItem('cart', JSON.stringify(cart));
  // console.log(cart);
}



// functionality for Search box
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Add event listener to the search button
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  searchProducts(searchTerm);
});

// Add event listener to the search input to trigger search on input change
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  searchProducts(searchTerm);
});

function searchProducts(searchTerm) {
  // Get all the product cards
  const productCards = document.querySelectorAll('.cart1');

  // Loop through each product card and check if it matches the search term
  for (const card of productCards) {
    const name = card.getAttribute('data-name').toLowerCase();
    const price = card.getAttribute('data-price').toLowerCase();
    const gender = card.querySelector('ul li:first-child span').textContent.toLowerCase();

    if (name.includes(searchTerm) || price.includes(searchTerm) || gender.includes(searchTerm)) {
      // If the product matches the search term, show the card
      card.style.display = 'block';
    } else {
      // If the product does not match the search term, hide the card
      card.style.display = 'none';
    }
  }
}

// window.addEventListener("load", function() {
//   var cartItem = document.querySelector(".cart-item");
//   var input = cartItem.querySelector("input");
//   var button = cartItem.querySelector(".plus-minus-btn");
//   var quantity = localStorage.getItem("cartItemQuantity");
//   if (quantity) {
//     input.value = quantity;
//     if (quantity == 0) {
//       button.textContent = "Add to cart";
//     } else {
//       button.textContent = "±";
//     }
//   }
// });
