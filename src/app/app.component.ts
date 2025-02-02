import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board: string[] = Array(9).fill(null);
  xIsNext = true;
  scoreX = 0;
  scoreO = 0;
  roundNumber = 1;
  gameStarted = false;
  gameWon = false;
  winner: string | null = null;
  winConditions = [3, 5, 7];
  selectedWinCondition = 3;
  showTargetSelector = false;
  gameDraw = false;
  extraRoundCount = 0;
  startingPlayer: 'X' | 'O' | null = null;

  getStatus(): string {
    if(this.winner) return `Winner: ${this.winner}`;
    if(this.board.every(cell => cell)) return 'Game Draw!';
    return `Next player: ${this.xIsNext ? 'X' : 'O'}`;
  }

  makeMove(idx: number): void {
    if(!this.board[idx] && !this.winner && this.gameStarted) {
      this.board.splice(idx, 1, this.xIsNext ? 'X' : 'O');
      this.xIsNext = !this.xIsNext;
      this.checkWinner();
    }
  }

  checkWinner(): void {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for(const line of lines) {
      const [a, b, c] = line;
      if(
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.winner = this.board[a];
        this.updateScore(this.winner);
        return;
      }
    }

    if(this.board.every(cell => cell)) {
      this.gameDraw = true;
    }
  }

  updateScore(winner: string): void {
    winner === 'X' ? this.scoreX++ : this.scoreO++;
    
    this.startingPlayer = winner as 'X' | 'O';
    
    if(this.scoreX >= this.selectedWinCondition || this.scoreO >= this.selectedWinCondition) {
      this.gameWon = true;
      this.gameStarted = false;
      return;
    }
    
    this.winner = winner;
    this.gameStarted = false;
  }

  resetGame() {
    this.roundNumber = 1;
    this.scoreX = 0;
    this.scoreO = 0;
    this.gameWon = false;
    this.winner = null;
    this.gameStarted = false;
    this.board = Array(9).fill(null);
    this.startingPlayer = null;
    this.xIsNext = true;
  }

  onGameStarted(event: boolean) {
    this.gameStarted = event;
  }

  selectTarget(target: number) {
    this.selectedWinCondition = target;
  }

  startGame() {
    if(this.selectedWinCondition) {
      this.gameStarted = true;
      this.showTargetSelector = false;
      this.resetBoard();
      this.startingPlayer = null;
    }
  }

  resetBoard() {
    this.board = Array(9).fill(null);
    this.xIsNext = true;
    this.gameDraw = false;
  }

  startExtraRound() {
    this.extraRoundCount++;
    this.nextRound();
    this.gameDraw = false;
  }

  nextRound() {
    this.roundNumber++;
    this.resetBoard();
    this.winner = null;
    this.gameDraw = false;
    this.gameStarted = true;
    
    this.xIsNext = this.startingPlayer ? 
      (this.startingPlayer === 'X') : 
      true;
  }
}
