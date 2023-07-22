import { Component } from '@angular/core';
enum Player {
  None = '',
  X = 'X',
  O = 'O'
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  currentPlayer: Player = Player.X;
  board: Player[] = Array(9).fill(Player.None);
  winner: Player | null = null;

  makeMove(index: number): void {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;

      if (this.checkWin(this.currentPlayer)) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
      }
    }
  }

  checkWin(player: Player): boolean {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winningCombinations.some(combination =>
      combination.every(index => this.board[index] === player)
    );
  }

  restartGame(): void {
    this.currentPlayer = Player.X;
    this.board = Array(9).fill(Player.None);
    this.winner = null;
  }


}
