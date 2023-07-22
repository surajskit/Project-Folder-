// // for auto table update option  
      const employeeTable = document.getElementById('employeeTable');
      let employees = JSON.parse(localStorage.getItem('employees') || '[]');
      employees.forEach((employee, index) => {
        const row = employeeTable.insertRow();
        const CheckBox = row.insertCell();
        CheckBox.innerHTML = '<input type="checkbox" >';  
        const nameCell = row.insertCell();
        nameCell.textContent = employee.name;
        const scoreCell = row.insertCell();
        scoreCell.textContent = employee.score;
        const emailCell = row.insertCell();
        emailCell.textContent = employee.email;

      });

// for checkbox option
      function setupCheckbox() {
        const optionAll = document.getElementById('option-all');
        const checkboxes = document.querySelectorAll('table input[type="checkbox"]');

        optionAll.addEventListener('click', function() {
        checkboxes.forEach(function(checkbox) {
          checkbox.checked = optionAll.checked;
        });
        });
        }
        setupCheckbox();      

// for delete option
  function setupTable() {
    const checkboxes = document.querySelectorAll('table input[type="checkbox"]');
    const deleteButton = document.getElementById('delete-button');
  
    deleteButton.addEventListener('click', function() {
      checkboxes.forEach(function(checkbox, index) {
        if (checkbox.checked && index > 0) { // exclude first row
          const row = checkbox.closest('tr');
          row.remove();
          const itemId = row.getAttribute('data-id');
          localStorage.removeItem(itemId);
        }
      });
      
      // Remove deleted employees from the employees array
      let newEmployees = employees.filter((employee, index) => {
        if (checkboxes[index+1].checked) { // exclude first row
          return false;
        }
        return true;
      });
  
      // Save the updated employees array to local storage
      localStorage.setItem('employees', JSON.stringify(newEmployees));
  
      // Update the employees variable to reflect the updated data
      employees = newEmployees;
  
      optionAll.checked = false;
    });
  
  }
  setupTable();


// for search box option
      const searchBox = document.getElementById('searchBox');
      const table = document.getElementById('employeeTable');
      const rows = table.querySelectorAll('tr');
      const headerRow = rows[0];

      searchBox.addEventListener('input', function() {
        const query = searchBox.value.toLowerCase();
        rows.forEach(function(row, rowIndex) {
          if (rowIndex === 0) return; // Skip the header row
          let rowMatch = false;
          row.querySelectorAll('td').forEach(function(cell, cellIndex) {
            if (cellIndex === 0) return; // Skip the first column
            const content = cell.textContent.toLowerCase();
            if (content.includes(query)) {
              rowMatch = true;
              const regex = new RegExp(query, 'gi');
              const newContent = content.replace(regex, '<span class="highlight">$&</span>');
              cell.innerHTML = newContent;
            } else {
              cell.innerHTML = content;
            }
          });
          if (rowMatch) {
            row.classList.add('matched');
          } else {
            row.classList.remove('matched');
          }
        });

  // Hide non-matching rows
  const matchingRows = table.querySelectorAll('tr.matched');
  const nonMatchingRows = table.querySelectorAll('tr:not(.matched)');
  for (let i = 1; i < nonMatchingRows.length; i++) {
    nonMatchingRows[i].style.display = 'none';
  }
  matchingRows.forEach(function(row) {
    row.style.display = 'table-row';
  });
});


// for calculating the average and maximum 
      const calculateBtn = document.getElementById('calculateBtn');
      const averageSpan = document.getElementById('average');
      const maximumSpan = document.getElementById('maximum');

      calculateBtn.addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('table input[type="checkbox"]');
        const checkedEmployees = [];
        checkboxes.forEach(function(checkbox, index) {
          if (checkbox.checked && index > 0) { // exclude first row
            const row = checkbox.closest('tr');
            const score = parseInt(row.cells[2].textContent);
            checkedEmployees.push(score);
          }
        });

        if (checkedEmployees.length > 0) {
          const totalScore = checkedEmployees.reduce(function(acc, curr) {
            return acc + curr;
          });
          const averageScore = totalScore / checkedEmployees.length;
          const maximumScore = Math.max(...checkedEmployees);

          averageSpan.textContent = averageScore.toFixed(2);
          maximumSpan.textContent = maximumScore;
        } else {
          alert('Please select at least one employee to calculate the average and maximum score.');
        }

        document.getElementById('option-all').addEventListener('click', ()=> {
          averageSpan.innerText = '';
          maximumSpan.innerText = '';
        })



      });
