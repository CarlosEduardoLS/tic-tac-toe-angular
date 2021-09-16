import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from './shared/tic-tac-toe.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css'],
})
export class TicTacToeComponent implements OnInit {
  constructor(private ticTacToeService: TicTacToeService) {}

  ngOnInit(): void {
    this.ticTacToeService.initialize();
  }

  get showStart(): boolean {
    return this.ticTacToeService.showStart;
  }

  get showEnd(): boolean {
    return this.ticTacToeService.showEnd;
  }

  get showBoard(): boolean {
    return this.ticTacToeService.showBoard;
  }

  startGame(): void {
    this.ticTacToeService.startGame();
  }

  play(posX: number, posY: number): void {
    this.ticTacToeService.play(posX, posY);
  }

  showX(posX: number, posY: number): boolean {
    return this.ticTacToeService.showX(posX, posY);
  }

  showO(posX: number, posY: number): boolean {
    return this.ticTacToeService.showY(posX, posY);
  }

  showWin(posX: number, posY: number): boolean {
    return this.ticTacToeService.showWin(posX, posY);
  }

  get player(): number {
    return this.ticTacToeService.player;
  }

  newGame(): void {
    this.ticTacToeService.newGame();
  }
}
