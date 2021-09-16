import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  private readonly BOARD_SIZE: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private board: any;
  private numMovies: number;
  private win: any;

  private _player: number;
  private _showStart: boolean;
  private _showBoard: boolean;
  private _showEnd: boolean;

  constructor() {}

  initialize(): void {
    this._showStart = true;
    this._showBoard = false;
    this._showEnd = false;
    this.numMovies = 0;
    this._player = this.X;
    this.win = false;
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = [this.BOARD_SIZE];
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      this.board[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  get showStart(): boolean {
    return this._showStart;
  }

  get showBoard(): boolean {
    return this._showBoard;
  }

  get showEnd(): boolean {
    return this._showEnd;
  }

  get player(): number {
    return this._player;
  }

  startGame(): void {
    this._showStart = false;
    this._showBoard = true;
  }

  play(posX: number, posY: number): void {
    if (this.board[posX][posY] !== this.EMPTY || this.win) {
      return;
    }

    this.board[posX][posY] = this._player;
    this.numMovies++;
    this.win = this.endGame(posX, posY, this.board, this._player);
    this._player = this._player === this.X ? this.O : this.X;

    if (!this.win && this.numMovies < 9) {
      this.cpuPlay();
    }

    if (this.win !== false) {
      this._showEnd = true;
    }

    if (!this.win && this.numMovies === 9) {
      this._player = 0;
      this._showEnd = true;
    }
  }

  endGame(line: number, column: number, board: any, player: number) {
    let end: any = false;

    if (
      board[line][0] === player &&
      board[line][1] === player &&
      board[line][2] === player
    ) {
      end = [
        [line, 0],
        [line, 1],
        [line, 2],
      ];
    }

    if (
      board[0][column] === player &&
      board[1][column] === player &&
      board[2][column] === player
    ) {
      end = [
        [0, column],
        [1, column],
        [2, column],
      ];
    }

    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    ) {
      end = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    }

    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    ) {
      end = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }

    return end;
  }

  cpuPlay(): void {
    let move: number[] = this.getMove(this.O);

    if (move.length <= 0) {
      move = this.getMove(this.X);
    }

    if (move.length <= 0) {
      let moves: any = [];
      for (let i = 0; i < this.BOARD_SIZE; i++) {
        for (let j = 0; j < this.BOARD_SIZE; j++) {
          if (this.board[i][j] === this.EMPTY) {
            moves.push([i, j]);
          }
        }
      }
      let k = Math.floor(Math.random() * (moves.length - 1));
      move = [moves[k][0], moves[k][1]];
    }

    this.board[move[0]][move[1]] = this._player;
    this.numMovies++;
    this.win = this.endGame(move[0], move[1], this.board, this._player);
    this._player = this._player === this.X ? this.O : this.X;
  }

  getMove(player: number): number[] {
    let board = this.board;
    for (let lin = 0; lin < this.BOARD_SIZE; lin++) {
      for (let col = 0; col < this.BOARD_SIZE; col++) {
        if (board[lin][col] !== this.EMPTY) {
          continue;
        }
        board[lin][col] = player;
        if (this.endGame(lin, col, board, player)) {
          return [lin, col];
        }
        board[lin][col] = this.EMPTY;
      }
    }
    return [];
  }

  showX(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.X;
  }

  showY(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.O;
  }

  showWin(posX: number, posY: number): boolean {
    let showWin: boolean = false;

    if (!this.win) {
      return showWin;
    }

    for (const pos of this.win) {
      if (pos[0] === posX && pos[1] === posY) {
        showWin = true;
        break;
      }
    }

    return showWin;
  }

  newGame(): void {
    this.initialize();
    this._showEnd = false;
    this._showStart = false;
    this._showBoard = true;
  }
}
