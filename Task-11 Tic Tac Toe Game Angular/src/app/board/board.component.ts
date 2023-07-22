import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

//bootstrap instance are available at window level
declare var window: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {
  boards: any = [];
  player1: any = {};
  player2: any = {};
  result: any = [];
  turn = 'X';
  counter = 0;
  winner: any;
  noWinner = false;
  isGameOver = false;
  WinnernameCheck: string = '';
  winnerName!: string;

  player1Name: string = '';
  player2Name: string = '';

  formModal: any;
  @ViewChild('playerForm') playerForm!: NgForm;
  @ViewChild('winnerModal') winnerModal: any;
  @ViewChild('drawModal') drawModal: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }

  ngAfterViewInit(): void {
    this.openModal();
    this.doSomething();
  }

  //Fn to show the modal
  openModal() {
    this.formModal.show();
  }

  ///Fn to close the modal
  doSomething() {
    this.formModal.hide();
  }

  showWinnerModal(winnerName: string) {
    console.log("inside showwinner function");
    const modalRef = this.modalService.open(this.winnerModal);
  }

  showDrawModal() {
    const modaldraw = this.modalService.open(this.drawModal);
  }

  showDrawAlert() {
    this.showDrawModal(); // Show the winner modal with the winner's name
    console.log("draw counter++ =", this.counter);
    console.log("draw");
  }

  validateForm(): void {
    // console.log("Form submitted");
    if (this.playerForm.valid) {
      const { name1, name2 } = this.playerForm.value;
      this.player1Name = name1;
      this.player2Name = name2;
      console.log(this.player1Name, this.player2Name);
      this.intializeBoard();
      this.modalService.dismissAll();

    }
    else {
      console.log('Form is invalid');
    }
  }

  // program logic 
  intializeBoard() {
    this.boards = []; // Clear the existing boards array

    for (let i = 0; i < 9; i++) {
      this.boards.push({
        id: i,
        state: "",
        playerName: ""
      })
    }

    this.player1 = {
      name: this.player1Name,
      turn: "X"
    }
    this.player2 = {
      name: this.player2Name,
      turn: "0"
    }
  }

  changeTurn = () => {
    return this.turn === "X" ? "O" : "X"
  }

  makeMove(box: any) {
    if (this.turn == "X") {
      box.state = this.player1.turn;
      box.playerName = this.player1.name;
      this.result.push(box);
      this.turn = this.changeTurn();
      this.counter++;
      console.log(" if move counter++ =", this.counter);
      this.checkWin();
    }
    else {
      box.state = this.player2.turn;
      box.playerName = this.player2.name;
      this.result.push(box);
      this.turn = this.changeTurn();
      this.counter++;
      console.log("else counter++ =", this.counter);

      this.checkWin();
    }
  }


  checkWin() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    var noOfTurn = this.boards.filter((x: any) => x.state != "")
    console.log("i======",noOfTurn);
    

    if (noOfTurn.length > 4) {
      // console.log("i>4=======",i);
      let playerTurn1 = this.player1.turn;
      let playerTurn2 = this.player2.turn;
      let boardPlayer1 = noOfTurn.filter((x: any) => x.state == playerTurn1);
      let boardPlayer2 = noOfTurn.filter((x: any) => x.state == playerTurn2);

      if (Object.keys(boardPlayer1).length > 2 || Object.keys(boardPlayer2).length > 2) {
        // console.log("-------",boardPlayer1,boardPlayer2);

        let player1_IDs = boardPlayer1.map((x: any) => x.id);
        let player2_IDs = boardPlayer2.map((x: any) => x.id);
        

        // console.log("player1_IDs,player2_IDs =", player1_IDs, player2_IDs);

        winningCombinations.forEach((element: any) => {
          let [a, b, c] = element;
          // console.log("[a,b,c]", a, b, c);

          let winner1 = player1_IDs.filter((x: any) => x == a || x == b || x == c);
          let winner2 = player2_IDs.filter((x: any) => x == a || x == b || x == c);

          if (winner1.length >= 3) {
            console.log("player1");
            this.winnerName = this.player1.name;
          }
          if (winner2.length >= 3) {
            // console.log(this.player1.name, "player2.name", this.player2.name);
            this.winnerName = this.player2.name;
          }
        });

        if (this.winnerName) {
          console.log("Winner:", this.winnerName);
          console.log("Winner counter++ =", this.counter);
          this.WinnernameCheck = this.winnerName;
          this.showWinnerModal(this.winner); // Show the winner modal with the winner's name
          this.isGameOver = true;
          console.log(this.counter);
          this.winnerName="";
        }

        else if (this.counter === 9) {
          console.log("game is draw");
          this.showDrawAlert(); 
          // console.log(this.counter);
        }
      }
    }
  }
  

  reset() {
    console.log("wonnnnnn");
    
    this.boards.forEach((cell: any) => {
      cell.state = '';
      cell.playerName = '';
    });
    this.turn = 'X';
    this.counter = 0;
    this.winner = null;
    this.noWinner = false;
    this.isGameOver = false;
  }

  restart() {
    this.reset();
    this.playerForm.resetForm(); // Reset the form inputs
    this.openModal();
    this.doSomething();
  }
}
