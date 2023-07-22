// index.html page

// get the radio buttons
const adminRadio = document.getElementById('adminRadio');
const userRadio = document.getElementById('userRadio');

// add click event listeners to the radio buttons
adminRadio.addEventListener('click', () => {
    window.location.href = 'admin.html';
});

userRadio.addEventListener('click', () => {
    window.location.href = 'user.html';
});

// add a pageshow event listener to uncheck the radio button after returning to main page
window.addEventListener('pageshow', () => {
    adminRadio.checked = false;
    userRadio.checked = false;
});

