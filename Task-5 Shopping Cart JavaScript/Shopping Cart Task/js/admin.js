// added click event listeners to the buttons to move to AdminDetail Page
const admindetail = document.getElementById('admindetail');
admindetail.addEventListener('click', () => {
window.location.href = 'AdminDetail.html';
});

//To save the data in the local storage and form validation
// Keep track of previously submitted names
let submittedNames = [];

function validateForm() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const color = document.getElementById("color").value;
  const gender = document.getElementById("gender").value;
  const currency = document.getElementById("currency").value;
  const quantity = document.getElementById("quantity").value;
  const image = document.getElementById("forimage").value;

  // Check if name has already been submitted
  if (submittedNames.includes(name)) {
    alert("Name has already been submitted. Please enter a unique name.");
    return false;
  }

  // Check if any fields are empty
  if (!name || !price || !color || !gender || !currency || !quantity || !image) {
    alert("Please fill all the fields before submitting the form");
    return false;
  }

  // Add name to list of submitted names
  submittedNames.push(name);

  saveData();
  return true;
 
}

// Retrieve data from localStorage
const updateData = JSON.parse(localStorage.getItem('edit_table'));

// Check if updateData is not null
if (updateData) {
  let forms = JSON.parse(localStorage.getItem('forms'));
  let edit_id = localStorage.getItem('edit_id');
  // Set initial values of form fields
  document.getElementById("name").value = updateData.name;
  document.getElementById("price").value = updateData.price;
  document.getElementById("color").value = updateData.color;
  document.getElementById("gender").value = updateData.gender;
  document.getElementById("currency").value = updateData.currency;
  document.getElementById("quantity").value = updateData.quantity;
  document.getElementById("forimage").value = updateData.forimage;
}

// Submit form
  document.getElementById("adminForm").addEventListener("submit", function(event) {
  event.preventDefault();
  

  // Get updated values of form fields
  const updatedName = document.getElementById("name").value;
  const updatedPrice = document.getElementById("price").value;
  const updatedColor = document.getElementById("color").value;
  const updatedGender = document.getElementById("gender").value;
  const updatedCurrency = document.getElementById("currency").value;
  const updatedQuantity = document.getElementById("quantity").value;
  const updateDataImage = document.getElementById("forimage").value
  
  // Update data in localStorage
  if (updateData) {
    updateData.name = updatedName;
    updateData.price = updatedPrice;
    updateData.color = updatedColor;
    updateData.gender = updatedGender;
    updateData.currency = updatedCurrency;
    updateData.quantity = updatedQuantity;
    updateData.forimage = updateDataImage;

    localStorage.setItem('edit_table', JSON.stringify(updateData));
  }

});

// save the form data to local storage
  function saveData() {
    
    const reader = new FileReader();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const color = document.getElementById("color").value;
    const gender = document.getElementById("gender").value;
    const currency = document.getElementById("currency").value;
    const quantity = document.getElementById("quantity").value;
    const image = document.getElementById("forimage").files[0];
    const localStorageProducts = JSON.parse(localStorage.getItem("forms"))


    reader.addEventListener("load", function () {
      const formData = {
        name,
        price,
        color,
        gender,
        currency,
        quantity,
        image: image ? reader.result : null // convert the image file to a URL
      };
      
      if(localStorage.getItem('edit_id')) {
        let forms = JSON.parse(localStorage.getItem('forms') || '[]');
        // console.log(forms);
        forms[localStorage.getItem('edit_id')] = formData;  
        localStorage.setItem("forms", JSON.stringify(forms)); // store the updated array in localStorage
        localStorage.removeItem('edit_id');
        localStorage.removeItem('edit_table');
        window.location.href="/AdminDetail.html";
      }

      else {
        let forms = JSON.parse(localStorage.getItem('forms') || '[]'); // get existing forms or initialize empty array
        // console.log(forms);
        forms.unshift(formData); // add the new form data to the beginning of the array
        localStorage.setItem("forms", JSON.stringify(forms)); // store the updated array in localStorage
        // console.log(forms);
        document.getElementById("adminForm").reset(); // clear the form fields
      }
      alert("Item is saved");
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
    
    // console.log(localStorageProducts);
    
  }