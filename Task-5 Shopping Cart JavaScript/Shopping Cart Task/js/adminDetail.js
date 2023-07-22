// js code for adding data in the table
const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        console.log(forms);
        const formDataEl = document.getElementById("formData");

        forms.forEach((form, index) => {
            const row = formDataEl.insertRow(-1);
            const serialNumberCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const priceCell = row.insertCell(2);
            const colorCell = row.insertCell(3);
            const genderCell = row.insertCell(4);
            const currencyCell = row.insertCell(5);
            const quantityCell = row.insertCell(6);
            const imageCell = row.insertCell(7);
            const actionCell = row.insertCell(8);

            serialNumberCell.textContent = index + 1;
            nameCell.textContent = form.name;
            priceCell.textContent = form.price;
            colorCell.textContent = form.color;
            genderCell.textContent = form.gender;
            currencyCell.textContent = form.currency;
            quantityCell.textContent = form.quantity;
            

            if (form.image) {
                // console.log(form.image, 'form.image');
                const image = document.createElement("img");
                image.src = form.image; // set the src attribute to the path of the uploaded image
                // image.src = URL.createObjectURL(form.image);
                image.classList.add("img-thumbnail");
                image.width = 120; // set the width to 40 pixels
                image.height= 200; // set the height to 40 pixels
                imageCell.appendChild(image);
            } else {
                imageCell.textContent = "N/A";
            }

            //Adding edit  button in Action column
            const editBtn = document.createElement("button");
            editBtn.classList.add("btn", "btn-primary", "me-2");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editRow(index, row));
            actionCell.appendChild(editBtn);
            //Adding delete button in Action column
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btn", "btn-danger");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteRow(index, row));
            actionCell.appendChild(deleteBtn);
        });

        function editRow(index, row) {
            // add edit functionality here
            console.log(`Editing row with index ${index}`, row, 'gggg', forms[index]);
            localStorage.setItem('edit_table', JSON.stringify(forms[index]));
            localStorage.setItem('edit_id', index);
            window.location.href="/admin.html";
            console.log("Hi");
        }



    function deleteRow(index, row) {
        // get the name of the item to be deleted
        const name = forms[index].name;
    
        // remove the row from the table
        row.remove();
    
        // remove the corresponding form data from local storage
        forms.splice(index, 1);
        localStorage.setItem("forms", JSON.stringify(forms));
    
        // remove the item from cart data
        const cart = JSON.parse(localStorage.getItem("cart") || "{}");
        delete cart[name];
        localStorage.setItem("cart", JSON.stringify(cart));
    
        // update the serial numbers in the first column of each row
        const rows = formDataEl.rows;
        for (let i = 1; i < rows.length; i++) {
            const cell = rows[i].cells[0];
            cell.textContent = i;
        }
    }
    
        const admin = document.getElementById('admin');
        // added click event listeners to the buttons to move to Admin Page
          admin.addEventListener('click', () => {
          window.location.href = 'admin.html';
        });