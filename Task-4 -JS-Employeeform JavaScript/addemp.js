const employeeForm = document.getElementById('employeeForm');
const nameError = document.getElementById('nameError');
document.getElementById('name').addEventListener('keyup', (e)=> {   //on key press , remove the error msg
  console.log(e.target.value);
  nameError.innerText = '';
})
document.getElementById('score').addEventListener('keyup', ()=> {
  scoreError.innerText = '';
})
document.getElementById('email').addEventListener('keyup', ()=> {
  emailError.innerText = '';
})
function resetHandler() {       // for removing the error msg on press reset btn
  nameError.innerText = '';
  scoreError.innerText = '';
  emailError.innerText = '';
}
employeeForm.addEventListener('submit', (event) => {
  // Get form field values
  const name = document.getElementById('name').value;
  const score = document.getElementById('score').value;
  const email = document.getElementById('email').value;
  
  // Regular expression for alphabetic characters with a single space
  const letters = /^[A-Za-z]+([ ]?[A-Za-z]+)*$/;

  // Regular expression for checking if the score contains only numbers
  const numbers = /^\d+$/;

  // Function to validate email formate
  function validateEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
  }

  if (name == '' || score == '' || email == '') {
    alert('Please fill in all fields');
    return false;
  } else if (!name.match(letters)) {
    nameError.innerText = 'Name must contain only alphabetic characters';
    return false;
  } else if (!score.match(numbers)) {
    const scoreError = document.getElementById('scoreError');
    scoreError.innerText = 'Score must contain only numbers';
    return false;
  } else if (!validateEmail(email)) {
    const emailError = document.getElementById('emailError');
    emailError.innerText = 'Please enter a valid email address';
    return false;
  } else {
    const employee = { name: name, score: score, email: email };
    let employees = JSON.parse(localStorage.getItem('employees') || '[]');
    employees.unshift(employee);          // unshift will add the row data in the beginning 
    localStorage.setItem('employees', JSON.stringify(employees));
    employeeForm.reset();
    console.log(employees);
    window.location.href="/EmpDetail.html";
    return true;
  }
});

