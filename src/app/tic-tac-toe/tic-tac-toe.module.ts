import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeService } from './shared';
import { TicTacToeComponent } from './tic-tac-toe.component';

@NgModule({
  declarations: [TicTacToeComponent],
  imports: [CommonModule],
  exports: [TicTacToeComponent],
  providers: [TicTacToeService],
})
export class TicTacToeModule {}
