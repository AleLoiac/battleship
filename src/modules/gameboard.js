export class Gameboard {
  constructor() {
    this.board = [];

    for (let i = 0; i < 10; i++) {
      this.board[i] = [];

      for (let j = 0; j < 10; j++) {
        this.board[i][j] = null;
      }
    }
  }
}
