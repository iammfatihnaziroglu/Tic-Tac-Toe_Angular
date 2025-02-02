import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  @Input() board!: string[];
  @Output() cellClick = new EventEmitter<number>();

  handleClick(index: number) {
    this.cellClick.emit(index);
  }
}
