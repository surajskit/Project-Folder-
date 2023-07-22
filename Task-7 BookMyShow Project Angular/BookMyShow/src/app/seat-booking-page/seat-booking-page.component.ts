import { Component, ElementRef, ViewChild, AfterViewInit,OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-booking-page',
  templateUrl: './seat-booking-page.component.html',
  styleUrls: ['./seat-booking-page.component.css']
})
export class SeatBookingPageComponent implements AfterViewInit,OnInit {

  constructor() {
    this.boxRows = document.getElementsByClassName("box-row");
    this.seats = document.getElementsByClassName("box");
  }

  // ngAfterViewInit() method is called after the view is initialized. 
  ngAfterViewInit() {
    this.table(this.r, this.c);
    this.Ticket();
    this.highlightSelectedSeats();
    }

  ngOnInit() {
    const storedMovieName = localStorage.getItem('MovieName');
    if (storedMovieName !== null) {
      this.movieName = storedMovieName;
    }
  }

  movieName!: string;
  r: number = 10;
  c: number = 16;
  boxNumber: number = 1;
  selectedSeats = [];

  seatType!: string;
  seatQty!: number;
  boxRows: HTMLCollectionOf<Element>; //we use as HTMLElement to tell TypeScript that boxRows is an HTMLElement
  seats: HTMLCollectionOf<Element>;

  //access a reference to an element in the component's template with the seatStructure variable.
  @ViewChild('seatStructure') MainContainer !: ElementRef;

  //creating box  
  table(r: Number, c: Number) {
    var letters: string[];
    letters = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // Create and append the h5 tag with "Premium" content
    var standardHeading = document.createElement('h5');
    standardHeading.innerText = "Premium";
    standardHeading.style.textAlign = "center";
    standardHeading.style.marginTop = "10px";
    this.MainContainer.nativeElement.appendChild(standardHeading);

    for (var i = 0; i < this.r; i++) {
      const box = document.createElement('div');
      box.classList.add("box-row");
      box.setAttribute('id', 'RowNo-' + i); // Assign unique ID for each row
      box.style.color = "green";
      box.style.display = "flex";

      if (i === 3) {
        box.style.marginBottom = "40px";
      }

      let rowBoxNumber: number = this.boxNumber;
      var letterBox = document.createElement('div');
      letterBox.innerText = letters[i];
      letterBox.classList.add('letterbox1');
      letterBox.setAttribute('id', 'letterNo-' + i); // Assign unique ID for each letter box
      box.appendChild(letterBox);

      for (var j = 0; j < this.c; j++) {
        const childbox = document.createElement('div');
        childbox.className = 'box';
        childbox.setAttribute('id', 'BoxNo-' + rowBoxNumber); // Assign unique ID for each seat box

        childbox.innerText = String(rowBoxNumber);
        childbox.style.textAlign = "center";

        childbox.addEventListener('click', () => {
          this.selectSeat(childbox);
          console.log(childbox);
        });

        box.appendChild(childbox);
        rowBoxNumber++;

        if ((j === 3) || (j === 11)) {
          childbox.classList.add('me-5');
        }
      }
      this.MainContainer.nativeElement.appendChild(box);

      if (i === 4) {
        var standardHeading = document.createElement('h5');
        standardHeading.innerText = "Standard";
        standardHeading.style.textAlign = "center";
        standardHeading.style.marginTop = "10px";
        this.MainContainer.nativeElement.insertBefore(standardHeading, box);
      }
      console.log(this.MainContainer);
    }
  }

  //...........................................................................................................
  Ticket() {
    this.seatType = (<HTMLInputElement>document.getElementById("seat-type")).value;
    this.seatQty = parseInt((<HTMLInputElement>document.getElementById("seat-qty")).value);

    Array.from(this.seats).forEach(seat => {
      seat.classList.remove("disabled");
      seat.classList.add("box");
    });

    if (this.seatType === "Standard" && this.seatQty >= 1 && this.seatQty <= 10) {
      for (let i = 0; i < this.boxRows.length; i++) {
        if (i < 4) {
          this.boxRows[i].classList.remove("enable");
          (this.boxRows[i] as HTMLElement).style.pointerEvents = "none";
        } else {
          this.boxRows[i].classList.add("enable");
          (this.boxRows[i] as HTMLElement).style.pointerEvents = "auto";
        }
      }
    } else if (this.seatType === "Premium" && this.seatQty >= 1 && this.seatQty <= 10) {
      for (let i = 0; i < this.boxRows.length; i++) {
        if (i < 4) {
          this.boxRows[i].classList.add("enable");
          (this.boxRows[i] as HTMLElement).style.pointerEvents = "auto";
        } else {
          this.boxRows[i].classList.remove("enable");
          (this.boxRows[i] as HTMLElement).style.pointerEvents = "none";
        }
      }
    } else {
      for (let i = 0; i < this.boxRows.length; i++) {
        this.boxRows[i].classList.remove("enable");
        (this.boxRows[i] as HTMLElement).style.pointerEvents = "none";
      }
    }
  }
  //..........................................................................................
  // //dim highlight seats
  highlightSelectedSeats() {
    document.addEventListener("DOMContentLoaded", function (e) {
      if (localStorage.getItem('BookMyShowData')) {
        const Movie = localStorage.getItem('MovieName');
        let selected_seats = JSON.parse(localStorage.getItem('BookMyShowData')!).find((item: any) => item.movieName == Movie)?.bookedSeats;
        console.log(selected_seats, 'selected_seats', localStorage.getItem('BookMyShowData'));
        if (selected_seats) {
          for (let i = 0; i < document.getElementsByClassName('box-row').length; i++) {
            let boxRows = document.getElementsByClassName('box-row')[i].childNodes;
            console.log((boxRows[0] as HTMLElement).id.split('-')[1], 'boxRows');
            for (let j = 0; j < boxRows.length; j++) {
              console.log(document.getElementsByClassName('box-row')[i].childNodes[0].textContent!.concat(boxRows[j].textContent!) + "-" + (boxRows[0] as HTMLElement).id.split('-')[1], 'boxRows[j]', (boxRows[j] as HTMLElement).id.split('-')[1], 'boxRows[j]', boxRows[j]);
              if (selected_seats.find((item: any) => item === document.getElementsByClassName('box-row')[i].childNodes[0].textContent!.concat(boxRows[j].textContent!) + "-" + (boxRows[0] as HTMLElement).id.split('-')[1])) {
                (boxRows[j] as HTMLElement).classList.add('selected');
                (boxRows[j] as HTMLElement).classList.add('booked');
              }
            }
          }
        }
        console.log("highlighted work's");
      }
    });
  }

  //........................................................................................
  seatsRemain: number = 0;
  selectSeat(seat: HTMLElement) {
    console.log(seat);
    const seatType = (<HTMLInputElement>document.getElementById("seat-type")).value;

    if (seatType === "Standard" || seatType === "Premium") {
      console.log("if is working");
      
      let seatQty = this.seatsRemain === 0 ? +(<HTMLInputElement>document.getElementById("seat-qty")).value : this.seatsRemain;
      const currentRow: Element | null = seat.closest('.box-row');
      console.log(currentRow);

      const rowSeats = currentRow!.querySelectorAll('.box');
      const clickedIndex = Array.from(rowSeats).indexOf(seat);
      const selectedSeatIds = [];

      // //reset the previously selected seats which are not stored in localstorage
      if (this.seatsRemain === 0) {
        Array.from(document.getElementsByClassName('selected')).forEach(i => {
          if (i.classList.contains('selected') && !i.classList.contains('booked')) {
            i.classList.remove('selected');
            i.classList.remove('disabled');
          }
        });
      }

      // checked the starting index value of the selected seat and then add the seat qunatity
      for (let i = clickedIndex; i < clickedIndex + seatQty; i++) {
        const box = rowSeats[i] as HTMLElement;

        if (!box || box.classList.contains('booked')) {
          break;
        }

        if (box.classList.contains('me-5')) {
          box.classList.add('selected', 'disabled');
          selectedSeatIds.push(box.id);
          break;
        }
        box.classList.add('selected', 'disabled');
        selectedSeatIds.push(box.id);
      }
      this.seatsRemain = Math.max(seatQty - selectedSeatIds.length, 0);

      //proceed  Button Enable or disable
      const proceedBtn = document.getElementById('proceedBtn') as HTMLButtonElement;
      const selectedSeats = document.getElementsByClassName('selected');
      const checkdisabled = document.getElementsByClassName('disabled');

      const seatQtycheck = parseInt((<HTMLInputElement>document.getElementById('seat-qty')).value);

      if (checkdisabled.length === seatQtycheck) {
        proceedBtn.disabled = false;
        proceedBtn.style.opacity = '1';
        proceedBtn.classList.remove('opacity-30');
      } else {
        proceedBtn.disabled = true;
        proceedBtn.style.opacity = '0.3';
      }
    }
    else if (seatType !== "Standard" && seatType !== "Premium") {
      alert("Please select Seat Types and Seat Quantity");
    }
    else {
      console.log("Seat checking");
    }
  }
  //......................................................................................................

  bookingData: any[] = [];
  updateTextArea() {
    const selectedSeats = document.getElementsByClassName("selected");
    const seats = [];
    for (let i = 0; i < selectedSeats.length; i++) {
      const seat = selectedSeats[i];
      seat.classList.add('booked');
      const seatLetter = ((seat.parentNode as HTMLElement).getElementsByClassName("letterbox1")[0] as HTMLElement).innerText;

      console.log(seatLetter);
      const seatNumber = (seat as HTMLElement).innerText;
      const rowNumber = (seat.parentNode as HTMLElement).id.split('-')[1];
      seats.push(`${seatLetter}${seatNumber}-${rowNumber}`);
    }
    // const seatsJSON = JSON.stringify(seats);
    const moviename = localStorage.getItem('MovieName');

    const storedSelectedSeats = JSON.parse(localStorage.getItem('BookMyShowData')!) ? JSON.parse(localStorage.getItem('BookMyShowData')!).find((item: { movieName: string }) => item.movieName == moviename)?.bookedSeats : [];
    const newSelectedSeats = seats.filter(seat => !storedSelectedSeats?.includes(seat));
    let mergedSeats;
    if (storedSelectedSeats) {
      mergedSeats = [...storedSelectedSeats, ...newSelectedSeats];
    } else {
      mergedSeats = newSelectedSeats;
    }

    localStorage.setItem("selectedSeats", JSON.stringify(mergedSeats));
    this.addBooking(moviename!, mergedSeats);
    console.log(this.bookingData);

    let storedBookingData = JSON.parse(localStorage.getItem("BookMyShowData")!);

    if (storedBookingData) {
      storedBookingData = storedBookingData.filter((item: { movieName: string }) => item.movieName !== moviename);
      localStorage.setItem("BookMyShowData", JSON.stringify([...this.bookingData, ...storedBookingData]));
    } else {
      localStorage.setItem("BookMyShowData", JSON.stringify(this.bookingData));
    }

    const alertMessage = `Seats booked: ${newSelectedSeats.join(", ")}`;
    alert(alertMessage);

    window.addEventListener('click', () => {
      location.reload();
    });
  }

  //// Implementing our logic to add the booking to the bookingData array
  addBooking(movieName: string, bookedSeats: string[]) {
    const moviesObj = {
      movieName: movieName,
      bookedSeats: bookedSeats
    };
    this.bookingData.push(moviesObj);
  }
}
