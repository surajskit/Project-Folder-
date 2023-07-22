const Movie = localStorage.getItem('MovieName');
document.getElementById('movieTitle').innerText = Movie;

const MainContainer = document.getElementById("seatStructure");
const r = 14;
const c = 16;
let boxNumber = 1;
let selectedSeats = [];
table(r, c);

//1 function without storage 
function table(r, c) {
  const letters = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // Create and append the h2 tag with "Premium" content
  var standardHeading = document.createElement('h5');
  standardHeading.innerText = "Premium";
  standardHeading.style.textAlign = "center";
  standardHeading.style.marginTop = "10px";
  MainContainer.appendChild(standardHeading);

  for (var i = 0; i < r; i++) {
    var box = document.createElement('div');
    box.classList.add("box-row");
    box.setAttribute('id', 'RowNo-' + i); // Assign unique ID for each row

    box.style.color = "green";
    box.style.display = "flex";

    if (i === 3) {
      box.style.marginBottom = "60px";
    }

    let rowBoxNumber = boxNumber;
    var letterBox = document.createElement('div');
    letterBox.innerText = letters[i];
    letterBox.classList.add('letterbox1');
    letterBox.setAttribute('id', 'letterNo-' + i); // Assign unique ID for each letter box
    box.appendChild(letterBox);

    for (var j = 0; j < c; j++) {
      var childbox = document.createElement('div');
      childbox.className = 'box';
      childbox.setAttribute('id', 'BoxNo-' + rowBoxNumber); // Assign unique ID for each seat box

      childbox.innerText = rowBoxNumber;
      childbox.style.textAlign = "center";

      childbox.addEventListener('click', function () {
        selectSeat(this);
      });

      box.appendChild(childbox);
      rowBoxNumber++;
      if ((j === 3) || (j === 11)) {
        childbox.classList.add('me-5');
      }
    }
    MainContainer.appendChild(box);
    // console.log(MainContainer);

    // Check if it's the rowNo-4 and add the h5 tag above it
    if (i === 4) {
      var standardHeading = document.createElement('h5');
      standardHeading.innerText = "Standard";
      standardHeading.style.textAlign = "center";
      standardHeading.style.marginTop = "10px";
      MainContainer.insertBefore(standardHeading, box);
    }

  }
}


// // function for seat enable and disable 
function Ticket() {
  const seatType = document.getElementById("seat-type").value;
  const seatQty = document.getElementById("seat-qty").value;

  const boxRows = document.getElementsByClassName("box-row");

  // Remove disabled and selected classes from all seats and add box class
  const seats = document.getElementsByClassName("box");
  Array.from(seats).forEach(seat => {
    seat.classList.remove("disabled");
    // seat.classList.add("box");

  });

  // console.log(boxRows.length);
  if (seatType === "Standard" && seatQty >= 1 && seatQty <= 10) {
    for (let i = 0; i < boxRows.length; i++) {
      if (i < 4) {
        boxRows[i].classList.remove("enable");
        boxRows[i].style.pointerEvents = "none"; // Disable pointer events for Standard rows
      } else {
        boxRows[i].classList.add("enable");
        boxRows[i].style.pointerEvents = "auto"; // Enable pointer events for Premium rows
      }

    }
  } else if (seatType === "Premium" && seatQty >= 1 && seatQty <= 10) {
    for (let i = 0; i < boxRows.length; i++) {
      if (i < 4) {
        boxRows[i].classList.add("enable");
        boxRows[i].style.pointerEvents = "auto"; // Enable pointer events for Standard rows
      } else {
        boxRows[i].classList.remove("enable");
        boxRows[i].style.pointerEvents = "none"; // Disable pointer events for Premium rows
      }

    }
  } else {
    for (let i = 0; i < boxRows.length; i++) {
      boxRows[i].classList.remove("enable");
      boxRows[i].style.pointerEvents = "none"; // Disable pointer events for all rows
    }
  }
}

// Dim Highlighted for the seats which are stored in the localstorage 
document.addEventListener("DOMContentLoaded", function (e) {
  if (localStorage.getItem('BookMyShowData')) {
    let selected_seats = JSON.parse(localStorage.getItem('BookMyShowData')).find(item => item.movieName == Movie)?.bookedSeats;
    console.log(selected_seats, 'selected_seats', localStorage.getItem('BookMyShowData'));
    if (selected_seats) {
      for (let i = 0; i < document.getElementsByClassName('box-row').length; i++) {
        let boxRows = document.getElementsByClassName('box-row')[i].childNodes;
        console.log(boxRows[0].id.split('-')[1], 'boxRows');
        // console.log(document.getElementsByClassName('box-row')[i].childNodes[0].textContent, 'fffffffffff', boxRows);
        for (let j = 0; j < boxRows.length; j++) {
          console.log(document.getElementsByClassName('box-row')[i].childNodes[0].textContent.concat(boxRows[j].textContent) + "-" + boxRows[0].id.split('-')[1], 'boxRows[j]', boxRows[j].id.split('-')[1], 'boxRows[j]', boxRows[j]);
          if (selected_seats.find(item => item === document.getElementsByClassName('box-row')[i].childNodes[0].textContent.concat(boxRows[j].textContent) + "-" + boxRows[0].id.split('-')[1])) {
            boxRows[j].classList.add('selected');
            boxRows[j].classList.add('booked');
          }
        }
      }
    }
  }
});

let seatsRemain = 0;
function selectSeat(seat) {
  // display the alert meassage if the seat type and quantity is not selected 
  // const seatQty = document.getElementById("seat-qty").value;
  const seatType = document.getElementById("seat-type").value;
  if (seatType === "Standard" || seatType === "Premium") {

    const seatQty = seatsRemain === 0 ? +document.getElementById("seat-qty").value : seatsRemain;
    const currentRow = seat.closest('.box-row');
    const rowSeats = currentRow.querySelectorAll('.box');
    const clickedIndex = Array.from(rowSeats).indexOf(seat);
    const selectedSeatIds = [];

    //reset the previously selected seats which are not stored in localstorage
    if (seatsRemain == 0) {
      Array.from(document.getElementsByClassName('selected')).forEach(i => {
        if (i.classList.contains('selected') && !i.classList.contains('booked')) {
          i.classList.remove('selected');
          i.classList.remove('disabled');
        }
      })
    }

    // checked the starting index value of the selected seat and then add the seat qunatity
    for (let i = clickedIndex; i < clickedIndex + seatQty; i++) {
      const box = rowSeats[i];

      if (!box || box.classList.contains('booked')) {
        break;
      }

      if (box.classList.contains('me-5')) {
        box.classList.add('selected', 'disabled');
        selectedSeatIds.push(box.id);
        break
      }
      box.classList.add('selected', 'disabled');
      selectedSeatIds.push(box.id);
    }

    if (localStorage.getItem('BookMyShowData')) {
      const storedSelectedSeats = JSON.parse(localStorage.getItem('BookMyShowData')).find(item => item.movieName == Movie)?.bookedSeats || [];

      for (const seatId of storedSelectedSeats) {
        const seat = document.getElementById(seatId);

        if (seat) {
          seat.classList.add('disabled');
        }
      }
    }

    seatsRemain = Math.max(seatQty - selectedSeatIds.length, 0);

    //proceed  Button Enable or disable
    const proceedBtn = document.getElementById('proceedBtn');
    const selectedSeats = document.getElementsByClassName('selected');
    const checkdisabled = document.getElementsByClassName('disabled');

    // selectedSeats = selectedSeatIds;
    // const seatQty = parseInt(document.getElementById('seat-qty').value);
    const seatQtycheck = parseInt(document.getElementById('seat-qty').value);
    console.log(selectedSeats.length, 'seatQtycheck', seatQtycheck, 'proceedBtn', proceedBtn, 'checkdisable', checkdisabled.length);
    if (checkdisabled.length === seatQtycheck) {
      proceedBtn.disabled = false;
      proceedBtn.style.opacity = 1;
      proceedBtn.classList.remove('opacity-30')
    } else {
      proceedBtn.disabled = true;
      proceedBtn.style.opacity = 0.3;
    }

  }
  else if (seatType !== "Standard" || seatType !== "Premium") {
    alert("Please select Seat Types and Seat Quantity");
  }
  else {
    return false;
  }

}

let bookingData = [];
//storing data after clicking on proceed Button
function updateTextArea() {
  const selectedSeats = document.getElementsByClassName("selected");
  const seats = [];
  for (let i = 0; i < selectedSeats.length; i++) {
    const seat = selectedSeats[i];
    seat.classList.add('booked')
    const seatLetter = seat.parentNode.getElementsByClassName("letterbox1")[0].innerText;
    const seatNumber = seat.innerText;
    // seats.push(`${seatLetter}${seatNumber}`);
    const rowNumber = seat.parentNode.id.split('-')[1];
    seats.push(`${seatLetter}${seatNumber}-${rowNumber}`);
  }
  const seatsJSON = JSON.stringify(seats);
  const moviename = localStorage.getItem('MovieName');

  // Retrieve the previously stored selected seats from local storage
  const storedSelectedSeats = JSON.parse(localStorage.getItem('BookMyShowData')) ? JSON.parse(localStorage.getItem('BookMyShowData')).find(item => item.movieName == Movie)?.bookedSeats : [];
  // Filter out the seats that are already stored
  const newSelectedSeats = seats.filter(seat => !storedSelectedSeats?.includes(seat));

  // Merge the newly selected seats with the previously stored seats
  let mergedSeats
  if (storedSelectedSeats) {
    mergedSeats = [...storedSelectedSeats, ...newSelectedSeats];
  }
  else {
    mergedSeats = newSelectedSeats;
  }

  // Store the merged seats in local storage
  localStorage.setItem("selectedSeats", JSON.stringify(mergedSeats));
  addBooking(moviename, mergedSeats);
  console.log(bookingData)

  let storedBookingData = JSON.parse(localStorage.getItem("BookMyShowData"))

  // storedBookingData = storedBookingData.filter(i=>i.movieName !== moviename);
  if (storedBookingData) {
    storedBookingData = storedBookingData.filter(i => i.movieName !== moviename);
    localStorage.setItem("BookMyShowData", JSON.stringify([...bookingData, ...storedBookingData]));
  }
  else {
    localStorage.setItem("BookMyShowData", JSON.stringify(bookingData));
  }

  // Create the alert message with new seat numbers
  const alertMessage = `Seats booked: ${newSelectedSeats.join(", ")}`;
  alert(alertMessage);

  // Refresh the page after the user clicks OK
  window.addEventListener('click', function () {
    location.reload();
  });

  // // Refresh the page after a delay
  // setTimeout(function() {
  //   location.reload();
  // }, 1000);
}

function addBooking(movieName, bookedSeats) {
  let moviesObj = {}
  moviesObj['movieName'] = movieName
  moviesObj['bookedSeats'] = bookedSeats
  bookingData.push(moviesObj);
}




